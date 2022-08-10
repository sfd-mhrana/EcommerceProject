<?php

namespace App\Http\Controllers;

use App\Http\Requests\SuppliyerReq;
use App\Models\PurchasesAccModel;
use App\Models\PurchasesModel;
use App\Models\SuppliyerMod;
use App\Models\SuppliyerPayments\SuppliyerPaidModel;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class SuppliyerCOn extends Controller
{
    public function index(SuppliyerReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        //$this->data['products']=ModelsProducts::all();
        if ($request->has('Company_Name')) {
            $compani = $request->input('Company_Name');
            return SuppliyerMod::where('User_ID', $user->User_ID)
                ->where('Company_Name', 'like', '%' . $compani . ' %')->get();
        } else {
            return SuppliyerMod::where('User_ID', $user->User_ID)->get();
        }
    }
 

    public function store(SuppliyerReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if (SuppliyerMod::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('Company_Name'))->where('Address', $request->input('Address'))->exists()) {
            return null;
        } else {

            // get product by name 'http://127.0.0.1:8000/storage/productImage/productname'

            $filea = $request->file('Suppliyer_Image');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $data = $filea->storeAs('public/suppliyerImage/', $fielsNameToStore);

            $custommer = new SuppliyerMod;

            $custommer->User_ID = $user->User_ID;
            $custommer->Suppliyer_Name = $request->input('Suppliyer_Name');
            $custommer->Company_Name = $request->input('Company_Name');
            $custommer->Mobile = $request->input('Mobile');
            $custommer->Suppliyer_Image = $fielsNameToStore;
            $custommer->Address = $request->input('Address');
            if ($custommer->save()) {
                return $custommer;
            };
        }
    }

    public function destroy(SuppliyerReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (PurchasesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('Company_Name') . '/' . $request->input('Address'))->exists()) {
            return null;
        } else {
            $product = SuppliyerMod::where('id', $request->input('id'))->get();
            $url = 'suppliyerImage/' . $product[0]->Suppliyer_Image;
            Storage::disk('public')->delete($url);
            return SuppliyerMod::where('id',  $request->input('id'))->delete();
        }
    }

    public function updateCustommer(SuppliyerReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if (PurchasesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))->exists()) {
            PurchasesModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))
            ->update(array(
                'Company_Name' => $request->input('Company_Name') . '/' . $request->input('Address')
            ));
        }
        
        if(PurchasesAccModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))->exists()){
            PurchasesAccModel::where('User_ID', $user->User_ID)->where('Company_Name', $request->input('OCompany_Name') . '/' . $request->input('OAddress'))
            ->update(array(
                'Company_Name' => $request->input('Company_Name') . '/' . $request->input('Address')
            ));
        }
            $data = $request->all();
            if ($request->has('Suppliyer_Image')) {

                $product = SuppliyerMod::where('id', $request->input('id'))->get();
                $url = 'suppliyerImage/' . $product[0]->Suppliyer_Image;
                Storage::disk('public')->delete($url);


                $filea = $request->file('Suppliyer_Image');
                $filesnameWithExt = $filea->getClientOriginalName();
                $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
                $extensions = $filea->getClientOriginalExtension();
                $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
                $data = $filea->storeAs('public/suppliyerImage/', $fielsNameToStore);
            }
            if ($request->has('Suppliyer_Image')) {
                return  SuppliyerMod::where('id', $request->input('id'))
                    ->update(array(
                        'Suppliyer_Name' => $request->input('Suppliyer_Name'),
                        'Company_Name' => $request->input('Company_Name'),
                        'Mobile' => $request->input('Mobile'),
                        'Address' => $request->input('Address'),
                        'Suppliyer_Image' => $fielsNameToStore
                    ));
            } else {
                return SuppliyerMod::where('id', $request->input('id'))
                    ->update(array(
                        'Suppliyer_Name' => $request->input('Suppliyer_Name'),
                        'Company_Name' => $request->input('Company_Name'),
                        'Mobile' => $request->input('Mobile'),
                        'Address' => $request->input('Address')
                    ));
            }
    }
    
    public function suppliyerPreport(SuppliyerReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        return SuppliyerPaidModel::where('User_ID', $user->User_ID)->with(['invoices'])->orderBy('Purchase_Date', 'ASC')->get();
    }
   
}
