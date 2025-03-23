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
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Upload,
  FileWarning,
  CheckCircle,
  AlertCircle,
  FileX,
  RefreshCw,
} from "lucide-react";

interface ValidationError {
  field: string;
  message: string;
}

interface DataImporterProps {
  onImportComplete?: (data: any) => void;
  onValidationError?: (errors: ValidationError[]) => void;
}

const DataImporter = ({
  onImportComplete = () => {},
  onValidationError = () => {},
}: DataImporterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "validating" | "valid" | "invalid"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([
    { field: "NIS", message: "Format NIS tidak valid" },
    {
      field: "Tanggal Lahir",
      message: "Format tanggal tidak sesuai (YYYY-MM-DD)",
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValidationStatus("idle");
      setValidationErrors([]);
      setUploadProgress(0);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setValidationStatus("validating");

          // Simulate validation after upload completes
          setTimeout(() => {
            // For demo purposes, we'll randomly decide if validation passes or fails
            const isValid = Math.random() > 0.5;

            if (isValid) {
              setValidationStatus("valid");
              onImportComplete({
                success: true,
                message: "Data berhasil diimpor",
              });
            } else {
              setValidationStatus("invalid");
              setValidationErrors([
                { field: "NIS", message: "Format NIS tidak valid" },
                {
                  field: "Tanggal Lahir",
                  message: "Format tanggal tidak sesuai (YYYY-MM-DD)",
                },
              ]);
              onValidationError(validationErrors);
            }
          }, 1500);

          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleRetry = () => {
    setValidationStatus("idle");
    setValidationErrors([]);
    setUploadProgress(0);
  };

  const renderValidationStatus = () => {
    switch (validationStatus) {
      case "validating":
        return (
          <Alert className="bg-blue-50 border-blue-200">
            <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
            <AlertTitle>Memvalidasi Data</AlertTitle>
            <AlertDescription>
              Sedang memeriksa kesesuaian format data dengan Dapodik...
            </AlertDescription>
          </Alert>
        );
      case "valid":
        return (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle>Validasi Berhasil</AlertTitle>
            <AlertDescription>
              Data valid dan siap untuk diimpor ke dalam sistem.
            </AlertDescription>
          </Alert>
        );
      case "invalid":
        return (
          <>
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertTitle>Validasi Gagal</AlertTitle>
              <AlertDescription>
                Ditemukan beberapa kesalahan dalam file yang diunggah.
              </AlertDescription>
            </Alert>

            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-medium">Detail Kesalahan:</h4>
              {validationErrors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 p-2 bg-red-50 rounded-md"
                >
                  <FileX className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <span className="font-medium text-sm">{error.field}: </span>
                    <span className="text-sm">{error.message}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Impor Data dari Dapodik
        </CardTitle>
        <CardDescription>
          Unggah file ekspor dari Dapodik untuk mengimpor data ke dalam sistem.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
          {file ? (
            <div className="space-y-2">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
              >
                <FileWarning className="h-4 w-4 mr-1" />
                {file.name}
              </Badge>
              <p className="text-sm text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-center">
                <Upload className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">
                Klik untuk memilih atau seret file ke sini
              </p>
              <p className="text-xs text-gray-400">
                Format yang didukung: .xlsx, .csv
              </p>
            </div>
          )}

          <Input
            type="file"
            accept=".xlsx,.csv"
            className="hidden"
            id="file-upload"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="mt-4 inline-block">
            <Button variant="outline" type="button" className="cursor-pointer">
              Pilih File
            </Button>
          </label>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Mengunggah...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {renderValidationStatus()}
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between pt-4">
        {validationStatus === "valid" ? (
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => onImportComplete({ success: true })}
          >
            Impor Data
          </Button>
        ) : validationStatus === "invalid" ? (
          <Button
            variant="outline"
            className="text-red-600 border-red-200"
            onClick={handleRetry}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Coba Lagi
          </Button>
        ) : (
          <Button
            disabled={!file || isUploading}
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isUploading ? "Mengunggah..." : "Validasi File"}
          </Button>
        )}

        <Button variant="outline" disabled={isUploading}>
          Batal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DataImporter;
