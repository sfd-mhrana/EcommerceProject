<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\bankcon;
use App\Http\Controllers\bankdatacon;
use App\Http\Controllers\CashAmountContro;
use App\Http\Controllers\CategoryCon;
use App\Http\Controllers\CostingCon;
use App\Http\Controllers\CustommerCon;
use App\Http\Controllers\EmployeeAccCon;
use App\Http\Controllers\EmployeeCon;
use App\Http\Controllers\InvestmentCon;
use App\Http\Controllers\LoanDetails;
use App\Http\Controllers\ProductCon;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\PurchasesAccCon;
use App\Http\Controllers\PurchasesCon;
use App\Http\Controllers\SalesAccCon;
use App\Http\Controllers\SalesCon;
use App\Http\Controllers\SuppliyerCOn;
use App\Http\Controllers\Publicshops\Publiccontroller as PublicShopPubContoller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'authenticate']);


Route::group(['middleware' => ['jwt.verify']], function() {
        Route::get('user',[AuthController::class, 'getAuthenticatedUser']);


        //Category Route
        Route::post('createCategory',[CategoryCon::class, 'insert']);
        Route::post('allcategory',[CategoryCon::class, 'index']);
        Route::post('deletecategory',[CategoryCon::class, 'delete']);
        Route::put('updateCategory/{id}',[CategoryCon::class, 'updatecategory']);
        

        //Product Route
        Route::post('gproducts',[ProductCon::class, 'index']);
        Route::post('products',[ProductCon::class, 'store']);
        Route::post('productdelete',[ProductCon::class, 'destroy']);
        Route::post('updateProduct',[ProductCon::class, 'updateProduct']);
        Route::get('/products/create/{id}',[ProductCon::class, 'create']);



        //Custommer Route
        Route::post('gcustommer',[CustommerCon::class, 'index']);
        Route::post('custommer',[CustommerCon::class, 'store']);
        Route::post('deletecustommer',[CustommerCon::class, 'destroy']);
        Route::post('updatecustommer',[CustommerCon::class, 'updateCustommer']);
        Route::post('custommerPreport',[CustommerCon::class, 'custommerPreport']);



        //Suppliyer Route
        Route::post('gsuppliyer',[SuppliyerCOn::class, 'index']);
        Route::post('suppliyer',[SuppliyerCOn::class, 'store']);
        Route::post('suppliyerdelete',[SuppliyerCOn::class, 'destroy']);
        Route::post('updatesuppliyer',[SuppliyerCOn::class, 'updateCustommer']);
        Route::post('suppliyerPreport',[SuppliyerCOn::class, 'suppliyerPreport']);


        // All Employee Route
        Route::post('gemployee',[EmployeeCon::class, 'index']);
        Route::post('employee',[EmployeeCon::class, 'store']);
        Route::delete('employee/{id}',[EmployeeCon::class, 'destroy']);
        Route::post('updateemployee',[EmployeeCon::class, 'updateCustommer']);

        Route::post('gemployeeacc',[EmployeeAccCon::class, 'index']);
        Route::post('employeeacc',[EmployeeAccCon::class, 'store']);
        Route::post('demployeeacc',[EmployeeAccCon::class, 'destroy']);
        Route::post('selectedEmploe',[EmployeeAccCon::class, 'getSelectedUser']);
        Route::post('updateemployeeacc',[EmployeeAccCon::class, 'updateEmployeeAcc']);


        
        // Purchses Section Route
        Route::post('purchases',[PurchasesCon::class, 'store']);
        Route::post('invoiceProduct',[PurchasesCon::class, 'getAllInvoiceProduct']);
        Route::post('getAllPurProduct',[PurchasesCon::class, 'getAllProduct']);
        Route::post('nonInpuAcc',[PurchasesCon::class, 'nonMatchBill']);
        Route::post('provicedGRN',[PurchasesCon::class, 'prodivedGRN']);
        Route::post('deletePFormInvoi',[PurchasesCon::class, 'deletePformInvoice']);
        Route::post('updateInvoiceItem',[PurchasesCon::class, 'updateInvoiceItem']);
        Route::post('productbycustommer',[PurchasesCon::class, 'productbycustommer']);

        Route::post('cproductacc',[PurchasesAccCon::class, 'store']);
        Route::post('purchsesAccAll',[PurchasesAccCon::class, 'getAllbill']);
        Route::post('getSingleInvoiceAcc',[PurchasesAccCon::class, 'getSingleInvoiceAcc']);
        Route::post('updateInvoiceAcc',[PurchasesAccCon::class, 'updateInvoiceAcc']);
        Route::post('delectInvoiceACC',[PurchasesAccCon::class, 'delectInvoiceACC']);

        Route::post('purchasesreturn',[PurchasesCon::class, 'purchsesreturn']);
        Route::post('topsuppliyer',[PurchasesCon::class, 'topsuppliyer']);


        // Sales Section Route
        Route::post('newSales',[SalesCon::class, 'store']);
        Route::post('salesinvoiceProduct',[SalesCon::class, 'invoicep']);
        Route::post('getAllsalesbyProductName',[SalesCon::class, 'getAllbyProductName']);
        Route::post('salesnonInpuAcc',[SalesCon::class, 'nonMatchBill']);
        Route::post('deletePFormsalesInvoi',[SalesCon::class, 'deletePformInvoice']);
        Route::post('updateSalesInvoiceItem',[SalesCon::class, 'updateInvoiceItem']);
        Route::post('getallsalesCustommer',[SalesCon::class, 'getallsalesCustommer']);
        Route::post('getproductgroupbyinvoice',[SalesCon::class, 'getallproductbyInvoice']);

        Route::post('csalestacc',[SalesAccCon::class, 'store']);
        Route::post('salesAccAll',[SalesAccCon::class, 'getAllbill']);
        Route::post('getsalesSingleInvoiceAcc',[SalesAccCon::class, 'getSingleInvoiceAcc']);
        Route::post('updatesalesInvoiceAcc',[SalesAccCon::class, 'updateInvoiceAcc']);
        Route::post('delectsalesInvoiceACC',[SalesAccCon::class, 'delectInvoiceACC']);

        Route::post('salesreturn',[SalesCon::class, 'salesreturn']);
        Route::post('topcustommer',[SalesCon::class, 'topcustommer']);
        Route::post('topsalesproduct',[SalesCon::class, 'topsalesproduct']);



        //Cashing Accounts
        Route::post('getCashData',[CashAmountContro::class, 'getAllCosting']);
        Route::post('cash',[CashAmountContro::class, 'store']);


        //Get Stock
        Route::post('getStock',[PublicController::class, 'index']);
        Route::post('stockAmount',[PublicController::class, 'stockAmount']);

        //Get Account
        Route::post('getAccount',[PublicController::class, 'accountall']);

        //Get BankAcc
        Route::post('getbankAcc',[PublicController::class, 'bankaccoutgroup']);

        //Loan Details Section
        Route::post('getAllLoanTranjection',[LoanDetails::class, 'index']);
        Route::post('storeNewLoan',[LoanDetails::class, 'store']);
        Route::post('upDateLoanDetails',[LoanDetails::class, 'update']);
        Route::post('deleteLoan',[LoanDetails::class, 'delete']);

        //Investing Details Section
        Route::post('getAllInvestingDetails',[InvestmentCon::class, 'index']);
        Route::post('storeNewInvest',[InvestmentCon::class, 'store']);
        Route::post('deleteInvest',[InvestmentCon::class, 'delete']);

        //Costing Details Section
        Route::post('getAllCostTranjection',[CostingCon::class, 'index']);
        Route::post('storeNewCost',[CostingCon::class, 'store']);
        Route::post('upDateCostDetails',[CostingCon::class, 'update']);
        Route::post('deleteCost',[CostingCon::class, 'delete']);

        //Bank Details Section
        Route::post('getallbank',[bankcon::class, 'index']);
        Route::post('storeanewbank',[bankcon::class, 'store']);
        Route::post('updatebankinfo',[bankcon::class, 'update']);
        Route::post('deletebank',[bankcon::class, 'delete']);

        //BankData Details Section
        Route::post('getallbankdata',[bankdatacon::class, 'index']);
        Route::post('storenewbankdata',[bankdatacon::class, 'store']);
        Route::post('updatebankdata',[bankdatacon::class, 'update']);
        Route::post('deletebankdata',[bankdatacon::class, 'delete']);

        //bardetails
        Route::post('bardetails',[PublicController::class, 'bardetails']);

});


Route::get('getAllShop',[PublicShopPubContoller::class, 'allShops']);
Route::get('getAllProduct',[PublicShopPubContoller::class, 'getAllProduct']);
Route::post('orderlist',[PublicShopPubContoller::class, 'orderlist']);
