
import * as Actions from '../actions';

const initialState = {
	
    filteredTeacherID : null,
	filteredView : 1,
	calssData : null
	
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
        default: {
			return state;
		}
    }
};

export default calenderReducer;