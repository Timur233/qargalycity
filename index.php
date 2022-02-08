<?php

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/app/dot_env.php';
require_once __DIR__ . '/app/get_data.php';

$loader = new \Twig\Loader\FilesystemLoader('views/');
$twig = new \Twig\Environment($loader, [
	'cache' 	  => 'cache/',
	'auto_reload' => true //true что бы автоматически чистить кэш
]);

if (isset($_GET['form']) && $_GET['form'] == 'send_form') {
	include  __DIR__ . '/app/send_form.php';
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
