'use client'

import { signIn } from 'next-auth/react'

export default function Login() {

    return (
        <li className='list-none'>
            <button onClick={() => signIn()} className='bg-gray-500 text-sm  text-gray-100 p-3 rounded disabled:opacity-25'>
                Sign in
            </button>
        </li>
    )

}