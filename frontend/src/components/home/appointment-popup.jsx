import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router";

export default function BookAppointmentPopup({ hospitalId }) {
    const navigate = useNavigate();
    const [patientName, setPatientName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    // Get current date in YYYY-MM-DD format
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    };

    // Get current time in HH:MM format
    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5); // Extract HH:MM
    };

    // Ensure time is in future if the selected date is today
    useEffect(() => {
        if (date === getCurrentDate() && time < getCurrentTime()) {
            setTime(getCurrentTime());
        }
    }, [date, time]);

    const handleSubmit = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/auth/login");
            toast({
                title: "Please login to book an appointment",
                variant: "destructive",
            })
            return;
        }
        if (!patientName || !date || !time) {
            toast({
                title: "All fields are required",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/appointment/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("authToken")}`,
                    },
                    body: JSON.stringify({
                        hospitalId,
                        patientName,
                        date,
                        time,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                toast({
                    title: data.message,
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Appointment booked successfully!",
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
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-all">
                    Book Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 border border-blue-200/50 shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-blue-500">
                        Book an Appointment
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium">
                            Patient Name
                        </Label>
                        <Input
                            type="text"
                            placeholder="Enter patient name"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Date</Label>
                        <Input
                            type="date"
                            value={date}
                            min={getCurrentDate()} // 🔹 Restrict to future dates
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium">Time</Label>
                        <Input
                            type="time"
                            value={time}
                            min={
                                date === getCurrentDate()
                                    ? getCurrentTime()
                                    : undefined
                            } // 🔹 Restrict time if date is today
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white hover:bg-blue-600 transition-all"
                    >
                        {loading ? "Booking..." : "Confirm Appointment"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
