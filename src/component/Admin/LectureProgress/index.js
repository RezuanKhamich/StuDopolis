import React, {useMemo} from "react";
import styled from "styled-components";
import MainPageTitle from "../../../containers/MainPageTitle";
import {Button, Divider, Typography} from "@mui/material";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Loader";
import CustomBadge from "../../CustomBadge";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {setAdminCourse, setAdminFreelance} from "../../../utils/reducers/repoReducer";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import {materialCollection} from "../../../data/courseData";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import FrontEnd_Data from '../../../externalData/FrontEnd/courseInfo.json'
import DigitalArt_Data from '../../../externalData/DigitalArt/courseInfo.json'
import KerbalSpace_Data from '../../../externalData/KerbalSpace/courseInfo.json'
import Minecraft_Data from '../../../externalData/Minecraft/courseInfo.json'
import Modelling_Data from '../../../externalData/Modelling/courseInfo.json'
import Python_Data from '../../../externalData/Python/courseInfo.json'
import Unity_Data from '../../../externalData/Unity/courseInfo.json'
import UnrealEngine_Data from '../../../externalData/UnrealEngine/courseInfo.json'
import WebDesign_Data from '../../../externalData/WebDesign/courseInfo.json'
import LectureRow from "./LectureRow";

const ContentWrapper = styled('div')`
  max-width: 1196px;
  margin: auto;
`;

const UserDataWrapper = styled('div')`
  padding: 10px;
  position: relative;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  background-color: white;
  margin-bottom: 40px;
  border-radius: 4px;
  
  @media (max-width: 430px) {
    margin: auto;
  }
`;

const EmailWrapper = styled('span')`
  color: #2884f6;
  cursor: text;
  font-size: 16px;
`;

const DisabledModuleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 0 16px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  min-height: 48px;
  margin: 10px 0;
`;

const LectureProgress = () => {
  const dispatch = useDispatch();
  const { innerWidth: width, innerHeight: height } = window;

  const [userId, setUserId] = useSearchParams();
  const usersList = useSelector(state => state.repos.usersList);
  const adminCourse = useSelector(state => state.repos.adminCourse);
  const adminFreelance = useSelector(state => state.repos.adminFreelance);
  let courseMaterialAvailable = useMemo(() => (adminCourse[`course_${userId.get('courseId')}`]), [adminCourse])

  const coursesData = [
    FrontEnd_Data,
    DigitalArt_Data,
    KerbalSpace_Data,
    Minecraft_Data,
    Modelling_Data,
    Python_Data,
    Unity_Data,
    UnrealEngine_Data,
    WebDesign_Data,
  ];  // Изменять значение в зависимости от количества курсов

  const openCourseMaterial = async (userId, courseId, moduleId) => {
      const courseDocRef = doc(db, "courses", userId);
      const freelanceDocRef = doc(db, "freelance", userId);

      await updateDoc(courseDocRef, {
        [`course_${courseId}.info.courseAvailable`]: true,
        [`course_${courseId}.modules.${moduleId}.info.moduleAvailable`]: true,
      });

      await updateDoc(freelanceDocRef, {
        [`course_${courseId}.info.courseAvailable`]: true,
        [`course_${courseId}.modules.${moduleId}.info.moduleAvailable`]: true,
      });

      const courseDataNew = await getDoc(courseDocRef);
      const freelanceDataNew = await getDoc(freelanceDocRef);
      if (courseDataNew.exists() && freelanceDataNew.exists()) {
        dispatch(setAdminCourse(courseDataNew.data()))
        dispatch(setAdminFreelance(freelanceDataNew.data()))
      } else {
        console.log("No such document!");
      }
  }

  return(
    <>
      <MainPageTitle>Личный кабинет студента</MainPageTitle>
      {
        usersList ? (
          <ContentWrapper>
            <UserDataWrapper>
              <Typography variant="h5">
                Студент: {usersList[userId.get('userId')].firstName} {usersList[userId.get('userId')].lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: <EmailWrapper>{usersList[userId.get('userId')].email}</EmailWrapper>
              </Typography>
            </UserDataWrapper>

            <Typography variant="h5" textAlign="center" marginBottom="20px">
              Модули
            </Typography>
            {
              adminCourse && adminFreelance ?
                materialCollection()[userId.get('courseId')].map((elem, staticIndex) => (
                  <>
                    {
                      !courseMaterialAvailable.modules[staticIndex].info.moduleAvailable ?
                        <DisabledModuleWrapper>
                          <div style={{display: 'flex'}}>
                            <CustomBadge sx={{marginRight: '8px'}} message={'Закрыто'} colorType={0} small/>
                            <Typography gutterBottom variant="h6" display="inline" fontSize={width > 500 ? '18px' : '14px'}
                                        margin="0">{staticIndex + 1}. {coursesData[userId.get('courseId')].modulesName[staticIndex]}</Typography>
                          </div>
                          <Button
                            variant="contained"
                            color='warning'
                            size="small"
                            onClick={() => openCourseMaterial(userId.get('uid'), userId.get('courseId'), staticIndex)}
                          >
                            Открыть
                          </Button>
                        </DisabledModuleWrapper>
                        :
                        <Accordion sx={{ margin: '10px 0' }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >

                            <CustomBadge sx={{marginRight: '8px'}} message={'Открыт'} colorType={1} small/>
                            <Typography gutterBottom variant="h6" fontSize={width > 500 ? '18px' : '14px'}
                                        margin="0">{staticIndex + 1}. {coursesData[userId.get('courseId')].modulesName[staticIndex]}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Divider sx={{marginBottom: '20px'}}/>
                            <Table sx={width > 500 ? {maxWidth: '100%', minWidth: 650, margin: '0'} : {maxWidth: '100%', margin: '0'}} size="small" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Лекция</TableCell>
                                  <TableCell align="right">Открыть</TableCell>
                                  <TableCell align="right">ДЗ done</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {elem.map((row, index) => (
                                  <LectureRow
                                    key={index}
                                    userId={userId.get('uid')}
                                    row={row}
                                    index={index}
                                    module={elem}
                                    courseId={userId.get('courseId')}
                                    moduleId={staticIndex}
                                    lectureId={index}
                                    adminCourse={adminCourse}
                                    setAdminCourse={setAdminCourse}
                                  />
                                ))}
                              </TableBody>
                            </Table>
                          </AccordionDetails>
                        </Accordion>
                    }
                  </>
                ))
                : <Loader />
            }
          </ContentWrapper>
        ) : <Loader />
      }
    </>
  )
}

export default LectureProgress;