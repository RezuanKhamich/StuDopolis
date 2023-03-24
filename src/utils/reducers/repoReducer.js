const SET_COURSE_DATA = "SET_COURSE_DATA"
const SET_USER_DATA = "SET_USER_DATA"
const SET_FREELANCE_DATA = "SET_FREELANCE_DATA"
const SET_SHOP_DATA = "SET_SHOP_DATA"
const SET_USERS_LIST = "SET_USERS_LIST"
const SET_ADMIN_COURSE = "SET_ADMIN_COURSE"
const SET_ADMIN_FREELANCE = "SET_ADMIN_FREELANCE"
const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA"

const defaultState = {
  items: [],
  isFetching: true,
  courseData: {},
  userData: {},
  freelanceData: {},
  shopData: {}
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
    case SET_FREELANCE_DATA:
      return {
        ...state,
        freelanceData: action.payload
      }
    case SET_USERS_LIST:
      return {
        ...state,
        usersList: action.payload
      }
    case SET_ADMIN_COURSE:
      return {
        ...state,
        adminCourse: action.payload
      }
    case SET_SHOP_DATA:
      return {
        ...state,
        shopData: action.payload
      }
    case SET_ADMIN_FREELANCE:
      return {
        ...state,
        adminFreelance: action.payload
      }
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        userAuthData: action.payload
      }
    default:
      return state
  }
}

export const setCourseData = (data) => ({type: SET_COURSE_DATA, payload: data})
export const setUserData = (data) => ({type: SET_USER_DATA, payload: data})
export const setFreelanceData = (data) => ({type: SET_FREELANCE_DATA, payload: data})
export const setShopData = (data) => ({type: SET_SHOP_DATA, payload: data})
export const setUsersList = (data) => ({type: SET_USERS_LIST, payload: data})
export const setUsersAuthData = (data) => ({type: SET_USER_AUTH_DATA, payload: data})

export const setAdminCourse = (data) => ({type: SET_ADMIN_COURSE, payload: data})
export const setAdminFreelance = (data) => ({type: SET_ADMIN_FREELANCE, payload: data})
