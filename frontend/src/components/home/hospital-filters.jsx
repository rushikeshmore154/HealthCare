import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function HospitalFilters({ cities, filters, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (key, value) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <Input
                        placeholder="Search hospitals..."
                        value={filters.searchTerm}
                        onChange={(e) =>
                            handleFilterChange("searchTerm", e.target.value)
                        }
                        className="w-full"
                    />
                </div>
                <div className="flex gap-2">
                    <Select
                        value={filters.city}
                        onValueChange={(value) =>
                            handleFilterChange("city", value)
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.length > 0 ? (
                                cities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                        {city}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem disabled>
                                    No cities available
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <SlidersHorizontal className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filters</SheetTitle>
                                <SheetDescription>
                                    Refine your hospital search
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Minimum Beds Available</Label>
                                    <Slider
                                        min={0}
                                        max={50}
                                        step={1}
                                        value={[filters.minBeds]}
                                        onValueChange={([value]) =>
                                            handleFilterChange("minBeds", value)
                                        }
                                        className="py-4"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        {filters.minBeds} Beds
                                    </span>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
}
