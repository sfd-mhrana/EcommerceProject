<?php

namespace App\Http\Controllers;
 
use App\Http\Requests\CustommerReq;
use App\Models\CustommerModel;
use App\Models\CustommerPayments\CustommerPaid;
use App\Models\salesAccModel;
use App\Models\salesModel;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class CustommerCon extends Controller
{
    public function index(CustommerReq $request)
    {
        //$this->data['products']=ModelsProducts::all();
        $user = JWTAuth::parseToken()->authenticate();
        if($request->has('Company_Name')){
            $compani=$request->input('Company_Name');
            return CustommerModel::where('User_ID',$user->User_ID)
            ->where('Company_Name' , 'like', '%'. $compani.' %')->get();
        }else{
            return CustommerModel::where('User_ID',$user->User_ID)->get();
        }
    }

  
    public function store(CustommerReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        // get product by name 'http://127.0.0.1:8000/storage/productImage/productname'
        if (CustommerModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('Company_Name'))
        ->where('Address', $request->input('Address'))->exists()) {
            return null;
        }else{
                $filea = $request->file('Custommer_Image');
                $filesnameWithExt = $filea->getClientOriginalName();
                $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
                $extensions = $filea->getClientOriginalExtension();
                $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
                $data = $filea->storeAs('public/custommerImage/', $fielsNameToStore);

                $custommer = new CustommerModel;

                $custommer->User_ID = $user->User_ID;
                $custommer->Custommer_Name = $request->input('Custommer_Name');
                $custommer->Company_Name = $request->input('Company_Name');
                $custommer->Mobile = $request->input('Mobile');
                $custommer->Custommer_Image = $fielsNameToStore;
                $custommer->Address = $request->input('Address');
                if ($custommer->save()) {
                    return $custommer;
                };
        }
       
    }

    public function destroy(CustommerReq $request)
    { 
        $user = JWTAuth::parseToken()->authenticate();
        if (salesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('Company_Name') . '/' . $request->input('Address'))->exists()) {
            return null;
        }else{
            $product = CustommerModel::where('id', $request->input('id'))->get();
            $url = 'custommerImage/' . $product[0]->Custommer_Image;
            Storage::disk('public')->delete($url);
            return CustommerModel::where('id', $request->input('id'))->delete();
        }
        
    }
    
    public function updateCustommer(CustommerReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (salesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))->exists()) {
            salesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))
            ->update(array(
                'Company_Name' => $request->input('Company_Name') . '/' . $request->input('Address')
            ));
        }
        
        if(salesAccModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))->exists()){
            salesAccModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))
            ->update(array(
                'Company_Name' => $request->input('Company_Name') . '/' . $request->input('Address')
            ));
        }

        $data = $request->all();
        if ($request->has('Custommer_Image')) {

            $product = CustommerModel::where('id', $request->input('id'))->get();
            $url = 'custommerImage/' . $product[0]->Custommer_Image;
            Storage::disk('public')->delete($url);


            $filea = $request->file('Custommer_Image');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $data = $filea->storeAs('public/custommerImage/', $fielsNameToStore);
        }
        if ($request->has('Custommer_Image')) {
            return  CustommerModel::where('id', $request->input('id'))
                ->update(array(
                    'Custommer_Name' => $request->input('Custommer_Name'),
                    'Company_Name' => $request->input('Company_Name'),
                    'Mobile' => $request->input('Mobile'),
                    'Address' => $request->input('Address'),
                    'Custommer_Image' => $fielsNameToStore
                ));
        }else{
            return CustommerModel::where('id', $request->input('id'))
                ->update(array(
                    'Custommer_Name' => $request->input('Custommer_Name'),
                    'Company_Name' => $request->input('Company_Name'),
                    'Mobile' => $request->input('Mobile'),
                    'Address' => $request->input('Address')
                ));
        }
    }

    public function custommerPreport(CustommerReq $request)
    {   $user = JWTAuth::parseToken()->authenticate();
       return CustommerPaid::where('User_ID', $user->User_ID)->with(['invoices'])->orderBy('Sales_Date', 'ASC')->get();
    }
    
}
