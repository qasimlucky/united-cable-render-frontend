import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ReactPaginate from 'react-paginate';
import { Link,useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { BsFillEyeFill } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { BsJournalArrowDown } from "react-icons/bs";
import { url } from "../../../config";
function CustomerList() {

    const [data, setData] = useState([{}])
    const [itemOffset, setItemOffset] = useState(0);
    const [isloading, setIsLoading] = useState(true);

    let navigate = useNavigate();
  
      useEffect(() => {
        axios.get(`${url}customer/get`).then(Response =>{
          console.log(Response.data)
            setData(Response.data)
            setIsLoading(false)
        }).catch(err =>{
          console.log(err)
        })
        },[]);


    var itemsPerPage = 10;

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function OpenTransactions(customerDetails) {
    console.log(customerDetails)
    navigate("/customertransaction",{state:{sendData:customerDetails}})
  }

  function AddAmount(customerDetails) {
    console.log(customerDetails)
    navigate("/addcustomertransaction",{state:{sendData:customerDetails}})
  }


  

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
                <Navbar/>
                <Sidebar/>
                <div className="main-content">
                <section className="section">
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
                                <th>Sr</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Account Balance</th>
                                <th>Transaction</th>
                                <th>Cash In<BsArrowDown style={{fontSize:"20px", color:"green"}}/></th>
                                <th>Action</th>
                                </tr> 
                                {currentItems && currentItems.map(customerDetails => ( 
                                <tr className="align-center">

                                <td>{customerDetails.customer_collection_index}</td>
                                <td>{customerDetails.first_name}</td>
                                <td>{customerDetails.phone_number}</td>
                                <td>{customerDetails.email}</td>
                                <td>{customerDetails.account_balance}</td>
                                <td><BsFillEyeFill onClick={()=>OpenTransactions(customerDetails)}  style={{margin:"5px", fontSize:"20px",color:"green"}}/></td>
                                <td><BsJournalArrowDown onClick={()=>AddAmount(customerDetails)} style={{margin:"5px", fontSize:"20px",color:"green"}}/></td>
                                <td>
                                    <a   className="btn btn-primary" style={{color:"white"}}>
                                    Edit
                                    </a>
                                </td>
                                </tr>
                                ))} 
                            </tbody>
                            </table>
                            <div >
                            <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={8}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                                />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                </div>
                <Footer/>
            </div>

        )}
        
        </>
       );
    }

export default CustomerList;