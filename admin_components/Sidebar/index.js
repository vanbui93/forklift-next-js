import { ListItem } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import { withStyles } from '@material-ui/styles'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PropTypes } from 'prop-types'
import { ADMIN_ROUTES } from '../../Route'
import styles from './styles'

function Sidebar(props) {
    const router = useRouter()

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
