import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { numberInputFormat } from './../../utils/numberInputFormat'

export default function SearchResult(props) {
    const { result } = props
    const { toggleModal } = props

    const wrapperRef = useRef(null)

    // below is the same as componentDidMount and componentDidUnmount
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false)
        return () => {
            document.removeEventListener('click', handleClickOutside, false)
        }
    }, [])

    const handleClickOutside = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            toggleModal()
        }
    }

    const getThumbnail = imgThumb => {
        const img = []
        Object.values(imgThumb)?.map(item => {
            if (item !== null) {
                img.push(item)
            }
        })
        return <img src={img[0]} alt='/' loading='lazy' className='search-result__img' />
    }

    return (
        <div
            className='search-result'
            onClick={() => {
                //Đóng kết quả search khi click chọn xem kết quả search
                toggleModal()
            }}
            ref={wrapperRef}
        >
            <ul className='search-result__list'>
                {result?.map((val, index) => {
                    const link = val[0] ? val[0] : ''
                    const info = val[1] ? val[1] : ''
                    return (
                        <li className='search-result__item' key={index}>
                            <Link href={`/product/${link}`}>
                                <a className='search-result__link'>
                                    {getThumbnail(info.images)}
                                    <div className='search-result__info'>
                                        <span className='search-result__name'>{info.name}</span>
                                        <span className='search-result__price'>
                                            {numberInputFormat(info.price.toString())}
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
