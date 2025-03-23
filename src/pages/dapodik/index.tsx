import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import DataExporter from "@/components/dapodik/DataExporter";
import DataImporter from "@/components/dapodik/DataImporter";
import DashboardLayout from "@/components/layout/DashboardLayout";

const DapodikPage = () => {
  const [exportStatus, setExportStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (categories: string[]) => {
    setIsExporting(true);
    setExportStatus("loading");
    setExportProgress(0);

    // Simulate export process
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportStatus("success");
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleImportComplete = (data: any) => {
    console.log("Import completed:", data);
    // Handle import completion logic here
  };

  const handleValidationError = (errors: any[]) => {
    console.log("Validation errors:", errors);
    // Handle validation errors here
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 bg-gray-50">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Integrasi Dapodik
          </h1>
          <p className="text-muted-foreground">
            Kelola ekspor dan impor data sekolah ke sistem Dapodik
          </p>
        </div>

        <Alert className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-500" />
          <AlertTitle>Informasi Sinkronisasi</AlertTitle>
          <AlertDescription>
            Pastikan data yang diekspor atau diimpor telah sesuai dengan format
            Dapodik terbaru. Sinkronisasi terakhir:{" "}
            <span className="font-medium">12 Juni 2023, 14:30 WIB</span>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="export">Ekspor Data</TabsTrigger>
            <TabsTrigger value="import">Impor Data</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DataExporter
                  onExport={handleExport}
                  isLoading={isExporting}
                  exportProgress={exportProgress}
                  exportStatus={exportStatus}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Panduan Ekspor Data</CardTitle>
                  <CardDescription>
                    Langkah-langkah untuk mengekspor data ke format Dapodik
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Pilih kategori data yang ingin diekspor</li>
                    <li>Klik tombol "Ekspor Data" untuk memulai proses</li>
                    <li>Tunggu hingga proses ekspor selesai</li>
                    <li>Unduh file hasil ekspor</li>
                    <li>Impor file ke sistem Dapodik resmi</li>
                  </ol>

                  <Separator className="my-4" />

                  <div className="text-sm">
                    <h4 className="font-medium mb-2">
                      Format Data yang Didukung:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Excel (.xlsx)</li>
                      <li>CSV (.csv)</li>
                      <li>XML Dapodik (.xml)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="import" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <DataImporter
                  onImportComplete={handleImportComplete}
                  onValidationError={handleValidationError}
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Panduan Impor Data</CardTitle>
                  <CardDescription>
                    Langkah-langkah untuk mengimpor data dari Dapodik
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Ekspor data dari sistem Dapodik resmi</li>
                    <li>Pilih file yang akan diimpor</li>
                    <li>Klik tombol "Validasi File" untuk memeriksa format</li>
                    <li>Jika valid, klik "Impor Data" untuk memulai proses</li>
                    <li>Tunggu hingga proses impor selesai</li>
                  </ol>

                  <Separator className="my-4" />

                  <div className="bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                    <p className="font-medium">Perhatian:</p>
                    <p className="mt-1">
                      Impor data akan menimpa data yang sudah ada. Pastikan
                      untuk membuat cadangan data sebelum melakukan impor.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DapodikPage;
