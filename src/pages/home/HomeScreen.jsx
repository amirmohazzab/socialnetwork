import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import PostList from '../../components/HomeScreen/postList/PostList'
import SideBar from '../../components/HomeScreen/sideBar/SideBar'

const HomeScreen = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className="columns mt-5">
        <div className="column is-two-thirds">
          <PostList />
        </div>
        <div className="column is-one-third">
          <SideBar />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
