import React, { useState } from 'react'
import DeleteModal from './DeleteModal'
import { useNavigate } from 'react-router-dom'

const Card = ({ item }) => {
    const [showDelModel,setShowDelModel]=useState(false)
    const [id,setId]=useState("")
    const navigate=useNavigate()
    return (
        <>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">

                {/* Image */}
                {item.photo && (
                    <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                    />
                )}

                {/* Content */}
                <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3">
                        {item.content}
                    </p>
                </div>
                <button onClick={()=>navigate(`/update/${item._id}`)}>Edit</button>
                <button onClick={()=>{setShowDelModel(true); setId(item._id)}}>Delete</button>
            </div>
            {showDelModel && <DeleteModal setShowDelModel={setShowDelModel} id={id}/>}
        </>
    )
}

export default Card