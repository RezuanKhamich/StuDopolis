const SET_COURSE_DATA = "SET_COURSE_DATA"
const SET_USER_DATA = "SET_USER_DATA"

const defaultState = {
  items: [],
  isFetching: true,
  courseData: {},
  userData: {}
}

export default function reposReducer(state = defaultState, action) {
  switch(action.type){
    case SET_COURSE_DATA:
      return {
        ... state,
        courseData: action.payload
      }
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      }
    default:
      return state
  }
}

export const setCourseData = (data) => ({type: SET_COURSE_DATA, payload: data})
export const setUserData = (data) => ({type: SET_USER_DATA, payload: data})