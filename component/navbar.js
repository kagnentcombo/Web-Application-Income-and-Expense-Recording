import React from 'react'
import Box from '@mui/system/Box'

const Navbar = ({ word }) => {
	return (
		<Box sx={{ backgroundColor: '#394867', color: 'white', padding: '1rem' }}>
			{word}
		</Box>
	)
}

export default Navbar
