-- Create ENUMs
CREATE TYPE vehicle_status AS ENUM ('arrived', 'in_reception', 'working', 'completed');
CREATE TYPE work_status AS ENUM ('pending', 'in_progress', 'done');

-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    plate VARCHAR(20) NOT NULL,
    model VARCHAR(100) NOT NULL,
    arrival_description TEXT,
    status vehicle_status DEFAULT 'arrived',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Works table
CREATE TABLE IF NOT EXISTS works (
    id SERIAL PRIMARY KEY,
    vehicle_id INTEGER REFERENCES vehicles(id),
    description TEXT,
    assigned_bay INTEGER CHECK (assigned_bay BETWEEN 1 AND 4),
    status work_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
