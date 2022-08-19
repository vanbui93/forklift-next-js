import {
    Button,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
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
import { ContentState, convertToRaw, EditorState } from 'draft-js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { deletePageDetail, getPageDetail, updatePageDetail } from '../../../store/actions/page'
import { storage } from '../../../utils/firebase'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import styles from './styles'

import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default

function AdminPage(props) {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const pageData = useSelector(state => state.page.data)
    const dispatch = useDispatch()
    const router = useRouter()
    const refs = useRef()

    // Thiết lập trạng thái DiaLog
    const [dialog, setDialog] = useState({
        message: '',
        isOpenDiaLog: false,
    })

    const { classes } = props

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const [isEdit, setIsEdit] = useState(false)
    const [editPageObject, setEditPageObject] = useState({
        name: '',
        slug: '',
        content: '',
        isDisplay: '0',
        create_date: '',
        update_date: '',
    })

    const arrayPage = []
    pageData !== null &&
        pageData !== undefined &&
        Object.keys(pageData)?.map(element => {
            const key = element
            if (pageData[key] !== null) {
                const name = pageData[key].name ? pageData[key].name : ''
                const slug = pageData[key].slug ? pageData[key].slug : ''
                const content = pageData[key].content ? pageData[key].content : ''
                const isDisplay = pageData[key].isDisplay ? pageData[key].isDisplay : ''
                const create_date = pageData[key].create_date ? pageData[key].create_date : ''
                const update_date = pageData[key].update_date ? pageData[key].update_date : ''
                arrayPage.push({
                    id: key,
                    name,
                    slug,
                    content,
                    isDisplay: isDisplay.toString(),
                    create_date,
                    update_date,
                })
            }
        })

    useEffect(() => {
        dispatch(getPageDetail())
    }, [])

    // Thêm tài khoản mới
    const handleAddAccount = () => {
        router.push('/dashboard/page_add')
    }

    const idPageRef = useRef()
    const handleDelete = id => {
        handleDialog('Bán có chắc chắn muốn xóa không ?', true)
        idPageRef.current = id
    }

    const handleEditPage = page => {
        idPageRef.current = page.id
        setIsEdit(true)
        setEditPageObject(page)

        const blocksFromHtml = htmlToDraft(page.content)
        const { contentBlocks, entityMap } = blocksFromHtml
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(contentBlocks, entityMap)))
    }

    // Nội dung dialog
    const handleDialog = (message, isOpenDiaLog) => {
        setDialog({
            message,
            isOpenDiaLog,
        })
    }

    // Bạn có chắc chắn muốn xóa
    const areUSureDelete = status => {
        if (status) {
            dispatch(deletePageDetail(idPageRef.current))
            dispatch(getPageDetail())
            handleDialog('', false)
        } else {
            handleDialog('', false)
        }
    }

    const handleEditOnchage = e => {
        const { name } = e.target
        const { value } = e.target
        setEditPageObject(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleCancel = () => {
        setIsEdit(false)
    }

    // Submit edit
    const handleEditSubmit = async () => {
        try {
            dispatch(updatePageDetail(editPageObject))
            setIsEdit(false)
            dispatch(getPageDetail())
        } catch (err) {
            console.log(err)
        }
    }

    const onEditorStateChange = editorState => {
        const currentContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setEditorState(editorState)

        setEditPageObject(prevState => ({
            ...prevState,
            content: currentContent,
        }))
    }

    function uploadImageCallBack(file) {
        const imagesRef = ref(storage, `media/${file.name}`)
        const uploadTask = uploadBytesResumable(imagesRef, file)

        return new Promise((resolve, reject) => {
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                'state_changed',
                snapshot => {},
                error => {
                    console.log(error)
                    reject(error)
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        resolve({ data: { link: downloadURL } })
                    })
                }
            )
        })
    }

    const embedVideoCallBack = link => {
        if (link.indexOf('youtube') >= 0) {
            link = link.replace('watch?v=', 'embed/')
            link = link.replace('/watch/', '/embed/')
            link = link.replace('youtu.be/', 'youtube.com/embed/')
        }
        return link
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
                                &nbsp;&nbsp;Tạo mới page
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Tên page</StyledTableCell>
                                        <StyledTableCell align='left'>Link</StyledTableCell>
                                        <StyledTableCell align='left'>Ngày tạo</StyledTableCell>
                                        <StyledTableCell align='left'>Ngày chỉnh sửa</StyledTableCell>
                                        <StyledTableCell align='left'>Hiển thị</StyledTableCell>
                                        <StyledTableCell align='right'>SỬA</StyledTableCell>
                                        <StyledTableCell align='right'>XÓA</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {arrayPage !== null &&
                                        arrayPage !== undefined &&
                                        Object.values(arrayPage)?.map(
                                            (page, idx) =>
                                                page !== null &&
                                                page !== undefined && (
                                                    <StyledTableRow key={idx}>
                                                        <StyledTableCell>{page.name}</StyledTableCell>
                                                        <StyledTableCell align='left'>{page.slug}</StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.create_date}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.update_date}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='left'>
                                                            {page.isDisplay === '1' ? 'Hiển thị' : 'Ẩn'}
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleEditPage(page)}
                                                            >
                                                                <EditIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                        <StyledTableCell align='right'>
                                                            <Fab
                                                                size='small'
                                                                color='primary'
                                                                aria-label='add'
                                                                onClick={() => handleDelete(page.id)}
                                                            >
                                                                <DeleteIcon />
                                                            </Fab>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                )
                                        )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <Grid ref={refs}>
                        <TableContainer component={Paper}>
                            <Table>
                                {editPageObject !== null && editPageObject !== undefined && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Tên Page
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id='outlined-size-small'
                                                    size='small'
                                                    fullWidth
                                                    defaultValue={editPageObject.name}
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
                                                    defaultValue={editPageObject.slug}
                                                    name='slug'
                                                    onChange={handleEditOnchage}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Nội dung
                                            </TableCell>
                                            <TableCell>
                                                <Editor
                                                    editorState={editorState}
                                                    toolbarClassName='toolbarClassName'
                                                    wrapperClassName='wrapperClassName'
                                                    editorClassName='editorClassName'
                                                    onEditorStateChange={onEditorStateChange}
                                                    toolbar={{
                                                        inline: { inDropdown: true },
                                                        list: { inDropdown: true },
                                                        textAlign: { inDropdown: true },
                                                        link: { inDropdown: true },
                                                        history: { inDropdown: true },
                                                        embedded: {
                                                            embedCallback: embedVideoCallBack,
                                                        },
                                                        image: {
                                                            uploadCallback: uploadImageCallBack,
                                                            alt: { present: true, mandatory: false },
                                                        },
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Trạng thái hiển thị
                                            </TableCell>
                                            <TableCell>
                                                <FormControl>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                                        name='isDisplay'
                                                        value={editPageObject.isDisplay}
                                                        onChange={handleEditOnchage}
                                                    >
                                                        <FormControlLabel value='1' control={<Radio />} label='Hiện' />
                                                        <FormControlLabel value='0' control={<Radio />} label='Ẩn' />
                                                    </RadioGroup>
                                                </FormControl>
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
export default withStyles(styles)(AdminPage)
