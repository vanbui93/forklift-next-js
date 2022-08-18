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
import { addColorObject, getColors } from '../../../store/actions/colors'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import nextId, { setPrefix } from 'react-id-generator'
import styles from './styles'
import LayoutAdmin from '../../../layouts/LayoutAdmin'

function ColorAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar)

  const dispatch = useDispatch()
  let router = useRouter()
  const { classes } = props

  const [color, setColor] = useState({
    color_name: '',
    data_color: '',
  })

  const handleEditOnchange = e => {
    let name = e.target.name
    let value = e.target.value

    setColor(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  setPrefix('')
  const keyAdd = nextId()
  const handleSaveColor = async () => {
    try {
      dispatch(addColorObject(color, Number(keyAdd)))
      dispatch(getColors())
      router.push('/dashboard/color')
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/color')
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        <Grid style={{ paddingBottom: '20px' }}>
          <img src={'/assets/img/ma_mau.png'} alt='' />
        </Grid>
        <Grid>
          <TableContainer component={Paper}>
            <Table>
              {
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tbHeadLeft} variant='head'>
                      Tên màu
                    </TableCell>
                    <TableCell>
                      <TextField
                        id='outlined-size-small'
                        size='small'
                        fullWidth
                        name='color_name'
                        onChange={handleEditOnchange}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tbHeadLeft} variant='head'>
                      Mã màu
                    </TableCell>
                    <TableCell>
                      <TextField
                        id='outlined-size-small'
                        size='small'
                        fullWidth
                        name='data_color'
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
            <Button variant='contained' color='secondary' onClick={handleSaveColor}>
              Lưu
            </Button>
          </Stack>
        </Grid>
      </LayoutAdmin>
    </AdminStyle>
  )
}

export default withStyles(styles)(ColorAdd)
