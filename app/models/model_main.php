<?php
    class Model_Main extends Model
    {
        function get_data($lang = 'ru') {	
            return $data = $this->fetch('singletons', SINGLETON, array('lang' => $lang));
        }
    }
?>