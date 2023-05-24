import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';

function Sidebar (){
    let navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [isPurchase, setIsPurchase] = useState(false);
    const [isSale, setIsSale] = useState(false);
    const [isProduct, setIsProduct] = useState(false);
    const [isSaleProduct, setIsSaleProduct] = useState(false);
    const [iscustomer, setIsCustomer] = useState(false);
    
    //const [role, setRole] = useState({})
    const role= localStorage.getItem("key")
    const handleClick = event => {
        // 👇️ toggle isActive state on click
        setIsActive(current => !current);
      };
      const handlePurchaseClick = event => {
        // 👇️ toggle isActive state on click
        setIsPurchase(current => !current);
      };
      const handleSaleClick = event => {
        // 👇️ toggle isActive state on click
        setIsSale(current => !current);
      };
      const handleSaleProductClick = event => {
        // 👇️ toggle isActive state on click
        setIsSaleProduct(current => !current);
      };
      const handleProductClick = event => {
        // 👇️ toggle isActive state on click
        setIsProduct(current => !current);
      };
      const handleCustomerClick = event => {
        // 👇️ toggle isActive state on click
        setIsCustomer(current => !current);
      };
      
    let onclickclass = isActive ? ' active' :null;
    let onpurchaseclass = isPurchase ? ' active' :null;
    let onsaleclass = isSale ? ' active' :null;
    let onproductclass = isProduct ? ' active' :null;
    let onsaleproductclass = isSaleProduct ? ' active' :null;
    let oncustomerclass = iscustomer ? ' active' :null;
    

    /* useEffect(() => {
      axios
      .get("/user/role",{})
      .then(Response =>{
         console.log(Response.data)
          setRole(Response.data.role)
          console.log(role)
      }).catch(err =>{
        console.log(err)
      })
      },[]); */


      function handlelogout(){
        axios
        .post("/user/logout",{})
        .then(Response =>{
           console.log(Response.data)
           navigate("/login")
           window.location.reload();
        }).catch(err =>{
          console.log(err)
        })
      }
      if(role == "admin"){
        return (
            <div class="main-sidebar sidebar-style-2">
                    <aside id="sidebar-wrapper">
                    <div class="sidebar-brand">
                        <a href="index.html"> <img alt="image" src="assets/img/logo.png" class="header-logo" /> <span
                            class="logo-name">Factory</span>
                        </a>
                    </div>
                    <ul class="sidebar-menu">
                        <li class="menu-header">Admin</li>
                        <li class="dropdown">
                        <Link to="/dashboard" onClick={() => {window.location.href="/dashboard"}} class="nav-link"><i data-feather="monitor"></i><span>Dashboard</span></Link>
                        </li>
                        <li className={`dropdown${onclickclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleClick}><i data-feather="command"></i><span>Users</span></a>
                        <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/adduser">Add Users</Link></li>
                            <li><Link class="nav-link" to="/userlist">User List</Link></li>
                        </ul>
                        </li>
                        <li class="menu-header">Factory products</li>
                        <li className={`dropdown${onproductclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleProductClick}><i data-feather="command"></i><span>Products</span></a>
                        <ul class="dropdown-menu">
                            {/* <li><Link class="nav-link" to="/addproduct">Add products</Link></li> */}
                            <li><Link class="nav-link" to="/productlist">All products</Link></li>
                            <li><Link class="nav-link" to="/colorlist">All Color</Link></li>
                            <li><Link class="nav-link" to="/categroylist">All Categroy</Link></li>
                            {/* <li><Link class="nav-link" to="/vendorlist">All Vendors</Link></li> */}
                            <li><Link class="nav-link" to="/unitlist">All Units</Link></li>
                        </ul>
                        </li>
                        <li className={`dropdown${onpurchaseclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handlePurchaseClick}><i data-feather="command"></i><span>Purchase</span></a>
                        <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/addpurchase">Add Purchase</Link></li>
                            <li><Link class="nav-link" to="/purchaselist">All Purchase</Link></li>
                        </ul>
                        </li>
                        <li>
                          <Link to="/vendorlist"><i data-feather="command"></i><span>Vendors</span></Link>
                        </li>
                        <li class="menu-header">Sale products</li>
                        <li className={`dropdown${onsaleproductclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleSaleProductClick}><i data-feather="command"></i><span>Sale products</span></a>
                        <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/addsaleproduct">Add Sale Product</Link></li>
                            <li><Link class="nav-link" to="/allsaleproduct">Sale Product List</Link></li>
                            {/* <li><Link class="nav-link" to="/addsalecategroy">Add Categroy</Link></li>
                            <li><Link class="nav-link" to="/addsaletype">Add Type</Link></li>
                            <li><Link class="nav-link" to="/addsaleunit">Add Unit</Link></li>
                            <li><Link class="nav-link" to="/addsalepacking">Add Packing</Link></li>
                            <li><Link class="nav-link" to="/addsalesize">Add Size</Link></li>
                            <li><Link class="nav-link" to="/addsalename">Add Name</Link></li> */}
                        </ul>
                        </li>
                        <li className={`dropdown${onsaleclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleSaleClick}><i data-feather="command"></i><span>Sale</span></a>
                        <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/salemandashboard">Dashboard</Link></li>
                            <li><Link class="nav-link" to="/addsale">Add Sale</Link></li>
                            <li><Link class="nav-link" to="/salelist">All Sale</Link></li>
                        </ul>
                        </li>
                        <li /* className={`dropdown${oncustomerclass}`} */>
                        <Link to="/customerlist" ><i data-feather="command"></i><span>Customer</span></Link>
                        {/* <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/customerlist">All Customer</Link></li>
                        </ul> */}
                        </li>

                        {/* <li class="dropdown">
                        <Link  onClick={handlelogout}class="nav-link"><i data-feather="monitor"></i><span>Logout</span></Link>
                        </li> */}
                        
                    </ul>
                    </aside>
                </div>
           );
      }
      if(role == "saleman"){
        return (
            <div class="main-sidebar sidebar-style-2">
                    <aside id="sidebar-wrapper">
                    <div class="sidebar-brand">
                        <a href="index.html"> <img alt="image" src="assets/img/logo.png" class="header-logo" /> <span
                            class="logo-name">Factory</span>
                        </a>
                    </div>
                    
                    <ul class="sidebar-menu">
                        <li class="menu-header">Sale products</li>
                        <li className={`dropdown${onsaleclass}`}>
                        <a href="#" class="menu-toggle nav-link has-dropdown" onClick={handleSaleClick}><i data-feather="command"></i><span>Sale</span></a>
                        <ul class="dropdown-menu">
                            <li><Link class="nav-link" to="/salemandashboard">Dashboard</Link></li>
                            <li><Link class="nav-link" to="/addsale">Add Sale</Link></li>
                            <li><Link class="nav-link" to="/salelist">All Sale</Link></li>
                        </ul>
                        </li>
                        {/* <li class="dropdown">
                        <Link  onClick={handlelogout}class="nav-link"><i data-feather="monitor"></i><span>Logout</span></Link>
                        </li> */}
                        
                    </ul>
                    </aside>
            </div>
           );
      }


    }

export default Sidebar;