import {
    Button,
    Fab,
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
} from '@material-ui/core'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import SearchIcon from '@mui/icons-material/Search'
import { InputBase, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import PaginationButtons from '../../../admin_components/Pagination'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { deleteContact, getContact } from '../../../store/actions/contact'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminContact = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const contactInfo = useSelector(state => state.contact.data)
    const dispatch = useDispatch()

    //Giá trị nhập vào input searchTerm, kết quả search searchResults
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const { classes } = props

    const [isView, setIsView] = useState(false)
    const [viewObject, setViewObject] = useState({
        id: '',
        contact_name: '',
        contact_email: '',
        contact_message: '',
        create_date: '',
    })

    const arrayContact = []
    contactInfo !== null &&
        contactInfo !== undefined &&
        Object.keys(contactInfo)?.map(element => {
            const key = element
            if (contactInfo[key] !== null) {
                const contact_name = contactInfo[key].contactInfo ? contactInfo[key].contact_name : ''
                const contact_email = contactInfo[key].contact_email ? contactInfo[key].contact_email : ''
                const contact_message = contactInfo[key].contact_message ? contactInfo[key].contact_message : ''
                const create_date = contactInfo[key].create_date ? contactInfo[key].create_date : ''
                arrayContact.push({
                    id: key,
                    contact_name: contact_name,
                    contact_email: contact_email,
                    contact_message: contact_message,
                    create_date: create_date,
                })
            }
        })

    useEffect(() => {
        dispatch(getContact())
    }, [])

    const idContactRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idContactRef.current = id
    }
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

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
            dispatch(deleteContact(idContactRef.current))
            dispatch(getContact())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleViewContact = contact => {
        idContactRef.current = contact.id
        setIsView(true)
        setViewObject(contact)
    }

    const handleCancel = () => {
        setIsView(false)
    }

    //Phân trang
    const allList = [...arrayContact].sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
    const totalLists = arrayContact.length
    const pageLimit = 10
    const [currentList, setCurrentList] = useState([])
    const onPageChanged = value => {
        let offset = (value - 1) * pageLimit
        const currentList = [...searchResults]
            .slice(offset, offset + pageLimit)
            .sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
        setCurrentList(currentList)
    }
    useEffect(() => {
        setCurrentList([...allList].slice(0, pageLimit))
    }, [contactInfo])

    //Kết quả Search
    const handleSearch = e => {
        let value = e.target.value
        setSearchTerm(value)
    }
    useEffect(() => {
        const results = arrayContact?.filter(e => {
            return Object.values(e).join('').toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults(results)
        setCurrentList(
            [...results].slice(0, pageLimit).sort((a, b) => new Date(b.create_date) - new Date(a.create_date))
        )
    }, [searchTerm, contactInfo])

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
                                placeholder='Tìm kiếm'
                                value={searchTerm}
                                inputProps={{ 'aria-label': 'Tìm kiếm' }}
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
                                        <StyledTableCell>Tên</StyledTableCell>
                                        <StyledTableCell align='left'>Email</StyledTableCell>
                                        <StyledTableCell align='left'>Ghi chú</StyledTableCell>
                                        <StyledTableCell align='left'>Ngày liên hệ</StyledTableCell>
                                        <StyledTableCell align='right'>XEM</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentList !== null &&
                                        currentList !== undefined &&
                                        Object.values(currentList)?.map((contact, idx) => {
                                            return (
                                                contact !== null &&
                                                contact !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{contact.contact_name}</StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {contact.contact_email}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {contact.contact_message}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {contact.create_date}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleViewContact(contact)}
                                                            >
                                                                <RemoveRedEyeIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(contact.id)}
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
                        <TableContainer component={Paper}>
                            <Table>
                                {viewObject !== null && viewObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Tên người liên hệ
                                            </TableCell>
                                            <TableCell>{viewObject.contact_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Email
                                            </TableCell>
                                            <TableCell>{viewObject.contact_email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Email
                                            </TableCell>
                                            <TableCell>{viewObject.create_date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Ghi chú
                                            </TableCell>
                                            <TableCell>{viewObject.contact_message}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleCancel}>
                                <ArrowBackIosIcon /> Quay lại danh sách
                            </Button>
                        </Stack>
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default withStyles(styles)(AdminContact)
