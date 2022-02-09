<?php
require_once('config.php');

function getData($lang='ru')
{

  $data = collectData('singletons', SINGLETON, array('lang' => $lang));

  $collection = collectData('collections', FLATS_COLLECTION);
  $data['offers'] = json_encode($collection['entries']);

  $data['footer'] = collectData('singletons', 'main_footer', array('lang' => $lang));

  $data['admin'] = isset($_GET['admin']) ? $_GET['admin'] : '';
  $data['lang'] = isset($_GET['lang']) ? $_GET['lang'] : 'ru';

  return $data;

}

function getLocationPlans($lang='ru', $params) {
  $collection = collectData('collections', FLATS_COLLECTION, $params);

  return $collection;
}

function collectData($type, $item, $params = array()) {

  $ch = curl_init('https://cms.abpx.kz/api/' . $type . '/get/' . $item . '?token=account-' . SING_TOKEN);

  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/json'
  ));

  if (!empty($params)) {
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
  }

  $responce = curl_exec($ch);

  return json_decode($responce, true);

}

?>
