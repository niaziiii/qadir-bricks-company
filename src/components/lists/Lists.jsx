import React from 'react'
import './Lists.scss'

const Lists = ({openSection,count}) => {
    return (
        <div className='lists'>
            <div className="lists__heading">
                <h1>Menu</h1>
            </div>
            <div className="lists__links">
                <ul>
                    <li><a href='#!' style={{background:count===1? '#7D6E83':''}} onClick={()=>openSection(1)}>Home </a></li>
                    <li><a href='#!' style={{background:count===2? '#7D6E83':''}} onClick={()=>openSection(2)}>advance Booked </a></li>
                    <li><a href='#!' style={{background:count===3? '#7D6E83':''}} onClick={()=>openSection(3)}>ended contracts </a></li>
                    <li className='logout'><a href='#!'  >Logout </a></li>
                </ul>

            </div>
        </div>
    )
}

export default Lists
