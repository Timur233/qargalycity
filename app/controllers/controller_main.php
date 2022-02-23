<?php
    class Controller_Main extends Controller
    {

        function __construct()
        {
            $this->model = new Model_Main();
            $this->view = new View();
        }
        
        function action_index()
        {
            $data = $this->model->get_data('ru');	
            $data['footer']	= $this->model->get_footer('ru');

            $this->view->generate('index.twig', $data);
        }
        
    }
?>