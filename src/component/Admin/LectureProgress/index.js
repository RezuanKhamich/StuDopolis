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
    height: 305px;
  }
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
    height: 305px;
  }
`;

const EmailWrapper = styled('span')`
  color: #2884f6;
  cursor: text;
  font-size: 16px;
`


const LectureProgress = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useSearchParams();
  const usersList = useSelector(state => state.repos.usersList);
  const adminCourse = useSelector(state => state.repos.adminCourse);
  const adminFreelance = useSelector(state => state.repos.adminFreelance);

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
                      // <Grid item xs={ width > 500 ? 4 : 12 } key={index}>
                      <Grid item xs={ 6 } key={index}>
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

export default LectureProgress;