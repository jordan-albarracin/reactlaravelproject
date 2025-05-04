<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use Illuminate\Support\Str;

class EmpresaController extends Controller
{
    public function index(){
        //$data = Empresa::all();

        $data = Empresa::whereUser_id(auth()->user()->id)->orderBy("orden")->get(["id", "orden", "nombre"]);
        return response()->json($data, 200);
    }

    public function store(Request $request) {
        //validacion

        $data = new Empresa($request->all());
        $data->user_id = auth()->user()->id;
        ///upload image base64
        if($request->urlfoto){
            $img = $request->urlfoto;
            /// process
            $folderPath = "/img/empresa/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' .$image_type;
            file_put_contents(public_path($file), $image_base64);

            //save img in DB
            $data->urlfoto = Str::slug($request->nombre) . '.' .$image_type;
        }

        $data->save();
        return response()->json($data, 200);
        
    }


}
