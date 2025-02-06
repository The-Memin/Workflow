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
   ```
Este comando descargará y levantará los contenedores necesarios para el entorno de desarrollo. Asegúrate de que el contenedor se haya iniciado correctamente. Puedes verificarlo con:

    docker ps

2. Instalar las dependencias con npm
Una vez que el contenedor esté corriendo, es momento de instalar las dependencias del proyecto.

Navega al directorio del proyecto en tu terminal.

Ejecuta el siguiente comando para instalar las dependencias de Node.js:

    npm install
    
Esto instalará todas las dependencias necesarias definidas en el archivo package.json.

3. Arrancar el proyecto con Gulp
Para un nuevo proyecto
Si estás comenzando un nuevo proyecto, utiliza el siguiente comando para crear y servir el proyecto:

    ```bash
    gulp create-and-serve --name {nombre del proyecto}
    ```
Sustituye {nombre del proyecto} por el nombre que deseas para tu nuevo proyecto. Esto creará el proyecto con la configuración predeterminada y lo pondrá en marcha en el entorno.

Para un proyecto existente
Si ya tienes un proyecto existente, simplemente utiliza el siguiente comando para servirlo:

    gulp serve --name {nombre del proyecto}
    
Sustituye {nombre del proyecto} por el nombre del proyecto que deseas servir. Esto iniciará el proyecto en el entorno de desarrollo.


> [!IMPORTANT]
> Es posible que tengas el siguiente problema
# Solución a problemas con Enlaces Permanentes en WordPress dentro de un Contenedor con Apache y PHP

Si al cambiar los enlaces permanentes en WordPress de "Simple" a "Nombre de la entrada" las páginas muestran un error 404, probablemente sea un problema con `mod_rewrite` en Apache o con el archivo `.htaccess`.

### 1. Habilitar `mod_rewrite` en Apache

Accede al contenedor y ejecuta:

```sh
docker exec -it <nombre-del-contenedor> bash
```

Luego, habilita `mod_rewrite`:

```sh
a2enmod rewrite
service apache2 restart
```

### 2. Configurar Apache para permitir sobrescritura (`AllowOverride All`)

Edita el archivo de configuración de Apache:

```sh
nano /etc/apache2/apache2.conf
```

Busca la sección `<Directory /var/www/>` y asegúrate de que tenga lo siguiente:

```apache
<Directory /var/www/>
    AllowOverride All
    Require all granted
</Directory>
```

Guarda los cambios y reinicia Apache:

```sh
service apache2 restart
```

### 3. Verificar el archivo `.htaccess`

Asegúrate de que WordPress tenga un archivo `.htaccess` en la raíz de la instalación de cada proyecto (`/var/www/html/{nombre del proyecto}`):
> [!NOTE]
> cambia {nombre del proyecto} por el nombre correspondiente de cada proyecto

```sh
ls -la /var/www/html/{nombre del proyecto}/.htaccess
```

Si no existe, créalo con este contenido:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /{nombre del proyecto}/index.php [L]
</IfModule>
# END WordPress
```

Asigna los permisos adecuados:

```sh
chown www-data:www-data /var/www/html/{nombre del proyecto}/.htaccess
chmod 664 /var/www/html/{nombre del proyecto}/.htaccess
```

### 4. Reiniciar el contenedor

Si hiciste cambios en Apache, reinicia el contenedor:

```sh
docker restart <nombre-del-contenedor>
```

O si usas `docker-compose`:

```sh
docker-compose restart
```

### 5. Guardar nuevamente los enlaces permanentes

- Ve a **Ajustes > Enlaces permanentes** en WordPress.
- Haz clic en "Guardar cambios" sin modificar nada.
- Verifica si las URLs funcionan correctamente.

### 6. Verificar logs de Apache si el problema persiste

Si sigues teniendo problemas, revisa los logs de Apache para identificar errores:

```sh
docker logs <nombre-del-contenedor>
```

O dentro del contenedor:

```sh
tail -f /var/log/apache2/error.log
```

Con estos pasos, deberías poder solucionar los problemas de enlaces permanentes en WordPress dentro de un contenedor con Apache. 🚀


4. Detener el contenedor
Cuando hayas terminado de trabajar, puedes detener el contenedor con el siguiente comando:
    
    docker-compose down

Este comando detendrá y eliminará el contenedor, pero no afectará los archivos del proyecto.
