import React from 'react'
import './content.scss'
import { Home , Buyer , Deliverd} from './section'


const Content = ({section}) => {
    return (
        <div className='section-container'>
          {section ===1 && <Home/>}
          {section ===2 && <Buyer/>}
          {section ===3 && <Deliverd/>}

        </div>
    )
}

export default Content
