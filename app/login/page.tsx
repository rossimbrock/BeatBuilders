'use client';
import { initFirebase } from "@/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';

export default function LoginPage() { 

    const app = initFirebase();
    const auth = getAuth();
    let email = ""; 
    let password = ""; 

    const logIn = async() => { 
        email = (document.getElementById('email') as HTMLInputElement).value;
        password = (document.getElementById('password') as HTMLInputElement).value;
        const result = await signInWithEmailAndPassword(auth,email,password);
        console.log(result.user);
    }

    return (
        <div className = "py-10 px-24 bg-black rounded-lg flex-col items-center text-white shadow-lg"> 
            <div className= "flex justify-center">   
                <h1 className= "text-4xl flex justify-center pb-10 font-semibold"> Log in to Harmony </h1>
            </div>
            <div className="flex justify-center">
                <div className="pb-6">
                    <p className="pb-2"> Email or username </p>
                    <input type="text" id="email" placeholder="Email or username" className = "border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className = "pb-10">
                    <p className="pb-2"> Password </p>
                    <input type="password" id="password" placeholder = "Password" className="border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                </div>
            </div>
            <div className = "pb-8 flex justify-center">
                <button className= "bg-purple-300 rounded-2xl px-32 py-2 hover:scale-105" onClick={logIn}>
                    <p className= "font-semibold text-black">
                            Login
                    </p>
                </button>
            </div>
            <hr className="border-0.5 w-96 pb-8 border-gray-500"/>
            <div className="text-sm"> 
                <p className="text-gray-500 text-center"> Don't have an account? <Link href = "/signUp"><u className="text-white">Sign Up for Harmony</u> </Link> </p>
            </div>
        </div>
        
    ); 
}