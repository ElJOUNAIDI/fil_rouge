<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id','terrain_id','date_reservation','heure_debut','heure_fin','statut','montant','mode_paiement'];

    public function terrain()
    {
        return $this->belongsTo(Terrain::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
