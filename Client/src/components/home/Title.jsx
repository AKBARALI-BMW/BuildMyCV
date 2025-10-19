import React from 'react'

    const Title = ({title, description})=>{
    
  return (
    
       <div className='text-center  mt-6 text-slate-700'>
        <h2 className='text-3xl sm:text-4xl font-medium'>{title}</h2>
        <p className='text-slate-500 text-center  max-sm: max-w-3xl mt-4'>{description}</p>
       </div>
  )

}

export default Title