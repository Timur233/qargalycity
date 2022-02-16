<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/app/dot_env.php';
require_once __DIR__ . '/app/get_data.php';

$loader = new \Twig\Loader\FilesystemLoader('views/');
$twig = new \Twig\Environment($loader, [
	'cache' 	  => 'cache/',
	'auto_reload' => true //true что бы автоматически чистить кэш
]);

if (isset($_GET['get']) && $_GET['get'] == 'data') { 

	if (isset($_GET['lang']) && !empty($_GET['lang'])) {
		$lang = $_GET['lang'];
	} else {
		$lang = '';
	}

	$params = array(
		'filter' => array()
	);

	if (isset($_GET['rooms'])) { $params['filter']['rooms'] = $_GET['rooms']; }
	if (isset($_GET['floors'])) { $params['filter']['floors'] = $_GET['floors']; }
	if (isset($_GET['square'])) { $params['filter']['square'] = $_GET['square']; }

	print_r(
		json_encode(
			getLocationPlans(
				$lang, 
				$params
			)
		)
	);

	exit;
}

if (isset($_GET['form']) && $_GET['form'] == 'send_form') {
	include  __DIR__ . '/app/send_form.php';
} elseif (isset($_GET['page']) && $_GET['page'] == 'thanks-page') {
	if (isset($_GET['lang']) && !empty($_GET['lang'])) {
		$lang = $_GET['lang'];
	} else {
		$lang = '';
	}
	$template = $twig->load('thanks.twig');
	echo $template->render(getData($lang));
} else {
	if (isset($_GET['lang']) && !empty($_GET['lang'])) {
		$lang = $_GET['lang'];
	} else {
		$lang = '';
	}
	$template = $twig->load('index.twig');
	echo $template->render(getData($lang));
}

?>
