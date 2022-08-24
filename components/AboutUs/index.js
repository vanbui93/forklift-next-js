import Link from 'next/link'
import React from 'react'

export default function AboutUs() {
    return (
        <div className='container'>
            <div className='aboutus'>
                <h2 className='page-title'>About Us</h2>
                <div className='aboutus__inner'>
                    <div className='aboutus__img'>
                        <img src='../../assets/img/@temp/aboutus.jpg' alt='' />
                    </div>
                    <div className='aboutus__text'>
                        <div className='aboutus__text-inner'>
                            <p>
                                Quality Without Compromise
                                <br />
                                Welcome to RS MACHINERY &amp; ENGINEERING PTE. LTD (RSME) forklift dealership, the
                                exclusive distributor for Fujian SouthChina Heavy Machinery Manufacturer Co.,Ltd(SOCMA)
                                products in Singapore, Malaysia, Myanmar and Cambodia. Your solution for affordable and
                                reliable heavy machinery and equipment.
                            </p>
                            <div className='btn_more'>
                                <Link href='/'>
                                    <a>— ดูเพิ่มเติม</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
