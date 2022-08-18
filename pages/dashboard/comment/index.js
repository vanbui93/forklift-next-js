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
import { deleteComment, getComments, updateComment } from '../../../store/actions/cmt'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

const AdminCmts = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const cmts = useSelector(state => state.cmt.data)
    const dispatch = useDispatch()
    let router = useRouter()
    //Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [isEdit, setIsEdit] = useState(false)
    const [editCmtObject, setEditCmtObject] = useState({
        name: '',
        image: '',
        content: '',
        position: '',
    })

    const arrayComment = []
    cmts !== null &&
        cmts !== undefined &&
        Object.keys(cmts)?.map(element => {
            const key = element
            if (cmts[key] !== null) {
                const name = cmts[key].name ? cmts[key].name : ''
                const image = cmts[key].image ? cmts[key].image : ''
                const content = cmts[key].content ? cmts[key].content : ''
                const position = cmts[key].position ? cmts[key].position : ''
                arrayComment.push({
                    id: key,
                    name: name,
                    image: image,
                    content: content,
                    position: position,
                })
            }
        })

    useEffect(() => {
        dispatch(getComments())
    }, [])

    //Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/comment_add')
    }

    const idCmtRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idCmtRef.current = id
    }

    const handleEdit = cmt => {
        idCmtRef.current = cmt.id
        setIsEdit(true)
        setEditCmtObject(cmt)
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
            dispatch(deleteComment(idCmtRef.current))
            dispatch(getComments())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditCmtObject(prevState => ({
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
            dispatch(updateComment(editCmtObject))
            setIsEdit(false)
            dispatch(getComments())
        } catch (err) {
            console.log(err)
        }
    }

    const [image, setImage] = useState('')
    const imageRef = useRef(null)

    function useDisplayImage() {
        const [result, setResult] = useState('')

        function uploader(e) {
            const imageFile = e.target.files[0]

            const reader = new FileReader()
            reader.addEventListener('load', e => {
                setResult(e.target.result)
            })

            reader.readAsDataURL(imageFile)
        }
        return { result, uploader }
    }

    const { result, uploader } = useDisplayImage()

    //Button 'Thêm 1 hình slide'
    const UploadControl = ({ children, value, disabled }) => {
        return (
            <label htmlFor='contained-button-file' className='m-0 w-100'>
                <input
                    value={value}
                    accept='.jpeg,.png,.gif,.jpg'
                    disabled={disabled}
                    style={{ display: 'none' }}
                    id='contained-button-file'
                    type='file'
                    onChange={e => {
                        setImage(e.target.files[0])
                        uploader(e)
                    }}
                />
                {children}
            </label>
        )
    }

    //Cập nhật link hình vào setSlide
    useEffect(() => {
        setEditCmtObject(prevState => ({
            ...prevState,
            image: result,
        }))
    }, [result])

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
                                &nbsp;&nbsp;Tạo nhận xét
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Khách hàng</StyledTableCell>
                                        <StyledTableCell>Avatar</StyledTableCell>
                                        <StyledTableCell>Nội dung</StyledTableCell>
                                        <StyledTableCell>Chức vụ</StyledTableCell>
                                        <StyledTableCell align='right'>THÊM</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayComment !== null &&
                                        arrayComment !== undefined &&
                                        Object.values(arrayComment)?.map((item, idx) => {
                                            return (
                                                item && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{item.name}</StyledTableCell>
                                                        <StyledTableCell className={classes.thumbnail}>
                                                            {<img src={item.image} alt='/' loading='lazy' />}
                                                        </StyledTableCell>
                                                        <StyledTableCell>
                                                            {item.name ? item.content : ''}
                                                        </StyledTableCell>
                                                        <StyledTableCell>{item.position}</StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEdit(item)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(item.id)}
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
                                {editCmtObject !== null && editCmtObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Nội dung nhận xét
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editCmtObject.name}
                                                    name='name'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Hình ảnh
                                            </TableCell>
                                            <TableCell>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={3}>
                                                        {
                                                            <img
                                                                className={classes.thumbnail}
                                                                src={editCmtObject.image}
                                                                alt='/'
                                                                loading='lazy'
                                                            />
                                                        }
                                                    </Grid>
                                                    <Grid item xs={7}>
                                                        <div className={classes.imgListItemBlock}>
                                                            <div className={classes.imgUpload}>
                                                                <UploadControl
                                                                    accept='image/*'
                                                                    onChange={e => {
                                                                        setImage(e.target.files[0])
                                                                        uploader(e)
                                                                    }}
                                                                >
                                                                    <div
                                                                        className={classes.imgUploadText}
                                                                        align='center'
                                                                    >
                                                                        <svg
                                                                            className='svg-next-icon svg-next-icon-size-48'
                                                                            width='48'
                                                                            height='48'
                                                                        >
                                                                            <svg
                                                                                viewBox='0 0 48 44'
                                                                                fill='none'
                                                                                xmlns='http://www.w3.org/2000/svg'
                                                                            >
                                                                                <path
                                                                                    d='M18.0917 17.832C19.9129 17.832 21.3894 16.3556 21.3894 14.5343C21.3894 12.713 19.9129 11.2366 18.0917 11.2366C16.2704 11.2366 14.7939 12.713 14.7939 14.5343C14.7939 16.3556 16.2704 17.832 18.0917 17.832Z'
                                                                                    fill='#D0D5DD'
                                                                                ></path>
                                                                                <path
                                                                                    d='M45.1603 26.6717C43.6031 25.2061 41.6336 24.2442 39.4809 23.9694V7.20606C39.4809 5.4198 38.7481 3.81675 37.6031 2.62591C36.4122 1.43507 34.8092 0.748047 33.0229 0.748047H6.45802C4.67176 0.748047 3.0687 1.48087 1.87786 2.62591C0.687023 3.81675 0 5.4198 0 7.20606V28.3206V30.29V34.5496C0 36.3358 0.732824 37.9389 1.87786 39.1297C3.0687 40.3206 4.67176 41.0076 6.45802 41.0076H32.1527C33.8473 42.3816 35.9542 43.2519 38.2901 43.2519C40.9924 43.2519 43.4198 42.1526 45.1603 40.4122C46.9008 38.6717 48 36.2442 48 33.5419C48 30.8396 46.9008 28.4122 45.1603 26.6717ZM2.42748 7.20606C2.42748 6.10683 2.8855 5.09919 3.61832 4.41217C4.35115 3.67934 5.35878 3.22133 6.45802 3.22133H33.0229C34.1221 3.22133 35.1298 3.67934 35.8626 4.41217C36.5954 5.14499 37.0534 6.15263 37.0534 7.25186V21.5419L30.2748 14.7633C29.8168 14.3053 29.0382 14.2595 28.5344 14.7633L18.3206 25.0229L11.4046 18.061C10.9466 17.603 10.1679 17.5572 9.66412 18.061L2.42748 25.3893V7.20606ZM6.41221 38.6717V38.5801C5.31298 38.5801 4.30534 38.1221 3.57252 37.3893C2.8855 36.6564 2.42748 35.6488 2.42748 34.5496V30.29V28.8702L10.5344 20.7175L17.4504 27.6335C17.9084 28.0916 18.687 28.0916 19.1908 27.6335L29.4046 17.374L36.0916 24.1068C35.9542 24.1526 35.8168 24.1984 35.6794 24.2442C35.4962 24.29 35.313 24.3358 35.084 24.4274C34.9008 24.4732 34.7176 24.5648 34.5344 24.6106C34.3969 24.6564 34.3053 24.7022 34.1679 24.7938C33.9847 24.8855 33.8473 24.9313 33.7099 25.0229C33.4809 25.1603 33.2519 25.2977 33.0229 25.4351C32.8855 25.5267 32.7939 25.5725 32.6565 25.6641C32.5649 25.7099 32.5191 25.7557 32.4275 25.8015C32.0153 26.0763 31.6489 26.3969 31.3282 26.7633C29.5878 28.5038 28.4886 30.9313 28.4886 33.6335C28.4886 34.3206 28.5802 34.9618 28.7176 35.6488C28.7634 35.832 28.8092 35.9694 28.855 36.1526C28.9924 36.6106 29.1298 37.0687 29.313 37.5267V37.5725C29.4962 37.9389 29.6794 38.3511 29.9084 38.6717H6.41221ZM43.374 38.6717C42.0458 40 40.2595 40.7786 38.2443 40.7786C36.3206 40.7786 34.5344 40 33.2519 38.7633C33.0687 38.5801 32.8855 38.3511 32.7023 38.1679C32.5649 38.0305 32.4275 37.8473 32.2901 37.7099C32.1069 37.4809 31.9695 37.2061 31.8321 36.9313C31.7405 36.748 31.6489 36.6106 31.5573 36.4274C31.4656 36.1984 31.374 35.9236 31.3282 35.6488C31.2824 35.4656 31.1908 35.2366 31.145 35.0534C31.0534 34.5954 31.0076 34.0916 31.0076 33.5877C31.0076 31.5725 31.8321 29.7862 33.1145 28.458C34.3969 27.1297 36.229 26.3511 38.2443 26.3511C40.2595 26.3511 42.0458 27.1755 43.374 28.458C44.7023 29.7862 45.4809 31.5725 45.4809 33.5877C45.4809 35.5572 44.6565 37.3435 43.374 38.6717Z'
                                                                                    fill='#D0D5DD'
                                                                                ></path>
                                                                                <path
                                                                                    d='M39.1146 28.6411C39.023 28.5495 38.8856 28.4579 38.7024 28.3663C38.565 28.3205 38.4276 28.2747 38.2902 28.2747C38.2444 28.2747 38.2444 28.2747 38.2444 28.2747C38.1986 28.2747 38.1986 28.2747 38.1986 28.2747C38.0611 28.2747 37.9237 28.3205 37.7863 28.3663C37.6489 28.4121 37.5115 28.5037 37.3741 28.6411L34.5344 31.4808C34.0764 31.9388 34.0764 32.7174 34.5344 33.2212C34.9924 33.6792 35.7711 33.6792 36.2749 33.2212L37.0077 32.4884V37.5266C37.0077 38.2136 37.5573 38.7632 38.2444 38.7632C38.9314 38.7632 39.481 38.2136 39.481 37.5266V32.4884L40.2138 33.2212C40.6718 33.6792 41.4505 33.6792 41.9543 33.2212C42.4123 32.7632 42.4123 31.9846 41.9543 31.4808L39.1146 28.6411Z'
                                                                                    fill='#D0D5DD'
                                                                                ></path>
                                                                            </svg>
                                                                        </svg>
                                                                        <p>Thay hình avatar</p>
                                                                    </div>
                                                                </UploadControl>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Nội dung
                                            </TableCell>
                                            <TableCell>
                                                <TextareaAutosize
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editCmtObject.content}
                                                    name='content'
                                                    style={{ width: '100%' }}
                                                    minRows={4}
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Chức vụ
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editCmtObject.position}
                                                    name='position'
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
export default withStyles(styles)(AdminCmts)
