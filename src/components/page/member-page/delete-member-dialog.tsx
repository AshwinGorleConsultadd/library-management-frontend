import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import useDeleteMember from "@/hooks/member/useDeleteMember"
import { toast } from "react-toastify"

const DeleteMemberDialog = ({ member, open, onClose }) => {
  const { handleDeleteMember, loading, data } = useDeleteMember()
  const [isDialogOpen, setIsDialogOpen] = useState(open)

  useEffect(() => {
    setIsDialogOpen(open)
  }, [open])

  useEffect(() => {
    if (data) {
      toast.success(`Member "${member.name}" deleted successfully!`)
      onClose()
    }
  }, [data])

  const handleConfirmDelete = () => {
    handleDeleteMember(member.id)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to delete <strong>{member.name}</strong>?
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

export default DeleteMemberDialog
