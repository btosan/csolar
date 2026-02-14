'use client'

import { updatePost } from '@/lib/actions/posts'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import TiptapEditor from '@/components/editor/TiptapEditor'
import RichTextDisplay from '@/components/editor/RichTextDisplay'
import { Type, TechWritingCategory, Post, Tag } from "@prisma/client"
import { CameraIcon, TrashIcon } from '@heroicons/react/24/solid'

type Category = {
  id: string
  catName: string
  posts: {
    id: string
    title: string
    slug: string
  }[]
  createdAt: Date
  updatedAt: Date
  postIDs: string
}

type PostWithTags = Post & {
  tags?: {
    id: string;
    tagName: string;
  }[];
}

interface EditPostFormProps {
  post: PostWithTags
  categories?: Category[]
}

type UpdatePostData = {
  title: string;
  type: Type;
  techCat?: TechWritingCategory;
  imageUrl?: string;
  openingParagraph?: string;
  tableOfContents?: string;
  content: string;
  published: boolean;
  featured: boolean;
  catName?: string;
  tags: string[];
}

// col-span-full
export default function EditPostForm({ post, categories = [] }: EditPostFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string>(post?.imageUrl || "")
  const [content, setContent] = useState(post.content)
  const [tableOfContents, setTableOfContents] = useState(post?.tableOfContents || "")
  const [showPreview, setShowPreview] = useState(false)
  // newly added
  const [selectedTags, setSelectedTags] = useState<string[]>(
    post.tags?.map(tag => tag.tagName) || []
  )

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
    setSelectedTags(tags)
  }

  const removeImageUrl = () => {
    setImageUrl("")
  }
