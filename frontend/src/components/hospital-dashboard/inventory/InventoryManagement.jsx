"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import AddItemModal from "./AddItemModal";
import UpdateItemModal from "./UpdateItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import StockAdjustmentModal from "./StockAdjustmentModal";
import { useToast } from "@/hooks/use-toast";

const InventoryManagement = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isStockAdjustModalOpen, setIsStockAdjustModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [stockAdjustmentType, setStockAdjustmentType] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/items/all",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch items");
            const data = await response.json();
            setItems(data.items);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch inventory items",
                variant: "destructive",
            });
        }
    };

    const handleAddItem = async (newItem) => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/items/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify(newItem),
                }
            );
            if (!response.ok) throw new Error("Failed to add item");
            await fetchItems();
            setIsAddModalOpen(false);
            toast({
                title: "Success",
                description: "Item added successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to add item",
                variant: "destructive",
            });
        }
    };

    const handleUpdateItem = async (updatedItem) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/items/update/${selectedItem._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify(updatedItem),
                }
            );
            if (!response.ok) throw new Error("Failed to update item");
            await fetchItems();
            setIsUpdateModalOpen(false);
            toast({
                title: "Success",
                description: "Item updated successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update item",
                variant: "destructive",
            });
        }
    };

    const handleDeleteItem = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/items/delete/${selectedItem._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to delete item");
            await fetchItems();
            setIsDeleteModalOpen(false);
            toast({
                title: "Success",
                description: "Item deleted successfully",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete item",
                variant: "destructive",
            });
        }
    };

    const handleStockAdjustment = async (amount) => {
        try {
            const endpoint =
                stockAdjustmentType === "increment" ? "increment" : "decrement";
            const response = await fetch(
                `http://localhost:5000/api/items/${endpoint}/${selectedItem._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify({ amount }),
                }
            );
            if (!response.ok)
                throw new Error(`Failed to ${stockAdjustmentType} stock`);
            await fetchItems();
            setIsStockAdjustModalOpen(false);
            toast({
                title: "Success",
                description: `Stock ${stockAdjustmentType}ed successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to ${stockAdjustmentType} stock`,
                variant: "destructive",
            });
        }
    };

    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <div className="flex justify-between items-center mb-4">
                <Input
                    type="text"
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Button
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add New Item
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredItems.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.stock}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsUpdateModalOpen(true);
                                    }}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsDeleteModalOpen(true);
                                    }}
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setStockAdjustmentType("increment");
                                        setIsStockAdjustModalOpen(true);
                                    }}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setStockAdjustmentType("decrement");
                                        setIsStockAdjustModalOpen(true);
                                    }}
                                >
                                    -
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddItemModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddItem={handleAddItem}
            />
            <UpdateItemModal
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                onUpdateItem={handleUpdateItem}
                item={selectedItem}
            />
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteItem}
                itemName={selectedItem?.name}
            />
            <StockAdjustmentModal
                isOpen={isStockAdjustModalOpen}
                onClose={() => setIsStockAdjustModalOpen(false)}
                onAdjustStock={handleStockAdjustment}
                item={selectedItem}
                adjustmentType={stockAdjustmentType}
            />
        </div>
    );
};

export default InventoryManagement;
