
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateNote } from '../features/userSlice';

const UpdateModal = () => {
    const { register, handleSubmit, formState, setValue } = useForm({})
    const dispatch = useDispatch()

    const { id } = useParams()
    console.log("id", id)

    const navigate = useNavigate()

    const getTodo = async () => {
        try {

            const res = await axios.get(`http://localhost:8001/todo/getById/${id}`)
            // console.log("note", res);
            const title = res.data.data.title

            setValue('title', title)
        } catch (error) {
            console.log(error)
        }

    }

    const onSubmit = (data) => {
        dispatch(updateNote({ id, data }))
        navigate('/getnotes')
    }

    const handleCancel = () => {
        navigate('/getnotes')
    }


    useEffect(() => {
        getTodo()
    }, [id])


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
                    <div className="mb-6">
                        <label htmlFor="title" className="text-sm font-semibold leading-7 text-gray-600 mt-3">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            {...register('title')}
                            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                        <label htmlFor="title" className="text-sm font-semibold leading-7 text-gray-600 mt-3">
                            Content
                        </label>
                        <input
                            type="text"
                            name="content"
                            {...register('content')}
                            className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                        <p className='text-xs text-red-600 font-semibold'>{formState.errors.name?.message}</p>
                    </div>

                    <div className='flex justify-center gap-5'>

                        <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='submit'>
                            Update
                        </button>
                        <button className="rounded border-0 mt-5 bg-indigo-500 py-2 px-6 text-lg text-white hover:bg-indigo-600 focus:outline-none" type='button' onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateModal