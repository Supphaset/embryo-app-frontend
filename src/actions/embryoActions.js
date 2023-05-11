import axios from 'axios'
import { 
    EMBRYO_LIST_FAIL,
    EMBRYO_LIST_REQUEST,
    EMBRYO_LIST_SUCCESS,
    EMBRYO_DETAIL_REQUEST,
    EMBRYO_DETAIL_FAIL,
    EMBRYO_DETAIL_SUCCESS,
    EMBRYO_DELETE_REQUEST,
    EMBRYO_DELETE_FAIL,
    EMBRYO_DELETE_SUCCESS,
    EMBRYO_CREATE_FAIL,
    EMBRYO_CREATE_REQUEST,
    EMBRYO_CREATE_SUCCESS,
    EMBRYO_UPDATE_STATUS_REQUEST,
    EMBRYO_UPDATE_STATUS_FAIL,
    EMBRYO_UPDATE_STATUS_SUCCESS,
    EMBRYO_UPDATE_SUCCESS_REQUEST,
    EMBRYO_UPDATE_SUCCESS_FAIL,
    EMBRYO_UPDATE_SUCCESS_SUCCESS,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_REQUEST,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_FAIL,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_SUCCESS
 } from '../constants/embryoConstants'

 const api = 'https://c4ggmswf9c.execute-api.ap-southeast-2.amazonaws.com'

 export const listEmbryos = (patientHN) => async (dispatch) =>{
    try {
        dispatch({ type: EMBRYO_LIST_REQUEST})
        const { data } = await axios.get(`${api}/embryos/${patientHN}`)
        dispatch({
            type: EMBRYO_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: EMBRYO_LIST_FAIL,
            payload: error.respose && error.response.data.message 
            ? error.response.data.message
            : error.message,
        })
    }
 }

 export const listEmbryosDetails = (patientHN,embryoNo) => async(dispatch) =>{
    try {
        dispatch({type:EMBRYO_DETAIL_REQUEST})
        const {data} = await axios.get(`${api}/embryos/${patientHN}/${embryoNo}`)
        dispatch({
            type: EMBRYO_DETAIL_SUCCESS,
            payload: data
        })
    }catch (error){
        dispatch({
        type: EMBRYO_DETAIL_FAIL,
        payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
 }

 export const deleteEmbryo = (patientHN,embryoNo) => async (dispatch) => {
  try {
    dispatch({
      type: EMBRYO_DELETE_REQUEST,
    })

    await axios.delete(`${api}/embryos/${patientHN}/${embryoNo}`)

    dispatch({
      type: EMBRYO_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: EMBRYO_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createEmbryo = (embryo) => async (dispatch) => {
  try {
    const predictInput = {'img_path':embryo.embryoImg, 'age':embryo.patientAge}
    dispatch({
      type: EMBRYO_CREATE_REQUEST,
    })
    const prediction = await axios.post(
      `${api}/embryos`,
      predictInput
    )
    const { data } = await axios.put(
      `${api}/embryos/${embryo.patientId}`,
     { ...embryo,
      viability:prediction.data['score'].toFixed(2),
      pStage:prediction.data['stage_output'],
      pIcm:prediction.data['icm_output'],
      pTe:prediction.data['te_output'],
      embryoGradImg:`${embryo.embryoImg}_grad.jpg`,
    }
    )
    dispatch({
      type: EMBRYO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: EMBRYO_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateEmbryoStatus = (patientHN,embryoNo,embryoStatus) => async (dispatch) => {
    try {
    dispatch({
      type: EMBRYO_UPDATE_STATUS_REQUEST,
    })
    
    const { data } = await axios.put(`${api}/embryos/${patientHN}/${embryoNo}/status`,{embryoStatus})

    dispatch({
      type: EMBRYO_UPDATE_STATUS_SUCCESS,
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: EMBRYO_UPDATE_STATUS_FAIL,
      payload: message,
    })
  }
}

export const updateEmbryoSuccess = (patientHN,embryoNo, embryoSuccess) => async (dispatch) => {
    try {
    dispatch({
      type: EMBRYO_UPDATE_SUCCESS_REQUEST,
    })
    
    const { data } = await axios.put(`${api}/embryos/${patientHN}/${embryoNo}/success`,{embryoSuccess})

    dispatch({
      type: EMBRYO_UPDATE_SUCCESS_SUCCESS,
    })
    dispatch({
        type: EMBRYO_DETAIL_SUCCESS,
        payload: data
    })

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: EMBRYO_UPDATE_SUCCESS_FAIL,
      payload: message,
    })
  }
}

export const updateEmbryoTransferedImage = (patientHN,embryoNo, embryoTransferedImg) => async (dispatch) => {
  try {
    dispatch({
      type: EMBRYO_UPDATE_TRANSFERED_IMAGE_REQUEST,
    })
    
    const { data } = await axios.put(`${api}/embryos/${patientHN}/${embryoNo}/transferedImg`,{embryoTransferedImg})

    dispatch({
      type: EMBRYO_UPDATE_TRANSFERED_IMAGE_FAIL,
    })

    dispatch({
        type: EMBRYO_DETAIL_SUCCESS,
        payload: data
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: EMBRYO_UPDATE_TRANSFERED_IMAGE_SUCCESS,
      payload: message,
    })
  }
}