# 🌍 Guía para Agentes: Integración de Sistema de Traducciones

## 📋 **Objetivo**

Esta guía permite a agentes de IA revisar componentes y convertirlos para usar el sistema de traducciones del dashboard electoral.

## 🎯 **Tareas del Agente**

### 1. **Análisis del Componente**
- Identificar todo el texto visible al usuario (hardcoded)
- Verificar si ya usa `useTranslation`
- Determinar el contexto/función del componente

### 2. **Conversión Estructurada**
- Añadir importación de `useTranslation`
- Extraer todo el texto a claves de traducción
- Actualizar el TranslationContext.tsx con nuevas claves

---

## 🛠 **Proceso Paso a Paso**

### **Paso 1: Importación Requerida**

```tsx
// AÑADIR SIEMPRE AL INICIO
import { useTranslation } from "../contexts/TranslationContext";
```

### **Paso 2: Inicialización del Hook**

```tsx
// DENTRO DEL COMPONENTE, JUSTO DESPUÉS DE LA FIRMA
export function TuComponente() {
  const { t } = useTranslation(); // <-- AÑADIR ESTA LÍNEA
  
  // ... resto del código
}
```

### **Paso 3: Identificación de Texto a Traducir**

**BUSCAR Y REEMPLAZAR:**

```tsx
// ❌ ANTES - Texto hardcodeado
<div className="text-lg font-bold">
  User Profile
</div>
<button className="btn-primary">
  Save Changes
</button>

// ✅ DESPUÉS - Con traducciones
<div className="text-lg font-bold">
  {t("profile.title")}
</div>
<button className="btn-primary">
  {t("profile.saveButton")}
</button>
```

### **Paso 4: Nomenclatura de Claves**

**Usa el formato: `componente.seccion.elemento`**

```typescript
// Ejemplos válidos:
"header.timezone"              // ✅ header -> timezone
"social.platforms.title"       // ✅ social -> platforms -> title
"narrative.button.sync"        // ✅ narrative -> button -> sync
"user.profile.settings"        // ✅ user -> profile -> settings
```

### **Paso 5: Manejo de Parámetros**

**Para textos dinámicos:**

```tsx
// En TranslationContext.tsx
"user.welcome": "Welcome, {name}!"
"post.count": "Found {count} posts"
"date.format": "Updated {hours} hours ago"

// En el componente
<p>{t("user.welcome", { name: userName })}</p>
<p>{t("post.count", { count: posts.length })}</p>
<p>{t("date.format", { hours: timeDifference })}</p>
```

---

## 📝 **Template de Actualización**

### **Plantilla Base para Componentes**

```tsx
"use client";

import React, "react";
// ... otros imports
import { useTranslation } from "../contexts/TranslationContext"; // <-- IMPORT REQUERIDO

export function NombreComponente() {
  const { t } = useTranslation(); // <-- HOOK REQUERIDO
  
  // ... estados y lógica
  
  return (
    <div>
      {/* Reemplazar todo el texto visible */}
      <h1>{t("componente.titulo")}</h1>
      <p>{t("componente.descripcion")}</p>
      
      {/* Con parámetros */}
      <p>{t("componente.usuario", { name: userName })}</p>
      
      {/* En botones */}
      <button>{t("componente.boton")}</button>
    </div>
  );
}
```

---

## 🔍 **Checklist de Verificación**

### **Antes de Finalizar:**

- [ ] `import { useTranslation }` añadido
- [ ] `const { t } = useTranslation()` inicializado
- [ ] Todo el texto visible usa `t()`
- [ ] Claves siguen la nomenclatura correcta
- [ ] Nuevas claves añadidas al TranslationContext.tsx
- [ ] Traducciones en inglés y español incluidas
- [ ] No hay texto hardcodeado visible al usuario
- [ ] El componente compila sin errores

---

## 📂 **Actualización del TranslationContext.tsx**

### **Añadir Nuevas Claves:**

```typescript
// EN EL ARCHIVO src/app/dashboard/contexts/TranslationContext.tsx

const translations = {
  en: {
    // ... claves existentes
    
    // AÑADIR CLAVES NUEVAS
    "componente.titulo": "Component Title",
    "componente.descripcion": "Component Description",
    "componente.boton": "Save",
    "componente.usuario": "Hello, {name}!",
  },
  es: {
    // ... claves existentes
    
    // AÑADIR CLAVES NUEVAS
    "componente.titulo": "Título del Componente",
    "componente.descripcion": "Descripción del Componente",
    "componente.boton": "Guardar",
    "componente.usuario": "Hola, {name}!",
  }
};
```

---

## ⚠️ **Casos Especiales**

### **Arrays de Objetos con Texto:**

```tsx
// ❌ ANTES
const platforms = [
  { id: "facebook", name: "Facebook", color: "bg-blue-500" },
  { id: "twitter", name: "Twitter", color: "bg-cyan-500" }
];

// ✅ DESPUÉS
const platforms = [
  { id: "facebook", name: t("platforms.facebook"), color: "bg-blue-500" },
  { id: "twitter", name: t("platforms.twitter"), color: "bg-cyan-500" }
];
```

### **Texto Condicional:**

```tsx
// ❌ ANTES
<span>{isOnline ? "Online" : "Offline"}</span>

// ✅ DESPUÉS
<span>{isOnline ? t("status.online") : t("status.offline")}</span>
```

### **Placeholder en Inputs:**

```tsx
// ❌ ANTES
<input placeholder="Enter your email" />

// ✅ DESPUÉS
<input placeholder={t("input.emailPlaceholder")} />
```

---

## 🚫 **Qué NO Traducir**

```tsx
// ❌ NO TRADUCIR (valores técnicos, IDs, clases CSS)
const API_URL = "https://api.example.com";
<div className="bg-red-500">Color</div>
<button id="submit-button">Submit</button>

// ✅ SÍ TRADUCIR (texto visible al usuario)
<button>{t("form.submit")}</button>
```

---

## 📋 **Template para Respuesta del Agente**

Cuando un agente complete la tarea, debe responder:

```markdown
## ✅ Componente Actualizado Exitosamente

**Archivo Modificado:** `src/app/dashboard/ui/TuComponente.tsx`

**Cambios Realizados:**
1. ✅ Añadido `import { useTranslation }`
2. ✅ Inicializado hook `const { t } = useTranslation()`
3. ✅ Extraídas y reemplazadas X cadenas de texto
4. ✅ Añadidas Y claves al TranslationContext.tsx

**Claves Nuevas Añadidas:**
- `componente.titulo`: "Component Title" / "Título del Componente"
- `componente.descripcion`: "Description" / "Descripción"
- `componente.boton`: "Button" / "Botón"

**Verificación:**
- [x] No hay texto hardcodeado visible
- [x] Todas las claves siguen nomenclatura
- [x] Traducciones en inglés y español completas
- [x] Componente compila sin errores

🎯 **El componente ahora soporta cambio de idioma automático.**
```

---

## 🎖️ **Regla de Oro**

**SI EL TEXTO ES VISIBLE PARA EL USUARIO FINAL, DEBE USAR EL SISTEMA DE TRADUCCIONES.**

Cualquier texto hardcodeado es un bug que debe ser corregido.

---

*Esta guía asegura consistencia y calidad en la implementación del sistema de traducciones del dashboard electoral.*