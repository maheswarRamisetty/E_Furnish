import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [email,setMail] = useState("");


  
  const handleEmail=(e)=>{
    setMail(e.target.value);
   }
  const gender="male"
  const date = new Date();

  const [login] = useLoginMutation();


  const loginViaLocal=async()=>{


   
   
   
    // const password = 
  
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/login', {
        email,
      });
  
      if (response.status === 200) {
        // Handle successful login


        //MAD_+++++++

        const mahiname=(response.data.user.name)
        toast.success("Welcome "+mahiname);
        
        console.log(response.data.user._id);
        const data=await getUser(response.data.user._id);
        dispatch(userExist(data.user))

        //optionsll for navigation
        //navigate('/'); 
      } else {
        toast.error("Login failed: " + response.data.message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    }
  }

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>

       <div>

        <input type="email" onChange={handleEmail} value={email} name="email" placeholder="Enter Email" required/><br></br>

        <input type="password" name="password" placeholder="Enter Password"  required/>
        
        <br />
        <button onClick={loginViaLocal}>Login</button>
       </div>

       
    <Link  to="/register">Don't have an account?CreateOne</Link>

        <div>

          <button onClick={loginHandler}>Or
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
