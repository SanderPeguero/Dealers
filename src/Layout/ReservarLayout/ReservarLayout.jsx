import React from 'react'
import Navbar from '../NavBar/NavBar'
import Reservas from '../../Components/Reservas/Reservas'

const ReservarLayout = () => {
  return (
    <div className='bg-black'>
      <Navbar />

      <div className='bg-[#0B0C10] max-h-full '>
        <div className='h-[10rem] bg-[#12232E] text-white mb-16'>
          <div className='ml-10 lg:ml-[8rem] flex flex-col'>
            <h1 className='mt-8 text-4xl'>
              Lista de autos reservados
            </h1>
          </div>
        </div>

        <div className='flex flex-col mx-4 lg:ml-[6rem] lg:mr-[6rem] '>

          <Reservas />

        </div>
      </div>

    </div>
  )
}

export default ReservarLayout