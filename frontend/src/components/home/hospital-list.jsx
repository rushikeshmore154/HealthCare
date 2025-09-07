import { useState, useEffect, useCallback } from "react";
import { Hospital as HospitalIcon } from "lucide-react";
import { HospitalCard } from "./hospital-card";
import HospitalFilters from "./hospital-filters";
import { Button } from "@/components/ui/button";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleHospitals, setVisibleHospitals] = useState(6);
  const [filters, setFilters] = useState({
    searchTerm: "",
    city: "",
    specialty: "",
    minBeds: 0,
    emergencyOnly: false,
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/hospital/getall"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch hospitals");
        }
        const data = await response.json();
        setHospitals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const allCities = [...new Set(hospitals.map((h) => h.city))];

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesCity = !filters.city || hospital.city === filters.city;
    const matchesBeds = hospital.availableBeds >= filters.minBeds;
    const matchesEmergency =
      !filters.emergencyOnly || hospital.emergencyAvailable;

    return matchesSearch && matchesCity && matchesBeds && matchesEmergency;
  });

  const handleViewDetails = useCallback((id) => {
    console.log("View details for hospital ID:", id);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <HospitalFilters
          cities={allCities}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {loading && <div className="text-center py-12">Loading hospitals...</div>}

      {error && <div className="text-center py-12 text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.slice(0, visibleHospitals).map((hospital) => (
              <HospitalCard
                key={hospital._id}
                hospital={hospital}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredHospitals.length > visibleHospitals && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setVisibleHospitals((prev) => prev + 6)}
                className="px-8"
              >
                Load More
              </Button>
            </div>
          )}

          {filteredHospitals.length === 0 && (
            <div className="text-center py-12">
              <HospitalIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No hospitals found matching your criteria
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
