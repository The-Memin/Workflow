<?php
/*
When there isn't any content found
*/
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<header class="entry-header">
	
		<h1><?php echo esc_html__( '404 - Page Not Found', 'wphierarchy' ); ?></h1>
	
	</header>
	
	<div class="entry-content">
		<p><?php echo  esc_html__( 'Sorry! No content found.', 'wphierarchy' ); ?></p>

		
	</div>
	<p>Template: content none is being displayed.</p>
</article>