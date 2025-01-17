<?php
/*
Displays pages
also available: 
page-{id}
page-{slug}
*/
?>
<?php get_header('landing'); ?>
	<div id="primary" class="content-area">
		
		<main id="main" class="site-main" role="main">
			<?php if(have_posts()) : while( have_posts()) : the_post(); ?>

				<?php get_template_part( 'template-parts/content','page'); ?>

			<?php endwhile;  endif; ?>

			<p>Template: page.php</p>			
		
		</main>
	</div>	
<?php get_footer(); ?>	