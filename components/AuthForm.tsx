"use client"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link";
import { toast } from 'sonner'
import FormFeild from "@/components/FormFeild";
import {useRouter} from "next/navigation";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/firebase/client";
import {signUp, signIn} from "@/lib/actions/auth.actions";

const authFormSchema = (type: FormType)=> {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })

}

const AuthForm = ({type}: {type: FormType}) => {
    const formSchema = authFormSchema(type)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                const { name, email, password } = values
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

                const result = await  signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password
                })

                console.log(name, email, password)
                if (!result?.success) {
                    toast.error(result?.message)
                    return
                }

                toast.success("Account created successfully. Please sign in.")
                router.push("/sign-in")
            } else {
                const { email, password } = values
                const userCredentials = await signInWithEmailAndPassword(auth, email, password)

                const idToken = await userCredentials.user.getIdToken()

                if (!idToken) {
                    toast.error('Sign in failed')
                    return
                }

                await signIn({
                    email, idToken
                })
                toast.success("Sign in successfully.")
                router.push("/")
            }
        } catch (error) {
            console.error('real error', error)
            toast.error('Error creating auth form')
        }
    }

    const isSign_in = type === 'sign-in'

    return (
        <div className='card-border lg:min-w-[566px]'>
            <div className='flex flex-col gap-6 card py-14 px-10 '>
                <div className='flex flex-row gap-2 justify-center'>
                    <Image src='/logo.svg' alt='logo' height={32} width={38}/>
                    <h2 className='text-primary-100'>PrepWise</h2>
                </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                    {!isSign_in && <FormFeild control={form.control} name='name' label='Name' placeholder='Your Name' />}
                    <FormFeild control={form.control} name='email' label='Email' placeholder='Enter Your Email Address' type='email'/>
                    <FormFeild control={form.control} name='password' label='Password' placeholder='Enter Your Name' type='password'/>
                    <Button type="submit" className='w-full bg-[#DDDFFF] hover:bg-[#B4B9FF] cursor-pointer '>{
                        !isSign_in? 'Create an account' : 'sign-in'
                    }</Button>
                </form>
            </Form>
                <p className='text-center'>
                    {isSign_in ? 'No account yet?' : 'Have an account already?'}
                    <Link href={!isSign_in ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
                        {!isSign_in ? 'Sign in' : 'Sign up'}
                    </Link>
                </p>
        </div>
        </div>
    )
}
export default AuthForm
