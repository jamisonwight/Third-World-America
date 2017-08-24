<?php

// define( 'WP_DEBUG', true );

function wp_stylesheets() {
	// Add main stylesheet
	wp_register_style('style.css', (get_stylesheet_directory_uri() . '/dist/style.css'), false, false, 'screen');
	wp_enqueue_style('style.css');

	// Zanim
	wp_register_style('zanim.css', (get_stylesheet_directory_uri() . '/src/js/lib/zanim/dist/zanim.css'), false, false, 'screen');
	wp_enqueue_style('zanim.css');

  wp_register_style('google-fonts', (get_stylesheet_directory_uri() . 'https://fonts.googleapis.com/css?family=Oswald:200,300,400,500,600,700|Playfair+Display:400,400i,700,700i,900,900i|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i'), false, false, 'screen');
	wp_enqueue_style('google-fonts');
}
add_action( 'wp_enqueue_scripts', 'wp_stylesheets' );

// Main script file
function wp_assets() {
	// Zanim 
	// wp_register_script('zanim', (get_stylesheet_directory_uri() . '/src/js/lib/zanim/dist/zanim.js'), false, null, true);
	// wp_enqueue_script('zanim');

  wp_register_script('app', (get_stylesheet_directory_uri() . '/dist/bundle.js'), false, null, true);
	wp_enqueue_script('app');

}

add_action( 'wp_enqueue_scripts', 'wp_assets' ); 

// Add post thumbnail support
add_theme_support( 'post-thumbnails' );


/*  EXCERPT 
    Usage:
    
    <?php echo excerpt(100); ?>
*/
function excerpt($limit) {
    $excerpt = explode(' ', get_the_excerpt(), $limit);
    if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
    } else {
    $excerpt = implode(" ",$excerpt);
    } 
    $excerpt = preg_replace('`\[[^\]]*\]`','',$excerpt);
    return $excerpt;
}

// Add custom thumbnail size
if (function_exists( 'add_image_size' ) ) {
  add_image_size('300x180', 300, 180, true);
	add_image_size('thumb-large', 768, 512, true);
}


/*
|--------------------------------------------------------------------------
| Prepare REST
|--------------------------------------------------------------------------
*/

// Get post before it is returned
function prepare_rest($response, $post, $request) {
	$data = $response->data;

	// Get post categories
	$category_list = get_the_category($post->ID);
	$data['category_list'] = $category_list;

	$response->data = $data;

	return $response;
}
add_filter( 'rest_prepare_post', 'prepare_rest', 10, 3 );


function prepare_rest_images($response, $attachment, $request) {
	$data = $response->data;

	// Get post categories
	$imgURL = wp_get_attachment_url($attachment->ID);
	$data['imgURL'] = $imgURL;

	$response->data = $data;

	return $response;
}
add_filter( 'rest_prepare_attachment', 'prepare_rest_images', 10, 3 );