<?php
/*
Displays posts content
*/
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<header class="entry-header">
		
		<span class="dashicons dashicons-format-<?php echo get_post_format( $post->ID ); ?>"></span>
	
		<?php the_title( '<h1>', '</h1>') ?>

		<div class="by-line">
			<?php esc_html_e( 'Author:' ) ?> <?php the_author(); ?>
		</div>
	
	</header>
	
	<div class="entry-content">
		<?php the_content() ?>
	</div>
	<p>template: content.php</p>
	<?php 
	/*if(comments_open()){
		comments_template(); 
	}*/
	?>

</article>