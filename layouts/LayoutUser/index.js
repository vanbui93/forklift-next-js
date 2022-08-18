import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { getMain } from '../../store/actions/main'

function LayoutUser({ children }) {
  const dispatch = useDispatch()
  const mainData = useSelector(state => state.main.data)
  useEffect(() => {
    dispatch(getMain())
  }, [])
  return (
    <div className='layout_user'>
      <Header headerData={mainData} />
      {children}
      <div className='tel'>
        <a href={`tel:${mainData.phone}`} className='tel-call'>
          <FontAwesomeIcon icon={faPhone} style={{ fontSize: 25, color: '#fff' }} />
        </a>
      </div>
      <Footer footerData={mainData} />
    </div>
  )
}
export default LayoutUser
