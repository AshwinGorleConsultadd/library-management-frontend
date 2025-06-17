import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { BookType } from "@/types" // make sure to define this interface if not already
import { useEffect, useState } from "react"
import { toast } from "react-toastify"; 
import useDeleteBook from "@/hooks/book/useDeleteBook"


const DeleteBookDialog = ({ book, open, onClose }) => {
  const [isDialogOpen, setDialogOpen] = useState(open)
  const { handleDeleteBook, loading, data } = useDeleteBook()

  useEffect(() => {
    setDialogOpen(open)
  }, [open])

  useEffect(() => {
    if (data) {
      toast.success(`Book "${book.title}" deleted successfully!`)
      onClose()
    }
  }, [data])

  const handleConfirmDelete = () => {
    handleDeleteBook(book.id)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete the book titled <strong>{book.title}</strong>?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBookDialog
