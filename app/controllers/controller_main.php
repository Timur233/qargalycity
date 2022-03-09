<?php
    namespace app\controllers;

    use app\core\Controller;
    use app\models\Model_Building_Steps;
    use app\models\Model_Main;
    use app\core\View;

    class Controller_Main extends Controller
    {
        function action_index() {
            $data = Model_Main::get_data('ru');	
            $data['footer']	= Model_Main::get_footer('ru');

            if (PROJECT_ID !== ''):
                $data['building_steps'] = Model_Building_Steps::get_steps('ru');
            endif;

            View::generate('index.twig', $data);
        }
        
    }
?>