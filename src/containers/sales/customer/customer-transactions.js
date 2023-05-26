import React,{useCallback, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {useLocation,useNavigate } from 'react-router-dom';
import { BsJournalArrowUp } from "react-icons/bs";
import { BsJournalArrowDown } from "react-icons/bs";
import { ColorRing } from 'react-loader-spinner';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Modal from 'react-modal';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { saveAs } from 'file-saver';
import { url } from "../../../config";

const customStyles = {
  overlay: {zIndex: 1000}
};


function CustomerTransaction() {
    const [data, setData] = useState([{}])
    const [isshow,setIsShow] = useState(false)
    const [imageurl,setImageUrl] = useState(false)
    const [isloading, setIsLoading] = useState(true);
    const MySwal = withReactContent(Swal)
    let navigate = useNavigate();
    const location = useLocation();

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
      setIsOpen(true);
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
      subtitle.style.position = 'absolute';
    }
    function closeModal() {
      setIsOpen(false);
    }

    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback(shouldZoom => {
      setIsZoomed(shouldZoom)
    }, [])

        //console.log("this is receving") 
      const CustomerData = location.state.sendData;
      console.log(CustomerData.customer_id)
      const customer_id = CustomerData.customer_id

      useEffect(() => {
        axios
        .post(`${url}customer/transaction/get`, {customer_id:customer_id})
        .then(res => {
          console.log(res.data)
          setData(res.data)
          setIsShow(true)
          setIsLoading(false)
        }).catch(err =>{
            console.log(err)
        })
        },[]);

        function OpenPrintOrder(oderDetails){
          console.log(oderDetails)
          navigate("/customerprintorder",{state:{sendData:oderDetails}})
        }

        function Recipt(image){
          setImageUrl(image)
          console.log(image)
          if(image !==null){
            openModal()
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No recipt Found!',
              showConfirmButton: false,
              timer: 1500
            })
          }
        }

        function SaveImage(){
          console.log("this is save image")
          saveAs(imageurl, "image.jpg");
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
        <div>
                {/* <button style={{margin:"200px"}} onClick={openModal}>Open Modal</button> */}
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div style={{marginBottom:"10px"}}>
                    <button style={{marginLeft:"30px",border:"2px solid red",color:"red"}} onClick={closeModal}>close</button>
                    <button style={{marginLeft:"30px",border:"2px solid green",color:"green"}} onClick={SaveImage}>Save Image</button>
                  </div>
                  
                  <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                      <img
                          alt="Recipt Not Found"
                          src={imageurl}
                          width="700"
                      />
                    </ControlledZoom>
                </Modal>
             </div>
        <div class="main-content">

          <section class="section">
            <div class="section-body">
            
              <h2 class="section-title">September 2018</h2>
              
              <div class="row">
                <div class="col-12">
                  {isshow && (

                      <div class="activities">
                      {data && data.map(TransactionDetails => (
                        
                          <div class="activity">
                              <div class="activity-icon bg-primary text-white">
                                  <i class="fas fa-sign-out-alt"></i>
                              </div>
                              <div class="activity-detail">
                                  <div class="mb-2">
                                      <span class="text-job">1 hour ago</span>
                                      <span class="bullet"></span>
                                  </div>
                                  <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                      {/* <div style={{}}><p><b style={{marginRight:"8px"}}>Transaction No :</b> {TransactionDetails.transaction_collection_index}</p></div> */}
                                      {(() => {
                                        if (TransactionDetails.transaction_type == 'Credit'){
                                        return (
                                          <div style={{marginLeft:"30px",fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Total order Amount :</b>{TransactionDetails.transaction_amount}</p></div>
                                        )
                                      }else{
                                      return (
                                        <div style={{marginLeft:"30px",fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Cash In :</b>{TransactionDetails.transaction_amount}</p></div>
                                        )
                                      }            
                                    })()}
                                      <div style={{marginLeft:"30px", fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Opening Balance :</b>{TransactionDetails.opening_balance}</p></div>
                                      <div style={{marginLeft:"30px", fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Closeing Balance :</b>{TransactionDetails.closing_balance}</p></div>
                                      <div style={{marginLeft:"30px", fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Transaction Type :</b>{TransactionDetails.transaction_type}</p></div>
                                      {(() => {
                                        if (TransactionDetails.transaction_type == 'Credit'){
                                        return (
                                        <div style={{marginLeft:"5px"}}>
                                            <BsJournalArrowUp style={{color:"red" ,fontSize:'20px'}}/>
                                        </div>
                                        )
                                      }else{
                                      return (
                                        <div style={{marginLeft:"5px"}}>
                                            <BsJournalArrowDown style={{color:"green" ,fontSize:'20px'}}/>
                                        </div>
                                        )
                                      }            
                                      })()}
                                      <div style={{marginLeft:"30px", fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Date :</b>{(TransactionDetails.created_at).slice(0,-14)}</p></div>
                                  </div>
                                  <div style={{border : "1px solid lightgray", marginBottom:"10px"}}></div>
                                   <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                      
                                      <div>
                                        { TransactionDetails.transaction_type == "Credit" && (TransactionDetails.orders).map(Details => (
                                          <div style={{display:"flex",flexWrap:"nowrap",flexDirection:'column'}}>
                                            <div style={{display:"flex", flexWrap:"nowrap"}}>
                                                 {/* <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>order Id :</b>{Details.order_id}</p></div>
                                                  <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Number Of Items  :</b>{Details.no_of_items}</p></div>
                                                  <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Total Amount :</b>{Details.total_amount}</p></div> */}
                                                  <button onClick={()=>OpenPrintOrder(TransactionDetails.orders)} style={{marginLeft:"50px",marginRight:"10px", fontSize:"13px",border:"2px solid red"}}>Show Order Details</button> 
                                                  <div style={{marginLeft:"50px", fontSize:"13px"}}><p><b style={{marginRight:"10px"}}>Date | Time :</b>{Details.date}|{Details.time}</p></div>
                                                
                                            </div>
                                              {/* <div style={{width:"100%"}}>
                                                    { TransactionDetails && (Details.order_items).map(ItemDetails => (
                                                      <div style={{display:"flex", flexWrap:"nowrap"}}>
                                                        <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Sell Quantity:</b>{ItemDetails.sell_quantity}</p></div>
                                                        <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Item Name:</b>{ItemDetails.cable_name}</p></div>
                                                        <div style={{marginLeft:"50px"}}><p><b style={{marginRight:"10px"}}>Cable type:</b>{ItemDetails.cable_type}</p></div>
                                                      </div>
                                                      
                                                      ))}  
                                              </div> */}

                                          </div>
                                        ))}

                                        {(() => {
                                            if (TransactionDetails.transaction_type == 'Debit'){
                                            return (
                                              <div style={{display:"flex",flexWrap:"nowrap",flexDirection:'column'}}>
                                              <div style={{display:"flex", flexWrap:"nowrap"}}>
                                                    <button  onClick={()=>Recipt(TransactionDetails.image)} style={{marginLeft:"50px",marginRight:"10px", fontSize:"13px",border:'2px solid green'}}>Show Recipt</button> 
                                              </div>
                                            </div>
                                            )
                                          }
                                        })()}
                                        
                                          

                                      </div>
                                  </div> 
                              </div>
                          </div>

                      ))} 
      
                      </div>
                  )}

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


export default CustomerTransaction;