# Sistema de Taller Mecánico - Guía de Configuración

## 📋 Resumen de Cambios Realizados

### ✅ Errores Corregidos

1. **Error de sintaxis en `/pages/api/works/index.ts`**
   - Eliminado texto accidental (salida de git) que causaba error de compilación

2. **Problemas de contraste y visibilidad de texto**
   - Agregado `text-gray-900` para texto negro en modo claro
   - Agregado `bg-white` para fondo blanco en inputs
   - Agregado `dark:text-white` para texto blanco en modo oscuro
   - Agregado anillos de enfoque (`focus:ring`) para mejor UX
   - Aplicado en todas las páginas: `index.tsx`, `room1.tsx`, `room2.tsx`

3. **Error de runtime: "vehicles.map is not a function"**
   - Agregado manejo de errores con try-catch en `room2.tsx` y `room3.tsx`
   - Validación con `Array.isArray()` para asegurar que los datos sean arrays
   - Fallback a array vacío `[]` en caso de error

## 🗄️ Configuración de Base de Datos

### Requisitos
- PostgreSQL instalado ✅ (verificado)
- PostgreSQL corriendo ✅ (verificado)

### Inicialización de la Base de Datos

He creado un script automatizado para configurar la base de datos:

```bash
./init-db.sh
```

Este script:
1. Crea el usuario `taller_user` con contraseña `password`
2. Crea la base de datos `taller_mecanico`
3. Ejecuta el schema SQL para crear las tablas:
   - `vehicles` (vehículos)
   - `works` (trabajos)
4. Otorga los permisos necesarios

### Configuración Manual (Alternativa)

Si prefieres hacerlo manualmente:

```bash
# 1. Conectarse a PostgreSQL como superusuario
sudo -u postgres psql

# 2. Crear usuario y base de datos
CREATE USER taller_user WITH PASSWORD 'password';
CREATE DATABASE taller_mecanico OWNER taller_user;
GRANT ALL PRIVILEGES ON DATABASE taller_mecanico TO taller_user;
\q

# 3. Ejecutar el schema
sudo -u postgres psql -d taller_mecanico -f schema.sql

# 4. Otorgar permisos
sudo -u postgres psql -d taller_mecanico -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO taller_user;"
sudo -u postgres psql -d taller_mecanico -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO taller_user;"
```

## 🚀 Iniciar la Aplicación

Una vez configurada la base de datos:

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

## 📱 Estructura de la Aplicación

- **Página Principal** (`/`) - Menú de navegación
- **Sala 1** (`/room1`) - Registro de llegada de vehículos
- **Sala 2** (`/room2`) - Asignación de trabajos a pantallas
- **Sala 3** (`/room3`) - Monitores de trabajo (4 pantallas)

## 🎨 Mejoras de UI Implementadas

### Campos de Entrada
- Fondo blanco con texto negro en modo claro
- Fondo gris oscuro con texto blanco en modo oscuro
- Bordes visibles (`border-gray-300`)
- Anillos de enfoque de colores:
  - Azul en Sala 1
  - Verde en Sala 2

### Manejo de Errores
- La aplicación ya no se rompe si la API falla
- Muestra arrays vacíos en lugar de errores
- Logs de errores en la consola para debugging

## 🔧 Solución de Problemas

### La aplicación muestra "No hay vehículos esperando"
- Verifica que la base de datos esté corriendo: `systemctl status postgresql`
- Verifica que las tablas existan: `PGPASSWORD=password psql -U taller_user -h localhost -d taller_mecanico -c "\dt"`
- Revisa la consola del navegador (F12) para ver errores de API

### Error de conexión a la base de datos
- Verifica las credenciales en `lib/db.ts`
- Asegúrate de que PostgreSQL acepte conexiones locales
- Verifica `/etc/postgresql/*/main/pg_hba.conf` para configuración de autenticación

## 📝 Notas de Seguridad

⚠️ **IMPORTANTE**: La contraseña `password` es solo para desarrollo. En producción:
- Usa variables de entorno para credenciales
- Cambia la contraseña a algo seguro
- Configura SSL para conexiones a la base de datos
