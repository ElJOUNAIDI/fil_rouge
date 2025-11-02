<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Role;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6|confirmed'
        ]);

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password'])
        ]);

        // Récupérer le rôle "user"
        $role = Role::where('name', 'user')->first();
        if ($role) {
            $user->roles()->syncWithoutDetaching([$role->id]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        // Charger les rôles et transformer pour le frontend
        $user->load('roles');
        $userArray = $user->toArray();
        $userArray['roles'] = $user->roles->pluck('name'); // ['user'] ou ['admin']

        return response()->json(['user'=>$userArray,'token'=>$token], 201);
    }

    public function login(Request $r)
    {
        $r->validate(['email'=>'required|email','password'=>'required']);
        $user = User::where('email',$r->email)->first();
        if (!$user || !Hash::check($r->password, $user->password))
            throw ValidationException::withMessages(['email'=>['Identifiants invalides']]);

        $token = $user->createToken('api-token')->plainTextToken;

        // Charger les rôles
        $user->load('roles');
        $userArray = $user->toArray();
        $userArray['roles'] = $user->roles->pluck('name');

        return response()->json(['user'=>$userArray,'token'=>$token]);
    }

    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out']);
    }

    public function me(Request $r)
    {
        $user = $r->user()->load('roles');
        $userArray = $user->toArray();
        $userArray['roles'] = $user->roles->pluck('name');

        return response()->json($userArray);
    }
}
