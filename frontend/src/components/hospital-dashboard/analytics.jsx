import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "@/services/axios";

export default function Analytics() {
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const fetchPrediction = async () => {
    if (!selectedDate) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:4000/api/hospital/predict-patients?date=${selectedDate}`
      );

      const data = res.data;
      setPrediction({
        opd: data.opd_patients,
        emergency: data.emergency_patients,
      });
    } catch (error) {
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Patient Prediction
      </h2>

      {/* Date Picker */}
      <div className="flex items-center justify-center gap-4">
        <div className="relative">
          <Input
            type="date"
            className="pr-10"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <CalendarIcon
            className="absolute right-2 top-2.5 text-gray-500"
            size={18}
          />
        </div>

        <Button
          onClick={fetchPrediction}
          disabled={!selectedDate || loading}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {loading ? "Predicting..." : "Get Prediction"}
        </Button>
      </div>

      {/* Prediction Result */}
      {prediction && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              Prediction for {format(new Date(selectedDate), "PPP")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-lg font-semibold">
            <p>🛑 OPD Patients: {prediction.opd}</p>
            <p>🚨 Emergency Patients: {prediction.emergency}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
