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
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addPageObject, getPageDetail } from '../../../store/actions/page'
import { storage } from '../../../utils/firebase'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })
const htmlToDraft = typeof window === 'object' && require('html-to-draftjs').default

const PageAdd = props => {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const router = useRouter()

    const dispatch = useDispatch()
    const { classes } = props

    const [addPage, setAddPage] = useState({
        name: '',
        slug: '',
        content: '',
        isDisplay: '1',
        create_date: new Date().toString().replace(/GMT.*/g, ''),
    })

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value

        setAddPage(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    setPrefix('')
    const keyAdd = nextId()
    const handleSavePage = async () => {
        try {
            dispatch(addPageObject(addPage, Number(keyAdd)))
            dispatch(getPageDetail())
            router.push('/dashboard/page')
        } catch (err) {
            console.log(err)
        }
    }

    const handleCancel = () => {
        router.push('/dashboard/page')
    }

    const onEditorStateChange = editorState => {
        const currentContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        setEditorState(editorState)

        setAddPage(prevState => ({
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.tbHeadLeft} variant='head'>
                                    Tên page
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
                                    Link
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='outlined-size-small'
                                        size='small'
                                        fullWidth
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
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                    <Button variant='contained' color='primary' onClick={handleCancel}>
                        Hủy bỏ
                    </Button>
                    <Button variant='contained' color='secondary' onClick={handleSavePage}>
                        Lưu
                    </Button>
                </Stack>
            </LayoutAdmin>
        </AdminStyle>
    )
}

export default withStyles(styles)(PageAdd)
