import React from 'react'
import { useRef,useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from '../../../../services/operations/settingsAPI';

const ChangeProfilePicture = () => {
  const [imageFile,setImageFile] = useState(null)
  const[previewSource,setPreviewSource] = useState(null)
  const [loading,setLoading] = useState(false)
  const {user} = useSelector((state)=>state.profile)
  const {token} = useSelector((state)=>state.auth)
  const fileInputRef = useRef(0);
  const dispatch = useDispatch();

  const handleFileChange = (e)=>{
    const file = e.target.files[0]
    setImageFile(file);
    previewFile(file);
  }

  const previewFile = (file)=>{
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      setPreviewSource(reader.result)
    }
  }

  const handleClick = ()=>{
    fileInputRef.current.click();
  }

  const handleFileUpload = ()=>{
   try {
    setLoading(true);
    const formData = new FormData();
    formData.append("displayPicture",imageFile)
    dispatch(updateDisplayPicture(token,formData)).then(()=>{setLoading(false)})
   } catch (error) {
    console.log("Profile picture uplaoding error in component",error)
   }
  }

  useEffect(() => {
    if(imageFile){
      previewFile(imageFile)
    }
  }, [imageFile])
  
  return (
    <>
      <div className='flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 mb-8'>
        <div className='flex gap-x-4 items-center justify-between'>
            <img 
            src={previewSource || user?.image} 
            alt={user?.firstName}
            className='w-[78px] aspect-square rounded-full object-cover' />
            <div className='space-y-2'>
                <h2 className='text-lg font-semibold text-richblack-5'>Change Profile Picture</h2>
                <div className='flex gap-3'>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className='hidden'
                  accept="image/png, image/gif, image/jpeg"
                />

                <button 
                onClick={handleClick}
                disabled={loading}
                className='text-richblack-50 bg-richblack-700 py-2 px-5 font-semibold rounded-md cursor-pointer'
                >Select</button>

                <IconBtn 
                text={`${loading ? "loading" : "load"}`}
                onclick={handleFileUpload}
                >
                  {!loading && <FiUpload className='text-lg text-richblack-900'/>}
                </IconBtn>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ChangeProfilePicture