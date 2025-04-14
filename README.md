# Gestión de Inventario

Este proyecto es una aplicación web de gestión de inventario desarrollada con Angular y NestJS. Permite a los usuarios administrar productos, categorías y movimientos de inventario de manera eficiente.

## Características Principales

* **Gestión de Productos**: Permite agregar, editar y eliminar productos, así como ver el stock y el precio de cada producto.
* **Gestión de Categorías**: Permite agregar, editar y eliminar categorías para organizar los productos.
* **Movimientos de Inventario**: Permite registrar entradas y salidas de productos, así como ver el historial de movimientos.
* **Interfaz de Usuario Moderna**: Diseñada con Angular Material para una experiencia de usuario intuitiva y agradable.
* **Backend Robusto**: Desarrollado con NestJS para un rendimiento óptimo y una fácil escalabilidad.
* **Autenticación y Autorización**: Protege la aplicación con autenticación y autorización para garantizar la seguridad de los datos.

## Tecnologías Utilizadas

* **Frontend**:
    * Angular
    * Angular Material
    * TypeScript
* **Backend**:
    * Node.js
    * MongoDB (o tu base de datos preferida)
* **Otros**:
    * Git
    * npm

## Requisitos

* Node.js (versión 14 o superior)
* npm (versión 6 o superior)
* Angular CLI (versión 12 o superior)
* MongoDB (o tu base de datos preferida)

## Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/tu-usuario/gestion-inventario.git](https://github.com/tu-usuario/gestion-inventario.git)
    cd gestion-inventario
    ```

2.  **Instala las dependencias del frontend:**

    ```bash
    cd frontend
    npm install
    ```

3.  **Instala las dependencias del backend:**

    ```bash
    cd ../backend
    npm install
    ```

4.  **Configura la base de datos:**

    * Asegúrate de que MongoDB esté instalado y en ejecución.
    * Crea un archivo `.env` en el directorio `backend` con las variables de entorno necesarias para la conexión a la base de datos.

5.  **Ejecuta el backend:**

    ```bash
    npm run start:dev
    ```

6.  **Ejecuta el frontend:**

    ```bash
    cd ../frontend
    ng serve
    ```

7.  **Abre la aplicación en tu navegador:**

    * Ve a `http://localhost:4200/`

## Estructura del Proyecto

* `frontend/`: Contiene el código fuente del frontend desarrollado con Angular.
* `backend/`: Contiene el código fuente del backend desarrollado con NestJS.

## Contribución

¡Las contribuciones son bienvenidas! Si encuentras algún error o tienes alguna sugerencia de mejora, por favor, abre un issue o envía un pull request.

## Nota Importante()
username: 'admin',
password: 'admin123'

username: 'empleado',
password: 'empleado123'

.env
MONGO_URI=mongodb://localhost:27017/inventario
JWT_SECRET=mi_super_secreto_jwt # Cambia esto en producción
PORT=3000
