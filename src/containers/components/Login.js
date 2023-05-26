import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';



function LoginForm (){
    const [data, setData] = useState({
    phone_number : "",
    password : "",
    }) 

function handle(e){
  const newdata = {...data}
  newdata[e.target.id] = e.target.value
  setData(newdata)
 console.log(newdata)
}
let navigate = useNavigate();

function submit(e){
  e.preventDefault();
  axios
  .post("https://united-cable-backend.onrender.com/user/login",{
    phone_number : data.phone_number,
    password : data.password,
  }, { withCredentials: true })
  .then(res =>{
    console.log(res.data)
    alert(res.data)
    console.log(res.data)
    if(res.data == "client"){
        Swal.fire({
            icon: 'success',
            title: 'Congratulations',
            text: 'Welcome   !!!!',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `please enter valid phone number and password`,
          })
    }
     if(res.data == "not a client"){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `please enter valid phone number and password`,
          })
    } 
    navigate("/")
    window.location.reload();
    
  })

}


       return (
        <>
        <div id="app" style={{marginTop : 150}}>
            <section class="section">
                <div class="container mt-10">
                    <div class="row">
                        <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3">
                            <div class="card card-primary">
                                <div class="card-header">
                                <h3 class="form-group col-4">Login</h3>
                                </div>
                                <div class="card-body">
                                    <form onSubmit = {(e) =>submit(e)}>
                                    <div class="row">
                                        {/* <div class="form-group col-12">
                                            <label for="frist_name">Phone Number</label>
                                            <input onChange = {(e) =>handle(e)} id="phone_number" type="text" value ={data.phone_number} class="form-control" name="phone_number" />
                                        </div> */}
                                        <div class="form-group col-12">
                                            <label>Phone Number</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <i class="fa fa-phone"></i>
                                                </div>
                                                </div>
                                                <input onChange = {(e) =>handle(e)} id="phone_number" type="text" value ={data.phone_number} class="form-control" name="phone_number" />
                                            </div>    
                                        </div>   
                                    </div> 
                                    <div class="row">
                                        <div class="form-group col-12">
                                            <label>Password Strength</label>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                <div class="input-group-text">
                                                    <i class="fa fa-lock"></i>
                                                </div>
                                                </div>
                                                <input onChange = {(e) =>handle(e)} id="password" type="password" name="password"  value ={data.password} class="form-control pwstrength" data-indicator="pwindicator"  />
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div class="row">
                                    <div class="form-group col-2"></div>
                                        <div class="form-group col-8">
                                            <button  type="submit" class="btn btn-success btn-lg btn-block">
                                                Login
                                            </button>   
                                        </div>
                                        <div class="form-group col-2"></div>
                                    </div>
                                    </form>
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

export default LoginForm





