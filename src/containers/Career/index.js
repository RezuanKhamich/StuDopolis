import React from "react";
import MainPageTitle from "../../components/MainPageTitle";
import styled from "styled-components";
import './style.css'
import GameIcon from "../../components/GameIcon/GameIcon";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../../firebase";

const ExperienceCount = styled('p')`
  margin: 20px;
  font-size: 30px;
  text-align: center;
`

const Career = () => {
  const experience = 24000


  // async function handleClick1(){
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }


  return(
    <>
      <MainPageTitle>Карьера</MainPageTitle>
      <ExperienceCount>
        Мой опыт: {experience} <GameIcon icon="0" />
      </ExperienceCount>
      <table>
        <tr><th>Ранг</th><th>Условие получения</th><th>Награда</th><th>Доход в неделю</th></tr>
        <tr>
          <td>1. Стажер</td>
          <td>-</td>
          <td>-</td>
          <td>+2.000<GameIcon icon="2" /></td>
        </tr>
        <tr>
          <td>2. Младший разработчик (Junior)</td>
          <td>55.000<GameIcon icon="0" /></td>
          <td>+250<GameIcon icon="1" /><br/>+10.000<GameIcon icon="2" /></td>
          <td>+5.000<GameIcon icon="2" /></td>
        </tr>
        <tr className="disable">
          <td>3. Разработчик (Middle)</td>
          <td>100.000<GameIcon icon="0" /></td>
          <td>+400<GameIcon icon="1" /><br/>+10.000<GameIcon icon="2" /></td>
          <td>+20.000<GameIcon icon="2" /></td>
        </tr>
        <tr className="disable">
          <td>4. Опытный разработчик (Senior)</td>
          <td>170.000<GameIcon icon="0" /></td>
          <td>+650<GameIcon icon="1" /><br/>+10.000<GameIcon icon="2" /></td>
          <td>+35.000<GameIcon icon="2" /></td>
        </tr>
        <tr className="disable">
          <td>5. Ведущий разработчик (TeamLead)</td>
          <td>260.000<GameIcon icon="0" /></td>
          <td>+950<GameIcon icon="1" /><br/>+10.000<GameIcon icon="2" /></td>
          <td>+45.000<GameIcon icon="2" /></td>
        </tr>
      </table>

    </>
  )
}

export default Career