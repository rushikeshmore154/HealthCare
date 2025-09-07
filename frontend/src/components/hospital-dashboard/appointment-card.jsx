"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

const AppointmentCard = ({ appointment, onConfirm, onCancel }) => {
    const { patientName, date, time, status } = appointment;

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{patientName}</span>
                    <span
                        className={`text-sm px-2 py-1 rounded-full ${
                            status === "pending"
                                ? "bg-yellow-200 text-yellow-800"
                                : status === "confirmed"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                        }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center mb-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{formatDate(date)}</span>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4" />
                    <span>{time}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                {status === "pending" && (
                    <>
                        <Button
                            onClick={() => onConfirm(appointment._id)}
                            variant="outline"
                            className="bg-green-500 text-white hover:bg-green-600"
                        >
                            Confirm
                        </Button>
                        <Button
                            onClick={() => onCancel(appointment._id)}
                            variant="outline"
                            className="bg-red-500 text-white hover:bg-red-600"
                        >
                            Cancel
                        </Button>
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

export default AppointmentCard;
