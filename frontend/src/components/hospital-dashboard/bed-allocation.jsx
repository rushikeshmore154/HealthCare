import { useEffect, useState } from "react";
import { Bed, Plus, Minus } from "lucide-react";
import axios from "@/services/axios"; // Add this import

export default function BedAllocation() {
  const [totalBeds, setTotalBeds] = useState(0);
  const [allocatedBeds, setAllocatedBeds] = useState(0);

  const getAvailableBeds = async () => {
    try {
      const res = await axios.get("/hospital/get-availablity");
      const data = res.data;
      setTotalBeds(data.totalBeds);
      setAllocatedBeds(data.occupiedBeds);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBedCount = async (type) => {
    try {
      const res = await axios.post(`/hospital/${type}-availablity`);
      if (res.status === 200) {
        setAllocatedBeds((prev) =>
          type === "decrement" ? prev + 1 : Math.max(0, prev - 1)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAvailableBeds();
  }, []);

  return (
    <div className="bg-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Hospital Bed Allocation
      </h2>
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <button
          onClick={() => updateBedCount("decrement")}
          className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
        >
          <Minus size={16} />
          Allocated
        </button>
        <button
          onClick={() => updateBedCount("increment")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
        >
          <Plus size={16} />
          Deallocated
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Allocated Beds: {allocatedBeds} / {totalBeds}
        </h3>

        {/* Bed Visualization */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:12 gap-2 p-4 bg-white rounded-lg">
          {Array.from({ length: totalBeds }).map((_, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg ${
                index <= allocatedBeds
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              <Bed size={16} />
            </div>
          ))}
        </div>

        {/* Control Buttons */}
      </div>
    </div>
  );
}
