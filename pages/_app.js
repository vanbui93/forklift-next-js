import { Provider } from 'react-redux'
import { config } from '@fortawesome/fontawesome-svg-core'
import { store, wrapper } from '../store/configureStore'
import styles from '../assets/scss/styles.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import LayoutUser from '../layouts/LayoutUser'
import LayoutAdmin from '../layouts/LayoutAdmin'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@material-ui/core'
import { useEffect, useState } from 'react'
// import Font Awesome CSS
config.autoAddCss = false
import 'react-loading-skeleton/dist/skeleton.css'

function MyApp({ Component, pageProps }) {
    const theme = createTheme({
        palette: {
            primary: {
                light: 'transparent',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
            secondary: {
                light: '#ff7961',
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
        zIndex: {
            appBar: 1200,
            drawer: 1900,
        },
    })

    const layouts = {
        L1: LayoutUser,
        L2: LayoutAdmin,
    }
    const [showChild, setShowChild] = useState(false)

    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }
    if (typeof window === 'undefined') {
        return <></>
    }
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

export default wrapper.withRedux(MyApp)
