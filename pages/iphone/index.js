import { onValue, ref } from 'firebase/database'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import LayoutUser from '../../layouts/LayoutUser'
import { db } from '../../utils/firebase'
import ProductItem from './../../components/ProductItem'

export default function Iphone() {
    const [products, setProducts] = useState({})
    //Lấy tất cả sản phẩm từ bảng `products`
    useEffect(() => {
        const productRef = ref(db, `products`)
        onValue(productRef, snapshot => {
            if (snapshot.val() !== null) {
                setProducts({ ...snapshot.val() })
            } else {
                setProducts({})
            }
        })
        return () => {
            setProducts({})
        }
    }, [])

    const getDulieu = category => {
        return Object.keys(products)?.map((val, key) => {
            if (category === products[val].category) {
                return (
                    products[val]?.isDisplay === '1' && (
                        <ProductItem
                            key={key}
                            id={val}
                            images={products[val].images}
                            name={products[val].name}
                            price={products[val].price}
                            comparePrice={products[val].compare_price}
                            newPercent={products[val].newBox}
                            promotions={products[val].promotions}
                        />
                    )
                )
            }
        })
    }

    return (
        <div>
            <Head>
                <title>iPhone</title>
                <meta name='description' content='Tuấn táo apple - iPhone' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='collections'>
                    <div className='container'>
                        <h2 className='collection__title'>iPhone</h2>
                        <ul className='collections__list'>{getDulieu(1)}</ul>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
