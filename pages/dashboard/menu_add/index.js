import {
  Button,
  Grid,
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
import { addMenuObject, getMenu } from '../../../store/actions/menu'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import nextId, { setPrefix } from 'react-id-generator'
import styles from './styles'
import LayoutAdmin from '../../../layouts/LayoutAdmin'

const MenuAdd = props => {
  const opensidebar = useSelector(state => state.ui.opensidebar)

  const dispatch = useDispatch()
  let router = useRouter()
  const { classes } = props

  const [menu, setMenu] = useState({
    name: '',
    link: '',
  })

  const handleEditOnchage = e => {
    let name = e.target.name
    let value = e.target.value

    setMenu(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  setPrefix('')
  const keyAdd = nextId()
  const handleSaveMenu = async () => {
    try {
      dispatch(addMenuObject(menu, Number(keyAdd)))
      dispatch(getMenu())
      router.push('/dashboard/menu')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/menu')
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant='head'>
                  Tên menu
                </TableCell>
                <TableCell>
                  <TextField id='outlined-size-small' size='small' fullWidth name='name' onChange={handleEditOnchage} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tbHeadLeft} variant='head'>
                  Link
                </TableCell>
                <TableCell>
                  <TextField id='outlined-size-small' size='small' fullWidth name='link' onChange={handleEditOnchage} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
          <Button variant='contained' color='primary' onClick={handleCancel}>
            Hủy bỏ
          </Button>
          <Button variant='contained' color='secondary' onClick={handleSaveMenu}>
            Lưu
          </Button>
        </Stack>
      </LayoutAdmin>
    </AdminStyle>
  )
}

export default withStyles(styles)(MenuAdd)
