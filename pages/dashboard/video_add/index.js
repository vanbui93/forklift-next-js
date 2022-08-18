import {
  Button,
  Grid,
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
import React, { useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { addVideoObject, getVideo } from '../../../store/actions/videos'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import styles from './styles'

function VideoAdd(props) {
  const opensidebar = useSelector(state => state.ui.opensidebar)

  const dispatch = useDispatch()
  let router = useRouter()
  const { classes } = props

  const [video, setVideo] = useState({
    video_text: '',
    video_link: '',
  })

  const handleEditOnchange = e => {
    let name = e.target.name
    let value = e.target.value

    setVideo(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  setPrefix('')
  const keyAdd = nextId()
  const handleSaveVideo = async () => {
    try {
      dispatch(addVideoObject(video, Number(keyAdd)))
      dispatch(getVideo())
      router.push('/dashboard/video', { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    router.push('/dashboard/video', { replace: true })
  }

  return (
    <AdminStyle open={!opensidebar}>
      <LayoutAdmin>
        <Grid style={{ paddingBottom: '20px' }}>
          <img src={'/assets/img/youtube_img.png'} alt='' />
        </Grid>
        <Grid>
          <TableContainer component={Paper}>
            <Table>
              {
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tbHeadLeft} variant='head'>
                      Link video
                    </TableCell>
                    <TableCell>
                      <TextField
                        id='outlined-size-small'
                        size='small'
                        fullWidth
                        name='video_link'
                        onChange={handleEditOnchange}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tbHeadLeft} variant='head'>
                      Nội dung video
                    </TableCell>
                    <TableCell>
                      <TextField
                        id='outlined-size-small'
                        size='small'
                        fullWidth
                        name='video_text'
                        onChange={handleEditOnchange}
                      />
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
            <Button variant='contained' color='secondary' onClick={handleSaveVideo}>
              Lưu
            </Button>
          </Stack>
        </Grid>
      </LayoutAdmin>
    </AdminStyle>
  )
}
export default withStyles(styles)(VideoAdd)
