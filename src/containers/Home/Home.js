import React from "react";
import styles from './Home.css'
import {Button} from "@mui/material";

import homeImg from './Home_MainImg.png'

const Home = () => {

  return(
    <>
      <section className={styles.asd}>
        <div>
          <h1>StuDopolis</h1>
          <h3>Изучай мир, играя</h3>
          <p>Выбери свое направление</p>
          <div>
            <Button variant="outlined">JavaScript</Button>
            <Button variant="outlined">C#</Button>
            <Button variant="outlined">GameDev</Button>
            <Button variant="outlined">Unity</Button>
            <Button variant="outlined">React JS</Button>
          </div>
          <Button variant="contained">Начать</Button>
        </div>
        <div>
          <img src={homeImg} alt="" style={{width: 450, height: 450}} />
        </div>
      </section>
    </>
  )
}

export default Home;