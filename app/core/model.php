<?php
    class Model
    {
        public function fetch($type, $item, $params = array()) {

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
            curl_close($ch);
          
            return json_decode($responce, true);
          
        }

        public function send_form($params) {

            $ch = curl_init('https://cms.abpx.kz/api/forms/submit/' . FORM_NAME . '?token=account-'.SING_TOKEN);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array( 
                'Content-Type: application/json' 
            ));

            if (!empty($params)) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($params));
            }

            $responce = curl_exec($ch);
            curl_close($ch);

            return json_decode($responce, true);
            
        }
        
    }
?>