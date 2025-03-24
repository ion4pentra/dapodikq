import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface StudentFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  onSearch?: (query: string) => void;
}

interface FilterState {
  class: string;
  grade: string;
  status: string[];
  searchQuery: string;
}

const StudentFilters = ({
  onFilterChange = () => {},
  onSearch = () => {},
}: StudentFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    class: "all",
    grade: "all",
    status: [],
    searchQuery: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    setFilters((prev) => ({ ...prev, searchQuery }));
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    let newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Update active filters for display
    updateActiveFilters(key, value);
  };

  const updateActiveFilters = (key: keyof FilterState, value: any) => {
    if (
      (!value && value !== "all") ||
      (Array.isArray(value) && value.length === 0) ||
      value === "all"
    ) {
      setActiveFilters((prev) =>
        prev.filter((filter) => !filter.startsWith(key)),
      );
      return;
    }

    if (key === "status" && Array.isArray(value)) {
      // Remove any existing status filters
      const filtersWithoutStatus = activeFilters.filter(
        (filter) => !filter.startsWith("status:"),
      );

      // Add new status filters
      const newStatusFilters = value.map((status) => `status:${status}`);
      setActiveFilters([...filtersWithoutStatus, ...newStatusFilters]);
    } else {
      // For single value filters like class and grade
      const filterExists = activeFilters.some((filter) =>
        filter.startsWith(`${key}:`),
      );

      if (filterExists) {
        setActiveFilters((prev) => [
          ...prev.filter((filter) => !filter.startsWith(`${key}:`)),
          `${key}:${value}`,
        ]);
      } else {
        setActiveFilters((prev) => [...prev, `${key}:${value}`]);
      }
    }
  };

  const removeFilter = (filter: string) => {
    const [key, value] = filter.split(":");

    if (key === "status") {
      const newStatusFilters = filters.status.filter(
        (status) => status !== value,
      );
      handleFilterChange("status", newStatusFilters);
    } else if (key as keyof FilterState) {
      handleFilterChange(key as keyof FilterState, "");
    }

    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setFilters({
      class: "all",
      grade: "all",
      status: [],
      searchQuery: "",
    });
    setSearchQuery("");
    setActiveFilters([]);
    onFilterChange({
      class: "all",
      grade: "all",
      status: [],
      searchQuery: "",
    });
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Cari nama siswa, NISN, atau NIK..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute inset-y-0 right-0 px-3"
            onClick={handleSearchSubmit}
          >
            Cari
          </Button>
        </div>

        {/* Class Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filters.class}
            onValueChange={(value) => handleFilterChange("class", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              <SelectItem value="1A">1A</SelectItem>
              <SelectItem value="1B">1B</SelectItem>
              <SelectItem value="2A">2A</SelectItem>
              <SelectItem value="2B">2B</SelectItem>
              <SelectItem value="3A">3A</SelectItem>
              <SelectItem value="3B">3B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grade Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filters.grade}
            onValueChange={(value) => handleFilterChange("grade", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tingkat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tingkat</SelectItem>
              <SelectItem value="1">Kelas 1</SelectItem>
              <SelectItem value="2">Kelas 2</SelectItem>
              <SelectItem value="3">Kelas 3</SelectItem>
              <SelectItem value="4">Kelas 4</SelectItem>
              <SelectItem value="5">Kelas 5</SelectItem>
              <SelectItem value="6">Kelas 6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto flex justify-between items-center"
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>Status</span>
              </div>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-4">
            <div className="space-y-4">
              <h4 className="font-medium">Status Siswa</h4>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-active"
                    checked={filters.status.includes("aktif")}
                    onCheckedChange={(checked) => {
                      const newStatus = checked
                        ? [...filters.status, "aktif"]
                        : filters.status.filter((s) => s !== "aktif");
                      handleFilterChange("status", newStatus);
                    }}
                  />
                  <Label htmlFor="status-active">Aktif</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-inactive"
                    checked={filters.status.includes("nonaktif")}
                    onCheckedChange={(checked) => {
                      const newStatus = checked
                        ? [...filters.status, "nonaktif"]
                        : filters.status.filter((s) => s !== "nonaktif");
                      handleFilterChange("status", newStatus);
                    }}
                  />
                  <Label htmlFor="status-inactive">Nonaktif</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-graduated"
                    checked={filters.status.includes("lulus")}
                    onCheckedChange={(checked) => {
                      const newStatus = checked
                        ? [...filters.status, "lulus"]
                        : filters.status.filter((s) => s !== "lulus");
                      handleFilterChange("status", newStatus);
                    }}
                  />
                  <Label htmlFor="status-graduated">Lulus</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="status-transferred"
                    checked={filters.status.includes("pindah")}
                    onCheckedChange={(checked) => {
                      const newStatus = checked
                        ? [...filters.status, "pindah"]
                        : filters.status.filter((s) => s !== "pindah");
                      handleFilterChange("status", newStatus);
                    }}
                  />
                  <Label htmlFor="status-transferred">Pindah</Label>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filter aktif:</span>
          {activeFilters.map((filter) => {
            const [key, value] = filter.split(":");
            let displayText = "";

            switch (key) {
              case "class":
                displayText = `Kelas: ${value}`;
                break;
              case "grade":
                displayText = `Tingkat: ${value}`;
                break;
              case "status":
                displayText = `Status: ${value.charAt(0).toUpperCase() + value.slice(1)}`;
                break;
              default:
                displayText = filter;
            }

            return (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {displayText}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-gray-500"
            onClick={clearAllFilters}
          >
            Hapus semua
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentFilters;
