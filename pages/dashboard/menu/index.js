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
import { deleteMenu, getMenu, updateMenu } from '../../../store/actions/menu'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminMenus = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const menus = useSelector(state => state.menu.data)
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
        name: '',
        link: '',
    })

    const arrayMenu = []
    menus !== null &&
        menus !== undefined &&
        Object.keys(menus)?.map(element => {
            const key = element
            if (menus[key] !== null) {
                const name = menus[key].name ? menus[key].name : ''
                const link = menus[key].link ? menus[key].link : ''
                arrayMenu.push({
                    id: key,
                    name: name,
                    link: link,
                })
            }
        })

    useEffect(() => {
        dispatch(getMenu())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/menu_add')
    }

    const idMenuRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idMenuRef.current = id
    }

    const handleEdit = menu => {
        idMenuRef.current = menu.id
        setIsEdit(true)
        setEditMenuObject(menu)
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
            dispatch(deleteMenu(idMenuRef.current))
            dispatch(getMenu())
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
            dispatch(updateMenu(editMenuObject))
            setIsEdit(false)
            dispatch(getMenu())
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
                                &nbsp;&nbsp;Tạo menu
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tên menu</StyledTableCell>
                                        <StyledTableCell align='left'>link</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayMenu !== null &&
                                        arrayMenu !== undefined &&
                                        Object.values(arrayMenu)?.map((menu, idx) => {
                                            return (
                                                menu !== null &&
                                                menu !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{menu.name}</StyledTableCell>
                                                        <StyledTableCell align='left'>{menu.link}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(menu)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(menu.id)}
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
                                                Tên menu
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editMenuObject.name}
                                                    name='name'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Link
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editMenuObject.link}
                                                    name='link'
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
export default withStyles(styles)(AdminMenus)
