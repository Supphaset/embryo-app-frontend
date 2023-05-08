import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { patientCreateReducer, 
    patientDeleteReducer, 
    patientDetailsReducer, 
    patientListReducer, 
    patientUpdateReducer
} from './reducers/patientReducers'
import { embryoCreateReducer, embryoDeleteReducer, embryoDetailsReducer, embryoListReducer, embryoUpdateStatusReducer, embryoUpdateSuccessReducer, embryoUpdateTransferedImageReducer } from './reducers/embryoReducers'

const reducer = combineReducers({
    patientList: patientListReducer,
    patientDetail: patientDetailsReducer,
    patientDelete: patientDeleteReducer,
    patientCreate: patientCreateReducer,
    patientUpdate: patientUpdateReducer,
    embryoList: embryoListReducer,
    embryoDetail: embryoDetailsReducer,
    embryoDelete: embryoDeleteReducer,
    embryoCreate: embryoCreateReducer,
    embryoStatus: embryoUpdateStatusReducer,
    embryoSuccess: embryoUpdateSuccessReducer,
    embryoTransferedImg: embryoUpdateTransferedImageReducer
})
const initialState = {}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
export default store