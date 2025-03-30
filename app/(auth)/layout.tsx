import React, {ReactNode} from 'react'
import {isAuthenticatd} from "@/lib/actions/auth.actions";
import {redirect} from "next/navigation";

const AuthLayout = async  ({children} : {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticatd()

    if (isUserAuthenticated) redirect('/')
    return (
        <div className='auth-layout'>{children}</div>
    )
}
export default AuthLayout
