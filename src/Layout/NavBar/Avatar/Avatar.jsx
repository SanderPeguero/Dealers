import React, { useState, useEffect } from "react"

const Avatar = ({openSettingUser, setopenSettingUser}) => {
   
    return (
        <>
            <div onClick={() => setopenSettingUser(!openSettingUser)} className="cursor-pointer">
                <img
                    alt="tania andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    className="relative inline-block h-12 w-12  rounded-full object-cover object-center"
                    data-popover-target="profile-menu"
                />
            </div>




        </>
    )
}
export default Avatar