'use client';
import { initFirebase } from "@/firebase/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { signUpFormValidation, checkForErrors } from "../authValidation";
import { InformationFilled } from "@carbon/icons-react";
import { useRouter } from 'next/navigation'

export default function SignUpPage() { 
    const router = useRouter();

    const [formData, setFormData] = useState ({
        email: "",
        password: "", 
        username: ""
    })

    const [errorInfo, setErrorInfo]  = useState({
        email: "", 
        password: "", 
        username: ""
    })
    
    const [googleErrorInfo, setGoogleErrorInfo]= useState("")
    
    const app = initFirebase();
    const auth = getAuth();


    const signUp = (e: any) => { 
        e.preventDefault();
        const errors = signUpFormValidation(formData.email, formData.password, formData.username);
        if (checkForErrors(errors)) {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user.email);
                router.push("/")
            })
            .catch((error) => {
                setGoogleErrorInfo("Account already exists");
            });
        } else {
            setErrorInfo(errors);
        }
    }

    return (
        <form className = "py-10 px-24 bg-black rounded-lg flex-col items-center text-white shadow-lg"> 
            <div className= "flex justify-center">   
                <h1 className= "text-4xl flex justify-center pb-6 font-semibold"> Sign up </h1>
            </div>
            <div className="flex justify-center">
                <div className="pb-6">
                    <p className="pb-2"> Username </p>
                    <input type="text" onChange={(e) => setFormData({...formData, username: e.target.value})} value={formData.username} placeholder="Username" className = "border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                    <div className={errorInfo.username ? "flex items-center pt-2" : "hidden"}>
                        <InformationFilled size={16} color="rgb(216 180 254)"/>
                        <p className="pl-2 text-purple-300">{errorInfo.username}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="pb-6">
                    <p className="pb-2"> Email </p>
                    <input type="text" onChange={(e) => setFormData({...formData, email: e.target.value})} value={formData.email} placeholder="Email" className = "border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                    <div className={errorInfo.email ? "flex items-center pt-2" : "hidden"}>
                        <InformationFilled size={16} color="rgb(216 180 254)"/>
                        <p className="pl-2 text-purple-300">{errorInfo.email}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className = "pb-8">
                    <p className="pb-2"> Password </p>
                    <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} value = {formData.password} placeholder = "Password" className="border-white rounded-md border-2 w-80 pl-2 py-2 text-white bg-black"/>
                    <div className={errorInfo.password ? "flex items-center pt-2" : "hidden"}>
                        <InformationFilled size={16} color="rgb(216 180 254)"/>
                        <p className="pl-2 text-purple-300">{errorInfo.password}</p>
                    </div>
                </div>
            </div>
            <div className = {googleErrorInfo ?  "flex justify-center pb-4": "hidden"}>
                <div className="flex items-center border-2 rounded-md p-2 border-purple-300">
                    <InformationFilled size={16} color="white"/>
                    <p className = "pl-2 font-semibold"> {googleErrorInfo} </p>
                </div>
            </div>
            <div className = "pb-8 flex justify-center">
                <button className= "bg-purple-300 rounded-2xl px-32 py-2 hover:scale-105" onClick={signUp}>
                    <p className= "font-semibold text-black">
                            Sign Up
                    </p>
                </button>
              
            </div>
            <div className="flex justify-center">
                <hr className="border-0.5 w-96 pb-8 border-gray-500"/>
            </div>
            <div className="text-sm"> 
                <p className="text-gray-500 text-center"> Have an account already? <Link href = "/login"><u className="text-white">Log in to Harmony</u></Link></p>
            </div>
        </form>
        
    ); 
}