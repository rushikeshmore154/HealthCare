import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Star, Phone, Clock } from "lucide-react";
import RequestPopup from "./request-popup.jsx";
import BookAppointmentPopup from "./appointment-popup.jsx";

export function HospitalCard({ hospital, onViewDetails }) {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                    <img
                        src={
                            hospital.image ||
                            "https://advinhealthcare.com/wp-content/uploads/2022/12/Types-of-Hospitals-2.jpg"
                        }
                        alt={hospital.name}
                        className="w-full h-48 object-cover"
                    />
                </CardHeader>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {hospital.name}
                                </h3>
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="ml-1 text-sm font-medium">
                                        {hospital.rating}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4 mr-1" />
                                {hospital.city}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-blue-600">
                                <Bed className="h-5 w-5 mr-1" />
                                <span className="font-medium">
                                    {hospital.availableBeds} beds
                                </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                                <Clock className="h-4 w-4 mr-1" />
                                <span className="text-sm">
                                    Wait: {hospital.waitingTime}
                                </span>
                            </div>
                        </div>

                        {hospital.contact && (
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-4 w-4 mr-1" />
                                {hospital.contact}
                            </div>
                        )}

                        {hospital.availableBeds > 0 ? (
                            <BookAppointmentPopup hospitalId={hospital._id} />
                        ) : (
                            <RequestPopup hospitalId={hospital._id} />
                        )}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
