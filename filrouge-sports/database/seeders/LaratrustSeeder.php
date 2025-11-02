<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use App\Models\Terrain;
use Illuminate\Support\Facades\Hash;

class LaratrustSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Créer les rôles
        $adminRole = Role::firstOrCreate(['name'=>'admin', 'display_name'=>'Admin']);
        $userRole  = Role::firstOrCreate(['name'=>'user', 'display_name'=>'Utilisateur']);

        // Créer l'admin
        $admin = User::firstOrCreate(
            ['email'=>'admin@example.com'],
            ['name'=>'Admin','password'=>Hash::make('password')]
        );
        $admin->roles()->syncWithoutDetaching([$adminRole->id]);

        // Créer un utilisateur normal
        $user = User::firstOrCreate(
            ['email'=>'user@example.com'],
            ['name'=>'Utilisateur','password'=>Hash::make('password')]
        );
        $user->roles()->syncWithoutDetaching([$userRole->id]);

        // Créer des terrains
        Terrain::firstOrCreate(['nom'=>'Terrain A'], [
            'description'=>'Terrain synthétique 5v5',
            'adresse'=>'Stade Central',
            'capacite'=>10,
            'prix_par_heure'=>30
        ]);

        Terrain::firstOrCreate(['nom'=>'Terrain B'], [
            'description'=>'Terrain herbe 7v7',
            'adresse'=>'Complexe Nord',
            'capacite'=>14,
            'prix_par_heure'=>45
        ]);
    }
}

