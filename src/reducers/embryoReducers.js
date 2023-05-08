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
    EMBRYO_DELETE_RESET,
    EMBRYO_CREATE_RESET,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_REQUEST,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_SUCCESS,
    EMBRYO_UPDATE_TRANSFERED_IMAGE_FAIL
 } from '../constants/embryoConstants'

export const embryoListReducer = (state = { embryos: [] }, action) => {
    switch(action.type){
        case EMBRYO_LIST_REQUEST:
            return { loading: true, embryos: []}
        case EMBRYO_LIST_SUCCESS:
            const embryos = action.payload.sort((a,b) => b.viablity - a.viablity)
            const embryosList = embryos.filter((e)=> e.status === 'freeze')
            const embryosTransfered = embryos.filter((e)=> e.status === 'transfered')
            const embryosDiscared = embryos.filter((e)=> e.status === 'discarded')
            return { loading: false, embryos: embryosList, embryosTransfered: embryosTransfered, embryosDiscared: embryosDiscared}
        case EMBRYO_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const embryoDetailsReducer = ( state = {}, action ) => {
  switch (action.type) {
    case EMBRYO_DETAIL_REQUEST:
      return { ...state, loading: true }
    case EMBRYO_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }
    case EMBRYO_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const embryoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EMBRYO_DELETE_REQUEST:
      return { loading: true }
    case EMBRYO_DELETE_SUCCESS:
      return { loading: false, success: true }
    case EMBRYO_DELETE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case EMBRYO_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const embryoCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case EMBRYO_CREATE_REQUEST:
      return { loading: true }
    case EMBRYO_CREATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case EMBRYO_CREATE_FAIL:
      return { loading: false, error: action.payload , success: true }
    case EMBRYO_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const embryoUpdateStatusReducer = (state = { embryo: {} }, action) => {
  switch (action.type) {
    case EMBRYO_UPDATE_STATUS_REQUEST:
      return { loading: true }
    case EMBRYO_UPDATE_STATUS_SUCCESS:
      return { loading: false, success: true }
    case EMBRYO_UPDATE_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const embryoUpdateSuccessReducer = (state = { embryo: {} }, action) => {
  switch (action.type) {
    case EMBRYO_UPDATE_SUCCESS_REQUEST:
      return { loading: true }
    case EMBRYO_UPDATE_SUCCESS_SUCCESS:
      return { loading: false, success: true}
    case EMBRYO_UPDATE_SUCCESS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const embryoUpdateTransferedImageReducer = (state = { embryo: {} }, action) => {
  switch (action.type) {
    case EMBRYO_UPDATE_TRANSFERED_IMAGE_REQUEST:
      return { loading: true }
    case EMBRYO_UPDATE_TRANSFERED_IMAGE_SUCCESS:
      return { loading: false, success: true}
    case EMBRYO_UPDATE_TRANSFERED_IMAGE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}