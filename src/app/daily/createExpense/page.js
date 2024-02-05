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
import { useRouter } from 'next/navigation'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Item = styled('div')(({ theme }) => ({
	padding: theme.spacing(1),
	textAlign: 'center',
}))

export default function page() {
	const router = useRouter()

	const [expenseData, setExpenseData] = useState({
		itemName: '',
		amountOfMoney: '',
		date: '',
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target
		setExpenseData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const handleCreateExpense = async () => {
		try {
			const response = await axios.post(
				'http://localhost:3001/createExpense',
				expenseData
			)
			console.log(response.data) 
			alert('Expense created successfully!')
			router.back()
		} catch (error) {
			console.error('Error creating expense:', error)
		}
	}

	const handleCancel = () => {
		router.back()
	}
	return (
		<CardContent>
			<Card sx={{ backgroundColor: '#EEEEEE' }}>
				<Grid container style={{ backgroundColor: '#EEEEEE' }}>
					<Grid item xs={12} lg={8}>
						<img
							src="https://images.pexels.com/photos/6446667/pexels-photo-6446667.jpeg?auto=compress&cs=tinysrgb&w=600"
							width="100%"
														height="100%"

						/>
					</Grid>
					<Grid item xs={12} lg={4} sx={{ backgroundColor: '#EEEEEE' }}>
						<Item>
							<h1>Create Expense</h1>
						</Item>

						<Item>
							<TextField
								id="outlined-basic"
								label="Item Name"
								variant="outlined"
								name="itemName"
								value={expenseData.itemName}
								onChange={handleInputChange}
							/>
						</Item>
						<Item>
							<TextField
								id="outlined-basic"
								label="Amount of Money"
								variant="outlined"
								name="amountOfMoney"
								value={expenseData.amountOfMoney}
								onChange={handleInputChange}
							/>
						</Item>
						<Item>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="Select Date"
									value={expenseData.date}
									onChange={(date) =>
										setExpenseData((prevData) => ({ ...prevData, date }))
									}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</Item>

						<Item
							sx={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
						>
							<Item>
								<Button
									variant="contained"
									sx={{
										background: '#6DECB9',
										'&:hover': {
											background: '#4CBBB9',
										},
									}}
									onClick={handleCreateExpense}
								>
									Create
								</Button>
							</Item>
							<Item>
								<Button variant="outlined" color="error" onClick={handleCancel}>
									Cancel
								</Button>
							</Item>
						</Item>
					</Grid>
				</Grid>
			</Card>
		</CardContent>
	)
}
