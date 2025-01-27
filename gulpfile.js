const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fs = require('fs-extra');
const path = require('path');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const argv = require('yargs').argv;
const concat = require('gulp-concat');


// Task: Create a new project
gulp.task('create-project', async function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const distPath = path.join(__dirname, 'dist', projectName);
    const srcPath = path.join(__dirname, 'src', projectName);
    const themePath = path.join(distPath, 'wp-content', 'themes', projectName);

    try {
        // Create directories
        await fs.ensureDir(distPath);
        await fs.ensureDir(srcPath);
        await fs.ensureDir(themePath);

        // Copy WordPress files to dist/{projectName}
        const wordpressPath = path.join(__dirname, 'wordpress');
        await fs.copy(wordpressPath, distPath);

        // Copy ThemeStarter files to src/{projectName}
        const themeStarterPath = path.join(__dirname, 'ThemeStarter');
        await fs.copy(themeStarterPath, srcPath);

        console.log(`✅ Project "${projectName}" created successfully!`);
    } catch (error) {
        console.error('❌ Error creating project:', error);
    }
});

// Task: Compile SCSS
gulp.task('compile-scss', function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const srcScssPath = path.join(__dirname,'src', projectName, 'assets', 'scss', 'style.scss'); // Archivo principal SCSS
    const destCssPath = path.join(__dirname, 'dist', projectName, 'wp-content', 'themes', projectName);

    return gulp.src(srcScssPath)
        .pipe(sass().on('error', sass.logError)) // Compila el SCSS
        .pipe(rename({ dirname: '.', basename: 'style', extname: '.css' })) // Renombra el archivo a style.css
        .pipe(gulp.dest(destCssPath)) // Guarda el archivo en la carpeta destino
        .pipe(browserSync.stream()); // Refresca el navegador
});

// Tarea por defecto para compilar SCSS y observar cambios
gulp.task('watch', function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const scssWatchPath = path.join(__dirname, 'src', projectName,'assets', 'scss', '**/*.scss'); // Observa todos los archivos SCSS
    const destCssPath = path.join(__dirname, 'dist', projectName, 'wp-content', 'themes', projectName);

    browserSync.init({
        server: {
            baseDir: destCssPath,
        },
    });

    gulp.watch(scssWatchPath, gulp.series('compile-scss'));
});

// Task: Minify JS
gulp.task('minify-js', function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const srcJsPath = path.join(__dirname, 'src', projectName, '**/*.js');
    const destJsPath = path.join(__dirname, 'dist', projectName, 'wp-content', 'themes', projectName, 'assets', 'code', 'general');

    return gulp.src(srcJsPath)
        .pipe(concat('code.js')) // Concatenate all JS files into code.js
        .pipe(uglify())          // Minify the concatenated file
        .pipe(gulp.dest(destJsPath))
        .pipe(browserSync.stream());
});


// Task: Copy PHP files
gulp.task('copy-php', function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const srcPhpPath = path.join(__dirname, 'src', projectName, '**/*.php');
    const destPhpPath = path.join(__dirname, 'dist', projectName, 'wp-content', 'themes', projectName);

    return gulp.src(srcPhpPath)
        .pipe(gulp.dest(destPhpPath))
        .pipe(browserSync.stream());
});

// Task: Serve and watch files
gulp.task('serve', function () {
    const projectName = argv.name;

    if (!projectName) {
        console.error('❌ Error: Please specify a project name using --name');
        return;
    }

    const distPath = path.join(__dirname, 'dist', projectName);

    browserSync.init({
        proxy: `http://localhost:8080/${projectName}`,
        notify: false
    });

    gulp.watch(path.join(__dirname, 'src', projectName, '**/*.scss'), gulp.series('compile-scss'));
    gulp.watch(path.join(__dirname, 'src', projectName, '**/*.js'), gulp.series('minify-js'));
    gulp.watch(path.join(__dirname, 'src', projectName, '**/*.php'), gulp.series('copy-php')).on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('compile-scss', 'minify-js', 'copy-php'));

// Task: Build project
gulp.task('build', gulp.series('compile-scss', 'minify-js', 'copy-php'));

// Task: Create and Serve
gulp.task('create-and-serve', gulp.series('create-project', 'default', 'serve'));