<?php
    include './app/models/model_main.php';

    class Controller_Form extends Controller
    {

        function __construct() {
            $this->model = new Model_Form();
            $this->model_main = new Model_Main();
            $this->query = json_decode(file_get_contents('php://input'), true);
            $this->view = new View();
        }
        
        function action_index() {         

        }

        function action_send() {
            
            $form_body = [];
            
            foreach ($this->query as $input) {
                $form_body['form'][$input['name']] = $input['data'];
            }

            return self::render_responce($this->model->send_form('ru', $form_body));

        }

        function render_responce($data) {
            
            $site = $this->model_main->get_data('ru');

            $viewData = array(
                'userName'    => $data['Имя'],
                'translater'  => $site['translate'],
                'isPresent'   => false
            );

            return $this->view->generate('widgets/thanks-msg.twig', $viewData);
        }
        
    }
?>