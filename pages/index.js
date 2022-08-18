import Head from 'next/head'
import HomePage from './../components/HomePage'

function Home() {
    return (
        <div>
            <Head>
                <title>Tuấn táo Apple</title>
                <meta name='description' content='Tuấn táo apple - Điện thoại iphone chính hãng' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <HomePage />
        </div>
    )
}

export default Home
