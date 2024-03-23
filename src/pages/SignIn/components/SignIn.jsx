import React, { useContext, useState } from 'react'
import axios from 'axios';
import { object, string} from 'yup';
import './SignIn.css'
import { Bounce, Slide, toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import { UserContext } from '../../../context/User';


export default function SignIn() {
  const {setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const [user,setUser] = useState({
    email:"",
    password:"",
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


  const validateData =async ()=> {
   const signInSchema = object({
      email:string().email().required(),
      password:string().min(8).max(20).required(),
    });
    try{
    await signInSchema.validate(user,{abortEarly:false});
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

    
     try{
    const {data} =await axios.post(`${import.meta.env.VITE_API}/auth/signin`,
    {
      email:user.email,
      password:user.password
    });

    setUser({
      email:"",
      password:"",
    });
    
    if (data.message=='success'){
      toast('success', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 1,
        theme: "light",
        transition: Slide,
        });
        localStorage.setItem('userToken', data.token);
        setUserToken(data.token);
        navigate('/');
    }
  }catch(error){
    
    
      toast.error(error.response.data.message, {
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
      <h1>Sign In</h1>

      <div className="info">
      
      <label>email</label>
      <input type="email" value={user.email} name='email' onChange={handelChange} />
      <label>password</label>
      <input type="password" value={user.password} name='password' onChange={handelChange} />
      </div>
      
      <button type='submit' disabled={loader?'disabled':null}>{!loader?'Sign In' : 'wait...'}</button>

      
        <Link to={'/forget'}>Forgot Password?</Link>
     
      </form>
      </div>

    </>
  )
}

