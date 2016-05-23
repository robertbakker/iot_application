<?php


namespace App;

use Illuminate\Database\Eloquent\Model;

class Temperature extends Model
{

    protected $table = 'temperatures';

    public function getDates()
    {
        return [static::CREATED_AT];
    }

    public function setUpdatedAt($value)
    {
        return $this;
    }
}
