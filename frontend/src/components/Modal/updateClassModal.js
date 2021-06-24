import React ,{useRef, useEffect, Fragment, useState} from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useDispatch, useSelector } from 'react-redux';
import ErrorDialog from './ErrorDIalog';
import axios from 'axios';
import * as Actions from '../../Store/actions';
import "./Modal.css";
import '../form.css';

const UpdateClassModal = props => {
   const dispatch = useDispatch();
   console.log(props.datatoupdate);
   console.log(props.date);
   const [classname, setClassname]=useState(props.datatoupdate.className);
   const [subject, setsubject]=useState(props.datatoupdate.subjectName);
   const [date, setDate]=useState(props.date);
   const [starttime, setstarttime]=useState(props.datatoupdate.startTime);
   const [endTime, setendTime]=useState(props.datatoupdate.endTime);
   const [teacher, setteacher]=useState(props.datatoupdate.teacherId);
   const [teachername, setteachername]=useState(props.datatoupdate.teacherName);
   const [description, setdescription]=useState(props.datatoupdate.Description);
   const [idforupdate, setidforupdate]=useState(null);
   const [required, setrequired]=useState(false);
   const [errorshow,seterrorshow]=useState(false);
   const [errordes,seterrordes]=useState("");
   const [erroroccupied ,seterroroccupied] = useState(false);
   
   const [requireclass, setrequireclass]=useState(false);
   const [requiresub, setrequiresub]=useState(false);
   const [requiredate, setrequiredate]=useState(false);
   const [requiretime, setrequiretime]=useState(false);
   const [requiretec, setrequiretec]=useState(false);

   const [requireclassmsg, setrequireclassmsg]=useState("");
   const [requiresubmsg, setrequiresubmsg]=useState("");
   const [requiredatemsg, setrequiredatemsg]=useState("");
   const [requiretimemsg, setrequiretimemsg]=useState("");
   const [requiretecmsg, setrequiretecmsg]=useState("");
   
  

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {

    //setClassname(props.datatoupdate.className);
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  },[]);
 
  useEffect(()=>{
    setClassname(props.datatoupdate.className);
    setsubject(props.datatoupdate.subjectName);
    setDate(props.date);
    setstarttime(props.datatoupdate.startTime);
    setendTime(props.datatoupdate.endTime);
    setteacher(props.datatoupdate.teacherId);
    setteachername(props.datatoupdate.teacherName);
    setdescription(props.datatoupdate.Description);
    setidforupdate(props.datatoupdate.id);

  },[props.datatoupdate]);

 const addnewClass=()=>{
     
    setrequireclass(false);  
    setrequiresub(false);
    setrequiredate(false);
    setrequiretime(false); 
     
    if(!classname){
        
        setrequireclass(true);
        setrequireclassmsg("Please Enter Class Name");
        return;
    }
    if(!subject){
        setrequiresub(true);
        setrequiresubmsg("Please Enter Subject Name");
        return;
    }
    if(!date){
        setrequiredate(true);
        setrequiredatemsg("Please Choose Date");
        return;
    }
    if(!starttime){
        setrequiretime(true);
        setrequiretimemsg("Please Start Date");
        return;
    }
    if(!endTime){
        setrequiretime(true);
        setrequiretimemsg("Please End Date");
        return;
    }
    
    if(starttime && endTime){
        let starthour = starttime.split(":")[0];
        let startminutes = starttime.split(":")[1];
        
        let endhour = endTime.split(":")[0];
        let endminutes = endTime.split(":")[1];
        
        if(starthour>endhour){
            setrequiretime(true);
            setrequiretimemsg("Start time cannot greater than end time");
            return;
        }else if(endhour==starthour){
            
            if(endminutes<startminutes){
                setrequiretime(true);
                setrequiretimemsg("Start time cannot greater than end time");
                return;
            }
        }

        
    }
     
    console.log(idforupdate);
    postalldata();
 
 }
 
 function postalldata(){
  seterroroccupied(false);
  let id = idforupdate;
  axios.put('/update-class-data',{ 
        id,
        classname,
        subject,
        date,
        starttime,
        endTime,
        teacher,
        teachername,
        description
  })
  .then(res => {
       
    
     props.onClose();
     getclassData();

  }).catch(err =>{
    seterroroccupied(true);
    console.log(err);
   })

}

function getclassData(){
   
  axios.get('/class-data')
  .then(res => {
    dispatch(Actions.getSchedulers(res.data));
  })

}

 const enterClassname=(event) =>{
     console.log(classname);
     setClassname(event.target.value);
      
 }
 const enterSubject=(event) =>{
     
    setsubject(event.target.value);
    
}
const chooseDate=(event) =>{
    console.log(event.target.value);
    setDate(event.target.value);
    
}
const enterDescription=(event) =>{
    setdescription(event.target.value);
   
}
const chooseDropdown=(event) =>{
    setteacher(event.target.value);
    const {options, selectedIndex} = event.target;
    console.log(options[selectedIndex].innerHTML);
    setteachername(options[selectedIndex].innerHTML);
}
const chooseStartTime=(event) =>{
    setstarttime(event.target.value);
    console.log(event.target.value);
    
}
const chooseEndTime=(event) =>{
    setendTime(event.target.value);
}
function closeerrorModal(){
    seterrorshow(false);
}
  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal">
        <div className="modal-content" >
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body">

            <form>
                <ul className="form-style-1">
                   {erroroccupied && <label><span className="required">This time is already occupied</span></label>}  
                    <li>
                        <label>Class Name<span className="required">*</span></label>
                        <input type="text" name="field1" className="field-long" onChange={enterClassname} value={classname}  />
                        {requireclass && <label><span className="required">{requireclassmsg}</span></label>}
                    </li>
                    <li>
                        <label>Subject<span className="required">*</span></label>
                        <input type="text" name="field3" onChange={enterSubject} value={subject} className="field-long" />
                        {requiresub && <label><span className="required">{requiresubmsg}</span></label>}
                        
                    </li>
                    <li>
                        <label>Date<span className="required">*</span></label>
                        <input type="date" name="field3" onChange={chooseDate} min="2021-06-01" max="2021-06-30" value={date}  className="field-long" />
                        {requiredate && <label><span className="required">{requiredatemsg}</span></label>}
                        
                    </li>
                    <li>
                        <label>Start & End Time<span className="required">*</span></label>
                        <input type="time" name="field10" onChange={chooseStartTime} className="field-divided" value={starttime} placeholder="First" style={{marginRight:"5px"}}/>
                        <input type="time" name="field20" onChange={chooseEndTime} className="field-divided" value={endTime} placeholder="Last" /></li>
                        {requiretime && <label><span className="required">{requiretimemsg}</span></label>}
                    <li>
                        <label>Teacher <span className="required">*</span></label>
                        <select name="field4" onChange={chooseDropdown} value={teacher} className="field-select">
                        <option value="1">Sumit Malik</option>
                        <option value="2">John Doe</option>
                        <option value="3">David Wang</option>
                        <option value="4">Luis Alberto</option>
                        </select>
                        {requiretec && <label><span className="required">{requiretecmsg}</span></label>}
                        
                    </li>
                    <li>
                        <label>Description</label>
                        <textarea name="field5" id="field5" onChange={enterDescription} value={description} className="field-long field-textarea"></textarea>
                        
                    </li>
                    
                </ul>
            </form>
              
          </div>
          <div className="modal-footer">
            <button onClick={addnewClass} className="submitbutton">
              Submit
            </button>
            <button onClick={e=>{
              seterroroccupied(false);
              props.onClose()
             }}
              className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("updateclassmodal")
  );
};

export default UpdateClassModal;
