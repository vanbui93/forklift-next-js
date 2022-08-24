import React from 'react'

export default function Service() {
    return (
        <div className='container'>
            <div className='service'>
                <h2 className='page-title'>Service</h2>
                <ul className='service__list'>
                    <li className='service__item'>
                        <div className='service__img'>
                            <img src='../../assets/img/service_img_01.png' alt='' />
                        </div>
                        <h3 className='service__sub-title'>บริการซ่อม-อะไหล่!</h3>
                        <p className='service__text'>
                            มีทีมช่างผู้ชำนาญงานมากประสบการณ์คอยให้บริการซ่อม และ บริการอะไหล่หลังการขาย
                        </p>
                    </li>
                    <li className='service__item'>
                        <div className='service__img'>
                            <img src='../../assets/img/service_img_02.png' alt='' />
                        </div>
                        <h3 className='service__sub-title'>เช่าระยะยาว!</h3>
                        <p className='service__text'>
                            บริการให้เช่ารถโฟล์คลิฟท์ ฟอร์คลิฟท์ หรือ รถยกมือสอง มีทั้งรายวัน รายเดือน และรายปี...
                        </p>
                    </li>
                    <li className='service__item'>
                        <div className='service__img'>
                            <img src='../../assets/img/service_img_03.png' alt='' />
                        </div>
                        <h3 className='service__sub-title'>Tanat Service ForkLift.</h3>
                        <p className='service__text'>
                            ธนัท เซอร์วิส มีบริการ ขาย เช่า ซ่อม และ อะไหล่ รถโฟล์คลิฟท์ ฟอร์คลิฟท์ หรือ รถยกมือสอง
                            <br />
                            (Used Forklift).
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
