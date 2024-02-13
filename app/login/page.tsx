'use client';
import { initFirebase } from "@/firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from 'next/link';
import { useState } from "react";
import { logInFormValidation, checkForErrors } from "../authValidation";
import { InformationFilled } from "@carbon/icons-react";

export default function LoginPage() { 
    const [formData, setFormData] = useState ({
        email: "",
        password: "" 
    })

    const [errorInfo, setErrorInfo] = useState ({
        email: "",
        password: "" 
    })
    
    const app = initFirebase();
    const auth = getAuth();

    const logIn = (e: any) => { 
        e.preventDefault();
        const errors = logInFormValidation(formData.email, formData.password);
        if (checkForErrors(errors)) { 
            signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        } else {
            setErrorInfo(errors);
            console.log(errors);
        }
    }

    return (
        <form className = "py-10 px-24 bg-black rounded-lg flex-col items-center text-white shadow-lg"> 
            <div className= "flex justify-center">   
                <h1 className= "text-4xl flex justify-center pb-6 font-semibold"> Log in to Harmony </h1>
            </div>
            <div className="flex justify-center">
                <div className="pb-6">
                    <p className="pb-2"> Email</p>
                    <input type="text"onChange={(e) => setFormData({...formData, email: e.target.value})} value = {formData.email} placeholder="Email" className = "border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                    <div className={errorInfo.email ? "flex items-center pt-2" : "hidden"}>
                        <InformationFilled size={16} color="rgb(216 180 254)"/>
                        <p className="pl-2 text-purple-300">{errorInfo.email}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className = "pb-10">
                    <p className="pb-2"> Password </p>
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} value = {formData.password} placeholder = "Password" className="border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                    <div className={errorInfo.password ? "flex items-center pt-2" : "hidden"}>
                        <InformationFilled size={16} color="rgb(216 180 254)"/>
                        <p className="pl-2 text-purple-300">{errorInfo.password}</p>
                    </div>
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
        </form>
        
    ); 
}