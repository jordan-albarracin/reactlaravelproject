<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class UserController extends Controller
{
    public function index(){
        //$data = User::all();
        $data = User::whereHas('roles', function($q){
            $q->where("name", "client");
        })->get(["id", "name"]);
                
        return response()->json($data, 200);
    }

    public function show($id) {
        $data = User::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id) {
        //aqui se puede poner una validacion de los datos

        $data = User::find($id);
        $data->fill($request->all());
        $data->save();
        return response()->json($data, 200);
    }


}
