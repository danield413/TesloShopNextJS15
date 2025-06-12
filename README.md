# Teslo Shop

## Pasos para correr en modo de desarrollo `dev`

1. Clonar el repositorio
2. Crear una copia del archivo `.env.template` y renombrarlo a `.env` asignando las variables de entorno
3. Instalar dependencias usando `npm install` o si usas yarn `yarn install`
4. Levantar la base de datos usando docker con `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev` (esto nos crea el `prisma client`)
6. Ejecutar el SEED de la base de datos con ```npm run seed```
7. Correr el proyecto usando el modo de desarrollo con `npm run dev`
8. Abrir [http://localhost:3000](http://localhost:3000)
