'use client'
import React, { useState } from 'react'
import Box from '@mui/system/Box'
import Grid from '@mui/system/Unstable_Grid'
import styled from '@mui/system/styled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import Link from 'next/link'
import axios from 'axios'

const Item = styled('div')(({ theme }) => ({

	padding: theme.spacing(1),
	textAlign: 'center',
}))

export default function page() {
	const [showPassword, setShowPassword] = useState(false)

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		phone: '',
	})

	const handleToggleVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	const handleInputChange = (event) => {
		const { name, value } = event.target
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}))
	}

	const handleSignUp = async () => {
		try {
			const response = await axios.post('http://localhost:3001/signup', formData)
			console.log(response.data)
		} catch (error) {
			console.error('Error signing up:', error)
		}
	}
	return (
		<CardContent>
			<Card sx={{ backgroundColor: '#EEEEEE' }}>
				<Grid container >
					<Grid item xs={12} lg={8}>
						<img
							src="https://images.pexels.com/photos/8205060/pexels-photo-8205060.jpeg?auto=compress&cs=tinysrgb&w=600"
							width="100%"
							height="100%"

						/>
					</Grid>
					<Grid item xs={12} lg={4} sx={{ backgroundColor: '#EEEEEE' }}>
						<Item>
							<h1>Sign up</h1>
							<p>Create your account</p>
						</Item>

						<Item>
							<TextField
								id="filled-basic"
								label="Username"
								variant="outlined"
								value={formData.username}
								onChange={(e) => handleInputChange(e)}
								name="username" 
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<PersonIcon />
										</InputAdornment>
									),
								}}
								sx={{ width: '80%' }}
							/>
						</Item>
						<Item>
							<TextField
								id="filled-basic"
								label="Email"
								variant="outlined"
								value={formData.email} 
								onChange={(e) => handleInputChange(e)}
								name="email" 
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<EmailIcon />
										</InputAdornment>
									),
								}}
								sx={{ width: '80%' }}
							/>
						</Item>
						<Item>
							<TextField
								id="outlined-password"
								label="Password"
								type={showPassword ? 'text' : 'password'}
								variant="outlined"
								value={formData.password} 
								onChange={(e) => handleInputChange(e)}
								name="password" 
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockOpenIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position="end">
											<RemoveRedEyeIcon
												onClick={handleToggleVisibility}
												edge="end"
												aria-label="toggle password visibility"
												style={{ cursor: 'pointer' }}
											>
												{showPassword ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</RemoveRedEyeIcon>
										</InputAdornment>
									),
								}}
								sx={{ width: '80%' }}
							/>
						</Item>
						<Item>
							<TextField
								id="filled-basic"
								label="Phone"
								variant="outlined"
								inputProps={{
									pattern: '[0-9]*',
								}}
								value={formData.phone}
								onChange={(e) => handleInputChange(e)}
								name="phone" 
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LocalPhoneIcon />
										</InputAdornment>
									),
								}}
								sx={{ width: '80%' }}
							/>
						</Item>

						<Item>
							<Item>
								<Button
									variant="contained"
									onClick={handleSignUp}
									sx={{
										background: '#FFD369',
										'&:hover': {
											background: '#FBC687',
										},
									}}
								>
									Sign up
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
								<p> Already have an account?</p>
								<Link href="/login">Login</Link>
							</Item>
						</Item>
					</Grid>
				</Grid>
			</Card>
		</CardContent>
	)
}
