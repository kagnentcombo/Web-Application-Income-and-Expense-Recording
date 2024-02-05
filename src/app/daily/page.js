'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Navbar from '../../../component/navbar'


export default function page() {
	const currentDate = dayjs()
	const [selectedDate, setSelectedDate] = useState(currentDate)
	const [incomeInfo, setIncomeInfo] = useState([])
	const [expenseInfo, setExpenseInfo] = useState([])
	const handleDateChange = (date) => {
		setSelectedDate(date)
	}
	const router = useRouter()
	const handleCreateIncome = () => {
		router.push('/daily/createIncome')
	}
	const handleCreateExpense = () => {
		router.push('/daily/createExpense')
	}
	const handleEditIncome = () => {
		router.push('/daily/editIncome')
	}
	const handleEditExpense = () => {
		router.push('/daily/editExpense')
	}


	const getIncome = useCallback(async () => {
		if (selectedDate) {
			try {
				const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')

				const response = await axios.get(`http://localhost:3001/incomeInfo`, {
					params: { date: formattedDate },
				})

				setIncomeInfo(response.data)
			} catch (error) {
				console.error('Error fetching income data:', error)
			}
		}
	}, [selectedDate])

	const getExpense = useCallback(async () => {
		if (selectedDate) {
			try {
				const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD')

				const response = await axios.get(`http://localhost:3001/expenseInfo`, {
					params: { date: formattedDate },
				})
				setExpenseInfo(response.data)
			} catch (error) {
				console.error('Error fetching expense data:', error)
			}
		}
	}, [selectedDate])
	useEffect(() => {
		getIncome()
		getExpense()
	}, [getIncome, getExpense, selectedDate])

	let sumIncome = 0
	let sumExpense = 0
	incomeInfo.map((income) => (sumIncome += income.amountOfMoney))
	expenseInfo.map((expense) => (sumExpense += expense.amountOfMoney))
	return (
		<CardContent>
      <Navbar word={"Income and Expense Recording"} />
			<Card sx={{ backgroundColor: '#EEEEEE' }}>
				<Grid container spacing={2} padding={5}>
					<Grid item xs={12}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker', 'DatePicker']}>
								<DatePicker
									label="date picker"
									value={selectedDate}
									onChange={handleDateChange}
									renderInput={(params) => <TextField {...params} />}
								/>
							</DemoContainer>
						</LocalizationProvider>
					</Grid>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table
								sx={{
									minWidth: 650,
									backgroundColor: '#EEEEEE',
									color: 'white',
								}}
								aria-label="income table"
							>
								<TableHead>
									<TableRow sx={{ backgroundColor: '#393E46' }}>
										<TableCell
											align="center"
											colSpan={3}
											style={{ color: 'white',fontSize:'20px', fontWeight:'bold' }}
										>
											Income
										</TableCell>
									</TableRow>
									<TableRow sx={{ backgroundColor: '#393E46' }}>
										<TableCell
											style={{ color: 'white', width: '50%' }}
											align="center"
										>
											Item Name
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '25%' }}
											align="center"
										>
											Amount of Money
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '25%' }}
											align="center"
										>
											Date
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{incomeInfo.map((income) => (
										<TableRow key={income.id}>
											<TableCell align="center" component="th" scope="row">
												{income.itemName}
											</TableCell>
											<TableCell align="center">
												{income.amountOfMoney}
											</TableCell>
											<TableCell align="center">{income.date}</TableCell>
										</TableRow>
									))}
									<TableRow sx={{ backgroundColor: '#FFD369' }}>
										<TableCell colSpan={1} align="center">
											Total
										</TableCell>
										<TableCell align="center">{sumIncome.toFixed(2)}</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item>
								<Button
									variant="contained"
									onClick={handleCreateIncome}
									sx={{
										background: '#6DECB9',
										'&:hover': {
											background: '#4CBBB9',
										},
									}}								>
									Create
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									onClick={handleEditIncome}
									sx={{ borderColor: '#394867', color: '#394867' }}
								>
									Edit
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container spacing={2} padding={5}>
					<Grid item xs={12}>
						<TableContainer component={Paper}>
							<Table
								sx={{ minWidth: 650, backgroundColor: '#EEEEEE' }}
								aria-label="expense table"
							>
								<TableHead>
									<TableRow sx={{ backgroundColor: '#393E46' }}>
										<TableCell
											style={{ color: 'white',fontSize:'20px', fontWeight:'bold' }}
											align="center"
											colSpan={3}

										>
											Expense
										</TableCell>
									</TableRow>

									<TableRow sx={{ backgroundColor: '#393E46' }}>
									<TableCell
											style={{ color: 'white', width: '50%' }}
											align="center"
										>
											Item Name
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '25%' }}
											align="center"
										>
											Amount of Money
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '25%' }}
											align="center"
										>
											Date
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{expenseInfo.map((expense) => (
										<TableRow key={expense.id}>
											<TableCell align="center" component="th" scope="row">
												{expense.itemName}
											</TableCell>
											<TableCell align="center">
												{expense.amountOfMoney}
											</TableCell>
											<TableCell align="center">{expense.date}</TableCell>
										</TableRow>
									))}
									<TableRow sx={{ backgroundColor: '#FFD369' }}>
										<TableCell colSpan={1} align="center">
											Total
										</TableCell>
										<TableCell align="center">
											{sumExpense.toFixed(2)}
										</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item xs={12} >
						<Grid container spacing={2}>
							<Grid item>
								<Button
									variant="contained"
									onClick={handleCreateExpense}
									sx={{
										background: '#6DECB9',
										'&:hover': {
											background: '#4CBBB9',
										},
									}}
								>
									Create
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="outlined"
									onClick={handleEditExpense}
									sx={{ borderColor: '#394867', color: '#394867' }}
								>
									Edit
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Card>
		</CardContent>
	)
}
