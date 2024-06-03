import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud } from "react-icons/fi";
import { useEffect } from 'react';

const Upload = ({
    name,
    label,
    register,
    setValue,
    errors,
    video = false,
    viewData = null,
    editData = null,
}) => {
    const [previewSource, setPreviewSource] = useState(
        viewData ? viewData : editData ? editData : ""
    )
    const [seletedFile, setSelectedFile] = useState(null)

    const onDrop = (acceptedFile)=>{
        const file = acceptedFile[0];
        setSelectedFile(file)
        previewFile(file)
    }

    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewSource(reader.result)
        }
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: video ? { "video/*": [".mp4"] } : { "image/*": [".jpeg", ".jpg", ".png"] },
        onDrop
    })

    useEffect(() => {
      register(name,{required : true})
    }, [])

    useEffect(() => {
      setValue(name,seletedFile)
    }, [seletedFile,setValue])
    
    
    return (
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className='text-sm text-richblack-5'>
                {label}{!viewData && <sup className='text-pink-200'>*</sup>}
            </label>
            <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700"} flex justify-center items-center cursor-pointer rounded-md border-2 border-dotted border-richblack-500 min-h-[250px]`}>
                {
                    previewSource ?
                        (<div className='flex flex-col p-6 w-full'>
                            {video ?
                                (<ReactPlayer src={previewSource} playsInline aspectRatio='16:9' />) :
                                (<img
                                    src={previewSource}
                                    alt='Preview'
                                    className='h-full w-full object-cover rounded-md'
                                />)}
                            {
                                !viewData && (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            setPreviewSource("")
                                            setValue(name, "")
                                            setSelectedFile(null)
                                        }}
                                        className='mt-3 text-richblack-400 underline'
                                    >
                                        Cancel
                                    </button>
                                )
                            }
                        </div>) :
                        (<div className='w-full flex flex-col items-center p-6'{...getRootProps()}>
                            <input type="text" {...getInputProps()} />
                            <div className='grid w-14 aspect-square place-items-center rounded-full bg-pure-greys-800'>
                                <FiUploadCloud className='text-2xl text-tellow-50' />
                            </div>
                            <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
                                Drag and Drop a {!video ? "image" : "video"}, or click to {" "}
                                <span className='font-semibold text-yellow-50'>Browse</span>
                                {" "}a file.
                            </p>
                            <ul className='flex list-disc mt-10 justify-between space-x-12 text-center text-sm text-richblack-200'>
                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>)
                }
            </div>
            {
                errors[name] &&(
                    <span className='text-sm ml-2 tracking-wide text-pink-200'>
                        {label} is required
                    </span>
                )
            }
        </div>
    )
}

export default Upload