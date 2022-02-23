<?php
    class Model_Filter extends Model
    {
        function filter_by_params($lang = 'ru', $params) {	
            return $this->fetch('https://cms.abpx.kz/api/collections/get/' . FLATS_COLLECTION, $params);
        }
    }
?>