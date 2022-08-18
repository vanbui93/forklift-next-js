import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow, withStyles } from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import { Chip, ImageList, ImageListItem, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addMediaStorage, deleteMediaStorage, getMediaStorage } from '../../../store/actions/mediaStorage'
import { storage } from '../../../utils/firebase'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

function AdminMedia(props) {
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const allUrl = useSelector(state => state.mediaStorage.data)
    const dispatch = useDispatch()
    const refs = useRef()

    const { classes } = props
    const [isAddStorage, setIsAddStorage] = useState(false)
    const [file, setFile] = useState('')

    useEffect(() => {
        dispatch(getMediaStorage())
    }, [])

    const handleCancel = () => {
        setIsAddStorage(false)
    }

    function srcset(image, size, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
        }
    }

    const handleDeleteMedia = itemFile => {
        dispatch(deleteMediaStorage(itemFile))
        dispatch(getMediaStorage())
    }

    const handleAddMediaStorage = () => {
        setIsAddStorage(true)
    }

    function handleAddFileStorage(e) {
        setFile(e.target.files[0])
    }

    // thêm file vào Storage
    const handleSubmitFileStorage = async () => {
        setIsAddStorage(false)
        if (!file) {
            alert('Please choose a file first!')
        }
        const storageRef = ref(storage, `/media/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

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
                        resolve(allUrl.push({ downloadURL }))
                        dispatch(getMediaStorage())
                    })
                }
            )
        })
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                {!isAddStorage ? (
                    <div>
                        <Grid style={{ paddingBottom: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleAddMediaStorage}>
                                <AddIcon />
                                &nbsp;&nbsp;Thêm mới
                            </Button>
                        </Grid>
                        <ImageList variant='quilted' cols={6} rowHeight={150}>
                            {allUrl &&
                                allUrl?.map((item, idx) => {
                                    const typePdf = item && item.split('.').pop().split('?')[0] == 'pdf'
                                    const typeTxt = item && item.split('.').pop().split('?')[0] == 'txt'
                                    const typeExcel = item && item.split('.').pop().split('?')[0] == 'xlsx'
                                    const typeJson = item && item.split('.').pop().split('?')[0] == 'json'
                                    const typeWord = item && item.split('.').pop().split('?')[0] == 'docx'
                                    const typePowerPoint = item && item.split('.').pop().split('?')[0] == 'pptx'
                                    const fileName = item && item.split('media%2F').pop().split('?')[0]
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                paddingBottom: '20px',
                                                marginBottom: '20px',
                                                textAlign: 'right',
                                                background: 'white',
                                            }}
                                        >
                                            <ImageListItem key={idx}>
                                                <Chip
                                                    label='Xóa tệp tin'
                                                    variant='outlined'
                                                    style={{
                                                        position: 'absolute',
                                                        top: '5px',
                                                        right: '5px',
                                                        background: '#fff',
                                                    }}
                                                    onDelete={() => handleDeleteMedia(item)}
                                                />
                                                {typePdf ? (
                                                    <img
                                                        src={'/assets/img/pdf-file-icon.jpg'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : typeTxt ? (
                                                    <img
                                                        src={'/assets/img/txt-file-icon.png'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : typeExcel ? (
                                                    <img
                                                        src={'/assets/img/excel-file-icon.png'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : typeWord ? (
                                                    <img
                                                        src={'/assets/img/word-file-icon.png'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : typePowerPoint ? (
                                                    <img
                                                        src={'/assets/img/powerpoint-icon.png'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : typeJson ? (
                                                    <img
                                                        src={'/assets/img/json-file-icon.png'}
                                                        className={classes.FileIcon}
                                                    />
                                                ) : (
                                                    <img
                                                        {...srcset(item, 121)}
                                                        loading='lazy'
                                                        className={classes.FileIcon}
                                                    />
                                                )}
                                                <p className={classes.FileName}>{fileName ? fileName : ''}</p>
                                                <Button
                                                    variant='outlined'
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: '-20px',
                                                        right: '5px',
                                                        background: '#fff',
                                                    }}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(item)
                                                    }}
                                                >
                                                    Copy link
                                                </Button>
                                            </ImageListItem>
                                        </div>
                                    )
                                })}
                        </ImageList>
                    </div>
                ) : (
                    <Grid ref={refs}>
                        <TableContainer component={Paper}>
                            <Table>
                                {
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.tbHeadLeft} variant='head'>
                                                Upload hình
                                            </TableCell>
                                            <TableCell>
                                                <div className={classes.imgList}>
                                                    <div
                                                        className={`${classes.imgListItem} ${classes.imgListItemBlock}`}
                                                    >
                                                        <div className={classes.imgUpload}>
                                                            <input
                                                                type='file'
                                                                accept='*'
                                                                onChange={handleAddFileStorage}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                }
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleCancel}>
                                Hủy bỏ
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleSubmitFileStorage}>
                                Lưu
                            </Button>
                        </Stack>
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default withStyles(styles)(AdminMedia)
