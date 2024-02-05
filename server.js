const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

const con = mysql.createConnection({
	connectionLimit: 10,
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'record_database',
})
con.connect(function (err) {
	if (err) {
		console.error('Error connecting to MySQL:', err)
		return
	}
	console.log('Connected!')
})
// SIGN UP //
app.post('/signup', (req, res) => {
	const { username, email, password, phone } = req.body

	const insertQuery =
		'INSERT INTO user_info (username, email, password, phone) VALUES (?, ?, ?, ?)'
	const values = [username, email, password, phone]

	con.query(insertQuery, values, (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('User registered successfully')
		res.json({ success: true })
	})
})
// LOGIN //
app.post('/login', (req, res) => {
	const { username, password } = req.body

	const query = 'SELECT * FROM user_info WHERE username = ? AND password = ?'
	const values = [username, password]

	con.query(query, values, (err, results) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		if (results.length > 0) {
			res.json({ success: true, message: 'Login successful' })
		} else {
			res
				.status(401)
				.json({ success: false, message: 'Invalid username or password' })
		}
	})
})
//INCOME INFO //
app.get('/incomeInfo', (req, res) => {
	const { date } = req.query

	if (!date) {
		res.status(400).json({ error: 'Missing date parameter' })
		return
	}

	const query = `SELECT * FROM income WHERE DATE(date) = '${date}'`

	con.query(query, (err, results) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}
		res.json(results)
	})
})
// EXPENSE INFO //
app.get('/expenseInfo', (req, res) => {
	const { date } = req.query

	if (!date) {
		res.status(400).json({ error: 'Missing date parameter' })
		return
	}

	const query = `SELECT * FROM expense WHERE DATE(date) = '${date}'`

	con.query(query, (err, results) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}
		res.json(results)
	})
})
// CREATE INCOME //
app.post('/createIncome', (req, res) => {
	const { itemName, amountOfMoney, date } = req.body

	const insertQuery =
		'INSERT INTO income (itemName, amountOfMoney, date) VALUES (?, ?, CURDATE())		'
	const values = [itemName, amountOfMoney, date]

	con.query(insertQuery, values, (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('Create Income successfully')
		res.json({ success: true })
	})
})
// CREATE EXPENSE //
app.post('/createExpense', (req, res) => {
	const { itemName, amountOfMoney, date } = req.body

	const insertQuery =
		'INSERT INTO expense (itemName, amountOfMoney, date) VALUES (?, ?, CURDATE())		'
	const values = [itemName, amountOfMoney, date]

	con.query(insertQuery, values, (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('Create expense successfully')
		res.json({ success: true })
	})
})
// DELETE INCOME //
app.delete('/deleteIncome/:id', (req, res) => {
	const incomeId = req.params.id

	const deleteQuery = 'DELETE FROM income WHERE id = ?'

	con.query(deleteQuery, [incomeId], (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('Income deleted successfully')
		res.json({ success: true })
	})
})
// DELETE EXPENSE //
app.delete('/deleteExpense/:id', (req, res) => {
	const expenseId = req.params.id

	const deleteQuery = 'DELETE FROM expense WHERE id = ?'

	con.query(deleteQuery, [expenseId], (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('Expense deleted successfully')
		res.json({ success: true })
	})
})
// UPDATE INCOME //
app.put('/updateIncome/:id', (req, res) => {
	const incomeId = req.params.id
	const updatedData = req.body

	const updateQuery =
		'UPDATE income SET itemName = ?, amountOfMoney = ?, date = ? WHERE id = ?'
	const values = [
		updatedData.itemName,
		updatedData.amountOfMoney,
		updatedData.date,
		incomeId,
	]

	con.query(updateQuery, values, (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('Income updated successfully')
		res.json({ success: true })
	})
})
// UPDATE EXPENSE //
app.put('/updateExpense/:id', (req, res) => {
	const expenseId = req.params.id
	const updatedData = req.body

	const updateQuery =
		'UPDATE expense SET itemName = ?, amountOfMoney = ?, date = ? WHERE id = ?'
	const values = [
		updatedData.itemName,
		updatedData.amountOfMoney,
		updatedData.date,
		expenseId,
	]

	con.query(updateQuery, values, (err, result) => {
		if (err) {
			console.error('Error executing query:', err)
			res.status(500).json({ error: 'Internal Server Error' })
			return
		}

		console.log('expense updated successfully')
		res.json({ success: true })
	})
})
const PORT = 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
