'use client'

import { signIn } from 'next-auth/react'

export default function Login() {

    return (
        <div>
            <button onClick={() => signIn()} className='bg-primary text-sm  text-background px-4 py-0.5 rounded-full disabled:opacity-25'>
                Sign in
            </button>
        </div>
    )

}