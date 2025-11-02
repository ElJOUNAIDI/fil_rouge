<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Terrain extends Model
{
    protected $fillable = ['nom','description','adresse','capacite','prix_par_heure','actif'];

    public function reservations()
    {
        return $this->hasMany(\App\Models\Reservation::class);
    }
}
