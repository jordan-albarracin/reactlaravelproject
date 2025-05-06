<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Empresa;
use Illuminate\Support\Str;

class EmpresaController extends Controller
{
    public function index()
    {
        //$data = Empresa::all();

        $data = Empresa::whereUser_id(auth()->user()->id)->orderBy("orden")->get(["id", "orden", "nombre"]);
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        //validacion

        $data = new Empresa($request->all());
        $data->user_id = auth()->user()->id;
        ///upload image base64
        if ($request->urlfoto) {
            $img = $request->urlfoto;
            /// process
            $folderPath = "/img/empresa/";
            $image_parts = explode(";base64,", $img);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = $folderPath . Str::slug($request->nombre) . '.' . $image_type;
            file_put_contents(public_path($file), $image_base64);

            //save img in DB
            $data->urlfoto = Str::slug($request->nombre) . '.' . $image_type;
        }

        $data->save();
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $data = Empresa::find($id);
        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
{
    try {
        $empresa = Empresa::findOrFail($id);
        

        // Actualizar campos básicos
        $empresa->fill($request->except('urlfoto')); // Excluye urlfoto para manejarlo aparte

        // Procesar imagen SOLO si es una nueva imagen en Base64
        if ($request->filled('urlfoto') && str_contains($request->urlfoto, ';base64,')) {
            
            // Eliminar imagen anterior si existe
            if ($empresa->urlfoto) {
                $oldImagePath = public_path("/img/empresa/{$empresa->urlfoto}");
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Procesar nueva imagen
            $imageData = explode(',', $request->urlfoto)[1];
            $imageType = explode('/', explode(';', $request->urlfoto)[0])[1];
            $filename = Str::slug($request->nombre) . '.' . $imageType;
            $path = public_path("/img/empresa/{$filename}");

            file_put_contents($path, base64_decode($imageData));
            $empresa->urlfoto = $filename;
        }

        $empresa->save();
        return response()->json($empresa);

    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Error al actualizar',
            'details' => $e->getMessage()
        ], 500);
    }
}
}
