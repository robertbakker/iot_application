<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Temperature;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use DB;

class TemperatureController extends Controller
{

    protected $response;
    protected $request;

    public function __construct(Request $request, ResponseFactory $response)
    {
        $this->response = $response;
        $this->request = $request;
    }

    public function getAveragePerHour()
    {
        $temperatures = Temperature::query()
            ->select(
                DB::raw('GROUP_CONCAT(DISTINCT HOUR(created_at), ":00") AS `hour`'),
                DB::raw('ROUND(AVG(`value`), 1) as value')
            )
            ->groupBy(
                DB::raw('HOUR(`created_at`)'),
                DB::raw('DAY(`created_at`)')
            )
            ->orderBy('created_at')
            ->get();

        return $this->response->json($temperatures->toArray());

    }

    public function store()
    {
        $temperature = new Temperature();
        $temperature->value = floatval($this->request->get('value'));
        $temperature->save();

        return $this->response->json([
            'success' => true
        ]);
    }

}
