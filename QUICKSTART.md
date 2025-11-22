# 🚗 Guía Rápida de Uso

## ✅ Sistema Listo

La base de datos está configurada y funcionando correctamente. Ya puedes usar la aplicación.

## 🎯 Cómo Usar el Sistema

### 1. Iniciar la Aplicación
Si el servidor no está corriendo:
```bash
npm run dev
```

Abre tu navegador en: **http://localhost:3000**

### 2. Flujo de Trabajo

#### **Sala 1: Llegada de Vehículos** (`/room1`)
1. Ingresa la **Patente** del vehículo
2. Ingresa el **Modelo** (ej: Toyota Corolla)
3. Describe el problema en **Descripción de Llegada**
4. Haz clic en **Registrar Vehículo**
5. El vehículo queda en estado "arrived" (llegado)

#### **Sala 2: Recepción y Asignación** (`/room2`)
1. Verás la lista de vehículos en espera
2. Haz clic en un vehículo para seleccionarlo
3. Ingresa la **Descripción del Trabajo** a realizar
4. Selecciona a qué **Pantalla** (1-4) asignar el trabajo
5. Haz clic en **Asignar Trabajo**
6. El vehículo pasa a estado "working" (en trabajo)

#### **Sala 3: Monitores de Trabajo** (`/room3`)
1. Verás 4 pantallas (bays) en una cuadrícula
2. Cada pantalla muestra el vehículo asignado a ella
3. Se muestra: Patente, Modelo, y Descripción del trabajo
4. Cuando termines el trabajo, haz clic en **MARCAR COMO TERMINADO**
5. El vehículo pasa a estado "completed" (completado)

## 🔄 Actualización Automática

- **Sala 2** y **Sala 3** se actualizan automáticamente cada 5 segundos
- No necesitas recargar la página para ver nuevos vehículos o trabajos

## 🎨 Características de UI

- ✅ Modo claro y oscuro automático (según preferencias del sistema)
- ✅ Texto visible con alto contraste
- ✅ Anillos de enfoque en campos activos
- ✅ Diseño responsive

## ⚠️ Solución de Problemas

### "No hay vehículos esperando"
- Registra un vehículo en **Sala 1** primero

### Error de conexión
- Verifica que PostgreSQL esté corriendo: `systemctl status postgresql`
- Verifica que el servidor Next.js esté corriendo: `npm run dev`

### No se puede registrar vehículo
- Abre la consola del navegador (F12) para ver errores
- Verifica la conexión a la base de datos

## 📊 Verificar Base de Datos

Ver todos los vehículos:
```bash
PGPASSWORD=password psql -U taller_user -h localhost -d taller_mecanico -c "SELECT * FROM vehicles;"
```

Ver todos los trabajos:
```bash
PGPASSWORD=password psql -U taller_user -h localhost -d taller_mecanico -c "SELECT * FROM works;"
```

## 🎉 ¡Listo para Usar!

El sistema está completamente operacional. Disfruta gestionando tu taller mecánico.
