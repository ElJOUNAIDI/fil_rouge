<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Terrain;
use Carbon\Carbon;

class ReservationController extends Controller
{
    public function store(Request $r){
        $data = $r->validate([
            'terrain_id'=>'required|exists:terrains,id',
            'date_reservation'=>'required|date',
            'heure_debut'=>'required|date_format:H:i',
            'heure_fin'=>'required|date_format:H:i|after:heure_debut',
            'mode_paiement'=>'required|in:cash,card'
        ]);

        $conflict = Reservation::where('terrain_id',$data['terrain_id'])
            ->where('date_reservation',$data['date_reservation'])
            ->whereRaw('? < heure_fin AND ? > heure_debut',[$data['heure_debut'],$data['heure_fin']])
            ->exists();

        if($conflict) return response()->json(['message'=>'Conflit : plage horaire indisponible'],409);

        $terrain = Terrain::findOrFail($data['terrain_id']);
        $start = Carbon::createFromFormat('H:i',$data['heure_debut']);
        $end = Carbon::createFromFormat('H:i',$data['heure_fin']);
        $hours = max(1,$end->diffInHours($start));
        $montant = $terrain->prix_par_heure * $hours;

        $reservation = Reservation::create([
            'user_id'=>$r->user()->id,
            'terrain_id'=>$data['terrain_id'],
            'date_reservation'=>$data['date_reservation'],
            'heure_debut'=>$data['heure_debut'],
            'heure_fin'=>$data['heure_fin'],
            'mode_paiement'=>$data['mode_paiement'],
            'montant'=>$montant,
            'statut'=>'pending'
        ]);

        return response()->json($reservation,201);
    }

    public function myReservations(Request $r){
        return response()->json($r->user()->reservations()->with('terrain')->get());
    }

    public function allReservations(Request $r){
        if(!$r->user()->hasRole('admin')) abort(403);
        return response()->json(Reservation::with(['terrain','user'])->get());
    }

    public function destroy(Request $r,$id){
        $res = Reservation::findOrFail($id);
        if($r->user()->id!==$res->user_id && !$r->user()->hasRole('admin')) abort(403);
        $res->delete();
        return response()->json(['message'=>'deleted']);
    }

    // Mettre à jour le statut d'une réservation (admin)
    public function updateStatus(Request $r, $id)
    {
        if (!$r->user()->hasRole('admin')) abort(403);

        $reservation = Reservation::findOrFail($id);
        $r->validate(['status' => 'required|in:pending,rejected,completed']);
        $reservation->statut = $r->status;
        $reservation->save();

        return response()->json($reservation);
    }
}
