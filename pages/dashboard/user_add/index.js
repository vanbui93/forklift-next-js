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
import { addAccoutObject } from '../../../store/actions/account'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

const UserAdd = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const dispatch = useDispatch()
    let router = useRouter()
    const { classes } = props

    const [user, setUser] = useState({
        name: '',
        email: '',
        pass: '',
    })

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value

        setUser(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    setPrefix('')
    const keyAdd = nextId()
    const handleSaveAccount = async () => {
        try {
            dispatch(addAccoutObject(user, Number(keyAdd).toString()))
            router.push('/dashboard/user')
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/user')
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tbHeadLeft} variant='head'>
                                    username
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='outlined-size-small'
                                        size='small'
                                        fullWidth
                                        name='name'
                                        onChange={handleEditOnchage}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tbHeadLeft} variant='head'>
                                    email
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='outlined-size-small'
                                        size='small'
                                        fullWidth
                                        name='email'
                                        onChange={handleEditOnchage}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.tbHeadLeft} variant='head'>
                                    password
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='outlined-size-small'
                                        size='small'
                                        fullWidth
                                        name='pass'
                                        onChange={handleEditOnchage}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                    <Button variant='contained' color='primary' onClick={handleCancel}>
                        Hủy bỏ
                    </Button>
                    <Button variant='contained' color='secondary' onClick={handleSaveAccount}>
                        Lưu
                    </Button>
                </Stack>
            </LayoutAdmin>
        </AdminStyle>
    )
}

export default withStyles(styles)(UserAdd)
