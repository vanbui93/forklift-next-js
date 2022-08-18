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
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { deleteColor, getColors, updateColor } from '../../../store/actions/colors'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminColors = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const colors = useSelector(state => state.colors.data)
    let router = useRouter()
    const dispatch = useDispatch()
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [editColorObject, setEditColorObject] = useState({
        color_name: '',
        data_color: '',
    })

    const arrayColor = []
    colors !== null &&
        colors !== undefined &&
        Object.keys(colors)?.map(element => {
            const key = element
            if (colors[key] !== null) {
                const color_name = colors[key].color_name ? colors[key].color_name : ''
                const data_color = colors[key].data_color ? colors[key].data_color : ''
                arrayColor.push({
                    id: key,
                    color_name: color_name,
                    data_color: data_color,
                })
            }
        })

    useEffect(() => {
        dispatch(getColors())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/color_add')
    }

    const idColorRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idColorRef.current = id
    }

    const handleEdit = color => {
        idColorRef.current = color.id
        setIsEdit(true)
        setEditColorObject(color)
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
            dispatch(deleteColor(idColorRef.current))
            dispatch(getColors())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchange = e => {
        let name = e.target.name
        let value = e.target.value
        setEditColorObject(prevState => ({
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
            dispatch(updateColor(editColorObject))
            setIsEdit(false)
            dispatch(getColors())
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
                                &nbsp;&nbsp;Thêm màu
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tên color</StyledTableCell>
                                        <StyledTableCell align='left'>Mã màu</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayColor !== null &&
                                        arrayColor !== undefined &&
                                        Object.values(arrayColor)?.map((color, idx) => {
                                            return (
                                                color !== null &&
                                                color !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>
                                                            <Grid style={{ display: 'flex' }}>
                                                                {color.color_name}{' '}
                                                                <span
                                                                    className={classes.colorStyle}
                                                                    style={{ background: `${color.data_color}` }}
                                                                ></span>
                                                            </Grid>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {color.data_color}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(color)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(color.id)}
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
                        <Grid style={{ paddingBottom: '20px' }}>
                            <img src={'/assets/img/ma_mau.png'} alt='' />
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                {editColorObject !== null && editColorObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Tên color
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editColorObject.color_name}
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
                                                    defaultValue={editColorObject.data_color}
                                                    name='data_color'
                                                    onChange={handleEditOnchange}
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
export default withStyles(styles)(AdminColors)
