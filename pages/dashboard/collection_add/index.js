import {
    Button, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    withStyles
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addCollectionObject, getCollection } from '../../../store/actions/collection'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

const CollectionAdd = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)

    const dispatch = useDispatch()
    let router = useRouter()
    const { classes } = props

    const [collection, setCollection] = useState({
        name: '',
        collection: '',
    })

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value

        setCollection(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    setPrefix('')
    const keyAdd = nextId()
    const handleSaveCollect = async () => {
        try {
            dispatch(addCollectionObject(collection, Number(keyAdd)))
            dispatch(getCollection())
            router.push('/dashboard/collection')
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/collection')
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tbHeadLeft} variant='head'>
                                    Tên nhóm sản phẩm
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
                                    Link nhóm sản phẩm
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='outlined-size-small'
                                        size='small'
                                        fullWidth
                                        name='collection'
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
                    <Button variant='contained' color='secondary' onClick={handleSaveCollect}>
                        Lưu
                    </Button>
                </Stack>
            </LayoutAdmin>
        </AdminStyle>
    )
}

export default withStyles(styles)(CollectionAdd)
