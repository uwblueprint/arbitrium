import React from 'react'

const Container = ({ children, history }) => {
  console.log(history)
  return (
    <div style={{ marginLeft: 305 }} id="container">
      {children}
    </div>
  )
}

export default Container
