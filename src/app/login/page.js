'use client'
import React, { useState } from 'react'
import Box from '@mui/system/Box'
import Grid from '@mui/system/Unstable_Grid'
import styled from '@mui/system/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Item = styled('div')(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'center',
}))

export default function page() {
	const router = useRouter()

	const [loginData, setLoginData] = useState({
		username: '',
		password: '',
	})
	const handleInputChange = (event) => {
		const { name, value } = event.target
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}
	
	const handleLogin = async () => {
		try {
			const response = await axios.post(
				'http://localhost:3001/login',
				loginData
			)
			console.log(response.data)

			router.push('/daily');
		} catch (error) {
			console.error('Error logging in:', error)
			alert('Invalid username or password')
		}
	}
	return (
		<CardContent>
			<Card sx={{ backgroundColor: '#EEEEEE' }}>
				<Grid container>
					<Grid item xs={12} lg={8}>
						<img
							src="https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							width="100%"
							height="100%"
						/>
					</Grid>
					<Grid item xs={12} lg={4} sx={{ backgroundColor: '#EEEEEE' }}>
						<Item>
							<h1>Login</h1>
						</Item>
						<Item>
							<TextField
								id="standard-basic"
								label="Username"
								variant="standard"
								name="username"
								value={loginData.username}
								onChange={handleInputChange}
							/>
						</Item>
						<Item>
							<TextField
								id="standard-basic"
								label="Password"
								variant="standard"
								name="password"
								type="password"
								value={loginData.password}
								onChange={handleInputChange}
							/>
						</Item>
						<Item>
							<Item>
								<Button
									variant="contained"
									onClick={handleLogin}
									sx={{
										background: '#FFD369',
										'&:hover': {
											background: '#FBC687',
										},
									}}
								>
									Login
								</Button>
							</Item>
							<Item
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: '5px',
								}}
							>
								<p>Dont have an accout?</p>
								<Link href="/signup">Sign up</Link>
							</Item>
						</Item>
					</Grid>
				</Grid>
			</Card>
		</CardContent>
	)
}
