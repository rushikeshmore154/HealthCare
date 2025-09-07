import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete the item "{itemName}"?</p>
        <DialogFooter>
          <Button variant="outline" 
            className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
            onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>)
  );
}

export default DeleteConfirmationModal

