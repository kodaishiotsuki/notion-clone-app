import { DeleteOutlineOutlined, StarBorderOutlined } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'

export default function Memo() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color='error'>
          <DeleteOutlineOutlined />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <TextField
          placeholder='無題'
          variant='outlined'
          fullWidth
          sx={{
            '.MuiOutlinedInput-input ': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1.5rem', fontWeight: 700 },
          }}
        />
        <TextField
          placeholder='追加'
          variant='outlined'
          fullWidth
          sx={{
            '.MuiOutlinedInput-input ': { padding: 0 },
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
            '.MuiOutlinedInput-root': { fontSize: '1rem' },
          }}
        />
      </Box>
    </>
  )
}
