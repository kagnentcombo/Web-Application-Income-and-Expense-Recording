'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import axios from 'axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Navbar from '../../../../component/navbar'

export default function BasicDatePicker() {
	const currentDate = dayjs()

	const [selectedDate, setSelectedDate] = useState(currentDate)
	const [incomeInfo, setIncomeInfo] = useState([])
	const [editingId, setEditingId] = useState(null)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deletingId, setDeletingId] = useState(null)

	const router = useRouter()

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	const [editedRows, setEditedRows] = useState({})

	const handleEditIncome = (id, newData) => {
		setEditedRows({ ...editedRows, [id]: newData })
		setEditingId(id)
	}

	const handleUpdateRow = async (id) => {
		try {
			const updatedData = editedRows[id]
			updatedData.date = dayjs(updatedData.date).format('YYYY-MM-DD')
			await axios.put(`http://localhost:3001/updateIncome/${id}`, updatedData)

			setEditedRows({ ...editedRows, [id]: null })
			setEditingId(null)
			getIncome()
		} catch (error) {
			console.error('Error updating income record:', error)
		}
	}

	const handleOpenDeleteDialog = (id) => {
		setDeletingId(id)
		setDeleteDialogOpen(true)
	}

	const handleDelete = async () => {
		try {
			await axios.delete(`http://localhost:3001/deleteIncome/${deletingId}`)
			setDeleteDialogOpen(false)
			getIncome()
		} catch (error) {
			console.error('Error deleting income record:', error)
		}
	}

	const handleCloseDeleteDialog = () => {
		setDeletingId(null)
		setDeleteDialogOpen(false)
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

	useEffect(() => {
		getIncome()
	}, [getIncome, selectedDate])

	return (
		<CardContent>
			<Navbar word={'Edit Income Recording'} />

			<Card sx={{ backgroundColor: '#EEEEEE' }}>
				<Grid container spacing={2} padding={5}>
					<Grid item xs={12}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={['DatePicker', 'DatePicker']}>
								<DatePicker
									label="Basic date picker"
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
								aria-label="edit income table"
							>
								{' '}
								<TableHead>
									<TableRow sx={{ backgroundColor: '#393E46' }}>
										<TableCell
											align="center"
											colSpan={4}
											style={{ color: 'white',fontSize:'20px', fontWeight:'bold' }}
										>
											Income
										</TableCell>
									</TableRow>
									<TableRow sx={{ backgroundColor: '#393E46' }}>
										<TableCell
											style={{ color: 'white', width: '40%' }}
											align="center"
										>
											Item Name
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '20%' }}
											align="center"
										>
											Amount of Money
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '20%' }}
											align="center"
										>
											Date
										</TableCell>
										<TableCell
											style={{ color: 'white', width: '20%' }}
											align="center"
										>
											Action
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{incomeInfo.map((income) => (
										<TableRow key={income.id}>
											<TableCell component="th" scope="row" align="center">
												{editingId === income.id ? (
													<TextField
														value={
															editedRows[income.id]?.itemName || income.itemName
														}
														onChange={(e) => {
															const newData = {
																...editedRows[income.id],
																itemName: e.target.value,
															}
															setEditedRows({
																...editedRows,
																[income.id]: newData,
															})
														}}
													/>
												) : (
													income.itemName
												)}
											</TableCell>
											<TableCell align="center">
												{editingId === income.id ? (
													<TextField
														value={
															editedRows[income.id]?.amountOfMoney ||
															income.amountOfMoney
														}
														onChange={(e) => {
															const newData = {
																...editedRows[income.id],
																amountOfMoney: e.target.value,
															}
															setEditedRows({
																...editedRows,
																[income.id]: newData,
															})
														}}
													/>
												) : (
													income.amountOfMoney
												)}
											</TableCell>
											<TableCell align="center">
												{editingId === income.id ? (
													<LocalizationProvider dateAdapter={AdapterDayjs}>
														<DatePicker
															value={
																editedRows[income.id]?.date
																	? dayjs(editedRows[income.id]?.date)
																	: dayjs(income.date)
															}
															onChange={(newDate) => {
																const newData = {
																	...editedRows[income.id],
																	date: newDate.toISOString(), 
																}
																setEditedRows({
																	...editedRows,
																	[income.id]: newData,
																})
															}}
															renderInput={(params) => (
																<TextField {...params} />
															)}
														/>
													</LocalizationProvider>
												) : (
													income.date
												)}
											</TableCell>
											<TableCell align="center">
												{editingId === income.id ? (
													<Grid item xs={12}>
														<Grid container spacing={2}>
															<Grid item>
																<Button
																	variant="contained"
																	onClick={() => handleUpdateRow(income.id)}
																	sx={{
																		background: '#687EFF',
																		'&:hover': {
																			background: '#5837D0',
																		},
																	}}
																>
																	Update
																</Button>
															</Grid>
															<Grid item>
																<Button
																	variant="outlined"
																	color="error"
																	onClick={() => setEditingId(null)}
																>
																	Cancel
																</Button>
															</Grid>
														</Grid>
													</Grid>
												) : (
													<Grid item xs={12}>
														<Grid container spacing={2}>
															<Grid item>
																<Button
																	variant="outlined"
																	onClick={() =>
																		handleEditIncome(income.id, income)
																	}
																	sx={{
																		borderColor: '#394867',
																		color: '#394867',
																	}}
																>
																	Edit
																</Button>
															</Grid>
															<Grid item>
																<Button
																	variant="contained"
																	onClick={() =>
																		handleOpenDeleteDialog(income.id)
																	}
																	color="error"
																>
																	Delete
																</Button>
															</Grid>
														</Grid>
													</Grid>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
				<Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
					<DialogTitle>Delete Confirmation</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete this record?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDeleteDialog}>Cancel</Button>
						<Button onClick={handleDelete} color="secondary">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</Card>
		</CardContent>
	)
}
