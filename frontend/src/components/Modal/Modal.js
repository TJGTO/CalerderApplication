import React ,{useEffect} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Actions from '../../Store/actions';
import "./Modal.css";

const Modal = props => {
  const dispatch = useDispatch();
  console.log("props.datatoshow.id",props.datatoshow);
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  
  const deletetheclass=(id)=>{
    axios.post('/delete-class-data',{ 
      id
    })
    .then(res => {
 
      props.onClose();
      getclassData();

    }).catch(err =>{
       
        console.log(err);
    })
  };
  function getclassData(){
   
    axios.get('/class-data')
    .then(res => {
      dispatch(Actions.getSchedulers(res.data));
    })
  
  }
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  },[]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" >
          <div className="modal-header">
            <h4 className="modal-title">{props.datatoshow.className} - {props.datatoshow.teacherName}</h4>
          </div>
          <div className="modal-body">
          <div>
              <p>Subject : {props.datatoshow.subjectName}</p>
              <p>Date : {new Date(props.datatoshow.date).toLocaleString().split(',')[0]}</p>
              <p>Timing : {props.datatoshow.startTime} - {props.datatoshow.endTime}</p>
              </div>
              {props.datatoshow.Description}
          </div>
          <div className="modal-footer">
            <button onClick={props.onClose} className="button">
              Close
            </button>
            <button onClick={e=>{
              e.stopPropagation();
              deletetheclass(props.datatoshow.id)
             }}
              className="button">
              Delete
            </button>
            <button onClick={e=>{
              e.stopPropagation();
              props.onUpdate();
              }} 
              className="button">
              Update
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

export default Modal;
