import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { Download, FileDown, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";

interface DataExporterProps {
  onExport?: (categories: string[]) => Promise<void>;
  isLoading?: boolean;
  exportProgress?: number;
  exportStatus?: "idle" | "loading" | "success" | "error";
}

const DataExporter = ({
  onExport = async () => {},
  isLoading = false,
  exportProgress = 0,
  exportStatus = "idle",
}: DataExporterProps) => {
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "students",
    "teachers",
    "staff",
    "facilities",
  ]);

  const dataCategories = [
    { id: "students", label: "Data Siswa" },
    { id: "teachers", label: "Data Guru" },
    { id: "staff", label: "Data Staf" },
    { id: "facilities", label: "Data Fasilitas" },
    { id: "attendance", label: "Data Absensi" },
    { id: "grades", label: "Data Nilai" },
  ];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === dataCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(dataCategories.map((cat) => cat.id));
    }
  };

  const handleExport = async () => {
    if (selectedCategories.length === 0) {
      toast({
        title: "Pilih kategori data",
        description: "Silakan pilih minimal satu kategori data untuk diekspor",
        variant: "destructive",
      });
      return;
    }

    try {
      await onExport(selectedCategories);
      if (exportStatus !== "loading" && exportStatus !== "error") {
        toast({
          title: "Ekspor berhasil",
          description: `Data ${selectedCategories.length} kategori telah berhasil diekspor ke format Dapodik`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Ekspor gagal",
        description:
          "Terjadi kesalahan saat mengekspor data. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">
          Ekspor Data ke Dapodik
        </CardTitle>
        <CardDescription className="text-gray-600">
          Pilih kategori data yang ingin diekspor ke format Dapodik
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-sm"
            >
              {selectedCategories.length === dataCategories.length
                ? "Batalkan Semua"
                : "Pilih Semua"}
            </Button>
            <span className="text-sm text-gray-500">
              {selectedCategories.length} dari {dataCategories.length} dipilih
            </span>
          </div>

          <Separator className="my-2" />

          <div className="space-y-3">
            {dataCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={category.id} className="flex-1 cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>

          {exportStatus === "loading" && (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mengekspor data...</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}

          {exportStatus === "success" && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span>Ekspor data berhasil diselesaikan!</span>
            </div>
          )}

          {exportStatus === "error" && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>Terjadi kesalahan saat mengekspor data.</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" disabled={isLoading}>
          Batal
        </Button>
        <Button
          onClick={handleExport}
          disabled={isLoading || selectedCategories.length === 0}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <span>Mengekspor...</span>
          ) : (
            <>
              <FileDown className="h-4 w-4" />
              <span>Ekspor Data</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataExporter;
