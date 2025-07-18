
# 🛠️ Frontend Proyecto Angular + Ionic

## 📌 Requisitos Previos

- **Node.js 22.14.0**
- **Angular 20**
- **Ionic 7.2**

---

## 📂 Estructura del Proyecto
```
/frontend/
├── core/
├── shared/
├── modules/
│   ├── auth/
│   ├── inventory/
│   └── movement/
└── app.component.ts
```

---

## 📄 Descripción General
Este proyecto es el frontend del sistema de microservicios realizado en **Angular 20** y **Ionic 7.2**.

Su propósito es ofrecer una interfaz limpia y moderna que consuma los endpoints del **API Gateway** del backend, permitiendo autenticación, gestión de productos, y movimientos de inventario (entrada/salida de stock).

---

## 🚀 Cómo Ejecutar Localmente

### 1️⃣ Instalar Dependencias
Desde la carpeta `/frontend`:
```bash
npm install
```

### 2️⃣ Levantar el Proyecto
```bash
ionic serve
```

Esto abrirá la aplicación en el navegador en modo desarrollo.

---

## 💡 Consideraciones Técnicas

### 🛡️ Seguridad:
- Manejo de JWT para autenticación.
- Interceptor para enviar automáticamente el token en cada petición.

### 📁 Estructura Limpia:
- Uso de `Core`, `Shared` y `Modules`.
- Standalone Components en Angular.
- Arquitectura orientada a buenas prácticas y separación de responsabilidades.

### 🛠️ Funcionalidades:
- **Auth Module:** Registro, Login, Logout.
- **Inventory Module:** Listado de productos, formulario para crear productos.
- **Movement Module:** Registro de entradas y salidas de stock.
- Guard para proteger rutas si no hay sesión activa.

---

## 📚 Tecnologías

- Angular 20
- Ionic 7.2
- RxJS
- Standalone Components
- Interceptors
- Guards
- Angular Forms Reactivos

---

## 👨‍💻 Autor
Maicol Jacobo Aristizabal Obando

**Prueba Técnica Desarrollador Senior Angular / Ionic**
