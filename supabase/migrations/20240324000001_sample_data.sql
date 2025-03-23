-- Insert sample users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'smp01laki@gmail.com', crypt('P4$$word', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'admin@sekolah.edu', crypt('password123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000003', 'guru1@sekolah.edu', crypt('password123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000004', 'guru2@sekolah.edu', crypt('password123', gen_salt('bf')), now(), now(), now()),
  ('00000000-0000-0000-0000-000000000005', 'staf1@sekolah.edu', crypt('password123', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert sample user profiles
INSERT INTO public.users (id, email, full_name, role, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'smp01laki@gmail.com', 'Admin SMP 01', 'admin', now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'admin@sekolah.edu', 'Administrator Sekolah', 'admin', now(), now()),
  ('00000000-0000-0000-0000-000000000003', 'guru1@sekolah.edu', 'Budi Santoso', 'teacher', now(), now()),
  ('00000000-0000-0000-0000-000000000004', 'guru2@sekolah.edu', 'Siti Rahayu', 'teacher', now(), now()),
  ('00000000-0000-0000-0000-000000000005', 'staf1@sekolah.edu', 'Ahmad Suparman', 'staff', now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert sample students
INSERT INTO public.students (id, nis, nisn, full_name, gender, birth_date, birth_place, religion, address, parent_name, parent_phone, entry_year, current_class, status, photo_url, created_at, updated_at)
VALUES
  (uuid_generate_v4(), '2023001', '1234567890', 'Andi Wijaya', 'male', '2010-05-15', 'Jakarta', 'Islam', 'Jl. Merdeka No. 123, Jakarta Selatan', 'Budi Wijaya', '081234567890', 2023, '7A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi', now(), now()),
  (uuid_generate_v4(), '2023002', '1234567891', 'Budi Santoso', 'male', '2010-06-20', 'Bandung', 'Islam', 'Jl. Pahlawan No. 45, Jakarta Timur', 'Agus Santoso', '081234567891', 2023, '7A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', now(), now()),
  (uuid_generate_v4(), '2023003', '1234567892', 'Citra Dewi', 'female', '2010-07-10', 'Surabaya', 'Kristen', 'Jl. Sudirman No. 78, Jakarta Pusat', 'Dedi Wijaya', '081234567892', 2023, '7A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Citra', now(), now()),
  (uuid_generate_v4(), '2023004', '1234567893', 'Dewi Lestari', 'female', '2010-08-05', 'Yogyakarta', 'Islam', 'Jl. Gatot Subroto No. 12, Jakarta Selatan', 'Eko Lestari', '081234567893', 2023, '7B', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi', now(), now()),
  (uuid_generate_v4(), '2023005', '1234567894', 'Eko Prasetyo', 'male', '2010-09-15', 'Semarang', 'Islam', 'Jl. Thamrin No. 56, Jakarta Pusat', 'Fajar Prasetyo', '081234567894', 2023, '7B', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eko', now(), now()),
  (uuid_generate_v4(), '2022001', '1234567895', 'Fani Fitriani', 'female', '2009-04-25', 'Jakarta', 'Islam', 'Jl. Kebon Jeruk No. 89, Jakarta Barat', 'Gunawan Fitriani', '081234567895', 2022, '8A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fani', now(), now()),
  (uuid_generate_v4(), '2022002', '1234567896', 'Galih Pratama', 'male', '2009-05-30', 'Bandung', 'Islam', 'Jl. Cendrawasih No. 34, Jakarta Timur', 'Hendra Pratama', '081234567896', 2022, '8A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Galih', now(), now()),
  (uuid_generate_v4(), '2022003', '1234567897', 'Hani Permata', 'female', '2009-06-12', 'Surabaya', 'Katolik', 'Jl. Melati No. 67, Jakarta Selatan', 'Irfan Permata', '081234567897', 2022, '8B', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hani', now(), now()),
  (uuid_generate_v4(), '2021001', '1234567898', 'Irfan Ramadhan', 'male', '2008-07-20', 'Jakarta', 'Islam', 'Jl. Anggrek No. 23, Jakarta Barat', 'Joko Ramadhan', '081234567898', 2021, '9A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Irfan', now(), now()),
  (uuid_generate_v4(), '2021002', '1234567899', 'Jasmine Putri', 'female', '2008-08-15', 'Bandung', 'Islam', 'Jl. Mawar No. 45, Jakarta Utara', 'Kiki Putra', '081234567899', 2021, '9A', 'active', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasmine', now(), now());

-- Insert sample classes
INSERT INTO public.classes (id, name, grade, academic_year, teacher_id, created_at, updated_at)
VALUES
  (uuid_generate_v4(), '7A', 7, '2023/2024', '00000000-0000-0000-0000-000000000003', now(), now()),
  (uuid_generate_v4(), '7B', 7, '2023/2024', '00000000-0000-0000-0000-000000000004', now(), now()),
  (uuid_generate_v4(), '8A', 8, '2023/2024', '00000000-0000-0000-0000-000000000003', now(), now()),
  (uuid_generate_v4(), '8B', 8, '2023/2024', '00000000-0000-0000-0000-000000000004', now(), now()),
  (uuid_generate_v4(), '9A', 9, '2023/2024', '00000000-0000-0000-0000-000000000003', now(), now()),
  (uuid_generate_v4(), '9B', 9, '2023/2024', '00000000-0000-0000-0000-000000000004', now(), now()),
  (uuid_generate_v4(), '7A', 7, '2022/2023', '00000000-0000-0000-0000-000000000003', now(), now()),
  (uuid_generate_v4(), '7B', 7, '2022/2023', '00000000-0000-0000-0000-000000000004', now(), now()),
  (uuid_generate_v4(), '8A', 8, '2022/2023', '00000000-0000-0000-0000-000000000003', now(), now()),
  (uuid_generate_v4(), '8B', 8, '2022/2023', '00000000-0000-0000-0000-000000000004', now(), now());

-- Get class IDs for attendance records
DO $$
DECLARE
    class_7a_id UUID;
    student_ids UUID[] := ARRAY(
        SELECT id FROM public.students WHERE current_class = '7A' LIMIT 3
    );
BEGIN
    SELECT id INTO class_7a_id FROM public.classes WHERE name = '7A' AND academic_year = '2023/2024' LIMIT 1;
    
    -- Insert sample attendance records
    FOR i IN 1..ARRAY_LENGTH(student_ids, 1) LOOP
        INSERT INTO public.attendance (id, student_id, class_id, date, status, notes, recorded_by, created_at, updated_at)
        VALUES
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '10 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '9 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '8 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '7 days', 'sick', 'Demam', '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '6 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '5 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '4 days', 'late', 'Terlambat 15 menit', '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '3 days', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '2 days', 'permission', 'Urusan keluarga', '00000000-0000-0000-0000-000000000003', now(), now()),
            (uuid_generate_v4(), student_ids[i], class_7a_id, CURRENT_DATE - INTERVAL '1 day', 'present', NULL, '00000000-0000-0000-0000-000000000003', now(), now());
    END LOOP;
END $$;

-- Insert sample school info
INSERT INTO public.school_info (id, npsn, name, address, phone, email, website, principal_name, established_year, last_dapodik_sync, created_at, updated_at)
VALUES
  (uuid_generate_v4(), '12345678', 'SMP Negeri 1 Jakarta', 'Jl. Pendidikan No. 123, Jakarta Pusat', '021-5551234', 'info@smpn1jakarta.sch.id', 'www.smpn1jakarta.sch.id', 'Dr. Bambang Suryanto, M.Pd.', 1975, now(), now(), now())
ON CONFLICT DO NOTHING;

-- Insert sample facilities
INSERT INTO public.facilities (id, name, category, condition, quantity, notes, created_at, updated_at)
VALUES
  (uuid_generate_v4(), 'Ruang Kelas 7A', 'classroom', 'good', 1, 'Lantai 1 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Ruang Kelas 7B', 'classroom', 'good', 1, 'Lantai 1 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Ruang Kelas 8A', 'classroom', 'good', 1, 'Lantai 2 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Ruang Kelas 8B', 'classroom', 'good', 1, 'Lantai 2 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Ruang Kelas 9A', 'classroom', 'good', 1, 'Lantai 3 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Ruang Kelas 9B', 'classroom', 'good', 1, 'Lantai 3 Gedung Utama', now(), now()),
  (uuid_generate_v4(), 'Laboratorium IPA', 'laboratory', 'good', 1, 'Lantai 1 Gedung Sains', now(), now()),
  (uuid_generate_v4(), 'Laboratorium Komputer', 'laboratory', 'good', 1, 'Lantai 2 Gedung Sains', now(), now()),
  (uuid_generate_v4(), 'Perpustakaan', 'library', 'good', 1, 'Gedung Perpustakaan', now(), now()),
  (uuid_generate_v4(), 'Ruang Guru', 'office', 'good', 1, 'Lantai 1 Gedung Administrasi', now(), now());
