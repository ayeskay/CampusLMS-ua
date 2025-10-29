-- Insert default admin user for demo purposes
INSERT INTO users (id, full_name, email, student_id, role, created_at)
VALUES (
  'admin-demo-001',
  'Admin User',
  'admin@campus.edu',
  'ADMIN001',
  'admin',
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Note: The password 'admin123' should be set through Supabase Auth
-- Run this in Supabase Auth section to create the auth user:
-- Email: admin@campus.edu
-- Password: admin123
