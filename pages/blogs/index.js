import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogItem from '../../components/BlogItem'
import LayoutUser from '../../layouts/LayoutUser'
import { getBlog } from '../../store/actions/blogs'

export default function PagesContent() {
    const blogData = useSelector(state => state.blog.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlog())
    }, [])

    return (
        <div>
            <Head>
                <title>{blogData?.name}</title>
                <meta name='description' content={`Tuấn táo apple - ${blogData?.name}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='blogs'>
                    <h2 className='blogs__title'>News</h2>
                    <div className='blogs__content'>
                        <div className='container'>
                            <ul className='blogs__list'>
                                <BlogItem blogData={blogData} />
                            </ul>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
