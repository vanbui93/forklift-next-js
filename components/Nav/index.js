import { onValue, ref } from 'firebase/database'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { db } from './../../utils/firebase'

export default function Nav() {
  const [menu, setMenu] = useState({})

  useEffect(() => {
    const menuRef = ref(db, 'menus')
    onValue(menuRef, snapshot => {
      setMenu({ ...snapshot.val() })
    })
    return () => {
      setMenu({})
    }
  }, [])

  return (
    <ul className='nav justify-content-left menu'>
      {Object.values(menu).map((id, index) => {
        return (
          <li className='nav-item' key={index}>
            <Link href={id.link}>
              <a>{id.title}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
