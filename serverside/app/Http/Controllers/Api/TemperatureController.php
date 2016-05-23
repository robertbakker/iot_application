<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Temperature;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;

class TemperatureController extends Controller
{

    protected $response;
    protected $request;

    public function __construct(Request $request, ResponseFactory $response) {
        $this->response = $response;
        $this->request = $request;
    }

    public function store() {

        $temperature = new Temperature();
        $temperature->value = floatval($this->request->get('value'));
        $temperature->save();

        return $this->response->json([
            'success' => true
        ]);
    }

}
