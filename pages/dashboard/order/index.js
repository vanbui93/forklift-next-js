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
    TextareaAutosize,
    withStyles,
} from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputBase, Stack, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import DiaLogPopup from './../../../admin_components/DiaLogPopup'
import PaginationButtons from './../../../admin_components/Pagination'
import { deleteOrder, getOrder, updateOrder } from './../../../store/actions/order'
import { numberInputFormat } from './../../../utils/numberInputFormat'
import styles from './styles'

const AdminOrder = props => {
    //get state from redux
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const orders = useSelector(state => state.order.data)
    const { classes } = props

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrder())
    }, [])

    const [isView, setIsView] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [viewObject, setViewObject] = useState({
        id: '',
        cusName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        name: '',
        img: '',
        price: '',
        collection: '',
        notes: '',
        create_date: '',
    })

    const [editObject, setEditObject] = useState({
        id: '',
        customer_name: '',
        customer_phone: '',
        customer_address: '',
        customer_city: '',
        customer_email: '',
        customer_notes: '',
        product_name: '',
        product_price: '',
        product_sku: '',
    })

    var arrayOrder = []
    orders !== null &&
        orders !== undefined &&
        Object.keys(orders)?.map(element => {
            const key = element
            if (orders[key] !== null) {
                const productName = orders[key].product_name ? orders[key].product_name : ''
                const productImg = orders[key].product_image ? orders[key].product_image : ''
                const productPrice = orders[key].product_price ? orders[key].product_price : ''
                const name = orders[key].customer_name ? orders[key].customer_name : ''
                const phone = orders[key].customer_phone ? orders[key].customer_phone : ''
                const email = orders[key].customer_email ? orders[key].customer_email : ''
                const city = orders[key].customer_city ? orders[key].customer_city : ''
                const address = orders[key].customer_address ? orders[key].customer_address : ''
                const notes = orders[key].customer_notes ? orders[key].customer_notes : ''
                const create_date = orders[key].create_date ? orders[key].create_date : ''
                arrayOrder.push({
                    id: key,
                    name: productName,
                    img: productImg,
                    price: productPrice,
                    cusName: name,
                    phone: phone,
                    email: email,
                    address: address,
                    city: city,
                    notes: notes,
                    create_date: create_date,
                })
            }
        })

    const idRef = useRef()

    //X??a ????n h??ng
    const handleDelete = id => {
        handleDialog('B??n c?? ch???c ch???n mu???n x??a kh??ng ?', true)
        idRef.current = id
    }

    //Thi???t l???p tr???ng th??i DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    //N???i dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    //B???n c?? ch???c ch???n mu???n x??a
    const areUSureDelete = status => {
        if (status) {
            dispatch(deleteOrder(idRef.current))
            dispatch(getOrder())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    //Ph??n trang
    const allList = [...arrayOrder]
    const totalLists = allList.length
    const pageLimit = 10
    const [currentList, setCurrentList] = useState([])

    const onPageChanged = value => {
        let offset = (value - 1) * pageLimit
        const currentList = [...allList]
            .slice(offset, offset + pageLimit)
            .sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
        setCurrentList(currentList)
    }

    useEffect(() => {
        setCurrentList(
            [...allList].slice(0, pageLimit).sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
        )
    }, [orders])

    //K???t qu??? Search
    const handleSearch = e => {
        let value = e.target.value
        setSearchTerm(value)
    }
    useEffect(() => {
        const results = arrayOrder?.filter(e => {
            return Object.values(e).join('').toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults(results)
        setCurrentList([...results].slice(0, pageLimit))
    }, [searchTerm, orders])

    //Cick ????? edit ????n h??ng
    const handleViewOrder = order => {
        setViewObject(order)
        setIsView(true)
    }

    const handleTurnBackOrder = () => {
        setIsView(false)
        setIsEdit(false)
    }

    const handleTurnBackOrderDetail = () => {
        setIsView(true)
        setIsEdit(false)
    }

    const handleCancelEditOrder = () => {
        setIsView(true)
        setIsEdit(false)
    }

    const handleEditOrder = order => {
        setIsEdit(true)
        setEditObject({
            id: order.id,
            customer_name: order.cusName,
            customer_phone: order.phone,
            customer_address: order.address ? order.address : '',
            customer_city: order.city ? order.city : '',
            customer_email: order.email ? order.email : '',
            customer_notes: order.notes ? order.notes : '',
            product_name: order.name ? order.name : '',
            product_price: order.price ? order.price : '',
        })
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditObject(prevState => ({
            ...prevState,
            [name]: value,
        }))

        if (name === 'product_price') {
            e.target.value = numberInputFormat(value)
        }
    }

    //Submit edit
    const handleSubmitOrder = async () => {
        try {
            dispatch(updateOrder(editObject))
            setIsEdit(false)
            dispatch(getOrder())
            setViewObject({
                id: viewObject.id,
                create_date: viewObject.create_date,
                cusName: editObject.customer_name,
                phone: editObject.customer_phone,
                address: editObject.customer_address,
                city: editObject.customer_city,
                email: editObject.customer_email,
                notes: editObject.customer_notes,
                name: editObject.product_name,
                price: editObject.product_price,
            })
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
                {!isView ? (
                    <div>
                        <Paper
                            component='form'
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                                width: 400,
                                marginBottom: '10px',
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder='T??m ki???m ????n h??ng'
                                value={searchTerm}
                                inputProps={{ 'aria-label': 'T??m ki???m ????n h??ng' }}
                                onChange={handleSearch}
                            />
                            <IconButton type='button' sx={{ p: '10px' }} aria-label='search'>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>M?? ????N H??NG</StyledTableCell>
                                        <StyledTableCell>T??N S???N PH???M</StyledTableCell>
                                        <StyledTableCell align='left'>H??NH S???N PH???M</StyledTableCell>
                                        <StyledTableCell align='left'>GI??</StyledTableCell>
                                        <StyledTableCell align='left'>T??N KH??CH H??NG</StyledTableCell>
                                        <StyledTableCell align='left'>??i???n tho???i</StyledTableCell>
                                        <StyledTableCell align='left'>?????a ch???</StyledTableCell>
                                        <StyledTableCell align='left'>Ghi ch??</StyledTableCell>
                                        <StyledTableCell align='left'>Ng??y ?????t h??ng</StyledTableCell>
                                        <StyledTableCell align='right'>XEM</StyledTableCell>
                                        <StyledTableCell align='right'>X??A</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentList !== null &&
                                        currentList !== undefined &&
                                        currentList?.map((order, idx) => {
                                            return (
                                                order && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{order.id}</StyledTableCell>
                                                        <StyledTableCell className={classes.tbNameStyle}>
                                                            {order.name ? order.name : ''}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left' className={classes.thumbnail}>
                                                            <img src={order.img} alt={order.name ? order.name : ''} />
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {order.price
                                                                ? `${numberInputFormat(order.price.toString())} Bath`
                                                                : 'Li??n h???'}
                                                        </StyledTableCell>
                                                        <StyledTableCell>{order.cusName}</StyledTableCell>
                                                        <StyledTableCell>{order.phone}</StyledTableCell>
                                                        <StyledTableCell>{`${order.address}, ${order.city}`}</StyledTableCell>
                                                        <StyledTableCell>{order.notes}</StyledTableCell>
                                                        <StyledTableCell>{order.create_date}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleViewOrder(order)}
                                                            >
                                                                <RemoveRedEyeIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(order.id)}
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
                        <PaginationButtons
                            count={Math.ceil(totalLists / pageLimit)}
                            handleChangePage={value => {
                                onPageChanged(value)
                            }}
                        />
                    </div>
                ) : (
                    <Grid>
                        {!isEdit ? (
                            <div>
                                <Grid style={{ paddingBottom: '20px' }}>
                                    <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => handleEditOrder(viewObject)}
                                        >
                                            <EditIcon />
                                            S???a ????n h??ng
                                        </Button>
                                        <Button variant='contained' color='primary' onClick={handleTurnBackOrder}>
                                            <ArrowBackIosIcon /> Danh s??ch ????n h??ng
                                        </Button>
                                    </Stack>
                                </Grid>
                                <TableContainer component={Paper}>
                                    <Table>
                                        {viewObject !== null && viewObject !== undefined && (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ID ????n h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ng??y ?????t h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.create_date}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        S??? ??i???n tho???i
                                                    </TableCell>
                                                    <TableCell>{viewObject.phone}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Email
                                                    </TableCell>
                                                    <TableCell>{viewObject.email}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ?????a ch???
                                                    </TableCell>
                                                    <TableCell>
                                                        {viewObject.address}, {viewObject.city}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n kh??ch h??ng
                                                    </TableCell>
                                                    <TableCell>{viewObject.cusName}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n s???n ph???m
                                                    </TableCell>
                                                    <TableCell>{viewObject.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        H??nh s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <img
                                                            className={classes.thumbnail}
                                                            src={viewObject.img}
                                                            alt=''
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Gi?? s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        {numberInputFormat(viewObject.price.toString())}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ghi ch??
                                                    </TableCell>
                                                    <TableCell>{viewObject.notes}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                            </div>
                        ) : (
                            <div>
                                <Grid style={{ paddingBottom: '20px' }}>
                                    <Button variant='contained' color='primary' onClick={handleTurnBackOrderDetail}>
                                        <ArrowBackIosIcon />
                                        Xem ????n h??ng
                                    </Button>
                                </Grid>
                                <TableContainer component={Paper}>
                                    <Table>
                                        {viewObject !== null && viewObject !== undefined && (
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        S??? ??i???n tho???i
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_phone}
                                                            name='customer_phone'
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
                                                            defaultValue={editObject.customer_email}
                                                            name='customer_email'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        ?????a ch??? chi ti???t
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_address}
                                                            name='customer_address'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Th??nh Ph???
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_city}
                                                            name='customer_city'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n kh??ch h??ng
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.customer_name}
                                                            name='customer_name'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        T??n s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editObject.product_name}
                                                            name='product_name'
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        H??nh s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <img
                                                            className={classes.thumbnail}
                                                            src={viewObject.img}
                                                            alt=''
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Gi?? s???n ph???m
                                                    </TableCell>
                                                    <TableCell>
                                                        <Grid container spacing={2}>
                                                            <Grid item xs={2}>
                                                                <TextField
                                                                    id='outlined-size-small'
                                                                    size='small'
                                                                    fullWidth
                                                                    defaultValue={
                                                                        editObject.product_price
                                                                            ? numberInputFormat(
                                                                                  editObject.product_price.toString()
                                                                              )
                                                                            : ''
                                                                    }
                                                                    name='product_price'
                                                                    onChange={handleEditOnchage}
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className={classes.tbHeadLeft} variant='head'>
                                                        Ghi ch??
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextareaAutosize
                                                            id='outlined-size-small'
                                                            size='small'
                                                            defaultValue={editObject.customer_notes}
                                                            name='customer_notes'
                                                            style={{ width: '100%' }}
                                                            minRows={4}
                                                            onChange={handleEditOnchage}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        )}
                                    </Table>
                                </TableContainer>
                                <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                                    <Button variant='contained' color='primary' onClick={handleCancelEditOrder}>
                                        H???y
                                    </Button>
                                    <Button variant='contained' color='secondary' onClick={handleSubmitOrder}>
                                        L??u
                                    </Button>
                                </Stack>
                            </div>
                        )}
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default withStyles(styles)(AdminOrder)
