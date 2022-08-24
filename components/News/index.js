import Link from 'next/link'
import React from 'react'

export default function News(props) {
    const { newsData } = props

    const arrayBlog = []
    newsData &&
        Object.values(newsData)?.map((item, idx) => {
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
    const data = [...arrayBlog]?.slice(0, 6).sort((a, b) => new Date(b.create_date) - new Date(a.create_date))

    return (
        <div className='container'>
            <div className='news'>
                <h2 className='page-title'>News</h2>
                <ul className='news__list'>
                    {data?.map((item, idx) => (
                        <li className='news__item' key={idx}>
                            <Link href={`/blogs/${item.slug}`}>
                                <a className='news__item-wrap'>
                                    <div className='news__img' style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='news__text'>{item?.title}</div>
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
