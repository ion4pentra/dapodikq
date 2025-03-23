import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Save,
  UserPlus,
} from "lucide-react";
import { Progress } from "../ui/progress";

// Form schema for validation
const studentSchema = z.object({
  // Personal Information
  nisn: z.string().min(10, { message: "NISN harus 10 digit" }).max(10),
  nik: z.string().min(16, { message: "NIK harus 16 digit" }).max(16),
  fullName: z.string().min(3, { message: "Nama lengkap wajib diisi" }),
  gender: z.enum(["male", "female"]),
  birthPlace: z.string().min(2, { message: "Tempat lahir wajib diisi" }),
  birthDate: z.date(),
  religion: z.string().min(1, { message: "Agama wajib diisi" }),
  address: z.string().min(5, { message: "Alamat wajib diisi" }),
  phone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .optional()
    .or(z.literal("")),

  // Parent Information
  fatherName: z.string().min(3, { message: "Nama ayah wajib diisi" }),
  fatherOccupation: z
    .string()
    .min(2, { message: "Pekerjaan ayah wajib diisi" }),
  fatherPhone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  motherName: z.string().min(3, { message: "Nama ibu wajib diisi" }),
  motherOccupation: z.string().min(2, { message: "Pekerjaan ibu wajib diisi" }),
  motherPhone: z.string().min(10, { message: "Nomor telepon tidak valid" }),
  guardianName: z.string().optional(),
  guardianRelation: z.string().optional(),
  guardianPhone: z.string().optional(),

  // Academic Information
  entryYear: z.string().min(4, { message: "Tahun masuk wajib diisi" }),
  grade: z.string().min(1, { message: "Kelas wajib diisi" }),
  previousSchool: z.string().optional(),
  healthIssues: z.string().optional(),
  specialNeeds: z.boolean().default(false),
  specialNeedsDetails: z.string().optional(),
  extracurricular: z.array(z.string()).optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface RegistrationFormProps {
  onSubmit?: (data: StudentFormValues) => void;
  initialData?: Partial<StudentFormValues>;
}

const RegistrationForm = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  initialData = {},
}: RegistrationFormProps) => {
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<Date | undefined>(
    initialData.birthDate || undefined,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      ...initialData,
      gender: initialData.gender || "male",
      specialNeeds: initialData.specialNeeds || false,
      extracurricular: initialData.extracurricular || [],
    },
  });

  const specialNeeds = watch("specialNeeds");

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitForm = (data: StudentFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Formulir Pendaftaran Siswa
        </h1>
        <p className="text-gray-600">
          Silakan lengkapi formulir berikut dengan informasi yang akurat
        </p>
      </div>

      <div className="mb-8">
        <Progress value={progress} className="h-2 w-full" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className={`${step >= 1 ? "font-medium text-primary" : ""}`}>
            Informasi Pribadi
          </span>
          <span className={`${step >= 2 ? "font-medium text-primary" : ""}`}>
            Informasi Orang Tua/Wali
          </span>
          <span className={`${step >= 3 ? "font-medium text-primary" : ""}`}>
            Informasi Akademik
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(submitForm)}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Informasi Pribadi Siswa</CardTitle>
              <CardDescription>
                Masukkan data pribadi siswa dengan lengkap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nisn">
                    NISN <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nisn"
                    placeholder="Nomor Induk Siswa Nasional"
                    {...register("nisn")}
                    className={errors.nisn ? "border-red-500" : ""}
                  />
                  {errors.nisn && (
                    <p className="text-red-500 text-xs">
                      {errors.nisn.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nik">
                    NIK <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nik"
                    placeholder="Nomor Induk Kependudukan"
                    {...register("nik")}
                    className={errors.nik ? "border-red-500" : ""}
                  />
                  {errors.nik && (
                    <p className="text-red-500 text-xs">{errors.nik.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Nama Lengkap <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Nama lengkap siswa"
                  {...register("fullName")}
                  className={errors.fullName ? "border-red-500" : ""}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>
                  Jenis Kelamin <span className="text-red-500">*</span>
                </Label>
                <RadioGroup
                  defaultValue={initialData.gender || "male"}
                  onValueChange={(value) =>
                    setValue("gender", value as "male" | "female")
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Laki-laki</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Perempuan</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthPlace">
                    Tempat Lahir <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="birthPlace"
                    placeholder="Tempat lahir"
                    {...register("birthPlace")}
                    className={errors.birthPlace ? "border-red-500" : ""}
                  />
                  {errors.birthPlace && (
                    <p className="text-red-500 text-xs">
                      {errors.birthPlace.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthDate">
                    Tanggal Lahir <span className="text-red-500">*</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${errors.birthDate ? "border-red-500" : ""}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "dd MMMM yyyy")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          setValue("birthDate", date as Date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.birthDate && (
                    <p className="text-red-500 text-xs">
                      {errors.birthDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="religion">
                  Agama <span className="text-red-500">*</span>
                </Label>
                <Select
                  defaultValue={initialData.religion || ""}
                  onValueChange={(value) => setValue("religion", value)}
                >
                  <SelectTrigger
                    className={errors.religion ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="islam">Islam</SelectItem>
                    <SelectItem value="kristen">Kristen</SelectItem>
                    <SelectItem value="katolik">Katolik</SelectItem>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="buddha">Buddha</SelectItem>
                    <SelectItem value="konghucu">Konghucu</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                {errors.religion && (
                  <p className="text-red-500 text-xs">
                    {errors.religion.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Alamat <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="address"
                  placeholder="Alamat lengkap"
                  {...register("address")}
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Nomor telepon"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email (opsional)"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Parent Information */}
        {step === 2 && (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Informasi Orang Tua/Wali</CardTitle>
              <CardDescription>
                Masukkan data orang tua atau wali siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Ayah</h3>
                <div className="space-y-2">
                  <Label htmlFor="fatherName">
                    Nama Ayah <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fatherName"
                    placeholder="Nama lengkap ayah"
                    {...register("fatherName")}
                    className={errors.fatherName ? "border-red-500" : ""}
                  />
                  {errors.fatherName && (
                    <p className="text-red-500 text-xs">
                      {errors.fatherName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherOccupation">
                      Pekerjaan Ayah <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fatherOccupation"
                      placeholder="Pekerjaan ayah"
                      {...register("fatherOccupation")}
                      className={
                        errors.fatherOccupation ? "border-red-500" : ""
                      }
                    />
                    {errors.fatherOccupation && (
                      <p className="text-red-500 text-xs">
                        {errors.fatherOccupation.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherPhone">
                      Nomor Telepon Ayah <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fatherPhone"
                      placeholder="Nomor telepon ayah"
                      {...register("fatherPhone")}
                      className={errors.fatherPhone ? "border-red-500" : ""}
                    />
                    {errors.fatherPhone && (
                      <p className="text-red-500 text-xs">
                        {errors.fatherPhone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Ibu</h3>
                <div className="space-y-2">
                  <Label htmlFor="motherName">
                    Nama Ibu <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="motherName"
                    placeholder="Nama lengkap ibu"
                    {...register("motherName")}
                    className={errors.motherName ? "border-red-500" : ""}
                  />
                  {errors.motherName && (
                    <p className="text-red-500 text-xs">
                      {errors.motherName.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motherOccupation">
                      Pekerjaan Ibu <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="motherOccupation"
                      placeholder="Pekerjaan ibu"
                      {...register("motherOccupation")}
                      className={
                        errors.motherOccupation ? "border-red-500" : ""
                      }
                    />
                    {errors.motherOccupation && (
                      <p className="text-red-500 text-xs">
                        {errors.motherOccupation.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherPhone">
                      Nomor Telepon Ibu <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="motherPhone"
                      placeholder="Nomor telepon ibu"
                      {...register("motherPhone")}
                      className={errors.motherPhone ? "border-red-500" : ""}
                    />
                    {errors.motherPhone && (
                      <p className="text-red-500 text-xs">
                        {errors.motherPhone.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">Data Wali (Opsional)</h3>
                  <span className="text-sm text-gray-500">
                    Diisi jika siswa tinggal dengan wali
                  </span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardianName">Nama Wali</Label>
                  <Input
                    id="guardianName"
                    placeholder="Nama lengkap wali"
                    {...register("guardianName")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guardianRelation">
                      Hubungan dengan Siswa
                    </Label>
                    <Input
                      id="guardianRelation"
                      placeholder="Contoh: Paman, Bibi, dll"
                      {...register("guardianRelation")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guardianPhone">Nomor Telepon Wali</Label>
                    <Input
                      id="guardianPhone"
                      placeholder="Nomor telepon wali"
                      {...register("guardianPhone")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Academic Information */}
        {step === 3 && (
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>Informasi Akademik</CardTitle>
              <CardDescription>
                Masukkan data akademik dan informasi tambahan siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entryYear">
                    Tahun Masuk <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="entryYear"
                    placeholder="Contoh: 2023"
                    {...register("entryYear")}
                    className={errors.entryYear ? "border-red-500" : ""}
                  />
                  {errors.entryYear && (
                    <p className="text-red-500 text-xs">
                      {errors.entryYear.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">
                    Kelas <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    defaultValue={initialData.grade || ""}
                    onValueChange={(value) => setValue("grade", value)}
                  >
                    <SelectTrigger
                      className={errors.grade ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Kelas 1</SelectItem>
                      <SelectItem value="2">Kelas 2</SelectItem>
                      <SelectItem value="3">Kelas 3</SelectItem>
                      <SelectItem value="4">Kelas 4</SelectItem>
                      <SelectItem value="5">Kelas 5</SelectItem>
                      <SelectItem value="6">Kelas 6</SelectItem>
                      <SelectItem value="7">Kelas 7</SelectItem>
                      <SelectItem value="8">Kelas 8</SelectItem>
                      <SelectItem value="9">Kelas 9</SelectItem>
                      <SelectItem value="10">Kelas 10</SelectItem>
                      <SelectItem value="11">Kelas 11</SelectItem>
                      <SelectItem value="12">Kelas 12</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.grade && (
                    <p className="text-red-500 text-xs">
                      {errors.grade.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousSchool">Asal Sekolah Sebelumnya</Label>
                <Input
                  id="previousSchool"
                  placeholder="Nama sekolah sebelumnya (jika ada)"
                  {...register("previousSchool")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthIssues">Riwayat Kesehatan</Label>
                <Textarea
                  id="healthIssues"
                  placeholder="Riwayat penyakit atau kondisi kesehatan khusus (jika ada)"
                  {...register("healthIssues")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="specialNeeds"
                    checked={specialNeeds}
                    onCheckedChange={(checked) => {
                      setValue("specialNeeds", checked as boolean);
                    }}
                  />
                  <Label htmlFor="specialNeeds">
                    Siswa Berkebutuhan Khusus
                  </Label>
                </div>
                {specialNeeds && (
                  <Textarea
                    id="specialNeedsDetails"
                    placeholder="Jelaskan kebutuhan khusus siswa"
                    {...register("specialNeedsDetails")}
                    className="mt-2"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label>Ekstrakurikuler yang Diminati</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Pramuka",
                    "PMR",
                    "Paskibra",
                    "Basket",
                    "Futsal",
                    "Voli",
                    "Paduan Suara",
                    "Seni Tari",
                    "Robotik",
                    "Jurnalistik",
                    "English Club",
                    "Karate",
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`extracurricular-${item}`}
                        onCheckedChange={(checked) => {
                          const currentValues = watch("extracurricular") || [];
                          if (checked) {
                            setValue("extracurricular", [
                              ...currentValues,
                              item,
                            ]);
                          } else {
                            setValue(
                              "extracurricular",
                              currentValues.filter((value) => value !== item),
                            );
                          }
                        }}
                        checked={(watch("extracurricular") || []).includes(
                          item,
                        )}
                      />
                      <Label htmlFor={`extracurricular-${item}`}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Sebelumnya
            </Button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <Button type="button" onClick={handleNext}>
              Selanjutnya <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Simpan Data
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
