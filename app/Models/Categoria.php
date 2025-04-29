<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory;
    protected $guarded = [];
    public $timestamps = false;

    public function empresas()
    {
        return $this->hasMany(Empresa::class);
    }
}
