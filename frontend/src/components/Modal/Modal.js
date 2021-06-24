import React ,{useEffect} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const Modal = props => {
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

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
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("modal")
  );
};

export default Modal;
