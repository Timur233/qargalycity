<?php
    class Model_Form extends Model
    {
        function send_form ($lang = 'ru', $form_body) {	
            return $this->fetch('https://cms.abpx.kz/api/forms/submit/' . FORM_NAME, $form_body);
        }
    }
?>