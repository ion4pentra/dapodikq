export type User = {
  id: string;
  email: string;
  full_name?: string;
  role: "admin" | "teacher" | "staff";
  created_at: string;
  updated_at: string;
};

export type Student = {
  id: string;
  nis?: string;
  nisn?: string;
  full_name: string;
  gender?: "male" | "female";
  birth_date?: string;
  birth_place?: string;
  religion?: string;
  address?: string;
  parent_name?: string;
  parent_phone?: string;
  entry_year?: number;
  current_class?: string;
  status: "active" | "inactive" | "graduated" | "transferred";
  photo_url?: string;
  created_at: string;
  updated_at: string;
};

export type Class = {
  id: string;
  name: string;
  grade: number;
  academic_year: string;
  teacher_id?: string;
  created_at: string;
  updated_at: string;
};

export type StudentClass = {
  id: string;
  student_id: string;
  class_id: string;
  academic_year: string;
  created_at: string;
};

export type Attendance = {
  id: string;
  student_id: string;
  class_id: string;
  date: string;
  status: "present" | "absent" | "sick" | "permission";
  notes?: string;
  recorded_by?: string;
  created_at: string;
  updated_at: string;
};

export type SchoolInfo = {
  id: string;
  npsn?: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  principal_name?: string;
  established_year?: number;
  last_dapodik_sync?: string;
  created_at: string;
  updated_at: string;
};

export type Facility = {
  id: string;
  name: string;
  category?: "classroom" | "laboratory" | "library" | "office" | "other";
  condition?: "good" | "damaged" | "under_repair";
  quantity?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
};
