-- Comprehensive seed data for CampusLMS with multiple students, courses, and resources

-- Insert multiple student users
INSERT INTO users (id, full_name, email, student_id, role, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Alice Johnson', 'alice@example.com', 'STU001', 'student', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', 'Bob Smith', 'bob@example.com', 'STU002', 'student', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', 'Carol Davis', 'carol@example.com', 'STU003', 'student', NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', 'David Wilson', 'david@example.com', 'STU004', 'student', NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', 'Emma Martinez', 'emma@example.com', 'STU005', 'student', NOW()),
  ('550e8400-e29b-41d4-a716-446655440099', 'Admin User', 'admin@campus.edu', 'ADMIN001', 'admin', NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert comprehensive courses
INSERT INTO courses (id, code, name, instructor, credits, created_at)
VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'CS101', 'Introduction to Computer Science', 'Dr. Sarah Smith', 3, NOW()),
  ('660e8400-e29b-41d4-a716-446655440002', 'CS102', 'Data Structures', 'Prof. James Johnson', 4, NOW()),
  ('660e8400-e29b-41d4-a716-446655440003', 'CS201', 'Algorithms', 'Dr. Emily Chen', 4, NOW()),
  ('660e8400-e29b-41d4-a716-446655440004', 'MATH201', 'Calculus II', 'Prof. Michael Brown', 4, NOW()),
  ('660e8400-e29b-41d4-a716-446655440005', 'MATH301', 'Linear Algebra', 'Dr. David Lee', 3, NOW()),
  ('660e8400-e29b-41d4-a716-446655440006', 'PHYS101', 'Physics I - Mechanics', 'Prof. Robert Taylor', 4, NOW()),
  ('660e8400-e29b-41d4-a716-446655440007', 'PHYS102', 'Physics II - Electricity', 'Dr. Lisa Anderson', 4, NOW()),
  ('660e8400-e29b-41d4-a716-446655440008', 'ENG102', 'English Literature', 'Prof. Jennifer White', 3, NOW()),
  ('660e8400-e29b-41d4-a716-446655440009', 'ENG201', 'Technical Writing', 'Dr. Mark Wilson', 3, NOW()),
  ('660e8400-e29b-41d4-a716-446655440010', 'CHEM101', 'Chemistry I', 'Prof. Susan Garcia', 4, NOW())
ON CONFLICT (code) DO NOTHING;

-- Insert user-course enrollments
INSERT INTO user_courses (user_id, course_id, enrolled_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '30 days'),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '25 days'),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', NOW() - INTERVAL '25 days'),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '25 days'),
  ('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '20 days'),
  ('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '20 days')
ON CONFLICT DO NOTHING;

-- Insert attendance records
INSERT INTO attendance_records (user_id, course_id, date, status, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '10 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '8 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '5 days', 'absent', NOW()),
  ('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '3 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '10 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '7 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '9 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '6 days', 'absent', NOW()),
  ('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '2 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '10 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '8 days', 'present', NOW()),
  ('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '5 days', 'present', NOW())
ON CONFLICT DO NOTHING;

-- Insert resources (approved and pending)
INSERT INTO resources (title, description, type, course_id, uploaded_by, approval_status, created_at)
VALUES
  ('CS101 Lecture Notes - Week 1', 'Introduction to programming fundamentals and basic syntax', 'pdf', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'approved', NOW() - INTERVAL '15 days'),
  ('CS101 Video Tutorial - Variables and Data Types', 'Comprehensive video explaining variables, data types, and type casting', 'video', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'approved', NOW() - INTERVAL '12 days'),
  ('CS101 Study Guide', 'Practice problems and solutions for CS101', 'pdf', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'approved', NOW() - INTERVAL '10 days'),
  ('MATH201 Formula Sheet', 'All important calculus formulas and theorems', 'pdf', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'approved', NOW() - INTERVAL '14 days'),
  ('MATH201 Practice Problems', 'Calculus integration and differentiation problems', 'pdf', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'approved', NOW() - INTERVAL '11 days'),
  ('PHYS101 Experiment Results', 'Lab experiment data and analysis for mechanics', 'pdf', '660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440005', 'pending', NOW() - INTERVAL '2 days'),
  ('ENG102 Essay Examples', 'Sample literary essays and analysis', 'pdf', '660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'approved', NOW() - INTERVAL '9 days'),
  ('CHEM101 Lab Report Template', 'Standard lab report format and guidelines', 'pdf', '660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440004', 'approved', NOW() - INTERVAL '8 days')
ON CONFLICT DO NOTHING;

-- Insert notes
INSERT INTO notes (user_id, title, content, course_id, created_at, updated_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'CS101 - Variables and Functions', 'Key points: Variables are containers for storing data values. Functions are reusable blocks of code. Function parameters allow passing data to functions. Remember scope!', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 days'),
  ('550e8400-e29b-41d4-a716-446655440001', 'CS101 - Control Flow', 'Important: if-else statements control program flow. Loops (for, while) iterate through code blocks. Break and continue statements modify loop behavior.', '660e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '5 days', NOW() - INTERVAL '3 days'),
  ('550e8400-e29b-41d4-a716-446655440002', 'MATH201 - Integration Techniques', 'Review: Power rule, substitution method, integration by parts. Remember to always add the constant of integration. Practice solving complex integrals.', '660e8400-e29b-41d4-a716-446655440004', NOW() - INTERVAL '6 days', NOW() - INTERVAL '2 days'),
  ('550e8400-e29b-41d4-a716-446655440003', 'PHYS101 - Newtonian Mechanics', 'Core concepts: F=ma (Newtons second law), Conservation of momentum, Kinetic and potential energy relationships. Study examples for exam!', '660e8400-e29b-41d4-a716-446655440006', NOW() - INTERVAL '8 days', NOW() - INTERVAL '4 days'),
  ('550e8400-e29b-41d4-a716-446655440003', 'ENG102 - Literary Analysis', 'Remember to cite sources properly. Themes, symbolism, and character development are key analysis points. Practice writing thesis statements.', '660e8400-e29b-41d4-a716-446655440008', NOW() - INTERVAL '4 days', NOW() - INTERVAL '1 days'),
  ('550e8400-e29b-41d4-a716-446655440004', 'MATH301 - Linear Algebra Basics', 'Matrices, vectors, eigenvalues. Row reduction and Gaussian elimination. Applications in computer graphics and physics.', '660e8400-e29b-41d4-a716-446655440005', NOW() - INTERVAL '9 days', NOW() - INTERVAL '6 days'),
  ('550e8400-e29b-41d4-a716-446655440005', 'CHEM101 - Chemical Bonding', 'Types of bonds: ionic, covalent, metallic, hydrogen. Lewis structures and molecular geometry. VSEPR theory for predicting shapes.', '660e8400-e29b-41d4-a716-446655440010', NOW() - INTERVAL '10 days', NOW() - INTERVAL '7 days')
ON CONFLICT DO NOTHING;

-- Insert schedules
INSERT INTO schedules (course_id, day_of_week, start_time, end_time, room_number, created_at)
VALUES
  ('660e8400-e29b-41d4-a716-446655440001', 'Monday', '09:00', '10:30', 'Room 101', NOW()),
  ('660e8400-e29b-41d4-a716-446655440001', 'Wednesday', '09:00', '10:30', 'Room 101', NOW()),
  ('660e8400-e29b-41d4-a716-446655440001', 'Friday', '09:00', '10:30', 'Room 101', NOW()),
  ('660e8400-e29b-41d4-a716-446655440004', 'Tuesday', '11:00', '12:30', 'Room 205', NOW()),
  ('660e8400-e29b-41d4-a716-446655440004', 'Thursday', '11:00', '12:30', 'Room 205', NOW()),
  ('660e8400-e29b-41d4-a716-446655440006', 'Monday', '14:00', '15:30', 'Lab A', NOW()),
  ('660e8400-e29b-41d4-a716-446655440006', 'Wednesday', '14:00', '15:30', 'Lab A', NOW()),
  ('660e8400-e29b-41d4-a716-446655440006', 'Friday', '14:00', '16:00', 'Lab A', NOW()),
  ('660e8400-e29b-41d4-a716-446655440008', 'Tuesday', '13:00', '14:30', 'Room 310', NOW()),
  ('660e8400-e29b-41d4-a716-446655440008', 'Thursday', '13:00', '14:30', 'Room 310', NOW()),
  ('660e8400-e29b-41d4-a716-446655440005', 'Monday', '10:00', '11:30', 'Room 215', NOW()),
  ('660e8400-e29b-41d4-a716-446655440005', 'Wednesday', '10:00', '11:30', 'Room 215', NOW()),
  ('660e8400-e29b-41d4-a716-446655440010', 'Tuesday', '15:00', '16:30', 'Lab B', NOW()),
  ('660e8400-e29b-41d4-a716-446655440010', 'Thursday', '15:00', '16:30', 'Lab B', NOW())
ON CONFLICT DO NOTHING;
