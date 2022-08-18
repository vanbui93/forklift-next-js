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
  withStyles,
} from '@material-ui/core'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import { deleteVideo, getVideo, updateVideo } from '../../../store/actions/videos'
import { AdminStyle, StyledTableCell, StyledTableRow } from './../../../admin_components/AdminStyle'
import DiaLogPopup from '../../../admin_components/DiaLogPopup'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from './styles'
import LayoutAdmin from '../../../layouts/LayoutAdmin'

const AdminColor = props => {
  const opensidebar = useSelector(state => state.ui.opensidebar)
  const allVideos = useSelector(state => state.videos.data)
  let router = useRouter()
  const dispatch = useDispatch()

  //Thiết lập trạng thái DiaLog
  const [dialog, setDialog] = useState({
    message: '',
    isOpenDiaLog: false,
  })

  const [isEdit, setIsEdit] = useState(false)
  const [editVideoObject, setEditVideoObject] = useState({
    video_link: '',
    video_text: '',
  })

  const arrayVideo = []
  allVideos !== null &&
    allVideos !== undefined &&
    Object.keys(allVideos)?.map(element => {
      const key = element
      if (allVideos[key] !== null) {
        const video_link = allVideos[key].video_link ? allVideos[key].video_link : ''
        const video_text = allVideos[key].video_text ? allVideos[key].video_text : ''
        arrayVideo.push({
          id: key,
          video_link: video_link,
          video_text: video_text,
        })
      }
    })

  useEffect(() => {
    dispatch(getVideo())
  }, [])

  const { classes } = props
  //Thêm màu sản phẩm
  const handleAddVideo = () => {
    router.push('/dashboard/video_add')
  }

  //Nội dung dialog
  const handleDialog = (message, isOpenDiaLog) => {
    setDialog({
      message,
      isOpenDiaLog,
    })
  }

  const idVideoRef = useRef()
  const handleDelete = id => {
    handleDialog('Bán có chắc chắn muốn xóa không ?', true)
    idVideoRef.current = id
  }

  const handleEditVideo = video => {
    idVideoRef.current = video.id
    setIsEdit(true)
    setEditVideoObject(video)
  }

  //Bạn có chắc chắn muốn xóa
  const areUSureDelete = status => {
    if (status) {
      dispatch(deleteVideo(idVideoRef.current))
      dispatch(getVideo())
      handleDialog('', false)
    } else {
      handleDialog('', false)
    }
  }

  const handleEditOnchage = e => {
    let name = e.target.name
    let value = e.target.value
    setEditVideoObject(prevState => ({
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
      dispatch(updateVideo(editVideoObject))
      setIsEdit(false)
      dispatch(getVideo())
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        {dialog.isOpenDiaLog && (
          <DiaLogPopup onDialog={areUSureDelete} message={dialog.message} isOpenDiaLog={dialog.isOpenDiaLog} />
        )}
        {!isEdit ? (
          <div>
            <Grid style={{ paddingBottom: '20px' }}>
              <Button variant='contained' color='primary' onClick={handleAddVideo}>
                <AddIcon />
                &nbsp;&nbsp;Thêm Link Youtube
              </Button>
            </Grid>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Link Video</StyledTableCell>
                    <StyledTableCell align='left'>Nội dung video</StyledTableCell>
                    <StyledTableCell align='right'>SỬA</StyledTableCell>
                    <StyledTableCell align='right'>XÓA</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayVideo !== null &&
                    arrayVideo !== undefined &&
                    Object.values(arrayVideo)?.map(
                      (item, idx) =>
                        item && (
                          <StyledTableRow key={idx}>
                            <StyledTableCell>
                              <Grid style={{ display: 'flex' }}>
                                {item.video_link ? `https://www.youtube.com/watch?v=${item.video_link}` : ''}{' '}
                                <span className={classes.videoStyle} color='primary'></span>
                              </Grid>
                            </StyledTableCell>
                            <StyledTableCell align='left'>{item.video_text}</StyledTableCell>
                            <StyledTableCell align='right'>
                              <Fab size='small' color='primary' aria-label='add' onClick={() => handleEditVideo(item)}>
                                <EditIcon />
                              </Fab>
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                              <Fab size='small' color='primary' aria-label='add' onClick={() => handleDelete(item.id)}>
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
          <Grid>
            <Grid style={{ paddingBottom: '20px' }}>
              <img src={'/assets/img/youtube_img.png'} alt='' />
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                {editVideoObject !== null && editVideoObject !== undefined && (
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tbHeadLeft} variant='head'>
                        Link
                      </TableCell>
                      <TableCell>
                        <TextField
                          id='outlined-size-small'
                          size='small'
                          fullWidth
                          defaultValue={editVideoObject.video_link}
                          name='video_link'
                          onChange={handleEditOnchage}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className={classes.tbHeadLeft} variant='head'>
                        Nội dung
                      </TableCell>
                      <TableCell>
                        <TextField
                          id='outlined-size-small'
                          size='small'
                          fullWidth
                          defaultValue={editVideoObject.video_text}
                          name='video_text'
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
export default withStyles(styles)(AdminColor)
