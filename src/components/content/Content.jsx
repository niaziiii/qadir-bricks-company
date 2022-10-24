import React, { useMemo, useState, useEffect } from 'react'
import { AppContexts } from '../../contexts/appContext'
import { getItems } from '../helper/helper'
import './content.scss'
import { Home, Buyer, Deliverd } from './section'


const Content = ({ section }) => {
  // eslint-disable-next-line
  const promise = useMemo(() => getItems('https://qadir-bricks-company.herokuapp.com/api/v1'))
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() { setData(await promise) }
    fetchData()
    // eslint-disable-next-line
  }, [])


  if(!data) return


  return (
    <AppContexts.Provider value={{data, setData}}>
      <div className='section-container'>
        {section === 1 && <Home />}
        {section === 2 && <Buyer />}
        {section === 3 && <Deliverd />}
      </div>
    </AppContexts.Provider>
  )
}

export default Content
