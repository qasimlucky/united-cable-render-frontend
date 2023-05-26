import React,{useState,useEffect} from "react";
import axios from "axios";
import { Link,useNavigate } from 'react-router-dom';
import { url } from "../../config";
function Navbar (){
    let navigate = useNavigate();
        function handlelogout(){
            axios
            .post(`${url}user/logout`,{})
            .then(Response =>{
               console.log(Response.data)
               navigate("/login")
               window.location.reload();
            }).catch(err =>{
              console.log(err)
            })
          }
       return (
        <nav class="navbar navbar-expand-lg main-navbar sticky">
                <div class="form-inline mr-auto">
                <ul class="navbar-nav mr-3">
                    <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg
                                            collapse-btn"> <i data-feather="align-justify"></i></a></li>
                    <li><a href="#" class="nav-link nav-link-lg fullscreen-btn">
                        <i data-feather="maximize"></i>
                    </a></li>
                    {/* <li>
                    <form class="form-inline mr-auto">
                        <div class="search-element">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search" data-width="200"/>
                        <button class="btn" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                        </div>
                    </form>
                    </li> */}
                </ul>
                </div>
                 <ul class="navbar-nav navbar-right">
                    <li class="dropdown">
                        <button onClick = {() =>handlelogout()} style={{height:"40px",width:"100%",fontSize:"18px",border:"1px solid lightgray",color:"red", display:"flex",justifyContent:"center", alignItems:"center"}}>Logout</button>  
                    </li>
                </ul> 
            </nav>
       );
}

export default Navbar;