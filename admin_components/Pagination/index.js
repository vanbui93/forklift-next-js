import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'

export default function PaginationButtons(props) {
  const { count, handleChangePage } = props
  const handleChange = (event, value) => {
    handleChangePage(value)
  }
  return (
    <Stack spacing={5} style={{ paddingTop: '20px' }}>
      <Pagination count={count} showFirstButton showLastButton onChange={handleChange} />
    </Stack>
  )
}
