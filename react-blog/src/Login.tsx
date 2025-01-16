import React, { useState } from 'react'
import Button from "./ui/Button"
import Input from "./ui/Input"
import { Label } from "@radix-ui/react-label";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const server = import.meta.env.VITE_PUBLIC_SERVER_URL as string
const LoginForm: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await axios.post(`${server}/auth/login`, {
			email, password

		},{ withCredentials: true }).then((res) => {
			console.log("This is data", res.data);
			if (res.data.status) {
			  localStorage.setItem("userId",res.data.userId);
			  localStorage.setItem("username",res.data.username)
			  navigate("/homepage");
			}
		  })
		  .catch((err) => {
			console.log(err);
		  });
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
			<Button type="submit" className="w-full">
				Login
			</Button>
		</form>
	)
}

export default LoginForm