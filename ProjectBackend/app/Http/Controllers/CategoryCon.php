<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\CategoryModel;
use App\Models\ProductModel;
use App\Models\PurchasesModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

use function PHPUnit\Framework\isEmpty;

class CategoryCon extends Controller
{
    
    public function index(CategoryRequest $request){
       
        $user = JWTAuth::parseToken()->authenticate();
        if($request->has('Name')){
            $compani=$request->input('Name');
            return CategoryModel::where('User_ID',$request->input('User_ID'))
            ->where('Name','LIKE', '%'.$compani.'%')->get();
        }else{
            return CategoryModel::where('User_ID',$user->User_ID)->get();
        }
    }
 
    public function insert(CategoryRequest $request){
        $fromdata=$request->all();
        $user = JWTAuth::parseToken()->authenticate();
        if ( $findcategory=CategoryModel::where('User_ID',$user->User_ID)
        ->where('Name',$request->input('Name'))->exists()){
           return null;
        }else{ 
            $cashamount = new CategoryModel();
            $cashamount->User_ID = $user->User_ID;
            $cashamount->Name = $request->input('Name');
            if ($cashamount->save()) {
                return $cashamount;
            };
        }
        
    }

    public function delete(CategoryRequest $request){
      if(ProductModel::where('User_ID',$request->input('User_ID'))->
            where('Product_Category_ID',$request->input('id'))->exists()){
        return null;
      }else{
        if(CategoryModel::find($request->input('id'))->delete()){
            return $request;
        }
        else{
            return null;
        }   
      }
    }

    public function updatecategory(CategoryRequest $request,$id){
        $data        =$request->all();
        return CategoryModel::where('id', $id)->where('User_ID',$data['User_ID'])
        ->update(array('Name' =>$data['Name']));
       
    }
}
