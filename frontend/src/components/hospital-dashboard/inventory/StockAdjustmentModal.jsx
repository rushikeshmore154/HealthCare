"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

const StockAdjustmentModal = ({
    isOpen,
    onClose,
    onAdjustStock,
    item,
    adjustmentType,
}) => {
    const [amount, setAmount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdjustStock(amount);
        setAmount(0);
    };

    if (!item) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {adjustmentType === "increment"
                            ? "Increase"
                            : "Decrease"}{" "}
                        Stock
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(Number.parseInt(e.target.value))
                                }
                                min={1}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                        >
                            {adjustmentType === "increment"
                                ? "Increase"
                                : "Decrease"}{" "}
                            Stock
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default StockAdjustmentModal;
