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
import { deleteUser, getUser, updateUser } from '../../../store/actions/account'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from './styles'
import LayoutAdmin from '../../../layouts/LayoutAdmin'

const AdminUsers = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const users = useSelector(state => state.account.data)
    const dispatch = useDispatch()
    let router = useRouter()
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [editUserObject, setEditUserObject] = useState({
        name: '',
        email: '',
        pass: '',
    })

    const arrayUser = []
    users !== null &&
        users !== undefined &&
        Object.keys(users)?.map(element => {
            const key = element
            if (users[key] !== null) {
                const name = users[key].name ? users[key].name : ''
                const email = users[key].email ? users[key].email : ''
                const pass = users[key].pass ? users[key].pass : ''
                arrayUser.push({
                    id: key,
                    name: name,
                    email: email,
                    pass: pass,
                })
            }
        })

    useEffect(() => {
        dispatch(getUser())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/user_add')
    }

    const idUserRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idUserRef.current = id
    }

    const handleEdit = user => {
        idUserRef.current = user.id
        setIsEdit(true)
        setEditUserObject(user)
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
            dispatch(deleteUser(idUserRef.current))
            dispatch(getUser())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditUserObject(prevState => ({
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
            dispatch(updateUser(editUserObject))
            setIsEdit(false)
            dispatch(getUser())
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
                                &nbsp;&nbsp;Tạo tài khoản
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>username</StyledTableCell>
                                        <StyledTableCell align='left'>email</StyledTableCell>
                                        <StyledTableCell align='left'>password</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayUser !== null &&
                                        arrayUser !== undefined &&
                                        Object.values(arrayUser)?.map((user, idx) => {
                                            return (
                                                user !== null &&
                                                user !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{user.name ? user.name : ''}</StyledTableCell>
                                                        <StyledTableCell align='left'>{user.email}</StyledTableCell>
                                                        <StyledTableCell align='left'>{user.pass}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(user)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(user.id)}
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
                                {editUserObject !== null && editUserObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Username
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editUserObject.name}
                                                    name='name'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Email
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editUserObject.email}
                                                    name='email'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Password
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editUserObject.pass}
                                                    name='pass'
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
export default withStyles(styles)(AdminUsers)
