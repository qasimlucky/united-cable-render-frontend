import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactPaginate from 'react-paginate';
import { Link,useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import { url } from "../../config";
function SaleProductList() {
  const [data, setData] = useState([{}])
  const [itemOffset, setItemOffset] = useState(0);
  const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
      axios.get(`${url}sale/product/get`).then(Response =>{
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
          navigate("/editpurchase",{state:{sendData:sendData}})    
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
                                <h4>All Sale Products</h4>
                                <div className="card-header-form">
                                    <Link to="/addsaleproduct" className="btn btn-success ">
                                    + Add Product
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
                                        <th>Name</th>
                                        <th>Categroy</th>
                                        <th>Sale Price</th>
                                        <th>Type</th>
                                        <th>Packing Type</th>
                                        <th>Packing Unit</th>
                                        <th>Packing Length</th>
                                        <th>Size</th>
                                        <th>Size(MM)</th>
                                        <th>Action</th>
                                        </tr> 
                                        {currentItems && currentItems.map(purchaseDetails => ( 
                                        <tr className="align-center">
                
                                        <td>{purchaseDetails.cable_name}</td>
                                        <td>{purchaseDetails.cable_categroy}</td>
                                        <td>{purchaseDetails.sale_price}</td>
                                        <td>{purchaseDetails.cable_type}</td>
                                        <td>{purchaseDetails.packing_type}</td>
                                        <td>{purchaseDetails.packing_measurement_unit}</td>
                                        <td>{purchaseDetails.cable_packing_length}</td>
                                        <td>{purchaseDetails.cable_size_no_wire}</td>
                                        <td>{purchaseDetails.cable_size_in_mm}</td>
                                        
                                        <td>
                                            <a  onClick={()=>editSale(purchaseDetails)} className="btn btn-primary" style={{color:"white"}}>
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

export default SaleProductList;