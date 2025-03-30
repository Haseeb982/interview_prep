'use server'
import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params
    console.log("data", email, name)

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists! please login',
            }
        }

        await db.collection('users').doc(uid).set({
            name, email
        })

        return {
            success: true,
            message: 'Account Created successfully! Please login',
        }
    } catch (e: any ) {
        console.error("Error creating a user", e);

        if (e.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'This email is already in use',
            }
        }

        return  {
            success: false,
            message: 'Failed to create an account',
        }
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params

    try {
        const userRecord = await auth.getUserByEmail(email)

        if (!userRecord) {
            return {
                success: false,
                message: 'User does not exist! please create an account',
            }
        }

        await setSessionCookie(idToken)
    } catch (e: any ) {
        console.log(e);

        return  {
            success: false,
            message: 'Failed to log an account',
        }
    }
}

const oneWeek = 60 * 60 * 24 * 7

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies()

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: oneWeek * 1000
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: oneWeek,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax'
    })
}

// @ts-ignore
export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies()

    const sessionCookie = cookieStore.get('session')?.value

    if (!sessionCookie) return null

    try {
        const decodedSession = await auth.verifySessionCookie(sessionCookie, true)

        const userRecord = await db.collection('users').doc(decodedSession.uid).get()

        if (!userRecord.exists) return null

        return {
            ...userRecord.data(),
            id: userRecord.id
        } as User

    } catch (e) {
        console.log(e)
    }
}

export async function isAuthenticatd() {
    const user = await getCurrentUser()

    return !!user // means '!!' true
}

