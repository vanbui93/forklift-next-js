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
import { deletePromotion, getPromotions, updatePromotion } from '../../../store/actions/promotions'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminPromotion = props => {
  const opensidebar = useSelector(state => state.ui.opensidebar)
  const allPromotions = useSelector(state => state.promotions.data)
  let router = useRouter()
  const dispatch = useDispatch()

  //Thiết lập trạng thái DiaLog
  const [dialog, setDialog] = useState({
    message: '',
    isOpenDiaLog: false,
  })

  const [isEdit, setIsEdit] = useState(false)
  const [editPromotionObject, setEditPromotionObject] = useState({
    promotion_text: '',
  })

  const arrayPromotion = []
  allPromotions !== null &&
    allPromotions !== undefined &&
    Object.keys(allPromotions)?.map(element => {
      const key = element
      if (allPromotions[key] !== null) {
        const promotion_text = allPromotions[key].promotion_text ? allPromotions[key].promotion_text : ''
        arrayPromotion.push({
          id: key,
          promotion_text: promotion_text,
        })
      }
    })

  useEffect(() => {
    dispatch(getPromotions())
  }, [])

  const { classes } = props
  //Thêm màu sản phẩm
  const handleAddPromotion = () => {
    router.push('/dashboard/promotion_add')
  }

  //Nội dung dialog
  const handleDialog = (message, isOpenDiaLog) => {
    setDialog({
      message,
      isOpenDiaLog,
    })
  }

  const idPromotionRef = useRef()
  const handleDelete = id => {
    handleDialog('Bán có chắc chắn muốn xóa không ?', true)
    idPromotionRef.current = id
  }

  const handleEditPromotion = promotion => {
    idPromotionRef.current = promotion.id
    setIsEdit(true)
    setEditPromotionObject(promotion)
  }

  //Bạn có chắc chắn muốn xóa
  const areUSureDelete = status => {
    if (status) {
      dispatch(deletePromotion(idPromotionRef.current))
      dispatch(getPromotions())
      handleDialog('', false)
    } else {
      handleDialog('', false)
    }
  }

  const handleEditOnchage = e => {
    let name = e.target.name
    let value = e.target.value
    setEditPromotionObject(prevState => ({
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
      dispatch(updatePromotion(editPromotionObject))
      setIsEdit(false)
      dispatch(getPromotions())
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
              <Button variant='contained' color='primary' onClick={handleAddPromotion}>
                <AddIcon />
                &nbsp;&nbsp;Thêm khuyến mãi
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align='left'>Nội dung khuyến mãi</StyledTableCell>
                    <StyledTableCell align='right'>SỬA</StyledTableCell>
                    <StyledTableCell align='right'>XÓA</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayPromotion !== null &&
                    arrayPromotion !== undefined &&
                    Object.values(arrayPromotion)?.map((item, idx) => {
                      if (item !== null && item !== undefined) {
                        return (
                          <StyledTableRow key={idx}>
                            <StyledTableCell align='left'>{item.promotion_text}</StyledTableCell>
                            <StyledTableCell align='right'>
                              <Fab
                                size='small'
                                color='primary'
                                aria-label='add'
                                onClick={() => handleEditPromotion(item)}
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
                      }
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Grid>
            <TableContainer component={Paper}>
              <Table>
                {editPromotionObject !== null && editPromotionObject !== undefined && (
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
                          defaultValue={editPromotionObject.promotion_text}
                          name='promotion_text'
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
export default withStyles(styles)(AdminPromotion)
