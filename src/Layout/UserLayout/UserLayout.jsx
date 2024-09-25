import React from 'react'
import Navbar from '../NavBar/NavBar'
import TableUser from '../../Components/TableUser/TableUser'
const UserLayout = () => {
    return (
        <div className='bg-white dark:bg-black'>
            <Navbar />

            <div className='bg-white dark:bg-[#0B0C10] max-h-full '>
                <div className="bg-white dark:bg-[#12232E] text-black dark:text-white py-4">
                    <div className="ml-8 lg:ml-32">
                        <h1 className="text-4xl font-bold">
                            Usuarios
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col mx-4 lg:ml-[6rem] lg:mr-[6rem] '>
                    <TableUser />
                </div>
            </div>

        </div>
    )
}

export default UserLayout