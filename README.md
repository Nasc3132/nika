# Nika MVP

Aplicacion creada con React, Vite, Chakra UI, Firebase y Zustand para una experiencia de catalogo artesanal con pedidos manuales.

## Incluye

- catalogo conectado a Firestore
- carrito persistente con localStorage
- formulario de pedidos personalizados
- carga de imagenes a Firebase Storage
- envio de pedidos a Firestore
- redireccion a WhatsApp

## Requisitos

- Node 20+
- proyecto Firebase con Firestore y Storage habilitados

## Variables de entorno

Duplica `.env.example` como `.env` y completa los valores de Firebase.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run test`
- `npm run typegen`

Si este equipo no tiene `node` en `PATH`, puedes usar el wrapper local:

- `.\scripts\npm-local.cmd run dev`
- `.\scripts\npm-local.cmd run build`
- `.\scripts\npm-local.cmd run test`

## Reglas Firebase

Se incluyen reglas MVP sugeridas en:

- `firebase/firestore.rules`
- `firebase/storage.rules`

También quedan listos estos archivos para `firebase init` y deploy:

- `firebase.json`
- `.firebaserc`
- `firebase/firestore.indexes.json`

## Flujo Firebase

1. Crea un proyecto en Firebase Console.
2. Reemplaza `nika-mvp` en [.firebaserc](/c:/Users/Abrha/Desktop/nika/.firebaserc) por tu `project id` real.
3. Completa [.env.example](/c:/Users/Abrha/Desktop/nika/.env.example) como `.env` con las claves `VITE_FIREBASE_*`.
4. Ejecuta `firebase.cmd use <tu-proyecto>`.
5. Usa `npm run build` y luego `firebase.cmd deploy` para publicar Hosting, Firestore y Storage.
