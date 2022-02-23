<?php
    class Model_Main extends Model
    {
        function get_data($lang = 'ru') {	
            return $this->fetch('https://cms.abpx.kz/api/singletons/get/'.SINGLETON, array('lang' => $lang));
        }

        function get_footer($lang = 'ru') {	
            return $this->fetch('https://cms.abpx.kz/api/singletons/get/main_footer', array('lang' => $lang));
        }
    }
?>