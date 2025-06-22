# Teslo Shop | Ecommerce Full-Stack

¡Bienvenido a Teslo Shop! Una plataforma de comercio electrónico de alto rendimiento construida con las tecnologías más modernas del ecosistema de JavaScript. 

Este proyecto ofrece una experiencia de compra fluida, segura y escalable, utilizando las últimas características de Next.js como los **Server Actions**, sistemas de autenticación modernos como **NextAuth** y el uso de buenas prácticas mediante **Zustand**.

## 🚀 Stack Tecnológico

Este proyecto utiliza una selección de tecnologías eficientes para garantizar el mejor rendimiento y la mejor experiencia de desarrollo.

| Área                | Tecnología                                                                                                                                                                                                                                                                                                                            |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                                                                                                                                                                                                                                 |
| **Tecnología Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                                                                                                                                                                                                                                     |
| **Lenguaje** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                                                                                                                                         |
| **Gestión de Estado** | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=bear&logoColor=white)                                                                                                                                                                                                                                   |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)                                                                                                                                                                                                                                 |
| **Base de Datos** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)                                                                                                                                                                                                                       |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)                                                                                                                                                                                                                                     |
| **Pagos** | ![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)                                                                                                                                                                                                                                     |
| **Contenerización** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)                                                                                                                                                                                                                                     |

---

## 🔧 Guía de Instalación y Puesta en Marcha

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo local.

### **1. Prerrequisitos**

Asegúrate de tener instalado lo siguiente en tu sistema:

-   [Node.js](https://nodejs.org/) (v18.x o superior)
-   [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
-   [Docker](https://www.docker.com/products/docker-desktop/) y [Docker Compose](https://docs.docker.com/compose/install/)

### **2. Clonar el Repositorio**

```bash
git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
cd tu-repositorio
```

### **3. Configurar Variables de Entorno**

Crea una copia del archivo `.env.template` y renómbralo a `.env`. Luego, asigna los valores correspondientes a cada variable.

```bash
cp .env.template .env
```

Dentro del archivo `.env`, encontrarás variables críticas para el funcionamiento de la aplicación:
-   `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL.
-   `NEXT_PUBLIC_PAYPAL_CLIENT_ID`: ID de cliente de tu aplicación de PayPal Sandbox.
-   `PAYPAL_SECRET`: Clave secreta de tu aplicación de PayPal Sandbox.
-   `NEXTAUTH_SECRET`: Un secreto para la autenticación. Puedes generar uno en la terminal con: `openssl rand -base64 32`.

### **4. Instalar Dependencias**

Usa tu gestor de paquetes preferido para instalar todas las dependencias del proyecto.

```bash
npm install
```
*O si usas yarn:*
```bash
yarn install
```

### **5. Levantar la Base de Datos con Docker**

El proyecto está configurado para usar PostgreSQL en un contenedor de Docker. Ejecuta el siguiente comando para iniciar el servicio de la base de datos en segundo plano (`-d`).

```bash
docker compose up -d
```

### **6. Aplicar Migraciones de la Base de Datos**

Prisma necesita sincronizar el esquema de la base de datos con los modelos definidos en `schema.prisma`. Este comando también genera el Cliente de Prisma (`@prisma/client`) para interactuar con la base de datos de forma segura.

```bash
npx prisma migrate dev
```

### **7. Poblar la Base de Datos (Seed)**

Ejecuta el script de "seed" para poblar la base de datos con datos de prueba (productos, usuarios, categorías, etc.).

```bash
npm run seed
```

### **8. ¡Ejecutar el Proyecto!**

Finalmente, inicia el servidor de desarrollo de Next.js.

```bash
npm run dev
```

¡Listo! Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la Teslo Shop en acción.

---

## 🐳 Comandos Útiles de Docker

-   **Iniciar contenedor en segundo plano:** `docker compose up -d`
-   **Detener contenedores:** `docker compose down`
-   **Ver logs de los servicios:** `docker compose logs -f`
-   **Acceder a la terminal del contenedor de la BD:** `docker compose exec teslo-db bash`
-   **Conectarse a la base de datos con psql:** `docker compose exec -it teslo-db psql -U postgres`

---
**Desarrollado con ❤️ por Daniel Díaz**