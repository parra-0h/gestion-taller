#!/bin/bash

# Script para inicializar la base de datos PostgreSQL para el sistema de taller mecánico

echo "🔧 Inicializando base de datos del Taller Mecánico..."

# Crear usuario y base de datos
sudo -u postgres psql << EOF
-- Crear usuario si no existe
DO \$\$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'taller_user') THEN
    CREATE USER taller_user WITH PASSWORD 'password';
  END IF;
END
\$\$;

-- Crear base de datos si no existe
SELECT 'CREATE DATABASE taller_mecanico OWNER taller_user'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'taller_mecanico')\gexec

-- Otorgar privilegios
GRANT ALL PRIVILEGES ON DATABASE taller_mecanico TO taller_user;
EOF

echo "✅ Usuario y base de datos creados"

# Ejecutar el schema
echo "📋 Creando tablas..."
sudo -u postgres psql -d taller_mecanico -f schema.sql

echo "✅ Tablas creadas exitosamente"

# Cambiar propietario de las tablas y secuencias
echo "🔧 Configurando propietarios..."
sudo -u postgres psql -d taller_mecanico << EOF
ALTER TABLE vehicles OWNER TO taller_user;
ALTER TABLE works OWNER TO taller_user;
ALTER SEQUENCE vehicles_id_seq OWNER TO taller_user;
ALTER SEQUENCE works_id_seq OWNER TO taller_user;
ALTER TYPE vehicle_status OWNER TO taller_user;
ALTER TYPE work_status OWNER TO taller_user;
EOF

echo "✅ Propietarios configurados"

# Otorgar permisos en las tablas
sudo -u postgres psql -d taller_mecanico << EOF
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taller_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taller_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO taller_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO taller_user;
EOF

echo "✅ Permisos otorgados"

# Verificar la conexión
echo "🔍 Verificando conexión..."
PGPASSWORD=password psql -U taller_user -h localhost -d taller_mecanico -c "\dt"

echo ""
echo "✅ ¡Base de datos inicializada correctamente!"
echo "Puedes iniciar tu aplicación con: npm run dev"
