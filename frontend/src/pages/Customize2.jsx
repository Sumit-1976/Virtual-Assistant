import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import {MdKeyboardBackspace} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Customize2 = () => {
  const {userData, backendImage, selectedImage,serverUrl, setUserData} = useContext(userDataContext)
  const [assistantName, setAssistantName] = useState(userData?.AssistantName || "")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleUpdateAssistant = async ()=>{
    try {
      setLoading(true)  
      let formData = new FormData()
      formData.append("assistantName", assistantName)
      if(backendImage){
        formData.append("assistantImage", backendImage)
      } else {
        formData.append("imageUrl", selectedImage)
      }
      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {withCredentials: true})

      console.log(result.data)
      setUserData(result.data)

      navigate("/")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)  
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] relative'>
      <MdKeyboardBackspace onClick={()=>navigate("/customize")} className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer' />
      <h1 className='text-white text-[30px] mb-[40px] text-center'>Enter Your <span className='text-blue-300'>Assistant Name</span></h1>
      <input type="text" placeholder='Eg: Shifra' className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]' required onChange={(e)=>setAssistantName(e.target.value)} value={assistantName} />
      {assistantName && <button className='min-w-[300px] h-[60px] text-black font-semibold text-[19px] mt-[30px] bg-white rounded-full cursor-pointer disabled:opacity-50' disabled={loading} onClick={handleUpdateAssistant}>
        Finally Create Your Assistant
      </button>}

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default Customize2
