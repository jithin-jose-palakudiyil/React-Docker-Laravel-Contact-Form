<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use \Exception;
class CustomerContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // server side validation
        $validator = Validator::make($request->all(), [ 
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|numeric',
            'address' => 'required|array',
            'address.country' => 'required|string',
            'address.house_number' => 'numeric|required',
            'address.street_name' => 'required|string',
            'address.state' => 'required|string',
            'address.city' => 'required|string',  
        ],[
            'address.country.required' =>'The country field is required.',
            'address.country.string' =>'The country field is must be an string.',

            'address.house_number.required' =>'The house number field is required.',
            'address.house_number.numeric' =>'The house number field must be an integer.',

            'address.street_name.required' =>'The street name field is required.',
            'address.street_name.string' =>'The street name field must be a string.',

            'address.state.required' =>'The state/province field is required.',
            'address.state.string' =>'The state/province field must be a string.',

            'address.city.required' =>'The city field is required.',
            'address.city.string' =>'The city field must be a string.',
        ]); 
        if ($validator->fails()) { return response()->json($validator->errors(), 422); } 
        
        $error =null;
        try{ 
            // file path
            $file = public_path().'/customers.txt';
            // file check exists or not
            if (!file_exists( $file )) { 
                $contents =  [$request->all()];           
            }
            else{
                // get file contents
                $jsonString = file_get_contents($file); 
                $contents = json_decode($jsonString, true);  
                //array_push($contents,  $request->all()); 
                // make new contents, last in first  
                array_unshift($contents,  $request->all());  
            } 
            // file update with new contents
            file_put_contents($file, json_encode($contents) );
        }catch (Exception $e) {  $error =$e->getMessage();  }
        // return json response
        if($error == null)
            return response()->json([ 'success' => 'true' ], 200);
        else
            return response()->json([ 'success' => 'false' ], 200);
    }
}
