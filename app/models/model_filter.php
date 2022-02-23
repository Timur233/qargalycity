<?php
    class Model_Filter extends Model
    {
        function filter_by_params($lang = 'ru', $params) {	
            return $this->fetch('collections', FLATS_COLLECTION, $params);
        }
    }
?>