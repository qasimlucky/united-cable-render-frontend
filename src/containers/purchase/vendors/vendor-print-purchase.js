
import React,{ useState,useEffect } from "react";
import axios from "axios";
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import  { useRef } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useReactToPrint } from 'react-to-print';


function VendorPrintPurchase(props) {

    const [vendordata, setVendorData] = useState()
    const [isloading, setIsLoading] = useState(true);
    let navigate = useNavigate();
    const location = useLocation();
    console.log("this is receving")
    console.log(location.state.sendData) 
      const stockData = location.state.sendData[0];
      const vendor_id = stockData.vendor
      console.log(vendor_id)
      console.log(stockData)

        useEffect(() => {
            console.log(vendor_id)
            axios.post("/product/vendor/details",{vendor_id:vendor_id}).then(Response =>{
                console.log("vendor is comeing")
                console.log(Response.data)
                setVendorData(Response.data[0])
                setIsLoading(false)
                //console.log(vendordata)
            }).catch(err =>{
              console.log(err)
            })
            },[stockData]);

        const componentRef = useRef(null);
        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
          onAfterPrint: () => {
          }
        });

        function handleBack(){
            navigate("/vendorlist")
        }
    return (

        <>
        {isloading && (
          <div>
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
                <button onClick={()=>handlePrint()} style={{backgroundColor:"#3280F8",float:"right", color:"white"}}>
                    Print
                </button>
                <button onClick={()=>handleBack()} style={{backgroundColor:"green", color:"white",}} >
                    Back
                </button>
                <div ref={componentRef} style={{height:"1200px", width:"100%", marginTop:"50px"}}>
                    <div style={{margin:"0 auto", textAlign:"center", marginTop:"15px" }}>
                        <div style={{fontSize:'70px'}}>Javaid Brothers</div>
                        <div style={{fontSize:'20px'}}>Electric Store & Industries</div>
                        <div style={{padding:"4px",fontSize:'25px'}}><b style={{marginRight:"3px"}}>Addresss: </b> G.T Road,Baghban,Lahore</div>
                        <div style={{padding:"4px",fontSize:'30px'}}><b style={{marginRight:"3px"}}>Phone :</b>0332-4334428,0322-7651151</div>
                        <div style={{padding:"8px",fontSize:'30px'}}><b>Purchase Invoice</b></div>
                    </div>
                    <div style={{padding:"30px"}}>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'25px'}}>
                            <div style={{ width:"50%"}}><b>Purchase No : </b>{stockData.purchase_collection_index}</div>
                            <div style={{ width:"50%", textAlign:"end"}}><b>Date : </b>{(stockData.purchase_date).slice(2,10)} </div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px", fontSize:'25px'}}>
                            <div style={{ width:"50%"}}><b>Vendor Info</b></div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'25px'}}>
                            <div style={{width:"50%"}}><b>Name : </b> {vendordata.first_name}</div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px", fontSize:'25px'}}>
                            <div style={{width:"50%"}}><b>Mobile : </b> {vendordata.phone_number}</div>
                        </div>
                    </div>
                    <div style={{padding:"30px"}}>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"40px",  fontSize:'20px', borderBottom:"1px solid black"}}>
                            <div style={{ width:"50%"}}><b>Product</b></div>
                            <div style={{ width:"20%", textAlign:"center", padding:"3px"}}><b>Quantity</b></div>
                            <div style={{ width:"15%", textAlign:"center", padding:"3px"}}><b>Unit</b></div>
                            <div style={{ width:"15%", textAlign:"center", padding:"3px"}}><b>Purchase Price</b></div>
                        </div>
                            <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"25px",  fontSize:'18px'}}>
                                <div style={{ width:"50%"}}>{stockData.product_name}</div>
                                <div style={{ width:"20%", textAlign:"center"}}>{stockData.product_quantity}</div>
                                <div style={{ width:"15%", textAlign:"center"}}>{stockData.product_unit}</div>
                                <div style={{ width:"15%", textAlign:"center"}}>{stockData.purchase_amount}</div>
                            </div>
                        
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"20px",  fontSize:'12px', borderBottom:"1px solid"}}></div>
                    </div>
                    <div style={{padding:"30px"}}>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                            <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Cash : </b></div>  <div style={{width:"70%"}}> Rs {stockData.total_amount}</div></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Discount : </b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_discount}</div></div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                            <div style={{ width:"50%", display:"flex",flexWrap:"nowrap"}}><div style={{width:"30%"}}><b>Total Paid : </b> </div>  <div style={{width:"70%"}}> Rs {stockData.total_amount}</div></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid lightgray"}}><div style={{width:"50%"}}><b>Tax:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_tax}</div></div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                            <div style={{ width:"50%"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Shipping:</b></div>  <div style={{width:"50%"}}> Rs {stockData.bill_shipping}</div></div>
                        </div>
                        <div style={{display:"flex", flexWrap:"nowrap" , width:"100%", height:"32px",  fontSize:'20px'}}>
                            <div style={{ width:"50%"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap"}}></div>
                            <div style={{ width:"25%", display:"flex",flexWrap:"nowrap", borderBottom:"1px solid gray"}}><div style={{width:"50%"}}><b>Total:</b></div>  <div style={{width:"50%"}}> Rs {stockData.purchase_amount}</div></div>
                        </div>
                    </div>
                
                </div>
            </div>
        )}
        </>

       );
}

export default VendorPrintPurchase;