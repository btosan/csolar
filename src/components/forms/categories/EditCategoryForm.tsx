'use client'

import { updateCategory } from '@/lib/actions/categories'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Category } from '@prisma/client'

interface EditCategoryFormProps {
  category: Category
}

export default function EditCategoryForm({ category }: EditCategoryFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary3 dark:text-secondary2">
          Edit Category
        </h1>
        <p className="mt-2 text-primary4 dark:text-secondary3">
          Update category details
        </p>
      </div>

      <form 
        className="space-y-6 bg-lightblue dark:bg-primary1 rounded-xl shadow-lg p-6"
        action={async (formData: FormData) => {
          const result = await updateCategory(category.id, {
            catName: formData.get('catName') as string,
            postIDs: formData.get('postIDs') as string || undefined
          })

          if (!result.success) {
            setError(result.error)
          } else {
            router.push('/categories')
            router.refresh()
          }
        }}
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="catName" className="block text-sm font-medium text-primary3 dark:text-secondary3 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="catName"
              name="catName"
              required
              defaultValue={category.catName || ''}
              className="w-full px-4 py-2 border border-primary4/20 dark:border-secondary3/10 rounded-lg 
                       bg-lightblue2 dark:bg-primary7 text-primary1 dark:text-secondary2
                        focus:ring-primary3 dark:focus:ring-secondary4 focus:border-none focus:outline-0"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-error/10 dark:bg-error/30 border border-error 
                         text-error rounded-lg mt-4">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-primary3 hover:bg-primary4/80 
                     dark:bg-secondary3 dark:hover:bg-secondary4/70
                     text-secondary2 dark:text-primary3 font-medium rounded-lg
                     transform transition duration-150 ease-in-out hover:cursor-pointer"
          >
            Update Category
          </button>
        </div>
      </form>
    </div>
  )
}