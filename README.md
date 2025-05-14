# Mercado Libre App

🌐 [Visitar la App en Vercel](https://mercado-libre-app-rust.vercel.app/)

Este proyecto es una aplicación web inspirada en el diseño de Mercado Libre. Permite a los usuarios buscar productos, ver resultados detallados y acceder a información individual de cada ítem. Se desarrolló con el objetivo de practicar conceptos de diseño de interfaz, consumo de APIs y desarrollo frontend moderno.

## 🧩 Características principales

- Búsqueda de productos por palabra clave.
- Visualización de resultados con imagen, título, precio y calificaciones.
- Página de detalle del producto con información extendida.
- Interfaz simple, rápida y responsive.

## 🔌 API utilizada

Se utiliza la API pública de [DummyJSON](https://dummyjson.com/docs/products) para simular los datos de productos:
- Endpoint principal: `/products/search?q=palabra`
- Los datos incluyen nombre, imagen, descripción, precio, marca y más.

## 🛠️ Tecnologías usadas

- **HTML**
- **CSS**
- **JavaScript**
- **React**
- **Vite**
- **Vercel** para el despliegue

## 🚀 Cómo probarlo

Podés acceder directamente a la aplicación funcionando en Vercel:

👉 https://mercado-libre-app-rust.vercel.app/

O bien clonar el repositorio y correrlo localmente con un servidor estático:

```bash
git clone https://github.com/tu-usuario/mercado-libre-app.git
cd mercado-libre-app
npm install
npm run dev
