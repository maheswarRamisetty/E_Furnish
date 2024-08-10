import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [gender, setGender] = useState("");
    const navigate = useNavigate();
    const dob="2021-08-11"
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setpass]=useState("");
    const photo='https://www.google.com/imgres?q=user%20icon%20photo&imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fthumbnails%2F002%2F318%2F271%2Fsmall_2x%2Fuser-profile-icon-free-vector.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fuser-icon&docid=E3VnjqP3ez2tMM&tbnid=KvWtrjVKkrYhpM&vet=12ahUKEwidteOpreOHAxUgyzgGHe_QCTIQM3oECBYQAA..i&w=400&h=400&hcb=2&ved=2ahUKEwidteOpreOHAxUgyzgGHe_QCTIQM3oECBYQAA';

    const handlePass=(e)=>{
        setpass(e.target.value);
    }
    const handlename=(e)=>{
        setName(e.target.value);
    }


    const handleemail=(e)=>{
        setEmail(e.target.value);
    }
  

    const handleChange = (e) => {
        setGender(e.target.value);
      };


      const registerable=async()=>{

        try {
            const response = await axios.post('http://127.0.0.1:4000/api/register', {
              name,
              email,
              gender,
              dob,
              photo
            });
      
           
            console.log(response.data);

            navigate("/login")

            toast.success("Registration Successful")
          
      
          } catch (error) {
          
            console.error("Registration failed:", error);
          }

      };


  return (
    <div className="login">
        <main>
            <h1 className="heading">Register</h1>
            <div>

                <input type="text" value={name}  onChange={handlename} placeholder='Enter Name' required />
                <br />
                <input type="email" value={email}  onChange={handleemail} placeholder='Enter Email' required/>
                <br />

                <input type="password"  value={password}  onChange={handlePass}  placeholder='enter pass' required/>
                <br />
                <input type="date" value={dob} placeholder='Enter DOB' required />
<br />

      <select id="gender" value={gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
<br />
      <button onClick={registerable}>
        Register
      </button>





            </div>
        </main>
    </div>
  )
}

export default Register
