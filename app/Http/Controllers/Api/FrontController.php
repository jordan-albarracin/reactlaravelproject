<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Empresa;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function empresas(Request $request){
        $data = Empresa::orderByDesc("created_at")->take($request->quantity)->get();
        
        return response()->json($data, 200);
    }

    public function search(Request $request){
        
        $data = Empresa::where("nombre", "like", "%" . $request->text . "%")->get();
        return response()->json($data, 200);
    }

     public function categorias(){
        $data = Categoria::get();
        
        return response()->json($data, 200);
    }

     public function categoria($slug){
        $data = [];
        $categoria = Categoria::whereSlug($slug)->first();
        if(!empty($categoria))
            $data = [
                'categoria' => $categoria,
                'empresas' => $categoria->empresas
            ];
        
        return response()->json($data, 200);
    }

}
