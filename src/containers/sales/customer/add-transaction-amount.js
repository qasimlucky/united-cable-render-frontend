import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {useLocation} from 'react-router-dom';
import { BsJournalArrowDown } from "react-icons/bs";
import DatePicker from 'react-date-picker';
import { url } from "../../../config";

function AddCustomerTransactionAmount(props) {
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState({});
  const [thumbnailfile, setThumbnailFile] = useState();
  const [addamount, setAddAmount] = useState("0");
  const [startDate, setStartDate] = useState(new Date());

  
  useEffect(() => {
    const newdata = {...data}
    newdata["tdate"] = startDate.toString()
    setData(newdata)
    console.log(data)
    },[startDate]);

  function handle(e) {
    const newdata = {...data}
    setAddAmount(e.target.value)
    newdata[e.target.id] = e.target.value
    newdata["opening_balance"] = Accountbalance
    newdata["customer_id"] = customer_id
    newdata["tdate"] = startDate.toString()
    setData(newdata)
    console.log(data)    
    //setAddAmount(e.target.value)
  }



  async function transactionImage (e){
    const newdata = {...data}
    console.log(e.target.files[0])
    const file = e.target.files[0]
    newdata[e.target.id] = e.target.files[0]
    setThumbnailFile(URL.createObjectURL(e.target.files[0]));
    setData(newdata)
    console.log(data)    
    }


    const location = useLocation();
    //console.log("this is receving") 
    const CustomerData = location.state.sendData;
    console.log(CustomerData.customer_id)
    const customer_id = CustomerData.customer_id
    const Accountbalance = CustomerData.account_balance
   // setCustomerId(customer_id)
   // setOpeningBalance(Accountbalance)
    

  const url = `${url}customer/transaction/add-amount`
async function submit(e) {
    console.log(data)
    //e.preventDefault();

  /*   var Object = {
        customer_id:customer_id,
        opening_balance:Accountbalance,
        add_payment :addamount
    } */
    axios
        .post(url,data, {                
            headers: {
            "Content-Type": "multipart/form-data",
        }
        })
      .then(res => {
        console.log(res.data)
        Swal.fire({
          title: 'Transaction  Successfully Completed',
          width: 600,
          padding: '3em',
          confirmButtonText: 'ok!',
          color: '#716add',
          background: '#fff url(https://www.investopedia.com/thmb/BCoC9XRbViSmJGlb2fSkPzogjJw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Term-c-cash-transaction_Final_Primary-79bac4b22a714671af0b8191d108cf32.png)',
          
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/customerlist")
          }
        })
        
        
        
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          navigate("/customerlist")
          console.log(err)
        })
        
      }




  return (
    <>
      <Navbar />
      <Sidebar />
      <div id="app" style={{ marginTop: 150 }}>
        <section class="section">
          <div class="container mt-10">
            <div class="row">
              <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                <div class="card card-primary">
                  <div class="card-header">
                    <h4>Add Amount</h4>
                  </div>
                  <div class="card-body">
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Customer Details</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <div class="row">
                            <div class="form-group col-6">
                                <label for="">Amount</label>
                                <input onChange={(e) => handle(e)} id="add_payment" type="text" class="form-control" name="add_payment" placeholder="e.g 500" style={{border:"1px solid black"}} />
                            </div>
                            <div class="form-group col-6">
                              <label for="">Purchase Date</label>
                              <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div class="form-group col-1"></div>
                            <div class="form-group col-10" style={{height:"100px ", border:"1px solid green", marginTop:"10px",display:"flex",flexWrap:"nowrap",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
                                <div>Opening Balance : {Accountbalance}</div>
                                <div>Closeing Balance : {Accountbalance-addamount}</div>
                                <div style={{marginTop:"20px"}}> <BsJournalArrowDown style={{color:"green",marginleft:"18px"}}/>    Cash In : {addamount}</div>
                            </div>
                            

                          </div>
                            
                          
                        </div>
                        
                        <div class="form-group col-6">
                            <label class="col-form-label text-md-right col-12 col-md-3 col-lg-3">Recipt</label>
                         
                                <div class="col-sm-12 col-md-7">
                                    <div id="image-preview" class="image-preview">
                                      <div class="custom-file">
                                        <label  for="customFile">Recipt Image</label>
                                        <img  src={thumbnailfile}  />
                                        <input type="file" onChange = {(e) =>transactionImage(e)}   name="file"  class="custom-file-input form-control" id="file"/>
                                      </div>
                                    </div>
                                    
                                </div>
                          </div>
                      </div>

                      <div class="row">
                        <div class="form-group col-4"></div>
                        <div class="form-group col-4">
                          <button onClick={(e) => submit(e)}  class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                            Add Amount
                          </button>
                        </div>
                        <div class="form-group col-4"></div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


export default AddCustomerTransactionAmount;