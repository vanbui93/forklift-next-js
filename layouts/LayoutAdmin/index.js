import { ServerStyleSheets } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderAdmin from '../../admin_components/HeaderAdmin'
import Sidebar from '../../admin_components/Sidebar'
import { getMain } from '../../store/actions/main'
import * as uiActions from './../../store/actions/ui'

function LayoutAdmin({ children }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)
  const opensidebar = useSelector(state => state.ui.opensidebar)

  useEffect(() => {
    dispatch(getMain())
  }, [])

  const handleDrawerOpen = value => {
    if (value === true) {
      dispatch(uiActions.showSidebar())
    } else {
      dispatch(uiActions.hideSidebar())
    }
  }

  if (!sessionStorage.getItem('user')) {
    router.push('/admin')
  }
  else {
    return (
      <div className='layout_admin'>
        <HeaderAdmin headerData={mainData} openSidebar={opensidebar} onToggleSidebar={handleDrawerOpen} />
        <div className='wrap-admin'>
          {children}
          <div className='sidebar-wrapper'>
            <Sidebar openSidebar={opensidebar} onToggleSidebar={handleDrawerOpen} />
          </div>
        </div>
      </div>
    )
  }
}

export default LayoutAdmin

LayoutAdmin.getInitialProps = async ctx => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  }
}
