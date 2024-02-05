'use client';
import { initFirebase } from "@/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignUpPage() { 
    const [formData, setFormData] = useState ({
        email: "",
        password: "" 
    })
    
    
    const app = initFirebase();
    const auth = getAuth();

    const signUp = async() => { 
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    }

    return (
        <form className = "py-10 px-24 bg-black rounded-lg flex-col items-center text-white shadow-lg"> 
            <div className= "flex justify-center">   
                <h1 className= "text-4xl flex justify-center pb-10 font-semibold"> Sign up </h1>
            </div>
            <div className="flex justify-center">
                <div className="pb-6">
                    <p className="pb-2"> Email or username </p>
                    <input type="text" onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} placeholder="Email or username" className = "border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                </div>
            </div>
            <div className="flex justify-center">
                <div className = "pb-10">
                    <p className="pb-2"> Password </p>
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} value = {formData.password} placeholder = "Password" className="border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                </div>
            </div>
            <div className = "pb-8 flex justify-center">
                <Link href = "/">
                    <button className= "bg-purple-300 rounded-2xl px-32 py-2 hover:scale-105" onClick={signUp}>
                        <p className= "font-semibold text-black">
                                Sign Up
                        </p>
                    </button>
                </Link>
            </div>
            <hr className="border-0.5 w-96 pb-8 border-gray-500"/>
            <div className="text-sm"> 
                <p className="text-gray-500 text-center"> Have an account already? <Link href = "/login"><u className="text-white">Log in to Harmony</u></Link></p>
            </div>
        </form>
        
    ); 
}