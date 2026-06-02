import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className='p-10 flex justify-center items-center'>
            <SignUp />
        </div>
    )
}