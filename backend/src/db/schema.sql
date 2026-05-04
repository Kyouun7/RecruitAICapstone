CREATE DATABASE IF NOT EXISTS recruitmen_db;
USE recruitmen_db;

CREATE TABLE IF NOT EXISTS candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id VARCHAR(50) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telepon VARCHAR(20) NOT NULL,
    portofolio TEXT,
    posisi VARCHAR(50) NOT NULL,
    job_id VARCHAR(50) NOT NULL,
    cv_original_name VARCHAR(255),
    cv_url TEXT,
    score INT DEFAULT NULL,
    status ENUM('pending', 'processed', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    threshold_score INT DEFAULT 70
);

-- Tabel users untuk HR (admin)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('hr','admin') DEFAULT 'hr',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel password_resets untuk lupa password
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO jobs (job_id, title, description, threshold_score) VALUES 
('J-FE-001', 'Frontend Developer', 'React.js, Tailwind CSS', 75),
('J-BE-001', 'Backend Developer', 'Node.js, Express, MySQL', 70),
('J-AI-001', 'AI Engineer', 'LLM, Python, Machine Learning', 80);
