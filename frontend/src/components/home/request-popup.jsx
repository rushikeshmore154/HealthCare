import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function RequestPopup({ hospitalId }) {
    const [contactInfo, setContactInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!contactInfo) {
            toast({
                title: "Please enter your contact information",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/request/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify({ hospitalId, contactInfo }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: data.message,
                    variant: "destructive",
                });
            }else{
                toast({
                    title: data.message,
                });
            }
        } catch (error) {
            toast({ title: "Something went wrong", variant: "destructive" });
        }
        setLoading(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-blue-400 text-white hover:bg-blue-600 transition-all">
                    Notify when available
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 border border-blue-200/50 shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-blue-400">
                        Get Notified When a Bed is Available
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Label className="text-sm font-medium ">
                        Contact Information
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter email or phone"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        className="w-full "
                    />
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-blue-400 text-white hover:bg-blue-600 transition-all"
                    >
                        {loading ? "Submitting..." : "Notify Me"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
