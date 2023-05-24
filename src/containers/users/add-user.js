import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function AddUser(props) {
  let navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const [data, setData] = useState({})

  function handle(e) {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(data)
  }
  const url = "http://localhost:7000/user/create"
  function submit(e) {
    console.log(data)
    e.preventDefault();
    axios
      .post(url, data)
      .then(res => {
        console.log(res.data)
        Swal.fire({
          icon: 'success',
          title: 'Congratulations',
          text: 'New Supplier is Add!!!!',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/userlist")
      }).catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          showConfirmButton: false,
          timer: 1500
        })
          console.log(err)
        })
        navigate("/userlist")
      }

  function handleRole (e){

    const newdata = { ...data }
    newdata["role"] = e.target.value
    setData(newdata)
    console.log(data)

  }
  const options = [
    { label: 'admin', value: 'admin' },
    { label: 'saleman', value: 'saleman' },
  ];
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
                    <h4>Add User</h4>
                  </div>
                  <div class="card-body">
                    <form onSubmit={(e) => submit(e)} method="HTTP_METHOD" enctype="multipart/form-data">


                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>User Details</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">First Name</label>
                          <input onChange={(e) => handle(e)} id="first_name" type="text" class="form-control" name="first_name" placeholder="e.g Ali" />
                        </div>
                        <div class="form-group col-6">
                          <label for="">Last Name</label>
                          <input onChange={(e) => handle(e)} id="last_name" type="text" class="form-control" name="last_name" placeholder="e.g Raza"  />
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>Contact info</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label for="">Phone Number</label>
                          <input onChange={(e) => handle(e)} id="phone_number" type="text" class="form-control" name="phone_number" placeholder="e.g 0321-7171898"  />
                        </div>
                        <div class="form-group col-6">
                          <label for="">Email</label>
                          <input onChange={(e) => handle(e)} id="email" type="text" class="form-control" name="email"  placeholder="e.g newdealer@gmail.com"/>
                        </div>
                      </div>
                      <label className="badge badge-primary badge-shadow" style={{ padding: "8px" }}>credentials</label>
                      <div class="row">
                        <div class="form-group col-6">
                          <label>password</label>
                          <input onChange={(e) => handle(e)} id="password" type="text" class="form-control" name="password" placeholder="Please select strong password"/>
                        </div>
                        <div class="form-group col-6">
                          <label>role</label>
{/*                           <div>
                            <input  onChange={(e) => handleRole(e)}  list="role" name="role" id="categories" placeholder="select User role" style={{height:"40px" ,width:"100%", lineHeight:"initial"}}/>
                              <datalist  id="role">
                                  <option>admin</option>
                                  <option>saleman</option>
                              </datalist>
                            </div> */}
                              <select onChange={(e) => handleRole(e)} style={{height:"40px" ,width:"100%", lineHeight:"initial"}}>
                                    <option>Please choose one option</option>
                                    {options.map((option, index) => {
                                        return <option key={index} value={option.value} >
                                            {option.label}
                                        </option>
                                    })}
                                </select>
                        </div>
                      </div>

                      <div class="row">
                      <div class="form-group col-4"></div>
                        <div class="form-group col-4">
                          <button type="submit" class="btn btn-success btn-lg btn-block" style={{marginTop:"15px"}}>
                            Add User
                          </button>
                        </div>
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


export default AddUser;