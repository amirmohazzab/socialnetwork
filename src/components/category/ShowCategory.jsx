import React, { useContext } from 'react'
import './showcategory.css'
import { CategoryContext } from '../../context/CategoryContext'
import moment from 'moment';
import { Link } from 'react-router-dom';

const ShowCategory = () => {

    const {category, deleteCategory} = useContext(CategoryContext)

  return (
    <div className="columns is-justify-content-center">
        <div className="column is-two-thirds">
            <table className='table table-category is-fullwidth has-background-black'>
                <thead>
                    <tr>
                        <th> No </th>
                        <th> Category Name </th>
                        <th> Creator </th>
                        <th> Publish time </th>
                        <th> Status </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        category?.map((cat, index) => (
                            <tr key={cat._id}>
                                <td> {index+1} </td>
                                <td> {cat.title} </td>
                                <td> {cat?.user?.firstName} </td>
                                <td> {moment(cat.createdAt).format("YYYY-MM-DD")} </td>
                                <td> 
                                    <Link state={cat} to={`/edit-category/${cat._id}`} className='button is-success has-text-black mr-4'> Edit </Link>
                                    <button onClick={()=> deleteCategory(cat._id)} className='button is-danger has-text-black'> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
        </div>
    </div>
  )
}

export default ShowCategory
