import React from 'react'
import './content.scss'
import { Home } from './section'

const Content = ({ section }) => {

  return (
    <div className='section-container'>
      {section === 1 && <Home refId={'Home'} />}
      {section === 2 && <Home refId={'Advance'} />}
      {section === 3 && <Home refId={'Closed'} />}
    </div>
  )
}

export default Content
