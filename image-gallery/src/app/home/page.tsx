import React from 'react'

const Home = async() => {
    await new Promise((resolve)=>setTimeout(resolve,1000));
  return (
    <div>Home</div>
  )
}

export default Home