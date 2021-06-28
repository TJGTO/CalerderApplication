import axios from 'axios';

export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const FILTER_TEACHER = 'FILTER_TEACHER';
export const FILTER_BATCH = 'FILTER_BATCH';
export const FILTER_VIEW = 'FILTER_VIEW';
export const GET_CLASS_DATA = 'GET_CLASS_DATA';
export const SET_DAY_NO = 'SET_DAY_NO';

export function OpenDialog(data) {
    console.log("Under Open Dialog");
	return {
		type: OPEN_DIALOG,
        payload : data
	};
}
export function setDayno(day){
	console.log("reducer",day);
	return{
		type: SET_DAY_NO,
        payload : day
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
