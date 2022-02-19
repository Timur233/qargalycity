<?php

    require_once __DIR__ . '/../vendor/autoload.php';

    $data = json_decode(file_get_contents("php://input"),true);
    $body = array( 'form' => array() );

    foreach ($data as $input) {
        $body['form'][$input['name']] = $input['data'];
    }

    $ch = curl_init('https://cms.abpx.kz/api/forms/submit/' . FORM_NAME . '?token=account-'.SING_TOKEN);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json' ));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

    $responce = curl_exec($ch);
    curl_close($ch);

    $responce = json_decode($responce, true);

    $refer = parse_url($_SERVER['HTTP_REFERER']);
    parse_str($refer['query'], $query);
    
    $lang = 'ru';

    if (isset($query['lang'])) {
        $lang = $query['lang'];
    }

    $translater = getData($lang);
    $translater = $translater['translate'];

    $loader = new \Twig\Loader\FilesystemLoader('views/');
    $twig = new \Twig\Environment($loader, [
        'cache' => 'cache/',
        'auto_reload' => true
    ]);

    $viewData = array(
        'userName'    => $responce['Имя'],
        'translater'  => $translater,
        'isPresent'   => true,
        'presentLink' => 'https://t.me/Exclusive_q_bot?start=biznes',
        'presentName' => '10 вопросов, которые помогут найти квартиру мечты'
    );

    $template = $twig->load('widgets/thanks-msg.twig');
    echo $template->render($viewData);

    exit;
?>