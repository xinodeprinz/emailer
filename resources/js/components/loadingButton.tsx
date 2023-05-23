import React from 'react'

const LoadingButton = () => {
  return (
    <div className='d-flex align-items-center loading-btn'>
      <div className="spinner-grow text-white" role="status" />
      <span className="ms-2">Emailing....</span>
    </div>
  )
}

export default LoadingButton