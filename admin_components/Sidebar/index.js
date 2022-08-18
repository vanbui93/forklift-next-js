import { ListItem } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/styles'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropTypes } from 'prop-types'
import styles from './styles'

function Sidebar(props) {
    const router = useRouter()

    const ADMIN_ROUTES = [
        {
            path: '/dashboard/main',
            name: 'Trang quản trị',
        },
        {
            path: '/dashboard/order',
            name: 'Đơn hàng',
        },
        {
            path: '/dashboard/product',
            name: 'Sản phẩm',
        },
        {
            path: '/dashboard/page',
            name: 'Page',
        },
        {
            path: '/dashboard/menu',
            name: 'Menu',
        },
        {
            path: '/dashboard/home_slide',
            name: 'Hình slide trang chủ',
        },
        {
            path: '/dashboard/comment',
            name: 'Nhận xét khách hàng',
        },
        {
            path: '/dashboard/color',
            name: 'Màu Sản phẩm',
        },
        {
            path: '/dashboard/sku',
            name: 'Dung lượng',
        },
        {
            path: '/dashboard/video',
            name: 'Video',
        },
        {
            path: '/dashboard/waranty',
            name: 'Bảo hành',
        },
        {
            path: '/dashboard/promotion',
            name: 'Khuyến mãi',
        },
        {
            path: '/dashboard/user',
            name: 'Tài khoản',
        },
        {
            path: '/dashboard/media',
            name: 'Tệp tin - hình ảnh đã tải',
        },
    ]

    const renderList = () => {
        const { classes } = props
        let xhtml = null
        xhtml = (
            <div className={classes.list}>
                <List component='div'>
                    {ADMIN_ROUTES?.map((item, index) => {
                        return (
                            <Link key={index} href={item.path}>
                                <a
                                    className={
                                        router.pathname == `${item.path}`
                                            ? `${classes.menuLink} ${classes.menuLinkActive}`
                                            : ''
                                    }
                                >
                                    <ListItem key={index} className={classes.menuItem} button>
                                        {item.name}
                                    </ListItem>
                                </a>
                            </Link>
                        )
                    })}
                </List>
            </div>
        )
        return xhtml
    }

    const { classes, openSidebar } = props
    return (
        <Drawer
            open={openSidebar}
            onClose={() => this.toggleDrawer(false)}
            variant='persistent'
            anchor='left'
            classes={{
                paper: classes.wrapadmin,
            }}
        >
            {renderList()}
        </Drawer>
    )
}

Sidebar.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    opensidebar: PropTypes.bool,
    onToggleSidebar: PropTypes.func,
}
export default dynamic(() => Promise.resolve(withStyles(styles)(Sidebar)), { ssr: true })
