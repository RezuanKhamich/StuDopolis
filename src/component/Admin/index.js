import React, {useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MainPageTitle from "../../containers/MainPageTitle";
import {Button} from "@mui/material";
import {modulesData} from "../../externalData";
import {courseMaterials} from "../../data/courseData/FrontEnd";

const Admin = () => {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }

  const setSubExpendedHandler = (panel) => (event, isExpanded) => { setSubExpanded(isExpanded ? panel : false); }

  const ModuleParameters = ({details, index}) => {
    const courseMaterialArray = courseMaterials();

    return(
      <>
        <Typography sx={{ maxWidth: '300px'}}>
          Модуль {index+1}. {details.name}.
        </Typography>
        <table style={{border:'1px solid #212529', margin: '0 0 40px 0', width: '100%', maxWidth:'100%'}}>
          <tr style={{border:'1px solid #212529'}}>
            <th style={{width: '200px', border: '1px solid #212529'}}>Номер</th>
            {
              courseMaterialArray[index].map((el, index) => (
                <td>{index+1}</td>
              ))
            }
          </tr>
          <tr style={{border:'1px solid #212529'}}>
            <th style={{width: '200px', border: '1px solid #212529'}}>Прогресс занятий</th>
            {
              courseMaterialArray[index].map(() => (
                <td><input type="checkbox"/></td>
              ))
            }
          </tr>
          <tr style={{border:'1px solid #212529'}}  >
            <th style={{width: '200px', border: '1px solid #212529'}}>Прогресс по дз</th>
            {
              courseMaterialArray[index].map(() => (
                <td><input type="checkbox"/></td>
              ))
            }
          </tr>
        </table>
      </>
    )
  }

  return(
      <div>
        <MainPageTitle>Ученики</MainPageTitle>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Артур Иванов</Typography>
          <Typography sx={{ color: 'text.secondary' }}>Miego23</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Изучаемые курсы
          </Typography>
          <Accordion expanded={subExpanded === 'panel2'} onChange={setSubExpendedHandler('panel2')}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                1. FrontEnd - разработка
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
                modulesData.map((el, index) => (
                  <ModuleParameters details={el} index={index} key={index}/>
                ))
              }
            </AccordionDetails>
          </Accordion>
          <Button
            style={{ display: 'block', marginLeft: 'auto', marginTop: '20px',}}
            variant="contained"
            color='success'
            disabled=""
            onClick=""
          >
            Сохранить
          </Button>
        </AccordionDetails>
        </Accordion>
      </div>
  )
}

export default Admin