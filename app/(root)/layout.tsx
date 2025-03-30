import React, {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticatd} from "@/lib/actions/auth.actions";
import {redirect} from "next/navigation";

const Root_Layout = async ({children}: {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticatd()

    if (!isUserAuthenticated) redirect('/sign-in')
    return (
        <div>
            <nav>
                <Link href='/' className='flex items-center gap-2'>
                    <Image src='/logo.svg' alt='logo' width={38} height={32}/>
                    <h2 className='text-primary-100'>PrepWise</h2>
                </Link>
            </nav>
            { children }
        </div>
    )
}
export default Root_Layout