// existing implementation
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary3 dark:text-secondary2">
          Edit Post
        </h1>
        <p className="mt-2 text-primary4 dark:text-secondary3">
          Update your post details below
        </p>
      </div>

      <form 
        className="space-y-6 bg-lightblue dark:bg-primary1 rounded-xl shadow-lg p-6"
        action={async (formData: FormData) => {
          try {
            // Add content & table of contents to formData
            formData.set('content', content);
            formData.set('tableOfContents', tableOfContents);
            
            // Add tags to formData
            // formData.set('tags', tags);
            selectedTags.forEach(tag => {
              formData.append('tags', tag);
            });
            
            // Add imageUrl to formData if it exists
            if (imageUrl) {
              formData.set('imageUrl', imageUrl);
            }

            const result = await updatePost(post.slug, formData);

            if (!result.success) {
              setError(result.error)
            } else {
              router.push('/blogs')
              router.refresh()
            }
          } catch (error) {
            setError('An error occurred while updating the post')
            console.error(error)
          }
        }}

        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'BUTTON') {
            e.preventDefault();
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label htmlFor="title" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Post Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={post.title}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                       bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2
                       focus:ring-2 focus:ring-primary3 dark:focus:ring-secondary4 focus:border-transparent"
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="openingParagraph" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Opening Paragraph
            </label>
            <textarea
              id="openingParagraph"
              name="openingParagraph"
              rows={3}
              defaultValue={post?.openingParagraph || ''}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                       bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2
                       focus:ring-2 focus:ring-primary3 dark:focus:ring-secondary4 focus:border-transparent"
              placeholder="Enter an engaging opening paragraph"
            />
          </div>
          <div className="col-span-full">
            <label htmlFor="tableOfContents" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Table of Contents
            </label>
            <div className="min-h-[400px]">
              <TiptapEditor 
                content={tableOfContents} 
                onChange={setTableOfContents}
                editable={true}
                placeholder="Table of contents..."
                />
              </div>
          </div>

          
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-primary3 dark:text-secondary3">
                Content
              </label>
              <button
                type="button"
                onClick={togglePreview}
                className="px-3 py-1 text-sm bg-primary3 dark:bg-secondary3 text-white rounded-md hover:opacity-90"
              >
                {showPreview ? 'Show Editor' : 'Show Preview'}
              </button>
            </div>

            <div className="border border-primary4 dark:border-secondary3 rounded-lg bg-white dark:bg-primary7">
              {showPreview ? (
                <div className="min-h-[400px] overflow-auto p-4">
                  <RichTextDisplay content={content} />
                </div>
              ) : (
                <div className="min-h-[400px]">
                  <TiptapEditor 
                    content={content} 
                    onChange={setContent}
                    editable={true}
                    placeholder="Write your post..."
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Post Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={post.type}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                       bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2"
            >
              {Object.values(Type).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="techCat" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Technical Writing Category
            </label>
            <select
              id="techCat"
              name="techCat"
              defaultValue={post.techCat || ''}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                       bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2"
            >
              <option value="">Select a category</option>
              {Object.values(TechWritingCategory).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="catName" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Category
            </label>
            <select
              id="catName"
              name="catName"  // Changed from "category" to "catName"
              defaultValue={post?.catName || ''}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                      bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category?.id} value={category?.catName}>
                  {category?.catName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-full">
            <label htmlFor="tags" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              onChange={handleTagChange}
              defaultValue={selectedTags.join(', ')}
              className="w-full px-4 py-2 border border-primary4 dark:border-secondary3 rounded-lg 
                        bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2"
              placeholder="Enter tags, separated by commas"
            />
            {selectedTags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedTags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-primary3/20 dark:bg-secondary3/20 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-full mb-4">
            <label className="block mb-1 font-medium text-primary3 dark:text-secondary3">
              Image
            </label>
            <div className="h-auto border-2 mt-4 border-dotted grid place-items-center bg-secondary3 rounded-md relative">
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
                    <>
                      <button 
                        onClick={handleOnClick} 
                        className="flex gap-2 p-2 bg-secondary3 dark:bg-primary6 rounded-lg"
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
                            <label htmlFor="imageCredit" className="block text-xs font-medium text-primary3 dark:text-secondary3 mb-1">
                              Image Credit (optional)
                            </label>
                            <input
                              type="text"
                              id="imageCredit"
                              name="imageCredit"
                              defaultValue={post.imageCredit || ''}
                              className="w-full px-3 py-1 text-sm border border-primary4 dark:border-secondary3 rounded-lg 
                                        bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2"
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
                    </>
                  );
                }}
              </CldUploadWidget>
            </div>
          </div>

          <div className="col-span-full">
            <label className="inline-flex items-center space-x-3">
              <input
                type="checkbox"
                name="published"
                value="true"
                defaultChecked={post.published}
                className="form-checkbox h-5 w-5 text-primary3 dark:text-secondary3 
                         border-primary4 dark:border-secondary3 rounded
                         focus:ring-2 focus:ring-primary3 dark:focus:ring-secondary4"
              />
              <span className="text-sm font-medium text-primary3 dark:text-secondary3">
                Publish immediately
              </span>
            </label>
          </div>

          <div className="col-span-full">
            <label className="inline-flex items-center space-x-3">
              <input
                type="checkbox"
                name="featured"
                value="true"
                defaultChecked={post.featured}
                className="form-checkbox h-5 w-5 text-primary3 dark:text-secondary3 
                         border-primary4 dark:border-secondary3 rounded
                         focus:ring-2 focus:ring-primary3 dark:focus:ring-secondary4"
              />
              <span className="text-sm font-medium text-primary3 dark:text-secondary3">
                Featured Post
              </span>
            </label>
          </div>
        </div>

        {error && (
          <div className="col-span-full p-3 bg-error/10 dark:bg-error/30 border border-error 
                         text-error rounded-lg mt-4">
            {error}
          </div>
        )}

        <div className="col-span-full mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-primary3 hover:bg-primary4/80 
                     dark:bg-secondary3 dark:hover:bg-secondary4/70
                     text-secondary2 dark:text-primary3 font-medium rounded-lg
                     transform transition duration-150 ease-in-out hover:cursor-pointer"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  )
}