import {
  Button,
  Fab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { deleteWaranty, getWarantys, updateWaranty } from '../../../store/actions/warantys'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminWaranty = props => {
  const opensidebar = useSelector(state => state.ui.opensidebar)
  const allWarantys = useSelector(state => state.warantys.data)
  let router = useRouter()
  const dispatch = useDispatch()

  //Thiết lập trạng thái DiaLog
  const [dialog, setDialog] = useState({
    message: '',
    isOpenDiaLog: false,
  })

  const [isEdit, setIsEdit] = useState(false)
  const [editWarantyObject, setEditWarantyObject] = useState({
    waranty_text: '',
  })

  const arrayWaranty = []
  allWarantys !== null &&
    allWarantys !== undefined &&
    Object.keys(allWarantys)?.map(element => {
      const key = element
      if (allWarantys[key] !== null) {
        const waranty_text = allWarantys[key].waranty_text ? allWarantys[key].waranty_text : ''
        arrayWaranty.push({
          id: key,
          waranty_text: waranty_text,
        })
      }
    })

  useEffect(() => {
    dispatch(getWarantys())
  }, [])

  const { classes } = props
  //Thêm màu sản phẩm
  const handleAddWaranty = () => {
    router.push('/dashboard/waranty_add')
  }

  //Nội dung dialog
  const handleDialog = (message, isOpenDiaLog) => {
    setDialog({
      message,
      isOpenDiaLog,
    })
  }

  const idWarantyRef = useRef()
  const handleDelete = id => {
    handleDialog('Bán có chắc chắn muốn xóa không ?', true)
    idWarantyRef.current = id
  }

  const handleEditWaranty = waranty => {
    idWarantyRef.current = waranty.id
    setIsEdit(true)
    setEditWarantyObject(waranty)
  }

  //Bạn có chắc chắn muốn xóa
  const areUSureDelete = status => {
    if (status) {
      dispatch(deleteWaranty(idWarantyRef.current))
      dispatch(getWarantys())
      handleDialog('', false)
    } else {
      handleDialog('', false)
    }
  }

  const handleEditOnchage = e => {
    let name = e.target.name
    let value = e.target.value
    setEditWarantyObject(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleCancel = () => {
    setIsEdit(false)
  }

  //Submit edit
  const handleEditSubmit = async () => {
    try {
      dispatch(updateWaranty(editWarantyObject))
      setIsEdit(false)
      dispatch(getWarantys())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        {dialog.isOpenDiaLog && (
          <DiaLogPopup onDialog={areUSureDelete} message={dialog.message} isOpenDiaLog={dialog.isOpenDiaLog} />
        )}
        {!isEdit ? (
          <div>
            <Grid style={{ paddingBottom: '20px' }}>
              <Button variant='contained' color='primary' onClick={handleAddWaranty}>
                <AddIcon />
                &nbsp;&nbsp;Thêm bảo hành
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='left'>Nội dung bảo hành</StyledTableCell>
                    <StyledTableCell align='right'>SỬA</StyledTableCell>
                    <StyledTableCell align='right'>XÓA</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayWaranty !== null &&
                    arrayWaranty !== undefined &&
                    Object.values(arrayWaranty)?.map(
                      (item, idx) =>
                        item && (
                          <StyledTableRow key={idx}>
                            <StyledTableCell align='left'>{item.waranty_text}</StyledTableCell>
                            <StyledTableCell align='right'>
                              <Fab
                                size='small'
                                color='primary'
                                aria-label='add'
                                onClick={() => handleEditWaranty(item)}
                              >
                                <EditIcon />
                              </Fab>
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              <Fab size='small' color='primary' aria-label='add' onClick={() => handleDelete(item.id)}>
                                <DeleteIcon />
                              </Fab>
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Grid>
            <TableContainer component={Paper}>
              <Table>
                {editWarantyObject !== null && editWarantyObject !== undefined && (
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tbHeadLeft} variant='head'>
                        Nội dung
                      </TableCell>
                      <TableCell>
                        <TextField
                          id='outlined-size-small'
                          size='small'
                          fullWidth
                          defaultValue={editWarantyObject.waranty_text}
                          name='waranty_text'
                          onChange={handleEditOnchage}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
              <Button variant='contained' color='primary' onClick={handleCancel}>
                Hủy bỏ
              </Button>
              <Button variant='contained' color='secondary' onClick={handleEditSubmit}>
                Lưu
              </Button>
            </Stack>
          </Grid>
        )}
      </LayoutAdmin>
    </AdminStyle>
  )
}
export default withStyles(styles)(AdminWaranty)
