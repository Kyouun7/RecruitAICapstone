-- Migration: Add missing job detail columns
-- This migration adds the following columns to the jobs table if they don't exist:
-- - key_responsibilities
-- - minimum_qualifications
-- - employment_type
-- - location
-- - work_setup
-- - is_active
-- - created_by
-- - created_at
-- - updated_at

ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS employment_type VARCHAR(50) DEFAULT 'Full-time' AFTER threshold_score,
ADD COLUMN IF NOT EXISTS location VARCHAR(255) AFTER employment_type,
ADD COLUMN IF NOT EXISTS work_setup ENUM('Remote', 'Hybrid', 'On-site', 'Office') DEFAULT 'Office' AFTER location,
ADD COLUMN IF NOT EXISTS key_responsibilities TEXT AFTER work_setup,
ADD COLUMN IF NOT EXISTS minimum_qualifications TEXT AFTER key_responsibilities,
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE AFTER minimum_qualifications,
ADD COLUMN IF NOT EXISTS created_by VARCHAR(50) AFTER is_active,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER created_by,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Verify the migration
SELECT 'Migration completed. New jobs table structure:' as status;
DESCRIBE jobs;
