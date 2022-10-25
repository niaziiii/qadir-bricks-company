import React, { useMemo, useState, useEffect } from 'react'
import { AppContexts } from '../../contexts/appContext'
import { getItems } from '../helper/helper'
import LoadingAnimation from '../loadingAnimation/LoadingAnimation'
import './content.scss'
import { Home, Buyer, Deliverd } from './section'

const Content = ({ section }) => {
  // eslint-disable-next-line
  const promise = useMemo(() => getItems('https://qadir-bricks-company.herokuapp.com/api/v1/'))
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        await promise
        // console.log(promise);
        setData(await promise)
      } catch (error) {
        console.log(error);
      }

    }
    fetchData()
    // eslint-disable-next-line
  }, [])


  if (!data) return(<LoadingAnimation/>)


  return (
    <AppContexts.Provider value={{ data, setData }}>
      <div className='section-container'>
        {section === 1 && <Home />}
        {section === 2 && <Buyer />}
        {section === 3 && <Deliverd />}
      </div>
    </AppContexts.Provider>
  )
}

export default Content
