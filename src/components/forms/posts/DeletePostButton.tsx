'use client'

import { useState } from 'react'
import { deletePost } from '@/lib/actions/posts'
import { useRouter } from 'next/navigation'
import { TrashIcon } from '@heroicons/react/24/outline'

export default function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deletePost(slug)
      if (result.success) {
        router.push('/blogs')
        router.refresh()
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert('Failed to delete post')
    } finally {
      setIsDeleting(false)
      setShowConfirmation(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="inline-flex items-center px-4 py-2 bg-error/10 dark:bg-error/30 
                   text-error rounded-md hover:bg-error/20 dark:hover:bg-error/40 
                   transition-colors duration-200"
        disabled={isDeleting}
      >
        <TrashIcon className="w-5 h-5 mr-2" />
        Delete Post
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-lightblue dark:bg-primary1 p-6 rounded-lg shadow-xl max-w-md mx-4">
            <h3 className="text-lg font-medium text-primary3 dark:text-secondary3 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-primary4 dark:text-secondary4 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-primary3 dark:text-secondary3 
                         hover:bg-primary4/10 dark:hover:bg-secondary4/10 rounded-md"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-error text-white rounded-md 
                         hover:bg-error/80 transition-colors duration-200"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}