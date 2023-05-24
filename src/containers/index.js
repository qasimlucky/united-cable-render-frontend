import React,{ useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ColorRing } from 'react-loader-spinner'
import { Link,useNavigate } from 'react-router-dom';

function Home (){
    const [data, setData] = useState([{}])
    const [customerdata, setCustomerData] = useState([{}])
    const [vendordata, setVendorData] = useState([{}])
    const [userdata, setUserData] = useState([{}])
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/admin/dashboard").then(Response =>{
          console.log(Response.data[0])
            setData(Response.data[0])
            setCustomerData(Response.data[0].customerList)
            setVendorData(Response.data[0].vendorList)
            setUserData(Response.data[0].userList)
            setIsLoading(false)
        }).catch(err =>{
          console.log(err)
        })
        },[]);

       return (
        <>
        {isloading && (
            <div>
              <Navbar/>
              <Sidebar/>
              <div className="main-content">
                    <section className="section">
                      <div className="row">
                        <div className="col-12">
                          <div className="card" style={{}}>
                          <ColorRing
                            visible={true}
                            height="400"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{width:"auto"}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                          />
                          </div> 
                        </div>
                      </div>
                    </section>
              </div>
  
            </div>
  
        )}
        {!isloading && (
            <div>
                <body>
                    <div ></div>
                    <div id="app">
                        <div class="main-wrapper main-wrapper-1">
                        <div class="navbar-bg"></div>
                        <Navbar/>
                        <Sidebar/>
                            <div class="main-content">
                                <section class="section">
                                <div class="row ">
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-statistic-4">
                                        <div class="align-items-center justify-content-between">
                                            <div class="row ">
                                            <div class="col-6">
                                                <div class="card-content">
                                                    <h5 class="font-18">Vendors & Purchase</h5>
                                                    <div class="font-11" >Due Payments</div>
                                                    <div class="font-11" style={{color:"red", marginBottom:"8px"}} > Rs : {data.total_Purchase}</div>
                                                    <div class="font-11">Total Vendor : {data.total_vendor_number} </div>
                                                </div>
                                            </div>
                                            <div class="col-4 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                <div class="banner-img">
                                                <img src="assets/img/banner/1.png" alt=""/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-statistic-4">
                                        <div class="align-items-center justify-content-between">
                                            <div class="row ">
                                                <div class="col-6">
                                                    <div class="card-content">
                                                        <h5 class="font-18">Customer & Sale</h5>
                                                        <div class="font-11" >Pending Amount</div>
                                                        <div class="font-11" style={{color:"red", marginBottom:"8px"}} > Rs : {data.total_sale} </div>
                                                        <div class="font-11">Total Customers : {data.total_customer_number}  </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                    <div class="banner-img">
                                                    <img src="assets/img/banner/2.png" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-statistic-4">
                                        <div class="align-items-center justify-content-between">
                                            <div class="row ">
                                                    <div class="col-6">
                                                        <div class="card-content">
                                                            <h5 class="font-18">Revenue</h5>
                                                            <div class="font-11" >Purchase - Sales</div>
                                                            <div class="font-11" style={{color:"red", marginBottom:"8px"}} > Rs : {data.Revenue}</div>
                                                        </div>
                                                    </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                <div class="banner-img">
                                                <img src="assets/img/banner/3.png" alt=""/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                    <div class="card">
                                        <div class="card-statistic-4">
                                        <div class="align-items-center justify-content-between">
                                            <div class="row ">
                                                <div class="col-6">
                                                    <div class="card-content">
                                                        <h5 class="font-18">Users</h5>
                                                        <div class="font-11">Total users : {data.total_user_number} </div>
                                                    </div>
                                                </div>
                                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                                                <div class="banner-img">
                                                <img src="assets/img/banner/4.png" alt=""/>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div> 
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                            <h4>All Customer</h4>
                                            <div className="card-header-form">
                                                <Link to="/addcustomer" className="btn btn-success ">
                                                + Add Customer
                                                </Link> 
                                            </div>
                                            </div>
                                            <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                <tbody>
                                                    <tr className="align-center">
                                                    <th>Sr</th>
                                                    <th>Name</th>
                                                    <th>Phone Number</th>
                                                    <th>Email</th>
                                                    <th>Account Balance</th>
                                                    </tr> 
                                                    {customerdata && customerdata.map(customerDetails => ( 
                                                    <tr className="align-center">

                                                    <td>{customerDetails.customer_collection_index}</td>
                                                    <td>{customerDetails.first_name}</td>
                                                    <td>{customerDetails.phone_number}</td>
                                                    <td>{customerDetails.email}</td>
                                                    <td>{customerDetails.account_balance}</td>
                                                    </tr>
                                                    ))} 
                                                </tbody>
                                                </table>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>All Vendors</h4>
                                                <div className="card-header-form">
                                                    <Link to="/addvendor" className="btn btn-success ">
                                                    + Add Vendor
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="card-body p-0">
                                                <div className="table-responsive">
                                                    <table className="table table-striped">
                                                    <tbody>
                                                        <tr className="align-center">
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Phone Number</th>
                                                        <th>Account Balance</th>
                                                        </tr> 
                                                        {vendordata && vendordata.map(purchaseDetails => ( 
                                                        <tr className="align-center">

                                                        <td>{purchaseDetails.first_name}</td>
                                                        <td>{purchaseDetails.email}</td>
                                                        <td>{purchaseDetails.phone_number}</td>
                                                        <td>{purchaseDetails.account_balance}</td>
                                                        
                                                        </tr>
                                                        ))} 
                                                    </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-header">
                                            <h4>All Users</h4>
                                            <div className="card-header-form">
                                                <Link to="/adduser" className="btn btn-success ">
                                                + Add User
                                                </Link>
                                            </div>
                                            </div>
                                            <div className="card-header mb-3">
                                            <div>
                                                <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                                <div className="input-group-btn ml-1">
                                                    <button className="btn btn-primary">
                                                    <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="card-body p-0">
                                            <div className="table-responsive">
                                                <table className="table table-striped">
                                                <tbody>
                                                    <tr className="align-center">
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Role</th>
                                                    <th>Status</th>
                                                    </tr> 
                                                    {userdata && userdata.map(dealerDetails => ( 
                                                    <tr className="align-center">

                                                    <td>{dealerDetails.first_name}</td>
                                                    <td>{dealerDetails.last_name}</td>
                                                    <td>{dealerDetails.email}</td>
                                                    <td>{dealerDetails.phone_number}</td>
                                                    <td>{dealerDetails.role}</td>
                                                    <td>
                                                        <div className="badge badge-success badge-shadow" style={{padding:"8px"}}>
                                                        Active
                                                        </div>
                                                    </td>
                                                    </tr>
                                                    ))} 
                                                </tbody>
                                                </table>
                                                
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               {/*  <div class="row">
                                    <div class="col-12 col-sm-12 col-lg-4">
                                    <div class="card">
                                        <div class="card-header">
                                        <h4>Chart</h4>
                                        </div>
                                        <div class="card-body">
                                        <div id="chart4" class="chartsh"></div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-lg-4">
                                    <div class="card">
                                        <div class="card-header">
                                        <h4>Chart</h4>
                                        </div>
                                        <div class="card-body">
                                        <div class="summary">
                                            <div class="summary-chart active" data-tab-group="summary-tab" id="summary-chart">
                                            <div id="chart3" class="chartsh"></div>
                                            </div>
                                            <div data-tab-group="summary-tab" id="summary-text">
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-12 col-sm-12 col-lg-4">
                                    <div class="card">
                                        <div class="card-header">
                                        <h4>Chart</h4>
                                        </div>
                                        <div class="card-body">
                                        <div id="chart2" class="chartsh"></div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                    <div class="card">
                                        <div class="card-header">
                                        <h4>Assign Task Table</h4>
                                        <div class="card-header-form">
                                            <form>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Search"/>
                                                <div class="input-group-btn">
                                                <button class="btn btn-primary"><i class="fas fa-search"></i></button>
                                                </div>
                                            </div>
                                            </form>
                                        </div>
                                        </div>
                                        <div class="card-body p-0">
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                            <tr>
                                                <th class="text-center">
                                                <div class="custom-checkbox custom-checkbox-table custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" data-checkbox-role="dad"
                                                    class="custom-control-input" id="checkbox-all"/>
                                                    <label for="checkbox-all" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </th>
                                                <th>Task Name</th>
                                                <th>Members</th>
                                                <th>Task Status</th>
                                                <th>Assigh Date</th>
                                                <th>Due Date</th>
                                                <th>Priority</th>
                                                <th>Action</th>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"id="checkbox-1"/>
                                                    <label for="checkbox-1" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Create a mobile app</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Wildan Ahdian"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Sarah Smith"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">50%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar bg-success" data-width="50%"></div>
                                                </div>
                                                </td>
                                                <td>2018-01-20</td>
                                                <td>2019-05-28</td>
                                                <td>
                                                <div class="badge badge-success">Low</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                                    id="checkbox-2"/>
                                                    <label for="checkbox-2" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Redesign homepage</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-1.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Wildan Ahdian"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-2.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+2</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">40%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar bg-danger" data-width="40%"></div>
                                                </div>
                                                </td>
                                                <td>2017-07-14</td>
                                                <td>2018-07-21</td>
                                                <td>
                                                <div class="badge badge-danger">High</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                                    id="checkbox-3"/>
                                                    <label for="checkbox-3" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Backup database</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-3.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Wildan Ahdian"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-4.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-5.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Sarah Smith"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+3</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">55%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar bg-purple" data-width="55%"></div>
                                                </div>
                                                </td>
                                                <td>2019-07-25</td>
                                                <td>2019-08-17</td>
                                                <td>
                                                <div class="badge badge-info">Average</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                                    id="checkbox-4"/>
                                                    <label for="checkbox-4" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Android App</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-7.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Sarah Smith"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">70%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar" data-width="70%"></div>
                                                </div>
                                                </td>
                                                <td>2018-04-15</td>
                                                <td>2019-07-19</td>
                                                <td>
                                                <div class="badge badge-success">Low</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                                    id="checkbox-5"/>
                                                    <label for="checkbox-5" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Logo Design</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Wildan Ahdian"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-2.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Sarah Smith"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+2</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">45%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar bg-cyan" data-width="45%"></div>
                                                </div>
                                                </td>
                                                <td>2017-02-24</td>
                                                <td>2018-09-06</td>
                                                <td>
                                                <div class="badge badge-danger">High</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            <tr>
                                                <td class="p-0 text-center">
                                                <div class="custom-checkbox custom-control">
                                                    <input type="checkbox" data-checkboxes="mygroup" class="custom-control-input"
                                                    id="checkbox-6"/>
                                                    <label for="checkbox-6" class="custom-control-label">&nbsp;</label>
                                                </div>
                                                </td>
                                                <td>Ecommerce website</td>
                                                <td class="text-truncate">
                                                <ul class="list-unstyled order-list m-b-0 m-b-0">
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-8.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Wildan Ahdian"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-9.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="John Deo"/></li>
                                                    <li class="team-member team-member-sm"><img class="rounded-circle"
                                                        src="assets/img/users/user-10.png" alt="user" data-toggle="tooltip" title=""
                                                        data-original-title="Sarah Smith"/></li>
                                                    <li class="avatar avatar-sm"><span class="badge badge-primary">+4</span></li>
                                                </ul>
                                                </td>
                                                <td class="align-middle">
                                                <div class="progress-text">30%</div>
                                                <div class="progress" data-height="6">
                                                    <div class="progress-bar bg-orange" data-width="30%"></div>
                                                </div>
                                                </td>
                                                <td>2018-01-20</td>
                                                <td>2019-05-28</td>
                                                <td>
                                                <div class="badge badge-info">Average</div>
                                                </td>
                                                <td><a href="#" class="btn btn-outline-primary">Detail</a></td>
                                            </tr>
                                            </table>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                               
                                </section>
                                
                            </div>
                        <Footer/>
                        </div>
                    </div>
                </body>
            </div>
        )}

        </>

       );
}

/*  component */



export default Home;