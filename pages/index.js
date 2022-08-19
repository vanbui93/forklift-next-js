import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMain } from '../store/actions/main'
import HomePage from './../components/HomePage'

function Home() {
    const dispatch = useDispatch()
    const mainData = useSelector(state => state.main.data)
    useEffect(() => {
        dispatch(getMain())
    }, [])
    return (
        <div>
            <Head>
                <title>{mainData?.page_title}</title>
                <meta name='description' content={`${mainData?.page_title}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <HomePage mainData={mainData} />
        </div>
    )
}

export default Home
