<?php
    class Model_Main extends Model
    {
        function get_data($lang = 'ru') {	
            return $this->fetch('singletons', SINGLETON, array('lang' => $lang));
        }
    }
?>