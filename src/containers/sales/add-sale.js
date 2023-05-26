import React,{ useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BsCartPlus } from "react-icons/bs";
import { BsCartDash } from "react-icons/bs";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { BsDashSquareFill } from "react-icons/bs";
import Swal from 'sweetalert2'
import { url } from "../../config";

function AddSale() {
    const [productdata, setProductData] = useState([{}])
    const [allproductdata, setAllProductData] = useState([{}])
    const [productcolor, setProductColor] = useState([{}])
    const [customerdata, setCustumerData] = useState([{}])
    const [selectedproduct, setSelectedProduct] = useState([])
    const [saletotal, setSaleTotal] = useState(0)
    const [customer, setCustomer] = useState("Customer");
    const [customerphonenumber, setCustomerPhoneNumber] = useState("0000-000000");
    const [numberofsaleitem, setNumberOfSaleItem] = useState(0)
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const time = current.toLocaleTimeString();
    console.log(date)
    console.log(time)


    useEffect(() => {
        axios.get(`${url}sale/product/get`).then(Response =>{
         // console.log(Response.data)
         setProductData(Response.data);
         setAllProductData(Response.data);
        }).catch(err =>{
          console.log(err)
        })
    },[]);
    useEffect(() => {
        axios.get(`${url}product/color/get`).then(Response =>{
         // console.log(Response.data)
         setProductColor(Response.data)
        }).catch(err =>{
          console.log(err)
        })
    },[]);
    useEffect(() => {
        axios.get(`${url}customer/get`).then(Response =>{
         // console.log(Response.data)
         setCustumerData(Response.data)
        }).catch(err =>{
          console.log(err)
        })
    },[]);
    useEffect(() => { 
        // this hook will get called every time myArr has changed
        // perform some action every time myArr is updated
        TotalSaleAmount();
        NumberOfItem();
     }, [selectedproduct]) 

    function handle(e){
       if(e.target.value==''){
            console.log(e.target.value)
            setProductData(allproductdata)
        }else{
            console.log(e.target.value)
            var targetValue=e.target.value;
            setProductData(allproductdata.filter(element => element.cable_name == targetValue)); 
        }


        console.log(productdata)
    }
    function AllProducts(){
        setProductData(allproductdata)
    }
    function AddProduct(product){

        var  objIndex = selectedproduct.findIndex((obj => obj.cable_id == product.cable_id));

        if(objIndex !== -1){ 
            selectedproduct[objIndex].sell_quantity = (selectedproduct[objIndex].sell_quantity+1)
            selectedproduct[objIndex].sub_total = (selectedproduct[objIndex].sale_price * (selectedproduct[objIndex].sell_quantity))
            console.log(selectedproduct)
            setSelectedProduct([...selectedproduct])
        }else{
            product.sell_quantity = 1;
            product.bill_item_Price = product.sale_price;
            product.sub_total = product.sale_price;
            selectedproduct.push(product)
            console.log(selectedproduct)
            setSelectedProduct([...selectedproduct])
        }

    }
    async function DeleteitemFromBill(Bill){
        setSelectedProduct(selectedproduct.filter(emp => emp.cable_id !== Bill.cable_id)) 
    }
    function DecreaseQuantity(Bill){
        var  objIndex = selectedproduct.findIndex((obj => obj.cable_id == Bill.cable_id));
        
            if(selectedproduct[objIndex].sell_quantity >=2){
            selectedproduct[objIndex].sell_quantity = (selectedproduct[objIndex].sell_quantity-1)
            selectedproduct[objIndex].sub_total = (selectedproduct[objIndex].sub_total-selectedproduct[objIndex].sale_price )
            setSelectedProduct([...selectedproduct])
            }else{
            setSelectedProduct(selectedproduct.filter(emp => emp.cable_id !== Bill.cable_id))
        }
    }

    function IncreaseQuantity(Bill){
        var objIndex = selectedproduct.findIndex((obj => obj.cable_id == Bill.cable_id));
            selectedproduct[objIndex].sell_quantity = (selectedproduct[objIndex].sell_quantity+1)
            selectedproduct[objIndex].sub_total = (selectedproduct[objIndex].sale_price * (selectedproduct[objIndex].sell_quantity))
            setSelectedProduct([...selectedproduct])

    }
    function TotalSaleAmount(){
        var AllSubTotal= 0;
        if(selectedproduct.length >=1){
            for (let i = 0, len = selectedproduct.length; i < len; i++) {
                AllSubTotal = AllSubTotal+parseInt(selectedproduct[i].sub_total)
                //console.log(AllSubTotal)
    
                if(i == (len-1)){
                    // console.log("this is total bill")
                    // console.log(AllSubTotal)
                    setSaleTotal(AllSubTotal)
                }
              }
        }else{
            setSaleTotal(AllSubTotal)
        }
        
          
     }
     function NumberOfItem(){
        console.log(selectedproduct)
        var NOBItem =selectedproduct.length
        setNumberOfSaleItem(NOBItem)
    }
    function handlecustomer(e){
        if(e.target.id == "customer_name"){
            setCustomer(e.target.value) 
            console.log(customer)
        }else{
            setCustomerPhoneNumber(e.target.value)
            console.log(customerphonenumber)
        }
        
    }
    function CheckOut(){
        console.log("checkout")
        var orderObject = {
            order_items : selectedproduct,
            total_amount :saletotal,
            no_of_items : numberofsaleitem,
            customer_id : customer,
            customer_phone : customerphonenumber,
            date : date,
            time:time

        }
        console.log(orderObject)
        axios
        .post(`${url}order/add`, orderObject)
        .then(res => {
          console.log(res.data)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'order has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload(false);
        }).catch(err =>{
            console.log(err)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500
              })
        })
    }


    

       return (
        <>
        <Navbar/>
        <Sidebar/>
        <div id="app" style={{ marginTop: "110px" }}>
            <section class="section">
                <div class="container" style={{maxWidth:"1300px", paddingLeft:"0px"}}>
                    <div class="row">
                        <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                            <div class="card card-primary">
                                <div class="card-header">
                                    <h4>Add Sale</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="form-group col-4">
                                            <label for="">Customer</label>
                                            <div>
                                                <select onChange={handlecustomer} id="customer_name" style={{height:"40px" ,width:"100%", lineHeight:"initial"}}>
                                                <option>Please choose one option</option>
                                                {customerdata && customerdata.map((option, index) => {
                                                    return <option key={index} value={option.customer_id} >
                                                        {option.first_name}
                                                    </option>
                                                })}
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group col-4">
                                            <label for="">Customer Phone Number</label>
                                            <input onChange = {(e) =>handlecustomer(e)} id="phone_number" type="text" class="form-control" name="phone_number" placeholder="Customer Phone Number" style={{border:"1px solid black"}}/>
                                        </div>
                                        <div class="form-group col-4">
                                            <label for="">Customer Address</label>
                                            <input /* onChange = {(e) =>handleWireLength(e)}    */id="addres" type="text" class="form-control" name="address" placeholder="Address" style={{border:"1px solid black"}}/>
                                        </div>
                                    </div>

                                    <div class="row"> 
                                        <div  class="form-group col-5" style={{display:'flex'}}>
                                            <input onChange={(e) => handle(e)} list="data" name="categories" id="categories" placeholder="All Product" style={{height:"40px" ,width:"80%", lineHeight:"initial"}}/>
                                                <datalist  id="data">
                                                    {allproductdata && allproductdata.map(productDetails => (
                                                        <option /* value={productDetails.cable_id}  */>{productDetails.cable_name}</option>
                                                    ))}
                                                </datalist>
                                                <div  onClick={(e) => AllProducts(e)}   style={{height:"40px" , width:'20%', lineHeight:"initial", display:"flex" , alignItems:'center', justifyContent:"center", border:"1px solid", background:'#F0F0F0' }}>All</div> 
                                                
                                        </div>
                                    </div>
                                    <div style={{marginTop:"10px", display:"flex",width:"100%",flexDirection:'row',flexWrap:"nowrap"}}>
                                        <div style={{ width:"40%", height:"400px", fontSize:"12px", border:"1px solid lightgray"}}>
                                            <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                                <div style={{height:"50px", width:"44%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Name
                                                </div>
                                                <div style={{height:"50px", width:"21%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>Core</div>
                                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>R-Quantity</div>
                                                </div>
                                                <div style={{height:"50px", width:"21%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    price
                                                </div>
                                                <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Action
                                                </div>
                                            </div>
                                            <div className="add-sale-list" style={{display:"flex", flexWrap:"nowrap",flexDirection:"column" ,width:"100%",marginTop:'5px', overflow:"scroll",height:'350px'}}>
                                                {productdata && productdata.map(productDetails => (
                                                    <div style={{display:"flex", width:"100%",marginTop:"2px"}}>
                                                        <div style={{height:"50px", width:"44%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            {productDetails.cable_name}
                                                        </div>
                                                        <div style={{height:"50px", width:"21%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>{productDetails.cable_categroy}</div>
                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>{productDetails.quantity}</div>
                                                        </div>
                                                        <div style={{height:"50px", width:"21%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            {productDetails.sale_price}
                                                        </div>
                                                        <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            <BsCartPlus onClick = {() =>AddProduct(productDetails)} style={{fontSize:"25px",color:"green"}} />
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* <div style={{display:"flex", width:"100%"}}>
                                                    <div style={{height:"50px", width:"40%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Name
                                                    </div>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Core
                                                    </div>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        price
                                                    </div>
                                                    <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Action
                                                    </div>
                                                </div> */}
                                                {/* <div style={{display:"flex", width:"100%",marginTop:"1px"}}>
                                                    <div style={{height:"50px", width:"40%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Name
                                                    </div>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Core
                                                    </div>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        price
                                                    </div>
                                                    <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Action
                                                    </div>
                                                </div> */}
                                            </div>
                        

                                        </div>
                                        {/* selected items */}
                                        <div style={{ width:"2%"}}></div>
                                        <div style={{ width:"58%", height:"400px", fontSize:"12px", border:"1px solid lightgray"}}>
                                            <div style={{display:"flex", flexWrap:"nowrap", width:"100%"}}>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Name
                                                </div>
                                                <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Quantity
                                                </div>
                                                <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Color
                                                </div>
                                                <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>Sale Price</div>
                                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>Sub-Total</div>
                                                </div>
                                                <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Core
                                                </div>

                                                <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Size
                                                </div>
                                                <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Packing
                                                </div>
                                                <div style={{height:"50px", width:"6%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                    Action
                                                </div>
                                            </div>
                                            <div className="add-sale-list" style={{display:"flex", flexWrap:"nowrap",flexDirection:"column", width:"100%",marginTop:"5px", overflow:"scroll",height:'290px'}}>
                                                {selectedproduct && selectedproduct.map(productDetails => (
                                                    <div style={{display:"flex", width:"100%",marginTop:"2px"}}>
                                                        <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            Name
                                                        </div>
                                                        <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            <div style={{border:"1px solid lightgray" , width:"30%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsFillPlusSquareFill style={{color:"green",fontSize:'18px'}}  onClick={()=>IncreaseQuantity(productDetails)} /></div>
                                                            <div style={{border:"1px solid lightgray", width:"40%", display:"flex",height:"40px", justifyContent:"center",alignItems:"center",paddingTop:"15px"}}><div><p>{productDetails.sell_quantity}</p></div></div>
                                                            <div style={{border:"1px solid lightgray",width:"30%", height:"40px", display:"flex", alignItems:'center', justifyContent:"center"}}><BsDashSquareFill style={{color:'#DB1414',fontSize:'18px'}}   onClick={()=>DecreaseQuantity(productDetails)} /></div>
                                                        </div>
                                                        <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            <select /*  onChange={handleNumberOfWiresize} */ style={{height:"30px" ,width:"80%", lineHeight:"initial"}}>
                                                                <option>Please Select</option>
                                                                    {productcolor && productcolor.map((option, index) => {
                                                                    return <option key={index} value={option.color_title} >
                                                                        {option.color_title}
                                                                </option>
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center", flexDirection:"column"}}>
                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>{productDetails.sale_price}</div>
                                                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid lightgray",width:"100%",height:"25px"}}>{productDetails.sub_total}</div>
                                                        </div>
                                                        <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            {productDetails.cable_categroy}
                                                        </div>

                                                        <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            {productDetails.cable_size_no_wire}
                                                        </div>
                                                        <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            {productDetails.packing_type}
                                                        </div>
                                                        <div style={{height:"50px", width:"6%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                            <BsCartDash onClick={()=>DeleteitemFromBill(productDetails)} style={{fontSize:"25px",color:"red"}}/>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* <div style={{display:"flex", width:"100%",marginTop:"2px"}}>
                                                    <div style={{height:"50px", width:"25%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Name
                                                    </div>
                                                    <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Quantity
                                                    </div>
                                                    <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Color
                                                    </div>
                                                    <div style={{height:"50px", width:"14%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        price
                                                    </div>
                                                    <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Core
                                                    </div>

                                                    <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Size
                                                    </div>
                                                    <div style={{height:"50px", width:"10%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        Packing
                                                    </div>
                                                    <div style={{height:"50px", width:"6%",border: "1px solid black",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                                        <BsCartDash style={{fontSize:"25px",color:"red"}}/>
                                                    </div>
                                                </div> */}
                                                

                                            </div>
                                            <div style={{display:"flex", width:"100%",marginTop:"2px",height:"51px", border:"1px solid black",alignItems:"center",justifyContent:"center"}}>
                                                <div style={{width:"30%"}}>
                                                    No of Items : {numberofsaleitem}
                                                </div>
                                                <div style={{width:"30%"}}>
                                                    Total Amount : {saletotal}
                                                </div>
                                                <div style={{width:"40%"}}>
                                                    <button onClick = {() =>CheckOut()} style={{height:"40px",width:"100%",fontSize:"18px",border:"1px solid lightgray",color:"green", display:"flex",justifyContent:"center", alignItems:"center"}}>CheckOut</button>  
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer/>
        </>
       );
    }

export default AddSale;