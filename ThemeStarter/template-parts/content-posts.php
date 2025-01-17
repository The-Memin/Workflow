<?php
/*
Displays posts content on the loop of blog page
*/
?>

	
	<div class="item" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<div class="item-img">
			<div class="outer">
				<?php
					//get the image and display it as background image 
					$img = get_field('post_image');
				 ?>
				<div class="inner" style="background: <?php the_field('color') ?> url('<?php echo $img['url']; ?>') no-repeat center;  background-size: 85%;">
					<div class="wrp-caption">
						
					</div>
				</div>
			</div>
		</div>
		<div class="inf-wrpp">
			<h3><?php the_title(); ?></h3>
			<p><?php the_field('intro'); ?></p>
		</div>
		<a href="<?php the_permalink(); ?>" style=" background-color: <?php the_field('color') ?> ">
			<div class="item-btn">Read more</div>
		</a>
	</div>
			
