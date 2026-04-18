import React, { useEffect, useState } from 'react'
import {dummyUserData} from '../assets/assets'
import { Image, Video, X } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {

  const[content,setContent] = useState('')
  const[images,setImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [videoPreviews, setVideoPreviews] = useState([])
  const [loading,setLoading]  = useState(false)
  const[videos,setVideos] = useState([])

  const user = dummyUserData;

  useEffect(() => {
    const nextImagePreviews = images.map((image) => ({
      file: image,
      url: URL.createObjectURL(image),
    }))

    setImagePreviews(nextImagePreviews)

    return () => {
      nextImagePreviews.forEach(({ url }) => URL.revokeObjectURL(url))
    }
  }, [images])

  useEffect(() => {
    const nextVideoPreviews = videos.map((video) => ({
      file: video,
      url: URL.createObjectURL(video),
    }))

    setVideoPreviews(nextVideoPreviews)

    return () => {
      nextVideoPreviews.forEach(({ url }) => URL.revokeObjectURL(url))
    }
  }, [videos])

  const handleSumbmit= async ()=>{

  }
  
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className="max-w-6xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Post</h1>
        <p className="text-slate-600">Share your thoughts with the world</p>
      </div>

      {/* Form */}

      <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <img src={user.profile_picture} alt="" className="w-12 h-12 rounded-full shadow" />
          <div className="">
            <h2 className="font-semibold">
              {user.full_name}
            </h2>
            <p className="text-sm text-gray-500">
              @{user.username}
            </p>
          </div>
        </div>

        <textarea onChange={(e)=>setContent(e.target.value)} className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400' placeholder="What's happening?" value={content} />
  {/* IMages */}
          {
            imagePreviews.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
              {imagePreviews.map(({ url },i)=>(
<div key={i} className="relative group">
  <img src={url} alt="" className="h-20 rounded-md" />
  <div className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer">
    <X onClick={()=> setImages(images.filter((_,index)=> index !== i))} className='w-6 h-6 text-white'/>
  </div>
</div>
              ))}
            </div>
          }


          {/* Videos */}


          {
            videoPreviews.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
              {videoPreviews.map(({ file, url },i)=>(
<div key={i} className="relative group">
  
    <video src={url} type={file.type} autoPlay  className='w-full h-full' />
  
  <div className="absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer">
    <X onClick={()=> setVideos(videos.filter((_,index)=> index !== i))} className='w-6 h-6 text-white'/>
  </div>
</div>
              ))}
            </div>
          }


          {/* Bottom bar */}

          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label htmlFor="images" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer">
              <Image className='size-6' />
            </label>

            <input onChange={(e)=>setImages([...images,...Array.from(e.target.files || [])])} type="file" id="images" accept="image/*"  hidden multiple className="" />

            {/* For vides */}


            <label htmlFor="videos" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer">
              <Video className='size-6' />
            </label>

            <input onChange={(e)=>setVideos([...videos,...Array.from(e.target.files || [])])} type="file" id="videos" accept="video/*"  hidden single className="" />

          <button disabled={loading} onClick={()=> toast.promise(handleSumbmit(),{
            loading:'uploading',
            success: <p>Post Added Successfully</p>,
            error: <p>Post uploading faield</p>
  })} className="text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer">
            Publish Post
          </button>
          </div>
      </div>
 
    </div>
  )
}

export default CreatePost
