import React, { useState } from 'react'
import Button from "./ui/Button"
import Input from "./ui/Input"
import { Label } from "@radix-ui/react-label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate } from "react-router-dom";
import axios from 'axios';
const server = import.meta.env.VITE_PUBLIC_SERVER_URL as string

const SignupForm: React.FC = () => {

    const [username, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Password does not match!', {
            });
        }
        axios
      .post(`${server}/auth/signup`, {
        username,
        password,
        email,
      })
      .then((res) => {
        console.log("This is res",res)
        if(res.data.status){
          navigate('/authpage')
        }
      })
      .catch((err) => {
        console.log(err);
      });

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
            <ToastContainer />
        </>
    )
}

export default SignupForm

