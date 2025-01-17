<?php
/*
Displays Pages content
*/
?>
<article id="post-<?php the_ID(); ?>" class="post">
	
	<header class="entry-header">
	
	<h1><?php the_title( '<h1>', '</h1>') ?></h1>
	
	</header>
	
	<div class="entry-content">
		<?php the_content() ?>
	</div>
	<p>Template: content-page.php</p>		
</article>