import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { userExist } from "../redux/reducer/userReducer";
import { Link } from "react-router-dom";

const ManualLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

    
      const fetchedUser = {
        _id: user.uid,
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender: "", 
        role: "user",
        dob: new Date(), 
      };

      toast.success("Login Successful");
      dispatch(userExist(fetchedUser));
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  return (
    <div className="manual-login">
      <main>
        <h1 className="heading">Login</h1>
        <form onSubmit={loginHandler}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </main>
    </div>
  );
};

export default ManualLogin;
