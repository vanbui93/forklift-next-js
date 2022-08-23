import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaginationButtons from '../../admin_components/Pagination'
import BlogItem from '../../components/BlogItem'
import LayoutUser from '../../layouts/LayoutUser'
import { getBlog } from '../../store/actions/blogs'

export default function PagesContent() {
    const blogData = useSelector(state => state.blog.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlog())
    }, [])

    const arrayBlog = []
    blogData &&
        Object.values(blogData)?.map((item, idx) => {
            arrayBlog.push({
                id: item.id,
                slug: item.slug,
                title: item.title,
                image: item.image,
                content: item.content,
                isDisplay: item.isDisplay,
                create_date: item.create_date,
                update_date: item.update_date,
            })
        })

    //Sắp xếp theo mới nhất
    const allList = [...arrayBlog].sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date) || new Date(b.update_date) - new Date(a.update_date)
    )

    //Phân trang
    const totalLists = allList.length
    const pageLimit = 16
    const [currentList, setCurrentList] = useState([])
    const onPageChanged = value => {
        let offset = (value - 1) * pageLimit
        const currentList = allList.slice(offset, offset + pageLimit)
        setCurrentList(currentList)
    }
    useEffect(() => {
        setCurrentList([...allList].slice(0, pageLimit))
    }, [blogData])
    return (
        <div>
            <Head>
                <title>{blogData?.name}</title>
                <meta name='description' content={`Tanat Service ForkLift - ${blogData?.name}`} />
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
                                <BlogItem arrayBlog={currentList} />
                            </ul>
                            <div className='blogs__pagination'>
                                <PaginationButtons
                                    count={Math.ceil(totalLists / pageLimit)}
                                    handleChangePage={value => {
                                        onPageChanged(value)
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
