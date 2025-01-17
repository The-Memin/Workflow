<?php
	/* displays the content of the main post on blog page*/
?>
<div id="last-post">
	<div class="post-pic">
		<div class="outer">
			<?php
				//get the image and display it as background image 
				$img = get_field('post_image');
			 ?>
			<div class="inner" style="background: <?php the_field('color') ?> url('<?php echo $img['url']; ?>') no-repeat center;  background-size: 85%;">
				<div class="wrp-caption">
					<div>Latest publication</div>
				</div>
			</div>
		</div>
	</div>
	<div class="post-info">
		<h2><?php the_title(); ?></h2>
		<p><?php the_field('intro'); ?></p>
		
		<div id="link-container">
			<a href="<?php the_permalink(); ?>" style=" background-color: <?php the_field('color') ?> ">
				<div class="post-btn">Read more</div>
			</a>
		</div>
	</div>
</div>