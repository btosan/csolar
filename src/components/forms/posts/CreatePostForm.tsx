'use client'

import { createPost } from '@/lib/actions/posts'
import { getCategories } from '@/lib/actions/categories'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { Type, TechWritingCategory } from "@prisma/client"
import { CameraIcon, TrashIcon } from '@heroicons/react/24/solid'
import { TableOfContents } from 'lucide-react'

type Category = {
  id: string
  catName: string
}

interface CreatePostFormProps {
  categories?: Category[]
}

export default function CreatePostForm({ categories: initialCategories }: CreatePostFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [content, setContent] = useState('')
  const [tableOfContents, setTableOfContents] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>(initialCategories || [])
  const [loading, setLoading] = useState(!initialCategories)

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      if (!initialCategories) {
        try {
          const result = await getCategories()
          if (result.success) {
            setCategories(result.data)
          }
        } catch (error) {
          console.error('Failed to fetch categories:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchCategories()
  }, [initialCategories])

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
    setSelectedTags(tags)
  }

  const removeImageUrl = () => {
    setImageUrl("")
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary7 dark:text-white">
          Create New Post
        </h1>
        <p className="mt-2 text-primary4 dark:text-secondary1">
          Fill in the details below to create a new blog post
        </p>
      </div>

      <form 
        className="space-y-6 bg-lightblue dark:bg-primary1 rounded-xl shadow-lg p-6"
        action={async (formData) => {
          // Add content & table of contents to form data
          formData.append('content', content)
          formData.append('tableOfContents', tableOfContents)
          
          // Add tags to form data (must append each tag individually)
          selectedTags.forEach(tag => {
            formData.append('tags', tag)
          })
          
          // Add image URL if it exists
          if (imageUrl) {
            formData.append('imageUrl', imageUrl)
          }
          
          const result = await createPost(formData)
          
          if (!result.success) {
            setError(result.error)
          } else {
            router.push('/blogs')
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                       bg-secondary3 dark:bg-primary7 text-black dark:text-white
                        focus:ring-primary3 dark:focus:ring-primary1 focus:border-transparent focus:outline-0
                       transition duration-150 ease-in-out"
              placeholder="Enter post title"
            />
          </div>

          {/* Opening Paragraph */}
          <div className="col-span-full">
            <label htmlFor="openingParagraph" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Opening Paragraph
            </label>
            <textarea
              id="openingParagraph"
              name="openingParagraph"
              rows={3}
              className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                       bg-secondary3 dark:bg-primary7 text-black dark:text-white
                        focus:ring-primary3 dark:focus:ring-primary1 focus:border-transparent focus:outline-0"
              placeholder="Enter an engaging opening paragraph"
            />
          </div>

          {/* Table Of Contents */}
          <div className="col-span-full">
            <label htmlFor="tableOfContents" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Table of contents
            </label>
            <div className="">
              <TiptapEditor 
                content={tableOfContents} 
                onChange={setTableOfContents}
                editable={true}
                placeholder="Table of contents..."
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-full">
            <label htmlFor="content" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Content
            </label>
            <div className="">
              <TiptapEditor 
                content={content} 
                onChange={setContent}
                editable={true}
                placeholder="Write your post..."
              />
            </div>
          </div>

          {/* Post Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Post Type
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                       bg-secondary3 dark:bg-primary7 text-black dark:text-white"
            >
              {Object.values(Type).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Category Selection - Now with dynamic categories */}
          <div>
            <label htmlFor="catName" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Category
            </label>
            {loading ? (
              <div className="animate-pulse h-10 bg-primary4/20 dark:bg-secondary3/20 rounded-lg"></div>
            ) : (
              <select
                id="catName"
                name="catName"
                required
                className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                         bg-secondary3 dark:bg-primary7 text-black dark:text-white"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.catName}>
                    {category.catName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Tech Writing Category (only show if Type is TECHNICAL_WRITING) */}
          <div>
            <label htmlFor="techCat" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Technical Writing Category
            </label>
            <select
              id="techCat"
              name="techCat"
              className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                       bg-secondary3 dark:bg-primary7 text-black dark:text-white"
            >
              <option value="">Select a category</option>
              {Object.values(TechWritingCategory).map((category) => (
                <option key={category} value={category}>{category.replace(/_/g, ' ')}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="col-span-full">
            <label htmlFor="tags" className="block text-sm font-medium text-primary7 dark:text-secondary1 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              onChange={handleTagChange}
              className="w-full px-4 py-2 border border-secondary5 dark:border-primary3 rounded-lg 
                       bg-secondary3 dark:bg-primary7 text-black dark:text-white"
              placeholder="Enter tags, separated by commas"
            />
            {selectedTags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary3/20 dark:bg-secondary3/20 rounded-md text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div className="col-span-full mb-4">
            <label htmlFor="image" className="block mb-1 font-medium text-primary7 dark:text-secondary1">
              Image
            </label>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_BLOG}
              onSuccess={(result: any, { widget }: any) => {
                setImageUrl(result?.info?.secure_url);
                widget.close();
              }}
            >
              {({ open }) => {
                function handleOnClick(e: React.MouseEvent) {
                  e.preventDefault();
                  open();
                }
                return (
                  <div className="w-full h-auto border-2 mt-4 border-dotted grid place-items-center bg-secondary3 rounded-md relative">
                    <button 
                      onClick={handleOnClick} 
                      className="flex gap-2 p-2 bg-secondary3 dark:bg-primary6 rounded-lg"
                      type="button"
                    >
                      <span className="text-sm">Upload</span>
                      <CameraIcon className='w-5 h-5'/>
                    </button>
                    {imageUrl && (
                      <div className="flex items-center justify-between mt-2">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <img 
                            src={imageUrl} 
                            alt="Uploaded preview" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 ml-4">
                          <label htmlFor="imageCredit" className="block text-xs font-medium text-primary7 dark:text-secondary1 mb-1">
                            Image Credit (optional)
                          </label>
                          <input
                            type="text"
                            id="imageCredit"
                            name="imageCredit"
                            className="w-full px-3 py-1 text-sm border border-secondary5 dark:border-primary3 rounded-lg 
                                      bg-secondary3 dark:bg-primary7 text-black dark:text-white"
                            placeholder="e.g., Photo by John Doe on Unsplash"
                          />
                        </div>
                        <div className="text-sm ml-4">
                          <button 
                            onClick={removeImageUrl} 
                            className="flex items-center justify-center gap-2"
                            type="button"
                          >
                            Remove
                            <TrashIcon className="w-4 h-4 text-danger"/>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }}
            </CldUploadWidget>
          </div>

          {/* Published Status */}
          <div className="col-span-full">
            <label className="inline-flex items-center space-x-3">
              <input
                type="checkbox"
                name="published"
                value="true"
                className="form-checkbox h-5 w-5 text-primary7 dark:text-secondary1 
                         border-secondary5 dark:border-primary3 rounded
                          focus:ring-primary3 dark:focus:ring-primary1"
              />
              <span className="text-sm font-medium text-primary7 dark:text-secondary1">
                Publish immediately
              </span>
            </label>
          </div>

          {/* Featured Post */}
          <div className="col-span-full">
            <label className="inline-flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                value="true"
                className="form-checkbox h-5 w-5 text-primary7 dark:text-secondary1 
                         border-secondary5 dark:border-primary3 rounded
                          focus:ring-primary3 dark:focus:ring-primary1"
              />
              <span className="text-sm font-medium text-primary7 dark:text-secondary1">
                Featured Post
              </span>
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="col-span-full p-3 bg-error/10 dark:bg-error/30 border border-error 
                         text-error rounded-lg mt-4">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="col-span-full mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-primary3 hover:bg-primary4/80 
                     dark:bg-secondary3 dark:hover:bg-secondary4/70
                     text-secondary2 dark:text-primary7 font-medium rounded-lg
                     transform transition duration-150 ease-in-out
                     focus:outline-none  focus:ring-offset-2 focus:ring-primary2
                     dark:focus:ring-offset-secondary3 dark:focus:outline-none hover:cursor-pointer"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  )
}