# 🖥️ Monitores Individuales - Guía de Uso

## 📺 Nuevo Sistema de Monitores

Ahora cada monitor físico puede mostrar **solo su trabajo asignado** en pantalla completa con texto grande y fácil de leer.

## 🔗 URLs de Monitores

Cada monitor tiene su propia URL:

- **Monitor 1**: http://localhost:3000/monitor/1
- **Monitor 2**: http://localhost:3000/monitor/2
- **Monitor 3**: http://localhost:3000/monitor/3
- **Monitor 4**: http://localhost:3000/monitor/4

## 🎯 Cómo Configurar los Monitores

### Opción 1: Desde el Panel de Control (Recomendado)

1. Ve a **Sala 3** (http://localhost:3000/room3)
2. Verás un panel de control con 4 tarjetas (una por monitor)
3. Haz clic en **"🖥️ Abrir Monitor X"** para cada pantalla
4. Cada enlace se abrirá en una nueva pestaña
5. Arrastra cada pestaña a su monitor correspondiente
6. Presiona **F11** en cada monitor para pantalla completa

### Opción 2: Abrir URLs Directamente

1. En cada monitor físico, abre un navegador
2. Ve a la URL correspondiente (ej: `http://localhost:3000/monitor/1`)
3. Presiona **F11** para pantalla completa

## 🎨 Características de los Monitores

### Diseño Grande y Visible
- ✅ Patente en formato grande (como placa real)
- ✅ Modelo del vehículo destacado
- ✅ Descripción del trabajo en texto grande
- ✅ Estado visual (Pendiente/En Progreso/Completado)
- ✅ Botón grande para marcar como terminado

### Actualización Automática
- 🔄 Se actualiza cada 5 segundos automáticamente
- 📅 Muestra fecha y hora actual
- 💤 Cuando no hay trabajo asignado, muestra animación de espera

### Interactividad
- ✓ Los mecánicos pueden marcar trabajos como terminados directamente desde su monitor
- ✓ Al completar, el vehículo pasa a estado "completed"
- ✓ El monitor queda libre para el siguiente trabajo

## 📋 Flujo de Trabajo Completo

### 1. Sala 1: Registro
```
Recepcionista registra vehículo
↓
Estado: "arrived"
```

### 2. Sala 2: Asignación
```
Supervisor selecciona vehículo
Describe el trabajo
Asigna a Monitor 1, 2, 3 o 4
↓
Estado: "working"
```

### 3. Monitores Individuales
```
Mecánico ve su trabajo en pantalla grande
Realiza el trabajo
Marca como terminado
↓
Estado: "completed"
```

## 💡 Consejos

### Para Mejor Visualización
- Usa monitores de al menos 24 pulgadas
- Configura resolución 1920x1080 o superior
- Modo pantalla completa (F11) para mejor experiencia
- Ajusta brillo según iluminación del taller

### Para Múltiples Monitores
- Usa un solo computador con 4 monitores, O
- Usa 4 computadores/tablets diferentes
- Asegúrate de que todos estén en la misma red local

### Navegadores Recomendados
- ✅ Google Chrome
- ✅ Microsoft Edge
- ✅ Firefox

## 🔧 Solución de Problemas

### Monitor no muestra trabajo
- Verifica que el trabajo esté asignado a ese número de pantalla en Sala 2
- Verifica que el trabajo no esté marcado como "done"
- Refresca la página (F5)

### Pantalla completa no funciona
- Presiona F11 nuevamente
- Algunos navegadores requieren permiso para pantalla completa
- Intenta con otro navegador

### No se actualiza automáticamente
- Verifica la conexión a internet/red local
- Abre la consola del navegador (F12) para ver errores
- Verifica que el servidor Next.js esté corriendo

## 🎉 Ventajas del Nuevo Sistema

✅ **Visibilidad**: Texto grande y claro para leer desde lejos
✅ **Simplicidad**: Cada mecánico ve solo su trabajo
✅ **Eficiencia**: No hay confusión sobre qué trabajo hacer
✅ **Profesional**: Diseño moderno y atractivo
✅ **Flexible**: Funciona en monitores, tablets, o computadores

---

**¿Necesitas ayuda?** Revisa la consola del navegador (F12) para mensajes de error.
