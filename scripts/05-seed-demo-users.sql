-- Fixed to match actual database schema with correct column names and types
-- Insert demo student user
INSERT INTO users (id, full_name, email, student_id, role, created_at)
VALUES (
  gen_random_uuid(),
  'John Doe',
  'student1@example.com',
  'STU001',
  'student',
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Insert sample courses
INSERT INTO courses (id, code, name, instructor, credits, created_at)
VALUES
  (gen_random_uuid(), 'CS101', 'Introduction to Computer Science', 'Dr. Smith', 3, NOW()),
  (gen_random_uuid(), 'MATH201', 'Calculus II', 'Prof. Johnson', 4, NOW()),
  (gen_random_uuid(), 'ENG102', 'English Literature', 'Dr. Williams', 3, NOW()),
  (gen_random_uuid(), 'PHYS101', 'Physics I', 'Prof. Brown', 4, NOW())
ON CONFLICT DO NOTHING;

-- Insert sample attendance records (using actual user and course IDs)
INSERT INTO attendance_records (id, user_id, course_id, date, status, created_at)
SELECT
  gen_random_uuid(),
  u.id,
  c.id,
  NOW() - INTERVAL '5 days',
  'present',
  NOW()
FROM users u, courses c
WHERE u.email = 'student1@example.com' AND c.code = 'CS101'
ON CONFLICT DO NOTHING;

INSERT INTO attendance_records (id, user_id, course_id, date, status, created_at)
SELECT
  gen_random_uuid(),
  u.id,
  c.id,
  NOW() - INTERVAL '3 days',
  'present',
  NOW()
FROM users u, courses c
WHERE u.email = 'student1@example.com' AND c.code = 'CS101'
ON CONFLICT DO NOTHING;

-- Insert sample resources
INSERT INTO resources (id, title, description, type, course_id, uploaded_by, approval_status, created_at)
SELECT
  gen_random_uuid(),
  'CS101 Lecture Notes',
  'Week 1-2 lecture notes',
  'pdf',
  c.id,
  u.id,
  'approved',
  NOW()
FROM users u, courses c
WHERE u.email = 'student1@example.com' AND c.code = 'CS101'
ON CONFLICT DO NOTHING;

-- Insert sample notes
INSERT INTO notes (id, user_id, title, content, course_id, created_at, updated_at)
SELECT
  gen_random_uuid(),
  u.id,
  'CS101 Important Concepts',
  'Variables, loops, and functions are fundamental programming concepts.',
  c.id,
  NOW(),
  NOW()
FROM users u, courses c
WHERE u.email = 'student1@example.com' AND c.code = 'CS101'
ON CONFLICT DO NOTHING;

-- Insert sample schedules
INSERT INTO schedules (id, course_id, day_of_week, start_time, end_time, room_number, created_at)
SELECT
  gen_random_uuid(),
  c.id,
  'Monday',
  '09:00'::time,
  '10:30'::time,
  'Room 101',
  NOW()
FROM courses c
WHERE c.code = 'CS101'
ON CONFLICT DO NOTHING;

INSERT INTO schedules (id, course_id, day_of_week, start_time, end_time, room_number, created_at)
SELECT
  gen_random_uuid(),
  c.id,
  'Wednesday',
  '09:00'::time,
  '10:30'::time,
  'Room 101',
  NOW()
FROM courses c
WHERE c.code = 'CS101'
ON CONFLICT DO NOTHING;
