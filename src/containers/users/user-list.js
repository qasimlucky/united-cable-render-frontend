import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link,useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { ColorRing } from 'react-loader-spinner';
import { url } from "../../config";
function UserList() {
  const [data, setData] = useState([{}])
  const [itemOffset, setItemOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}user/get`).then(Response =>{
      console.log(Response.data)
        setData(Response.data)
        setIsLoading(false)
    }).catch(err =>{
      console.log(err)
    })
    },[]);

  let navigate = useNavigate();
  function editSale(sendData){
      console.log("this is send dataaaaa")
      console.log(sendData)
      navigate("/edituser",{state:{sendData:sendData}})    
  }

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
                              <th>Action</th>
                            </tr> 
                            {currentItems && currentItems.map(dealerDetails => ( 
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
                              <td>
                                <a  onClick={()=>editSale(dealerDetails)} className="btn btn-primary" style={{color:"white"}}>
                                  Edit
                                </a>
                              </td>
                            </tr>
                              ))} 
                          </tbody>
                        </table>
                        <div>
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

export default UserList;