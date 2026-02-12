import React, { useContext, useState } from 'react'
import bg from "../assets/authBg.png"
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import axios from "axios";

const SignIn = () => {

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  const { serverUrl, setUserData } = useContext(userDataContext)

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      let result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("RESPONSE:", error.response);
      console.log("DATA:", error.response?.data);

      setUserData(null);
      setErr(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>
      <form onSubmit={handleSignIn} className='w-[90%] h-[600px] max-w-[500px] bg-[#00000062] backdrop-blur shadow-lg shadow-black flex flex-col items-center justify-center gap-[20px] px-[20px] relative z-10'>
        <h1 className='text-white text-[30px] font-semibold mb-[30px]'>Sign In to <span className='text-blue-400'>Virtual Assistant</span></h1>
        <input type="email" placeholder='Email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e) => setEmail(e.target.value)} value={email} />
        <div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>
          <input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full rounded-full outline-none bg-transparent placeholder-gray-300 px-[20px] py-[10px]' required onChange={(e) => setPassword(e.target.value)} value={password} />
          {!showPassword && <IoEye className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(true)} />}
          {showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] text-white w-[25px] h-[25px] cursor-pointer' onClick={() => setShowPassword(false)} />}
        </div>
        {err.length > 0 && <p className='text-red-500 text-[17px]'>
          *{err}
        </p>}
        <button className='min-w-[150px] h-[60px] text-black font-semibold text-[19px] mt-[30px] bg-white rounded-full disabled:opacity-50 cursor-pointer' disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <p className='text-white text-[18px] cursor-pointer' onClick={() => navigate("/signup")}>Don't have an account ? <span className='text-blue-400'>Sign Up</span></p>
      </form>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default SignIn
