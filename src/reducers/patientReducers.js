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
    PATIENT_CREATE_SUCCESS,
    PATIENT_CREATE_RESET,
    PATIENT_DELETE_RESET,
 }  from '../constants/patientConstants'


export const patientListReducer = (state = { patients: [] }, action) => {
    switch(action.type){
        case PATIENT_LIST_REQUEST:
            return { loading: true, patients: []}
        case PATIENT_LIST_SUCCESS:
            return { loading: false, patients: action.payload}
        case PATIENT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

export const patientDetailsReducer = (
  state = { patient: { } },
  action
) => {
  switch (action.type) {
    case PATIENT_DETAIL_REQUEST:
      return { ...state, loading: true }
    case PATIENT_DETAIL_SUCCESS:
      return { loading: false, patient: action.payload }
    case PATIENT_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_DELETE_REQUEST:
      return { loading: true }
    case PATIENT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PATIENT_DELETE_FAIL:
      return { loading: false, error: action.payload, success: true }
    case PATIENT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const patientCreateReducer = (state = { }, action) => {
  switch (action.type) {
    case PATIENT_CREATE_REQUEST:
      return { loading: true }
    case PATIENT_CREATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case PATIENT_CREATE_FAIL:
      return { loading: false, error: action.payload , success: true }
    case PATIENT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false, success: true, patient: action.payload }
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}