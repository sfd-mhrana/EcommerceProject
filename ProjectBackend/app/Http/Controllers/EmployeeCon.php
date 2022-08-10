<?php

namespace App\Http\Controllers;
 
use App\Http\Requests\employeeReq;
use App\Models\EmployeeAccModel;
use App\Models\EmployeeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class EmployeeCon extends Controller
{ 
    public function index(employeeReq $request)
    {   $user = JWTAuth::parseToken()->authenticate();
        //$this->data['products']=ModelsProducts::all();
        if($request->has('Employee_Name')){
            $compani=$request->input('Employee_Name');
            return EmployeeModel::where('User_ID', $user->User_ID)
            ->where('Employee_Name' , 'like', '%'. $compani.' %')
            ->get();
        }else if($request->has('sales')){
            return EmployeeModel::where('User_ID', $user->User_ID)
            ->with(['allCosting','sales'])->get();
        }
        else if($request->has('SR')){
            return EmployeeModel::where('User_ID', $user->User_ID)
            ->where('Position','SR')->get();
        }else{
            return EmployeeModel::where('User_ID', $user->User_ID)->get();
        }
    }

  
    public function store(employeeReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if(EmployeeModel::where('Employee_ID', $request->input('Employee_ID'))->exists()){
            return response()->json(['title' => 'Warning', 'message' => 'Please, Refresh Your Page']);
        }else{
        if (EmployeeModel::where('User_ID',  $user->User_ID)->where('Employee_Name', $request->input('Employee_Name'))
        ->where('Mobile', $request->input('Mobile'))->exists()) {
            return null;
        }else{
            // get product byEmployeeModel
            $filea = $request->file('Employee_Image');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $data = $filea->storeAs('public/employeeImage/', $fielsNameToStore);

            $custommer = new EmployeeModel;

            $custommer->User_ID =  $user->User_ID;
            $custommer->Employee_ID = $request->input('Employee_ID');
            $custommer->Employee_Name = $request->input('Employee_Name');
            $custommer->Mobile = $request->input('Mobile');
            $custommer->Position = $request->input('Position');
            $custommer->Employee_Image = $fielsNameToStore;
            $custommer->Salary = $request->input('Salary');
            $custommer->Address = $request->input('Address');
            if ($custommer->save()) {
                return $custommer;
            };
        }
    }
       
    }

    public function destroy($id)
    {   $user = JWTAuth::parseToken()->authenticate();
       if( EmployeeAccModel::where('Employee_ID', $id)->exists()){
        return response()->json(['title' => 'Warning', 'message' => 'You Cannot Delete This Employee. Because He/She Effect Your Account']);
       }else{
             $product = EmployeeModel::where('Employee_ID', $id)->get();
        $url = 'employeeImage/' . $product[0]->Employee_Image;
        Storage::disk('public')->delete($url);
        return EmployeeModel::where('Employee_ID', $id)->delete();
       }
      
    }
    
    public function updateCustommer(employeeReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $data = $request->all();
        if ($request->has('Employee_Image')) {

            $product = EmployeeModel::where('Employee_ID', $request->input('Employee_ID'))->get();
            $url = 'employeeImage/' . $product[0]->Employee_Image;
            Storage::disk('public')->delete($url);


            $filea = $request->file('Employee_Image');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $data = $filea->storeAs('public/employeeImage/', $fielsNameToStore);
        }
        if ($request->has('Employee_Image')) {
            return  EmployeeModel::where('Employee_ID', $request->input('Employee_ID'))
                ->update(array(
                    'Employee_Name' => $request->input('Employee_Name'),
                    'Mobile' => $request->input('Mobile'),
                    'Position' => $request->input('Position'),
                    'Salary' => $request->input('Salary'),
                    'Address' => $request->input('Address'),
                    'Employee_Image' => $fielsNameToStore
                ));
        }else{
            return EmployeeModel::where('Employee_ID', $request->input('Employee_ID'))
                ->update(array(
                    'Employee_Name' => $request->input('Employee_Name'),
                    'Salary' => $request->input('Salary'),
                    'Position' => $request->input('Position'),
                    'Mobile' => $request->input('Mobile'),
                    'Address' => $request->input('Address')
                ));
        } 
    }
}
