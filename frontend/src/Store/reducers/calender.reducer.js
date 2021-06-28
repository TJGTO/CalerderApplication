
import * as Actions from '../actions';

const initialState = {
	
    filteredTeacherID : null,
	filteredBatchID : null,
	filteredView : 1,
	calssData : null,
	dayNO : 1
};

const calenderReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.OPEN_DIALOG: {
			return {
				...state,
				opendialog : true,
                ProjectDetail : action.payload
			};
		}
        case Actions.CLOSE_DIALOG: {
			return {
				...state,
				opendialog : false
			};
		}
		case Actions.FILTER_TEACHER: {
			return {
				...state,
				filteredTeacherID : action.payload
			};
		}
		case Actions.FILTER_BATCH: {
			return {
				...state,
				filteredBatchID : action.payload
			};
		}
		case Actions.FILTER_VIEW : {
			return {
				...state,
                filteredView : action.payload
			}
		}
		case Actions.GET_CLASS_DATA :{
			return {
				...state,
				calssData : action.payload
			}
		}
		case Actions.SET_DAY_NO : {
			return{
				...state,
				dayNO :action.payload
			}
		}
        default: {
			return state;
		}
    }
};

export default calenderReducer;