import axios from 'axios'
import { 
    PATIENT_LIST_FAIL,
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS
 } from '../constants/patientConstants'

 export const listPatients = () => async (dispatch) =>{
    try {
        dispatch({ type: PATIENT_LIST_REQUEST})
        const { data } = await axios.get('/api/patients')
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