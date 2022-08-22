import parse from 'html-react-parser'
import Link from 'next/link'
import React from 'react'

export default function BlogItem(props) {
    const { blogData } = props
    return (
        blogData &&
        Object.values(blogData)?.map((item, idx) => {
            const short_des = item.content.replace(/(<([^>]+)>)/gi, '')
            return (
                item && (
                    <li className='blogs__item' key={idx}>
                        <Link href={`blogs/${item.slug}`}>
                            <a className='blogs__link'>
                                <div className='blogs__img'>
                                    <img src={item?.image} alt='' />
                                </div>
                                <div className='blogs__text'>
                                    <h3 className='blogs__sub-title'>{item?.title}</h3>
                                    <div className='blogs__des'>
                                        <p>{short_des}</p>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </li>
                )
            )
        })
    )
}
