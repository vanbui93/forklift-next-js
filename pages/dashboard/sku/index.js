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
    TextField,
    withStyles,
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { deleteSku, getSkus, updateSku } from '../../../store/actions/skus'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from './styles'
import LayoutAdmin from '../../../layouts/LayoutAdmin'

const AdminSku = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const skus = useSelector(state => state.skus.data)
    const dispatch = useDispatch()
    let router = useRouter()
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [editMenuObject, setEditMenuObject] = useState({
        memory: '',
        data_sku: '',
    })

    const arraySku = []
    skus !== null &&
        skus !== undefined &&
        Object.keys(skus)?.map(element => {
            const key = element
            if (skus[key] !== null) {
                const memory = skus[key].memory ? skus[key].memory : ''
                const data_sku = skus[key].data_sku ? skus[key].data_sku : ''
                arraySku.push({
                    id: key,
                    memory: memory,
                    data_sku: data_sku,
                })
            }
        })

    useEffect(() => {
        dispatch(getSkus())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/sku_add')
    }

    const idMenuRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idMenuRef.current = id
    }

    const handleEdit = sku => {
        idMenuRef.current = sku.id
        setIsEdit(true)
        setEditMenuObject(sku)
    }

    //Nội dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    //Bạn có chắc chắn muốn xóa
    const areUSureDelete = status => {
        if (status) {
            dispatch(deleteSku(idMenuRef.current))
            dispatch(getSkus())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditMenuObject(prevState => ({
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
            dispatch(updateSku(editMenuObject))
            setIsEdit(false)
            dispatch(getSkus())
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                {dialog.isOpenDiaLog && (
                    <DiaLogPopup
                        onDialog={areUSureDelete}
                        message={dialog.message}
                        isOpenDiaLog={dialog.isOpenDiaLog}
                    />
                )}
                {!isEdit ? (
                    <div>
                        <Grid style={{ paddingBottom: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleAddAccount}>
                                <AddIcon />
                                &nbsp;&nbsp;Tạo sku
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Mã sku</StyledTableCell>
                                        <StyledTableCell align='left'>Dung lượng</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arraySku !== null &&
                                        arraySku !== undefined &&
                                        Object.values(arraySku)?.map((sku, idx) => {
                                            return (
                                                sku !== null &&
                                                sku !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{sku.data_sku}</StyledTableCell>
                                                        <StyledTableCell align='left'>{sku.memory}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(sku)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(sku.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                            )
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                {editMenuObject !== null && editMenuObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Mã SKU
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editMenuObject.data_sku}
                                                    name='data_sku'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Dung lượng
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editMenuObject.memory}
                                                    name='memory'
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
export default withStyles(styles)(AdminSku)
