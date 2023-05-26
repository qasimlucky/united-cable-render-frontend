import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import Swal from 'sweetalert2';
import { BsFillTrashFill } from "react-icons/bs";
import withReactContent from 'sweetalert2-react-content'
import { url } from "../../config";

function AddSaleProduct (props){

    const [categroydata, setCategroyData] = useState([{}])
    const [typedata, setTypeData] = useState([{}])
    const [packingdata, setPackingData] = useState([{}])
    const [unitdata, setUnitData] = useState([{}])
    const [sizedata, setSizeData] = useState([{}])
    const [namedata, setNameData] = useState([{}])
    const [itemtype,setItemType] = useState();
    const [itemcategroy,setItemCategroy] = useState();
    const [itempacking,setItemPacking] = useState();
    const [itemunit,setItemUnit] = useState();
    const [itemnumberofwiresize,setItemNumberOfWireSize] = useState();
    const [itemsizeinmm,setItemSizeInmm] = useState();
    const [itemname,setItemName] = useState();
    const [itemlength,setWireLength] = useState();
    const [itemsaleprice,setSalePrice] = useState();
    const [itemamp,setitemAmp] = useState();
    const [itemquantity,setitemQuantity] = useState();
    
    
    
    
    useEffect(() => {
        axios.get(`${url}sale/product/categroy/get`).then(Response =>{
         // console.log(Response.data)
          setCategroyData(Response.data)
        }).catch(err =>{
          console.log(err)
        })
    },[]);

    useEffect(() => {
        axios.get(`${url}sale/product/type/get`).then(Response =>{
          console.log(Response.data)
          setTypeData(Response.data)
        }).catch(err =>{
          console.log(err)
        })
    },[]);

    useEffect(() => {
        axios.get(`${url}sale/product/packing/get`).then(Response =>{
          console.log(Response.data)
          setPackingData(Response.data)
        }).catch(err =>{
          console.log(err)
        })
    },[]);

    useEffect(() => {
      axios.get(`${url}sale/product/unit/get`).then(Response =>{
        console.log(Response.data)
        setUnitData(Response.data)
      }).catch(err =>{
        console.log(err)
      })
    },[]);

    useEffect(() => {
      axios.get(`${url}sale/product/size/get`).then(Response =>{
        console.log(Response.data)
        setSizeData(Response.data)
      }).catch(err =>{
        console.log(err)
      })
    },[]);
  
    useEffect(() => {
      axios.get(`${url}sale/product/name/get`).then(Response =>{
        console.log(Response.data)
        setNameData(Response.data)
      }).catch(err =>{
        console.log(err)
      })
    },[]);

    function handleCategroy(e){
        console.log(e.target.value)
        setItemCategroy(e.target.value)
    }
    function handleType(e){
      console.log(e.target.value)
      setItemType(e.target.value)
    }
    function handlePacking(e){
      console.log(e.target.value)
      setItemPacking(e.target.value)
    }
    function handleUnit(e){
      console.log(e.target.value)
      setItemUnit(e.target.value)
    }
    function handleNumberOfWiresize(e){
      console.log(e.target.value)
      setItemNumberOfWireSize(e.target.value)
    }
    function handleSizeInMM(e){
      console.log(e.target.value)
      setItemSizeInmm(e.target.value)
    }
    function handleName(e){
      console.log(e.target.value)
      setItemName(e.target.value)
    }
    function handleWireLength(e){
      console.log(e.target.value)
      setWireLength(e.target.value)
    }
    function handleSalePrice(e){
      console.log(e.target.value)
      setSalePrice(e.target.value)
    }
    function handleAmp(e){
      console.log(e.target.value)
      setitemAmp(e.target.value)
    }
    function handleQuantity(e){
      console.log(e.target.value)
      setitemQuantity(e.target.value)
    }
    async function AddProduct(){
      try{
          var ProductObject = {
              cable_name :itemname,
              cable_categroy: itemcategroy, 
              cable_type:itemtype,
              cable_packing_length:itemlength,
              packing_type:itempacking,
              packing_measurement_unit:itemunit,
              sale_price:itemsaleprice,
              cable_amp:itemamp,
              cable_size_no_wire:itemnumberofwiresize,
              cable_size_in_mm:itemsizeinmm,
              quantity:itemquantity
              
          }
          console.log(ProductObject)
          /* savebill.push(billObject)
          console.log("this is save bill")
          console.log(savebill) */    
          axios
          .post("/sale/product/create", ProductObject)
          .then(res => {
            console.log(res.data)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Product has been saved',
              showConfirmButton: false,
              timer: 1500
            })
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
      }catch{
          console.log("something went wrong")
      }
    
    }



       return (
        <>
          <Navbar/>
          <Sidebar/>
          <div id="app" style={{marginTop : 150}}>
              <section class="section">
                  <div class="container mt-10">
                    <div class="row">
                      <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-11 offset-xl-2">
                        <div class="card card-primary">
                          <div class="card-header">
                            <h4>Add Sale Product</h4>
                          </div>
                          <div class="card-body">
                            <div class="row">
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsalename' class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Name +
                                    </Link>
                                </div>
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsalecategroy'  class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Categroy +
                                    </Link>
                                </div>
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsalepacking'  class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Packing +
                                    </Link>
                                </div>
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsalesize'  class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Size +
                                    </Link>
                                </div>
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsaleunit' class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Unit +
                                    </Link>
                                </div>
                                <div class="form-group col-2">
                                    <Link /* onClick={(e) =>ChangeMe(e)} */ to='/addsaletype' class="btn btn-outline-danger"  style={{fontSize:"11px",width:"100%"}}>
                                      Product Type +
                                    </Link>
                                </div>
                              </div>
            
                              <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Basic Details</label>
                              <div class="row">
                                <div class="form-group col-4">
                                  <label for="">Product Name</label>
                                  <select onChange={handleName} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                    <option>Please Select </option>
                                    {namedata && namedata.map((option, index) => {
                                        return <option key={index} value={option.sale_product_title} >
                                            {option.sale_product_title}
                                        </option>
                                    })}
                                  </select>
                                </div>
                                <div class="form-group col-4">
                                  <label for="">Categroy</label>
                                  <select onChange={handleCategroy} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                    <option>Please Select</option>
                                    {categroydata && categroydata.map((option, index) => {
                                        return <option key={index} value={option.category_title} >
                                            {option.category_title}
                                        </option>
                                    })}
                                  </select>
                                </div>
                                <div class="form-group col-4">
                                  <label for="">Type</label>
                                    <select onChange={handleType} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                        <option>Please Select </option>
                                            {typedata && typedata.map((option, index) => {
                                            return <option key={index} value={option.type_title} >
                                                {option.type_title}
                                        </option>
                                        })}
                                    </select>
                                </div>
                              </div>
                              <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Packing Details</label>
                              <div class="row">
                                <div class="form-group col-4">
                                  <label for="">Wire Length in Packing</label>
                                  <input onChange = {(e) =>handleWireLength(e)}   id="wire_length" type="text" class="form-control" name="wire_length" placeholder="50kg or 15m etc" style={{border:"1px solid black"}}/>
                                </div>
                                <div class="form-group col-4">
                                  <label>Packing Type</label>
                                  <select onChange={handlePacking} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                        <option>Please Select </option>
                                            {packingdata && packingdata.map((option, index) => {
                                            return <option key={index} value={option.packing_title} >
                                                {option.packing_title}
                                        </option>
                                        })}
                                    </select>
                                </div>
                                <div class="form-group col-4">
                                  <label for="">Unit Of Measurement</label>
                                  <select onChange={handleUnit} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                        <option>Please Select</option>
                                            {unitdata && unitdata.map((option, index) => {
                                            return <option key={index} value={option.unit_title} >
                                                {option.unit_title}
                                        </option>
                                        })}
                                    </select>
                                </div>
                              </div>
                              <label  className="badge badge-primary badge-shadow" style={{padding:"8px"}}>Other Details</label>
                              <div class="row">
                                <div class="form-group col-2">
                                    <label for="">Sale Price</label>
                                    <input onChange = {(e) =>handleSalePrice(e)}   id="sale_price" type="text" class="form-control" name="sale_price" placeholder="Sale Price" style={{border:"1px solid black"}}/>
                                </div>
                                <div class="form-group col-2">
                                    <label for="">Amp</label>
                                    <input  onChange = {(e) =>handleAmp(e)}  id="amp" type="text" class="form-control" name="amp"  placeholder="amp" style={{border:"1px solid black"}}/>
                                </div>
                                <div class="form-group col-2">
                                    <label for="">Quantity</label>
                                    <input  onChange = {(e) =>handleQuantity(e)}  id="quantity" type="text" class="form-control" name="quantity"  placeholder="quantity" style={{border:"1px solid black"}}/>
                                </div>
                                <div class="form-group col-3">
                                    <label for="">Size (Number of wires)</label>
                                    <select onChange={handleNumberOfWiresize} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                        <option>Please Select</option>
                                            {sizedata && sizedata.map((option, index) => {
                                            return <option key={index} value={option.size_according_wires} >
                                                {option.size_according_wires}
                                        </option>
                                        })}
                                    </select>
                                </div>
                                <div class="form-group col-3">
                                    <label for="">Size (MM) </label>
                                    <select onChange={handleSizeInMM} style={{height:"42px" ,width:"100%", lineHeight:"initial"}}>
                                        <option>Please Select</option>
                                            {sizedata && sizedata.map((option, index) => {
                                            return <option key={index} value={option.size_according_mm} >
                                                {option.size_according_mm}
                                        </option>
                                        })}
                                    </select>
                                </div>
                              </div>                  
                              <div class="row">
                              <div class="form-group col-4"></div>
                                <div class="form-group col-4">
                                    <button onClick = {() =>AddProduct()}  class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                                      Add Product
                                    </button>
                                </div>    
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


export default AddSaleProduct;