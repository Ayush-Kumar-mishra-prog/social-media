import { ArrowLeft, Bold, Code, Italic, Sparkle, TextIcon, Type, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const StoryModel = ({setShowModal,fetchStories}) => {
    const bgColors = ["#4f46e5","#7c3aed","#db2777","#e11d48","#ca8a04","#0d9488"]
    const [mode,setMode] = useState("text")
    const[background,setBackground] = useState(bgColors[0])
    const [text,setText] = useState("")
    const fontOptions = [
        { id: "sans", label: "Sans", style: "font-sans", icon: Type, fontFamily: "ui-sans-serif, system-ui, sans-serif" },
        { id: "serif", label: "Serif", style: "font-serif", icon: Italic, fontFamily: "ui-serif, Georgia, serif" },
        { id: "mono", label: "Mono", style: "font-mono", icon: Code, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" },
        { id: "title", label: "Title", style: "font-semibold tracking-wide", icon: Bold, fontFamily: "ui-sans-serif, system-ui, sans-serif" },
    ]
    const [fontStyle,setFontStyle] = useState(fontOptions[0])
    const [media,setMedia] = useState(null)
    const [previewUrl,setPreviewUrl] = useState(null)

    const handleMediaUpload = (e)=>{
        const file = e.target.files?.[0]
        if(file){
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleCreateStory = async()=>{

    }
  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4 overflow-x-hidden'>
        <div className="w-full max-w-3xl">
            <div className="text-center mb-4 flex items-center justify-between">
                <button onClick={()=> setShowModal(false)} className="text-white p-2 cursor-pointer">
                    <ArrowLeft />
                </button>
                <h2 className="text-lg font-semibold">Create story</h2>
                <span className="w-10"></span>
            </div>
            <div className="w-full max-w-md mx-auto">
                <div className="rounded-lg h-96 w-full flex items-center justify-center relative" style={{backgroundColor:background}}>

                {mode === 'text' && (
                    <textarea
                        name=""
                        id=""
                        className={`bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none ${fontStyle.style}`}
                        style={{ fontFamily: fontStyle.fontFamily }}
                        placeholder="What's in your mind"
                        onChange={(e)=>setText(e.target.value)}
                        value={text}
                    />
                )}
                {
                    mode === 'media' && previewUrl && (
                        media?.type.startsWith('image') ? (
                            <img src={previewUrl} alt="" className="object-contain max-h-full" />) : (
                                <video src={previewUrl} className="object-contain max-h-full" controls playsInline />
                            )
                        )
                    
                }
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 items-center w-full max-w-md mx-auto gap-3 flex-wrap">
                <div className="flex mt-1 gap-2 flex-shrink-0">
                    {
                        bgColors.map((color)=>(
                            <button className="w-6 h-6 rounded-full ring cursor-pointer" style={{backgroundColor:color}} onClick={()=>setBackground(color)} key={color} />
                        ))
                    }
                </div>

                <div className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur px-2 py-2 rounded-lg text-xs min-w-0 flex-wrap ">
                    <div className="flex items-center gap-1 flex-wrap">
                        {fontOptions.map((f)=>(
                            <button
                                key={f.id}
                                onClick={()=>setFontStyle(f)}
                                className={`w-9 h-9 rounded border cursor-pointer flex items-center justify-center ${fontStyle.id === f.id ? "bg-white text-black border-white" : "bg-black/30 text-white border-white/20"}`}
                                title={f.label}
                                aria-label={f.label}
                            >
                                <f.icon size={16} />
                            </button>
                        ))}
                    </div>

                    <div className="h-7 w-px bg-white/20 mx-1"></div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-md mx-auto">
                <button onClick={()=>{setMode('text'); setMedia(null);setPreviewUrl(null)}} className={`w-full flex items-center justify-center cursor-pointer gap-2 p-2 rounded ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <TextIcon  size={18}/> Text
                </button>
                
                <label htmlFor="story-media-input" className={`w-full flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <input id="story-media-input" type="file" accept='image/*,video/*' className='hidden' onChange={(e)=>{handleMediaUpload(e); setMode('media')}} />
                    <Upload size={18} /> Photo/Video
                </label>
            </div>
            <button onClick={()=> toast.promise(handleCreateStory(),{
                loading: 'Saving...',
                success: <p>Story Added</p>,
                error: e=> <p>{e.message}</p>
            })} className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full max-w-md mx-auto rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer">
                <Sparkle size={18} /> Create Story
            </button>
        </div>
    </div>
  )
}

export default StoryModel
