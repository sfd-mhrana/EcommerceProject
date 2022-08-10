<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\ProductModel;
use App\Models\PurchasesModel;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductCon extends Controller
{ 
    public function index(ProductRequest $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        //$this->data['products']=ModelsProducts::all();
        if($request->has('Product_Name')){
            $compani=$request->input('Product_Name');
            return ProductModel::where('User_ID',$user->User_ID)
            ->where('Product_Name' ,'LIKE','%'.$compani.'%')->with(['category'])->get();
        }else if($request->has('Category_Id')){
            return ProductModel::where('User_ID',$user->User_ID)
            ->where('Product_Category_ID',$request->input('Category_Id'))->with(['category'])->get();
        }else if($request->has('Product_Id')){
            return ProductModel::where('User_ID',$user->User_ID)
            ->where('Product_ID',$request->input('Product_Id'))->with(['category'])->get();
        }else{
            return ProductModel::where('User_ID',$user->User_ID)->with(['category'])->get();
        }
    }
 
    public function create($id)
    {  $user = JWTAuth::parseToken()->authenticate();
        $category = ProductModel::where('User_ID', $user->User_ID)->get();
        $this->data['groups'] = [];
        foreach ($category as $group) {
            $this->data['groups'][$group->id] = $group->Name;
        }
        return $this->data['groups'];
    }

    public function store(ProductRequest $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if(ProductModel::where('User_ID',$user->User_ID)
        ->where('Product_Category_ID',$request->input('Product_Category_ID'))
        ->where('Product_Name',$request->input('Product_Name'))->exists()){
            return null;
        }else{

                // get product by name 'http://127.0.0.1:8000/storage/productImage/productname'

                $filea = $request->file('Producut_Images');
                $filesnameWithExt = $filea->getClientOriginalName();
                $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
                $extensions = $filea->getClientOriginalExtension();
                $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
                $data = $filea->storeAs('public/productImage/', $fielsNameToStore);

                $product = new ProductModel;

                $product->User_ID = $user->User_ID;
                $product->Product_ID = $request->input('Product_ID');
                $product->Product_Category_ID = $request->input('Product_Category_ID');
                $product->Product_Name = $request->input('Product_Name');
                $product->Producut_Images = $fielsNameToStore;
                $product->Producut_Details = $request->input('Producut_Details');
                $product->Producut_Price = $request->input('Producut_Price');
                if ($product->save()) {
                    return $product;
                };
        }
    }

    public function destroy(ProductRequest $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if( PurchasesModel::where('User_ID',$user->User_ID)
        ->where('Product_Id',$request->input('Product_ID'))->exists()){
            return null;
        }else{
                $product = ProductModel::where('User_ID',$user->User_ID)->where('Product_ID', $request->input('Product_ID'))->get();
                $url = 'productImage/' . $product[0]->Producut_Images;
                Storage::disk('public')->delete($url);
                return ProductModel::where('User_ID',$user->User_ID)->where('Product_ID', $request->input('Product_ID'))->delete();
        }

    }
    
    public function updateProduct(ProductRequest $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = $request->all();
        if ($request->has('Producut_Images')) {

            $product = ProductModel::where('Product_ID', $request->input('Product_ID'))->get();
            $url = 'productImage/'. $product[0]->Producut_Images;
            Storage::disk('public')->delete($url);


            $filea = $request->file('Producut_Images');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $filea->storeAs('public/productImage/', $fielsNameToStore);
        }
        if ($request->has('Producut_Images')) {
            return  ProductModel::where('Product_ID', $request->input('Product_ID'))
                ->update(array(
                    'Product_Category_ID' => $request->input('Product_Category_ID'),
                    'Product_Name' => $request->input('Product_Name'),
                    'Producut_Details' => $request->input('Producut_Details'),
                    'Producut_Price' => $request->input('Producut_Price'),
                    'Producut_Images' => $fielsNameToStore
                ));
        }else{
                ProductModel::where('Product_ID', $request->input('Product_ID'))
                ->update(array(
                    'Product_Category_ID' => $request->input('Product_Category_ID'),
                    'Product_Name' => $request->input('Product_Name'),
                    'Producut_Details' => $request->input('Producut_Details'),
                    'Producut_Price' => $request->input('Producut_Price')
                ));
                return  2;
        }
    }
    
}
