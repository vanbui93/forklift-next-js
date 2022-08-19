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
import { deleteCollection, getCollection, updateCollection } from '../../../store/actions/collection'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminCollections = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const collectAll = useSelector(state => state.collection.data)
    const dispatch = useDispatch()
    let router = useRouter()
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [editCollectionObject, setEditCollectionObject] = useState({
        name: '',
        collection: '',
    })

    const arrayCollection = []
    collectAll !== null &&
        collectAll !== undefined &&
        Object.keys(collectAll)?.map(element => {
            const key = element
            if (collectAll[key] !== null) {
                const name = collectAll[key].name ? collectAll[key].name : ''
                const collection = collectAll[key].collection ? collectAll[key].collection : ''
                arrayCollection.push({
                    id: key,
                    name: name,
                    collection: collection,
                })
            }
        })

    useEffect(() => {
        dispatch(getCollection())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/collection_add')
    }

    const idCollectionRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idCollectionRef.current = id
    }

    const handleEdit = collect => {
        idCollectionRef.current = collect.id
        setIsEdit(true)
        setEditCollectionObject(collect)
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
            dispatch(deleteCollection(idCollectionRef.current))
            dispatch(getCollection())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditCollectionObject(prevState => ({
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
            dispatch(updateCollection(editCollectionObject))
            setIsEdit(false)
            dispatch(getCollection())
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
                                &nbsp;&nbsp;Tạo Nhóm sản phẩm
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tên Nhóm sản phẩm</StyledTableCell>
                                        <StyledTableCell align='left'>Link</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayCollection !== null &&
                                        arrayCollection !== undefined &&
                                        Object.values(arrayCollection)?.map((collect, idx) => {
                                            return (
                                                collect !== null &&
                                                collect !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{collect.name}</StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {collect.collection}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(collect)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(collect.id)}
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
                                {editCollectionObject !== null && editCollectionObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Tên Nhóm sản phẩm
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editCollectionObject.name}
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
                                                    defaultValue={editCollectionObject.collection}
                                                    name='collection'
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
export default withStyles(styles)(AdminCollections)
