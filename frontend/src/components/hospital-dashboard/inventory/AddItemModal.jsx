import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const AddItemModal = ({ isOpen, onClose, onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    description: "",
    stock: 0,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem(
      (prev) => ({ ...prev, [name]: name === "stock" ? Number.parseInt(value) : value })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem(newItem)
    setNewItem({ name: "", category: "", description: "", stock: 0 })
  }

  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newItem.name}
                onChange={handleChange}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                value={newItem.category}
                onChange={handleChange}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newItem.description}
                onChange={handleChange}
                className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={newItem.stock}
                onChange={handleChange}
                className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
            >Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>)
  );
}

export default AddItemModal

