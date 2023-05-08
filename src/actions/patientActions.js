import axios from 'axios'
import { 
    PATIENT_LIST_FAIL,
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_DETAIL_REQUEST,
    PATIENT_DETAIL_FAIL,
    PATIENT_DETAIL_SUCCESS,
    PATIENT_DELETE_REQUEST,
    PATIENT_DELETE_FAIL,
    PATIENT_DELETE_SUCCESS,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_FAIL,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_CREATE_FAIL,
    PATIENT_CREATE_REQUEST,
    PATIENT_CREATE_SUCCESS
 } from '../constants/patientConstants'

 const api = 'https://c4ggmswf9c.execute-api.ap-southeast-2.amazonaws.com'

 export const listPatients = () => async (dispatch) =>{
    try {
        dispatch({ type: PATIENT_LIST_REQUEST})
        const { data } = await axios.get(`${api}/patients`)
        dispatch({
            type: PATIENT_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: PATIENT_LIST_FAIL,
            payload: error.respose && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
 }

 export const listPatientsDetails = (id) => async(dispatch) =>{
    try {
        dispatch({type:PATIENT_DETAIL_REQUEST})
        const {data} = await axios.get(`${api}/patients/${id}`)
        dispatch({
            type: PATIENT_DETAIL_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
        type: PATIENT_DETAIL_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
 }

 export const deletePatient = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_DELETE_REQUEST,
    })

    await axios.delete(`${api}/patients/${id}`)

    dispatch({
      type: PATIENT_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PATIENT_DELETE_FAIL,
      payload: message,
    })
  }
}

export const updatePatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    }
    const { data } = await axios.put(
      `${api}/patients/${patient.fmHN}`,
      patient,
      config
    )
    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({
        type: PATIENT_DETAIL_SUCCESS,
        payload: data
    })

    dispatch({ type: PATIENT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createPatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_CREATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    }
    const { data } = await axios.put(
      `${api}/patients`,
      patient,
      config
    )
    dispatch({
      type: PATIENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: PATIENT_CREATE_FAIL,
      payload: message,
    })
  }
}