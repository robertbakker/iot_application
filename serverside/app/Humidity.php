<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class Humidity extends Model
{

    protected $table = 'humidities';

    public function getDates()
    {
        return [static::CREATED_AT];
    }

    public function setUpdatedAt($value)
    {
        return $this;
    }
}
