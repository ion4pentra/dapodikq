import { supabase } from "./supabase";
import type {
  User,
  Student,
  Class,
  StudentClass,
  Attendance,
  SchoolInfo,
  Facility,
} from "../types/schema";

// User API
export const userApi = {
  // Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    return data as User | null;
  },

  // Get all users
  getUsers: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as User[];
  },

  // Get user by ID
  getUserById: async (id: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as User;
  },

  // Create user
  createUser: async (
    email: string,
    password: string,
    userData: Partial<User>,
  ) => {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("Failed to create user");

    // Create user profile
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user.id,
          email,
          ...userData,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>) => {
    const { data, error } = await supabase
      .from("users")
      .update(userData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  // Delete user
  deleteUser: async (id: string) => {
    // This will cascade delete the user from auth.users as well
    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

// Student API
export const studentApi = {
  // Get all students
  getStudents: async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) throw error;
    return data as Student[];
  },

  // Get student by ID
  getStudentById: async (id: string) => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Create student
  createStudent: async (
    studentData: Omit<Student, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("students")
      .insert([studentData])
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Update student
  updateStudent: async (id: string, studentData: Partial<Student>) => {
    const { data, error } = await supabase
      .from("students")
      .update(studentData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Student;
  },

  // Delete student
  deleteStudent: async (id: string) => {
    const { error } = await supabase.from("students").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  // Search students
  searchStudents: async (query: string) => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .or(
        `full_name.ilike.%${query}%,nis.ilike.%${query}%,nisn.ilike.%${query}%`,
      )
      .order("full_name", { ascending: true });

    if (error) throw error;
    return data as Student[];
  },

  // Filter students
  filterStudents: async (filters: { [key: string]: any }) => {
    let query = supabase.from("students").select("*");

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query = query.eq(key, value);
      }
    });

    const { data, error } = await query.order("full_name", { ascending: true });

    if (error) throw error;
    return data as Student[];
  },
};

// Class API
export const classApi = {
  // Get all classes
  getClasses: async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("grade", { ascending: true });

    if (error) throw error;
    return data as Class[];
  },

  // Get class by ID
  getClassById: async (id: string) => {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Class;
  },

  // Create class
  createClass: async (
    classData: Omit<Class, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("classes")
      .insert([classData])
      .select()
      .single();

    if (error) throw error;
    return data as Class;
  },

  // Update class
  updateClass: async (id: string, classData: Partial<Class>) => {
    const { data, error } = await supabase
      .from("classes")
      .update(classData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Class;
  },

  // Delete class
  deleteClass: async (id: string) => {
    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

// Attendance API
export const attendanceApi = {
  // Get attendance by class and date
  getAttendanceByClassAndDate: async (classId: string, date: string) => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("class_id", classId)
      .eq("date", date);

    if (error) throw error;
    return data as Attendance[];
  },

  // Get attendance by student
  getAttendanceByStudent: async (studentId: string) => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("student_id", studentId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Attendance[];
  },

  // Record attendance
  recordAttendance: async (
    attendanceData: Omit<Attendance, "id" | "created_at" | "updated_at">,
  ) => {
    // Check if attendance record already exists
    const { data: existingData } = await supabase
      .from("attendance")
      .select("id")
      .eq("student_id", attendanceData.student_id)
      .eq("class_id", attendanceData.class_id)
      .eq("date", attendanceData.date)
      .single();

    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from("attendance")
        .update({
          status: attendanceData.status,
          notes: attendanceData.notes,
          recorded_by: attendanceData.recorded_by,
        })
        .eq("id", existingData.id)
        .select()
        .single();

      if (error) throw error;
      return data as Attendance;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from("attendance")
        .insert([attendanceData])
        .select()
        .single();

      if (error) throw error;
      return data as Attendance;
    }
  },

  // Get attendance report
  getAttendanceReport: async (
    classId: string,
    startDate: string,
    endDate: string,
  ) => {
    const { data, error } = await supabase
      .from("attendance")
      .select(
        `
        *,
        students(id, full_name, nis, nisn)
      `,
      )
      .eq("class_id", classId)
      .gte("date", startDate)
      .lte("date", endDate);

    if (error) throw error;
    return data;
  },
};

// School Info API
export const schoolInfoApi = {
  // Get school info
  getSchoolInfo: async () => {
    const { data, error } = await supabase
      .from("school_info")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 is "No rows returned" error
    return data as SchoolInfo | null;
  },

  // Update school info
  updateSchoolInfo: async (schoolData: Partial<SchoolInfo>) => {
    // Check if school info exists
    const { data: existingData } = await supabase
      .from("school_info")
      .select("id")
      .single();

    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from("school_info")
        .update(schoolData)
        .eq("id", existingData.id)
        .select()
        .single();

      if (error) throw error;
      return data as SchoolInfo;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from("school_info")
        .insert([{ name: "Default School", ...schoolData }])
        .select()
        .single();

      if (error) throw error;
      return data as SchoolInfo;
    }
  },
};

// Facility API
export const facilityApi = {
  // Get all facilities
  getFacilities: async () => {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data as Facility[];
  },

  // Get facility by ID
  getFacilityById: async (id: string) => {
    const { data, error } = await supabase
      .from("facilities")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Facility;
  },

  // Create facility
  createFacility: async (
    facilityData: Omit<Facility, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("facilities")
      .insert([facilityData])
      .select()
      .single();

    if (error) throw error;
    return data as Facility;
  },

  // Update facility
  updateFacility: async (id: string, facilityData: Partial<Facility>) => {
    const { data, error } = await supabase
      .from("facilities")
      .update(facilityData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Facility;
  },

  // Delete facility
  deleteFacility: async (id: string) => {
    const { error } = await supabase.from("facilities").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
