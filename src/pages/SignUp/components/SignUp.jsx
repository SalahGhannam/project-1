import React, { useState } from 'react'
import axios from 'axios';
import { object, string} from 'yup';
import './SignUp.css'
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function App() {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    userName:"",
    email:"",
    password:"",
    image:"",
  })

  const [errors,setErrors]= useState([]);

  const [loader,setLoader] = useState(false);

  const handelChange = (e)=>{
    const {name, value} = e.target;
    setUser({
      ...user,
      [name]:value
    });
  };

  const handelImageChange = (e)=> {
    const {name,files} = e.target;
    setUser({
      ...user,
      [name]:files[0]
    });
  };

  const validateData =async ()=> {
   const registerSchema = object({
      userName:string().min(5).max(20).required(),
      email:string().email().required(),
      password:string().min(8).max(20).required(),
      image:string().required(),
    });
    try{
    await registerSchema.validate(user,{abortEarly:false});
    return true;
  }catch(error){
    setErrors(error.errors);
    setLoader(false);
    return false
  }
  };

  const handelSubmit =async (e)=>{
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    if (validate){

    const formData = new FormData();
    formData.append('userName',user.userName);
    formData.append('email',user.email);
    formData.append('password',user.password);
    formData.append('image',user.image);
     try{
    const {data} =await axios.post(`${import.meta.env.VITE_API}/auth/signup`,formData);

    setUser({
      userName:"",
      email:"",
      password:"",
      image:"",
    });
   
    if (data.message=='success'){
      toast('your account has been created successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "light",
        transition: Slide,
        });
        navigate('/');
    }
  }catch(error){
    
    if(error.response.status === 409){
      toast('email already exist', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  }finally{
    setLoader(false);
  }
  }
  };

  return (
    <>
    {errors.length >0? errors.map(error=>
      <p>{error}</p>
      ): ''}
       
       <div className="main-block">
      

      <form onSubmit={handelSubmit}> 
      <h1>Sign Up</h1>

      <div className="info">
      <label>user Name</label>
      <input type="text" value={user.userName} name='userName' onChange={handelChange} />
      
      <label>email</label>
      <input type="email" value={user.email} name='email' onChange={handelChange} />
    
      
      <label>password</label>
      <input type="password" value={user.password} name='password' onChange={handelChange} />
      
      
      <label>image</label>
      <input type="file" name='image' onChange={handelImageChange} />
      </div>
      
      <button type='submit' disabled={loader?'disabled':null}>{!loader?'Submit' : 'wait...'}</button>
      </form>
      </div>

    </>
  )
}

