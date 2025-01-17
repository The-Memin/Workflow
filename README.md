# Workflow para entorno con Apache, MySQL y Gulp

Este repositorio configura un entorno con Apache y MySQL, junto con un flujo de trabajo para desarrollar proyectos con Gulp.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu sistema:

- [Docker](https://www.docker.com/get-started) (para levantar el contenedor con Apache y MySQL)
- [Node.js](https://nodejs.org/) (para usar npm y Gulp)

## 1. Arrancar el contenedor con Apache y MySQL

Primero, debes levantar el contenedor Docker que contiene tu entorno de desarrollo con Apache y MySQL.

1. Abre una terminal y navega al directorio donde se encuentra el archivo `docker-compose.yml`.
2. Ejecuta el siguiente comando para iniciar el contenedor:

   ```bash
   docker-compose up -d

Este comando descargará y levantará los contenedores necesarios para el entorno de desarrollo. Asegúrate de que el contenedor se haya iniciado correctamente. Puedes verificarlo con:

    ```bash
    docker ps

2. Instalar las dependencias con npm
Una vez que el contenedor esté corriendo, es momento de instalar las dependencias del proyecto.

Navega al directorio del proyecto en tu terminal.

Ejecuta el siguiente comando para instalar las dependencias de Node.js:

    ```bash
    npm install

Esto instalará todas las dependencias necesarias definidas en el archivo package.json.

3. Arrancar el proyecto con Gulp
Para un nuevo proyecto
Si estás comenzando un nuevo proyecto, utiliza el siguiente comando para crear y servir el proyecto:

    ```bash
    gulp create-and-serve --name {nombre del proyecto}

Sustituye {nombre del proyecto} por el nombre que deseas para tu nuevo proyecto. Esto creará el proyecto con la configuración predeterminada y lo pondrá en marcha en el entorno.

Para un proyecto existente
Si ya tienes un proyecto existente, simplemente utiliza el siguiente comando para servirlo:

    ```bash
    gulp serve --name {nombre del proyecto}

Sustituye {nombre del proyecto} por el nombre del proyecto que deseas servir. Esto iniciará el proyecto en el entorno de desarrollo.

4. Detener el contenedor
Cuando hayas terminado de trabajar, puedes detener el contenedor con el siguiente comando:
    
    ```bash
    docker-compose down

Este comando detendrá y eliminará el contenedor, pero no afectará los archivos del proyecto.
