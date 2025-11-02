<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Terrain;

class TerrainController extends Controller
{
    public function index() {
        return response()->json(Terrain::where('actif', true)->get());
    }

    public function show($id) {
        $terrain = Terrain::find($id);
        if (!$terrain) {
            return response()->json(['message' => 'Terrain non trouvé'], 404);
        }
        return response()->json($terrain);
    }

    public function store(Request $r){
        if(!$r->user()->hasRole('admin')) abort(403);
        $data = $r->validate([
            'nom'=>'required|string',
            'prix_par_heure'=>'required|numeric',
            'description'=>'nullable|string',
            'adresse'=>'nullable|string',
            'capacite'=>'nullable|integer',
            'actif'=>'nullable|boolean'
        ]);
        $terrain = Terrain::create($data);
        return response()->json($terrain,201);
    }

    public function update(Request $r,$id){
        if(!$r->user()->hasRole('admin')) abort(403);
        $terrain = Terrain::findOrFail($id);
        $terrain->update($r->all());
        return response()->json($terrain);
    }

    public function destroy(Request $r,$id){
        if(!$r->user()->hasRole('admin')) abort(403);
        Terrain::destroy($id);
        return response()->json(['message'=>'deleted']);
    }
}
