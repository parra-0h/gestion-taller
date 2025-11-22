# Supabase Database Setup Guide

This guide will help you set up the database tables in your Supabase project.

## Prerequisites

Your Supabase credentials are already configured in `.env.local`:
- **URL**: https://litaieoeybqhgjooexxn.supabase.co
- **Anon Key**: Configured in environment file

## Database Schema Setup

You need to create two tables in your Supabase database: `vehicles` and `works`.

### Option 1: Using Supabase SQL Editor (Recommended)

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/litaieoeybqhgjooexxn
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the SQL below
5. Click **Run** or press `Ctrl+Enter`

```sql
-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGSERIAL PRIMARY KEY,
    plate VARCHAR(20) NOT NULL,
    model VARCHAR(100) NOT NULL,
    arrival_description TEXT,
    status TEXT DEFAULT 'arrived' CHECK (status IN ('arrived', 'in_reception', 'working', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Works table
CREATE TABLE IF NOT EXISTS works (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT REFERENCES vehicles(id) ON DELETE CASCADE,
    description TEXT,
    assigned_bay INTEGER CHECK (assigned_bay BETWEEN 1 AND 4),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_created_at ON vehicles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_works_vehicle_id ON works(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_works_assigned_bay ON works(assigned_bay);
CREATE INDEX IF NOT EXISTS idx_works_status ON works(status);

-- Enable Row Level Security (RLS)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust based on your security needs)
CREATE POLICY "Enable all operations for vehicles" ON vehicles
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for works" ON works
    FOR ALL USING (true) WITH CHECK (true);
```

### Option 2: Using Supabase Table Editor

1. Go to **Table Editor** in your Supabase dashboard
2. Click **New Table**

#### Create Vehicles Table:
- **Name**: `vehicles`
- **Columns**:
  - `id` - int8 (Primary Key, Auto-increment)
  - `plate` - varchar (20)
  - `model` - varchar (100)
  - `arrival_description` - text
  - `status` - text (Default: 'arrived')
  - `created_at` - timestamptz (Default: now())

#### Create Works Table:
- **Name**: `works`
- **Columns**:
  - `id` - int8 (Primary Key, Auto-increment)
  - `vehicle_id` - int8 (Foreign Key to vehicles.id)
  - `description` - text
  - `assigned_bay` - int4
  - `status` - text (Default: 'pending')
  - `created_at` - timestamptz (Default: now())

## Verify Setup

After creating the tables, verify they exist:

1. Go to **Table Editor** in Supabase dashboard
2. You should see both `vehicles` and `works` tables listed
3. Click on each table to verify the columns are correct

## Row Level Security (RLS)

The SQL script above enables RLS with permissive policies for development. For production, you should:

1. Review and tighten the RLS policies based on your authentication requirements
2. Consider adding user-specific policies if you implement authentication
3. Remove the permissive "allow all" policies and replace with specific rules

## Next Steps

Once the database is set up:

1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```

2. Test the application:
   - Navigate to Room 1 to add vehicles
   - Navigate to Room 2 to assign work
   - Navigate to Room 3 to view individual monitors

## Troubleshooting

### Connection Issues
- Verify your `.env.local` file exists and contains the correct credentials
- Restart the dev server after creating `.env.local`
- Check the browser console for any error messages

### Database Errors
- Ensure tables are created successfully in Supabase
- Verify RLS policies are enabled
- Check the Supabase logs in the dashboard under **Logs** → **Postgres Logs**

### API Errors
- Check the browser Network tab for failed API requests
- Review the terminal output for server-side errors
- Ensure the Supabase client is properly initialized
