import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Checkbox} from "@mui/material";

const LectureRow = ({
  userId, row, index, module, adminCourse, setAdminCourse, courseId, moduleId, lectureId
}) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(adminCourse[`course_${courseId}`].modules[moduleId].lectures[lectureId].lectureAvailable)

  const openLecture = async (checked, courseId, moduleId, lectureId) => {
    const lectureDocRef = doc(db, "courses", userId);
    await updateDoc(lectureDocRef, {
      [`course_${courseId}.modules.${moduleId}.lectures.${lectureId}.lectureAvailable`]: checked,
    });

    const courseDataNew = await getDoc(lectureDocRef);
    if (courseDataNew.exists()) {
      dispatch(setAdminCourse(courseDataNew.data()))
      setChecked(prev => !prev)
    } else {
      console.log("No such document!");
    }
    console.log(adminCourse)
  }

  return (
    <TableRow key={row.name} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
      <TableCell component="th" scope="row"> {index + 1}. {row.sectionName} </TableCell>
      <TableCell align="right">
        <Checkbox
          checked={checked}
          onChange={() => openLecture(!checked, courseId, moduleId, lectureId)}
          color="success"/>
      </TableCell>
      {
        index !== module.length - 1 ?
          <TableCell align="right">
            <Checkbox checked={true} onChange={() => {}} color="success"/>
          </TableCell>
          : null
      }
    </TableRow>
  )
}

export default LectureRow;
