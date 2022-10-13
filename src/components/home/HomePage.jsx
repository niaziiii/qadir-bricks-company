import React from 'react'
import './HomePage.scss';



import { Lists, Content } from './../index'
const HomePage = () => {
  const [count, setCount] = React.useState(1)

  return (
    <div className='home'>
      <div className="home__container">
        <div className="home__left">
          <Lists openSection={setCount} count={count}/>
        </div>
        <div className="home__right">
          <Content section={count}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage
