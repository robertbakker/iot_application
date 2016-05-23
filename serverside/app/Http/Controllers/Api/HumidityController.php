<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Humidity;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;

class HumidityController extends Controller
{

    protected $response;
    protected $request;

    public function __construct(Request $request, ResponseFactory $response) {
        $this->response = $response;
        $this->request = $request;
    }

    public function store() {

        $humidity = new Humidity();
        $humidity->value = floatval($this->request->get('value'));
        $humidity->save();

        return $this->response->json([
            'success' => true
        ]);
    }

}
