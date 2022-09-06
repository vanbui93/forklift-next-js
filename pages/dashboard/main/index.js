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
import EditIcon from '@mui/icons-material/Edit'
import { Stack, TextareaAutosize } from '@mui/material'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../../layouts/LayoutAdmin'
import { getMain, updateMain } from '../../../store/actions/main'
import { AdminStyle } from './../../../admin_components/AdminStyle'
import parse from 'html-react-parser'
import styles from './styles'

const Main = props => {
    const { classes } = props
    const dispatch = useDispatch()
    const mainData = useSelector(state => state.main.data)
    const opensidebar = useSelector(state => state.ui.opensidebar)
    const [isEditMain, setIsEditMain] = useState(false)

    const [editMain, setEditMain] = useState({
        logo_img: '',
        logo_alt: '',
        page_title: '',
        phone: '',
        hotline: '',
        address: '',
        email_support: '',
        fanpage: '',
        core_title_01: '',
        core_title_02: '',
        core_title_03: '',
        core_title_04: '',
        core_content_01: '',
        core_content_02: '',
        core_content_03: '',
        core_content_04: '',
        footer_title: {
            footer_title_01: '',
            footer_title_02: '',
        },
        footer_sub: {
            footer_sub_title_01: '',
            footer_sub_title_02: '',
            footer_sub_title_03: '',
            footer_sub_title_04: '',
        },
        main_content_01: {
            title: '',
            des: '',
            image: '',
            link: '',
        },
        main_content_02: {
            content_title: '',
            title_01: '',
            des_01: '',
            icon_01: '',
            title_02: '',
            des_02: '',
            icon_02: '',
            title_03: '',
            des_03: '',
            icon_03: '',
        },
    })

    const handleEditMain = () => {
        setIsEditMain(true)
        setEditMain({
            logo_img: mainData.logo_img,
            logo_alt: mainData.logo_alt,
            page_title: mainData.page_title,
            phone: mainData.phone,
            address: mainData.address,
            email_support: mainData.email_support,
            fanpage: mainData.fanpage,
            hotline: mainData.hotline,
            core_title_01: mainData.core_title_01,
            core_title_02: mainData.core_title_02,
            core_title_03: mainData.core_title_03,
            core_title_04: mainData.core_title_04,
            core_content_01: mainData.core_content_01,
            core_content_02: mainData.core_content_02,
            core_content_03: mainData.core_content_03,
            core_content_04: mainData.core_content_04,
            footer_title: {
                footer_title_01: mainData.footer_title.footer_title_01,
                footer_title_02: mainData.footer_title.footer_title_02,
            },
            footer_sub: {
                footer_sub_title_01: mainData.footer_sub.footer_sub_title_01,
                footer_sub_title_02: mainData.footer_sub.footer_sub_title_02,
                footer_sub_title_03: mainData.footer_sub.footer_sub_title_03,
                footer_sub_title_04: mainData.footer_sub.footer_sub_title_04,
            },
            main_content_01: {
                title: mainData.main_content_01.title,
                des: mainData.main_content_01.des,
                image: mainData.main_content_01.image,
                link: mainData.main_content_01.link,
            },
            main_content_02: {
                content_title: mainData.main_content_02.content_title,
                title_01: mainData.main_content_02.title_01,
                des_01: mainData.main_content_02.des_01,
                icon_01: mainData.main_content_02.icon_01,
                title_02: mainData.main_content_02.title_02,
                des_02: mainData.main_content_02.des_02,
                icon_02: mainData.main_content_02.icon_02,
                title_03: mainData.main_content_02.title_03,
                des_03: mainData.main_content_02.des_03,
                icon_03: mainData.main_content_02.icon_03,
            },
        })
    }

    const handleEditOnchage = e => {
        let name = e.target.name
        let value = e.target.value
        setEditMain(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleEditOnchageFooterTitle = e => {
        let inputName = e.target.name
        let inputValue = e.target.value

        setEditMain(prevState => {
            const newState = Object.assign(editMain.footer_title, { [inputName]: inputValue })
            return {
                ...prevState,
                footer_title: newState,
            }
        })
    }

    const handleEditOnchageHeader = e => {
        let inputName = e.target.name
        let inputValue = e.target.value

        setEditMain(prevState => {
            const newState = Object.assign(editMain.header_content, { [inputName]: inputValue })
            return {
                ...prevState,
                header_content: newState,
            }
        })
    }

    const handleEditOnchageFooterSub = e => {
        let inputName = e.target.name
        let inputValue = e.target.value

        setEditMain(prevState => {
            const newState = Object.assign(editMain.footer_sub, { [inputName]: inputValue })
            return {
                ...prevState,
                footer_sub: newState,
            }
        })
    }

    const handleEditOnchageMainContent01 = e => {
        let inputName = e.target.name
        let inputValue = e.target.value

        setEditMain(prevState => {
            const newState = Object.assign(editMain.main_content_01, { [inputName]: inputValue })
            return {
                ...prevState,
                main_content_01: newState,
            }
        })
    }

    const handleEditOnchageMainContent02 = e => {
        let inputName = e.target.name
        let inputValue = e.target.value

        setEditMain(prevState => {
            const newState = Object.assign(editMain.main_content_02, { [inputName]: inputValue })
            return {
                ...prevState,
                main_content_02: newState,
            }
        })
    }
    const [image, setImage] = useState('')

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
        setEditMain(prevState => ({
            ...prevState,
            logo_img: result,
        }))
    }, [result])

    const handleCancel = () => {
        setIsEditMain(false)
    }

    const handleSubmitMain = () => {
        try {
            dispatch(updateMain(editMain))
            dispatch(getMain())
            setIsEditMain(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <AdminStyle open={!opensidebar}>
            <LayoutAdmin>
                {!isEditMain ? (
                    <div>
                        <Grid style={{ paddingBottom: '20px' }}>
                            <Button variant='contained' color='secondary' onClick={() => handleEditMain(mainData)}>
                                <EditIcon />
                                Sửa
                            </Button>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Logo
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <img
                                                        className={classes.thumbnail}
                                                        src={mainData?.logo_img}
                                                        alt={mainData?.logo_alt}
                                                    />
                                                </Grid>
                                                <Grid item xs={6} style={{ display: 'flex' }}>
                                                    {mainData?.logo_alt}
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Tiêu đề trang
                                        </TableCell>
                                        <TableCell>{mainData?.page_title}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Số điện thoại
                                        </TableCell>
                                        <TableCell>{mainData?.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Hotline
                                        </TableCell>
                                        <TableCell>{mainData?.hotline}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Địa chỉ
                                        </TableCell>
                                        <TableCell>{mainData?.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Email hỗ trợ
                                        </TableCell>
                                        <TableCell>{mainData?.email_support}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Fanpage
                                        </TableCell>
                                        <TableCell>{mainData?.fanpage}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Footer
                                        </TableCell>
                                        <TableCell>
                                            <ul>
                                                <li className={classes.footerTitle}>
                                                    {mainData.footer_title?.footer_title_01}
                                                    <ul className={classes.footerSubItem}>
                                                        <li>{mainData.footer_sub?.footer_sub_title_01}</li>
                                                        <li>{mainData.footer_sub?.footer_sub_title_02}</li>
                                                        <li>{mainData.footer_sub?.footer_sub_title_03}</li>
                                                        <li>{mainData.footer_sub?.footer_sub_title_04}</li>
                                                    </ul>
                                                </li>
                                                <li className={classes.footerTitle}>
                                                    {mainData.footer_title?.footer_title_02}
                                                </li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Nội dung trang chủ 1
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <h2>{mainData.main_content_01?.title}</h2>
                                                <br />
                                                {parse(
                                                    mainData.main_content_01?.des ? mainData.main_content_01?.des : ''
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Nội dung trang chủ 2
                                        </TableCell>
                                        <TableCell>
                                            <h2>{mainData.main_content_02?.content_title}</h2>
                                            <ul>
                                                <li>
                                                    <strong>{mainData.main_content_02?.title_01}</strong>
                                                    <div className={classes.footerSubItem}>
                                                        {parse(
                                                            mainData.main_content_02?.des_01
                                                                ? mainData.main_content_02?.des_01
                                                                : ''
                                                        )}
                                                    </div>
                                                </li>
                                                <li>
                                                    <strong>{mainData.main_content_02?.title_02}</strong>
                                                    <div className={classes.footerSubItem}>
                                                        {parse(
                                                            mainData.main_content_02?.des_02
                                                                ? mainData.main_content_02?.des_02
                                                                : ''
                                                        )}
                                                    </div>
                                                </li>
                                                <li>
                                                    <strong>{mainData.main_content_02?.title_03}</strong>
                                                    <div className={classes.footerSubItem}>
                                                        {parse(
                                                            mainData.main_content_02?.des_03
                                                                ? mainData.main_content_02?.des_03
                                                                : ''
                                                        )}
                                                    </div>
                                                </li>
                                            </ul>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow></TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Logo
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                    {
                                                        <img
                                                            className={classes.thumbnail}
                                                            src={editMain.logo_img}
                                                            alt='/'
                                                            loading='lazy'
                                                        />
                                                    }
                                                </Grid>
                                                <Grid item xs={7}>
                                                    <div className={classes.imgListItemBlock}>
                                                        <div className={classes.imgUpload}>
                                                            <UploadControl accept='image/*'>
                                                                <div className={classes.imgUploadText} align='center'>
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
                                                                    <p>Thay ảnh logo</p>
                                                                </div>
                                                            </UploadControl>
                                                        </div>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} style={{ display: 'flex' }}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={mainData?.logo_alt}
                                                        name='logo_alt'
                                                        onChange={handleEditOnchage}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Tiêu đề trang
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.page_title}
                                                name='page_title'
                                                onChange={handleEditOnchage}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Số điện thoại
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.phone}
                                                name='phone'
                                                onChange={handleEditOnchage}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Hotline
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.hotline}
                                                name='hotline'
                                                onChange={handleEditOnchage}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Địa chỉ
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.address}
                                                name='address'
                                                onChange={handleEditOnchage}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Email hỗ trợ
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.email_support}
                                                        name='email_support'
                                                        onChange={handleEditOnchageHeader}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Fanpage
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.fanpage}
                                                        name='fanpage'
                                                        onChange={handleEditOnchageHeader}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Tiêu đề ở Footer
                                        </TableCell>
                                        <TableCell>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.footer_title.footer_title_01}
                                                        name='footer_title_01'
                                                        onChange={handleEditOnchageFooterTitle}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.footer_title.footer_title_02}
                                                        name='footer_title_02'
                                                        onChange={handleEditOnchageFooterTitle}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Tiêu đề nhỏ ở Footer
                                        </TableCell>
                                        <TableCell>
                                            <div className={classes.footerSubItem}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editMain.footer_sub.footer_sub_title_01}
                                                            name='footer_sub_title_01'
                                                            onChange={handleEditOnchageFooterSub}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editMain.footer_sub.footer_sub_title_02}
                                                            name='footer_sub_title_02'
                                                            onChange={handleEditOnchageFooterSub}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editMain.footer_sub.footer_sub_title_03}
                                                            name='footer_sub_title_03'
                                                            onChange={handleEditOnchageFooterSub}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <TextField
                                                            id='outlined-size-small'
                                                            size='small'
                                                            fullWidth
                                                            defaultValue={editMain.footer_sub.footer_sub_title_04}
                                                            name='footer_sub_title_04'
                                                            onChange={handleEditOnchageFooterSub}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Nội dung trang chủ 1
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.main_content_01?.title}
                                                name='title'
                                                label='Tiêu đề'
                                                onChange={handleEditOnchageMainContent01}
                                            />
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.main_content_01?.link}
                                                name='title'
                                                label='Link'
                                                onChange={handleEditOnchageMainContent01}
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <TextareaAutosize
                                                aria-label='minimum height'
                                                minRows={3}
                                                placeholder='Minimum 3 rows'
                                                defaultValue={editMain.main_content_01?.des}
                                                style={{ width: 400 }}
                                                name='des'
                                                onChange={handleEditOnchageMainContent01}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className={classes.tbHeadLeft} variant='head'>
                                            Nội dung trang chủ 2
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id='outlined-size-small'
                                                size='small'
                                                fullWidth
                                                defaultValue={editMain.main_content_02?.content_title}
                                                name='content_title'
                                                onChange={handleEditOnchageMainContent02}
                                            />
                                            <Grid container spacing={2}>
                                                <Grid item sx={12}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.main_content_02?.title_01}
                                                        name='title_01'
                                                        label='Service 01'
                                                        onChange={handleEditOnchageMainContent02}
                                                    />
                                                    <TextareaAutosize
                                                        aria-label='minimum height'
                                                        minRows={3}
                                                        placeholder='Minimum 3 rows'
                                                        defaultValue={editMain.main_content_02?.des_01}
                                                        style={{ width: 400 }}
                                                        name='des_01'
                                                        onChange={handleEditOnchageMainContent02}
                                                    />
                                                </Grid>
                                                <Grid item sx={12}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.main_content_02?.title_02}
                                                        name='title_02'
                                                        label='Service 02'
                                                        onChange={handleEditOnchageMainContent02}
                                                    />
                                                    <TextareaAutosize
                                                        aria-label='minimum height'
                                                        minRows={3}
                                                        placeholder='Minimum 3 rows'
                                                        defaultValue={editMain.main_content_02?.des_02}
                                                        style={{ width: 400 }}
                                                        name='des_02'
                                                        onChange={handleEditOnchageMainContent02}
                                                    />
                                                </Grid>
                                                <Grid item sx={12}>
                                                    <TextField
                                                        id='outlined-size-small'
                                                        size='small'
                                                        fullWidth
                                                        defaultValue={editMain.main_content_02?.title_03}
                                                        name='title_03'
                                                        label='Service 03'
                                                        onChange={handleEditOnchageMainContent02}
                                                        sx={{ marginBottom: 1 }}
                                                    />
                                                    <TextareaAutosize
                                                        aria-label='minimum height'
                                                        minRows={3}
                                                        placeholder='Minimum 3 rows'
                                                        defaultValue={editMain.main_content_02?.des_03}
                                                        style={{ width: 400 }}
                                                        name='des_03'
                                                        onChange={handleEditOnchageMainContent02}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Stack spacing={2} direction='row' style={{ paddingTop: '20px' }}>
                            <Button variant='contained' color='primary' onClick={handleCancel}>
                                Hủy
                            </Button>
                            <Button variant='contained' color='secondary' onClick={handleSubmitMain}>
                                Lưu
                            </Button>
                        </Stack>
                    </Grid>
                )}
            </LayoutAdmin>
        </AdminStyle>
    )
}
export default dynamic(() => Promise.resolve(withStyles(styles)(Main)), { ssr: false })
