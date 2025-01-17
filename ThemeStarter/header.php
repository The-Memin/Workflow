<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1, maximum-scale=1, user-scalable=no" />
<title>
    <?php wp_title( '|', true, 'right' ); ?>
    <?php
            echo get_bloginfo('name');// this is the name of your website.
            // use your code to display title in all other pages.
    ?>
</title>

<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
	<div id="page-wrapper">
		<nav class="nav flex-normal">
			<div class="logo"></div>
			<div class="menu-trigger">
				<div class="icon"></div>
				<div class="icon"></div>
			</div>
			<div class="menu">
				<div class="menu-item">Inicio</div>
				<div class="menu-item">Servicios</div>	
				<div class="menu-item">Productos</div>	
				<div class="menu-item">Contacto</div>	
				<div class="menu-item">Conocenos</div>	
				<div class="menu-item">Blog</div>	
				<div class="menu-item">Más</div>		
			</div>
		</nav>