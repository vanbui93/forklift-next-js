import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  withStyles,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addWarantyObject, getWarantys } from '../../../store/actions/warantys'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

function WarantyAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar)

  const dispatch = useDispatch()
  let router = useRouter()
  const { classes } = props

  const [waranty, setWaranty] = useState({
    waranty_text: '',
  })

  const handleEditOnchange = e => {
    let name = e.target.name
    let value = e.target.value

    setWaranty(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  setPrefix('')
  const keyAdd = nextId()
  const handleSaveWaranty = async () => {
    try {
      dispatch(addWarantyObject(waranty, Number(keyAdd)))
      dispatch(getWarantys())
      router.push('/dashboard/waranty')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/waranty')
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        <TableContainer component={Paper}>
          <Table>
            {
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tbHeadLeft} variant='head'>
                    Nội dung bảo hành
                  </TableCell>
                  <TableCell>
                    <TextField
                      id='outlined-size-small'
                      size='small'
                      fullWidth
                      name='waranty_text'
                      onChange={handleEditOnchange}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </TableContainer>
        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
          <Button variant='contained' color='primary' onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button variant='contained' color='secondary' onClick={handleSaveWaranty}>
            Lưu
          </Button>
        </Stack>
      </LayoutAdmin>
    </AdminStyle>
  )
}
export default withStyles(styles)(WarantyAdd)
