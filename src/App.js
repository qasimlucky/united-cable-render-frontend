import { Route, Routes } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import axios from "axios";
import Home from './containers/index'
import AddProduct from './containers/product/add-product';
import AddProducColor from './containers/product/add-product-color';
import AddProducCategroy from './containers/product/add-product-categroy';
import AddVendor from './containers/purchase/vendors/add-vendor';
import AddPurchase from './containers/purchase/add-purchase';
import AddUser from './containers/users/add-user';
import UserList from './containers/users/user-list';
import EditUser from './containers/users/edit-user';
import PurchaseList from './containers/purchase/list-purchase';
import ProductList from './containers/product/product-list';
import ColorList from './containers/product/color-list';
import CategroyList from './containers/product/categroy-list';
import VendorList from './containers/purchase/vendors/vendor-list';
import UnitList from './containers/product/unit-list';
import AddProducUnit from './containers/product/add-product-unit';
import LoginForm from './containers/components/Login';
import AddVendorTransactionAmount from './containers/purchase/vendors/add-transaction-amount';
import VendorTransaction from './containers/purchase/vendors/vendor-transaction';
import VendorPrintPurchase from './containers/purchase/vendors/vendor-print-purchase';

//
import AddSale from './containers/sales/add-sale';
import SaleList from './containers/sales/sale-list';
import AddSaleProducCategroy from './containers/sale-product/add-sale-product-categroy';
import AddSaleProducType from './containers/sale-product/add-sale-product-type';
import AddSaleProduct from './containers/sale-product/add-product';
import AddSaleProductPacking from './containers/sale-product/add-sale-product-packing'
import AddSaleUnit from './containers/sale-product/add-sale-product-unit';
import AddSaleProducSize from './containers/sale-product/add-sale-product-size';
import AddSaleProducName from './containers/sale-product/add-sale-product-name';
import SaleProductList from './containers/sale-product/product-list';
import AddCustomer from './containers/sales/customer/add-customer';
import CustomerList from './containers/sales/customer/customer-list';
import CustomerTransaction from './containers/sales/customer/customer-transactions';
import AddCustomerTransactionAmount from './containers/sales/customer/add-transaction-amount';
import CustomerPrintOrder from './containers/sales/customer/customer-print-order';
import ShowRecipt from './containers/sales/customer/show-recipt';
import SaleManDashboard from './containers/sales/sale-dashboard';



function App() {
   const [data, setData] = useState({});

   
    useEffect(() => {
      axios
      .get("/user/role",{})
      .then(Response =>{
         console.log(Response.data)
          setData(Response.data)
          localStorage.setItem("key",Response.data.role)
          console.log(data)
      }).catch(err =>{
        console.log(err)
      })
      },[]);



    if(data.role == null || undefined){
        console.log("this is me not data")
    return (
      <main>
              <Routes>
                  <Route path="/" exact element={<LoginForm/>}/>
                  <Route path="/login" exact element={<LoginForm/>}/>
              </Routes>
              
                  
          </main>
    );
   }
   if(data.role == "admin"){
      return (
        <main>
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path="/dashboard" exact element={<Home/>}/>
                    <Route path="/addproduct" exact element={<AddProduct/>}/>
                    <Route path="/addcolor" exact element={<AddProducColor/>}/>
                    <Route path="/addcategroy" exact element={<AddProducCategroy/>}/>
                    <Route path="/addvendor" exact element={<AddVendor/>}/>
                    <Route path="/addpurchase" exact element={<AddPurchase/>}/>
                    <Route path="/adduser" exact element={<AddUser/>}/>
                    <Route path="/userlist" exact element={<UserList/>}/>
                    <Route path="/edituser" exact element={<EditUser/>}/>
                    <Route path="/purchaselist" exact element={<PurchaseList/>}/>
                    <Route path="/productlist" exact element={<ProductList/>}/>
                    <Route path="/colorlist" exact element={<ColorList/>}/>
                    <Route path="/categroylist" exact element={<CategroyList/>}/>
                    <Route path="/vendorlist" exact element={<VendorList/>}/>
                    <Route path="/unitlist" exact element={<UnitList/>}/>
                    <Route path="/addunit" exact element={<AddProducUnit/>}/>
                    <Route path="/login" exact element={<LoginForm/>}/>
                    <Route path="/addsale" exact element={<AddSale/>}/>
                    <Route path="/salelist" exact element={<SaleList/>}/>
                    <Route path="/addsalecategroy" exact element={<AddSaleProducCategroy/>}/>
                    <Route path="/addsaletype" exact element={<AddSaleProducType/>}/>
                    <Route path="/addsaleproduct" exact element={<AddSaleProduct/>}/>
                    <Route path="/addsaleunit" exact element={<AddSaleUnit/>}/>
                    <Route path="/addsalepacking" exact element={<AddSaleProductPacking/>}/>
                    <Route path="/addsalesize" exact element={<AddSaleProducSize/>}/>
                    <Route path="/addsalename" exact element={<AddSaleProducName/>}/>
                    <Route path="/allsaleproduct" exact element={<SaleProductList/>}/>
                    <Route path="/addcustomer" exact element={<AddCustomer/>}/>
                    <Route path="/customerlist" exact element={<CustomerList/>}/>
                    <Route path="/customertransaction" exact element={<CustomerTransaction/>}/>
                    <Route path="/addcustomertransaction" exact element={<AddCustomerTransactionAmount/>}/>
                    <Route path="/customerprintorder" exact element={<CustomerPrintOrder/>}/>
                    <Route path="/showrecipt" exact element={<ShowRecipt/>}/>
                    <Route path="/addVendortransaction" exact element={<AddVendorTransactionAmount/>}/>
                    <Route path="/vendortransaction" exact element={<VendorTransaction/>}/>
                    <Route path="/vendorprintpurchase" exact element={<VendorPrintPurchase/>}/>
                    <Route path="/salemandashboard" exact element={<SaleManDashboard/>}/>
              
                </Routes>          
            </main>
      );
   } 
   if(data.role == "saleman"){
    return (
      <main>
              <Routes>
                  <Route path="/" exact element={<AddSale/>}/>
                  <Route path="/addsale" exact element={<AddSale/>}/>
                  <Route path="/salelist" exact element={<SaleList/>}/>
              </Routes>          
          </main>
    );
 } 


}

export default App;
