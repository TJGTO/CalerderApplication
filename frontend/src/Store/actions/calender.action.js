import axios from 'axios';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const FILTER_TEACHER = 'FILTER_TEACHER';
export const FILTER_BATCH = 'FILTER_BATCH';
export const FILTER_VIEW = 'FILTER_VIEW';
export const GET_CLASS_DATA = 'GET_CLASS_DATA';

export function OpenDialog(data) {
    console.log("Under Open Dialog");
	return {
		type: OPEN_DIALOG,
        payload : data
	};
}
export function CloseDialog(){
    console.log("Under CLOSE Dialog");
	return {
		type: CLOSE_DIALOG,
	};
}
export function filterbyTeacher(Id){
    
	return {
		type: FILTER_TEACHER,
		payload : Id
	};
}
export function filterbyBatch(Id){
    
	return {
		type: FILTER_BATCH,
		payload : Id
	};
}
export function filterbyView(Id){
    let convertedid = parseInt(Id);
	return {
		type: FILTER_VIEW,
		payload : convertedid
	};
}
export function getSchedulers(data) {
	
	return {
		type: GET_CLASS_DATA,
		payload: data,
	}; 

}
