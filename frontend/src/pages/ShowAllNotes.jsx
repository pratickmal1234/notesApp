import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotes } from '../features/userSlice'
import Card from './Card'


const ShowAllNotes = () => {
    const { notes, loading, error } = useSelector((state) => state.user);
    // console.log(notes);
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllNotes())
    }, [dispatch])
    return (
        <>
            {notes.map((item) => <Card key={item._id} item={item} /> )}
        </>
    )
}

export default ShowAllNotes