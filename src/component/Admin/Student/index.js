import React, {useEffect, useState} from "react";
import styled from "styled-components";
import MainPageTitle from "../../../containers/MainPageTitle";
import {Card, CardContent, Grid, TextField, Typography} from "@mui/material";
import {Link, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {coursesData} from "../../../externalData";
import Loader from "../../Loader";
import CustomBadge from "../../CustomBadge";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {setAdminCourse, setAdminFreelance, setCourseData, setFreelanceData} from "../../../utils/reducers/repoReducer";

const ContentWrapper = styled('div')`
  max-width: 1196px;
  margin: auto;
`;

const InteractiveCard = styled(Card)`
  opacity: ${props => props.disabled ? '0.5' : '1'};
  padding: 5px;
  height: 60px;
  position: relative;
  
  &:hover{
    transition: 0.5s;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);
    cursor: pointer;
  }

  @media (max-width: 430px) {
    margin: auto;
  }
`;

const UserDataWrapper = styled('div')`
  padding: 10px;
  position: relative;
  box-shadow: 0px 2px 8px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
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
`


const Student = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.repos.usersList);
  const { innerWidth: width, innerHeight: height } = window;
  const [userId, setUserId] = useSearchParams();
  const adminCourse = useSelector(state => state.repos.adminCourse);
  const adminFreelance = useSelector(state => state.repos.adminFreelance);

  useEffect(async () => {
    const courseSnap = await getDoc(doc(db, "courses", userId.get('uid')))
    if (courseSnap.exists()) {
      dispatch(setAdminCourse(courseSnap.data()));
    } else {
      console.log("Не найдено courseSnap!");
    }

    const freelanceDataSnap = await getDoc(doc(db, "freelance", userId.get('uid')))
    if (freelanceDataSnap.exists()) {
      dispatch(setAdminFreelance(freelanceDataSnap.data()));
    } else {
      console.log("Не найдено freelanceDataSnap!");
    }
  }, [usersList])

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
              Курсы
            </Typography>

            {
              adminCourse && adminFreelance ?
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {
                    coursesData.map((elem, index) => (
                      <Grid item xs={ width > 500 ? 6 : 12 } key={index}>
                        <Link to={`progress?userId=${userId.get('userId')}&uid=${userId.get('uid')}&courseId=${index}&`}>
                        <InteractiveCard sx={{ display: 'flex' }}>
                          <CardContent sx={{ padding: '16px 16px 16px 0', display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                            <Typography variant="body2" fontSize="16px" height="52px" display="contents">
                              <img style={{ width: '60px', borderRadius: '3px', marginRight: '8px' }} src={elem.iconURL} alt=""/>{elem.name}
                            </Typography>
                            {
                              adminCourse[`course_${index}`].info.courseAvailable ?
                                <CustomBadge sx={{position: 'absolute', right: '8px', top: '18px'}} message="Открыт" colorType={1} small/>
                                : null
                            }
                          </CardContent>
                        </InteractiveCard>
                        </Link>
                      </Grid>
                    ))
                  }
                </Grid>
                : <Loader />
            }
          </ContentWrapper>
        ) : <Loader />
      }
    </>
  )
}

export default Student;