
import '../App.css';
import './dropdown.css';
import AddnewClassModal from './Modal/AddnewClassModal';
import { useDispatch, useSelector } from 'react-redux';
import styled,  { keyframes } from 'styled-components';
import * as Actions from '../Store/actions';
import React, { useRef, useEffect, Fragment, useState } from 'react';

function Header() {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [selectedteacherid, setselectedteacherid] = useState(null);
    const [selectedviewid, setselectedviewid] = useState(1);

    function closeModal(){
        setShow(false);
    }
    function openModal(){
        setShow(true);
    }
    const selectteacher=(event)=>{
        setselectedteacherid(event.target.value);
        
    };
    const selectview=(event)=>{
        setselectedviewid(parseInt(event.target.value));
    };
    const applyteacherfilter=(event)=>{
        if(selectedteacherid=="select"){

        }else{
            dispatch(Actions.filterbyTeacher(selectedteacherid)); 
        }
        
    };
    const applyviewfilter=(event)=>{
        
       dispatch(Actions.filterbyView(selectedviewid)); 
  
    };
    return (
        <div style={{marginTop:"20px"}}>

           <HeaderSection>
           <div style={{marginBottom:"2%"}}>
            <button className="button" onClick={openModal}>Add Class</button>
           </div>

           <div style={{ display : "flex",flexDirection: "row",marginBottom:"2%"}}>

           <div className="select">
            <select className="custom-select" style={{width:"200px"}} onChange={selectteacher}>
                <option value="select">Filter By Teacher</option>
                <option value="1">Sumit Malik</option>
                <option value="2">John Doe</option>
                <option value="3">David Wang</option>
                <option value="4">Luis Alberto</option>
                <option value="ALL">View ALL</option>
            </select>

           </div>
            <button className="button" onClick={applyteacherfilter}>Apply</button>
           </div>
          
           <div style={{ display : "flex",flexDirection: "row",marginBottom:"2%"}}>
           <div className="select">
            <select className="custom-select" style={{width:"200px"}} onChange={selectview}>
                
                <option value="1">Month</option>
                <option value="2">Week</option>
                <option value="3">Day</option>
            </select>

           </div>
           <div>
            <button className="button" onClick={applyviewfilter}>Apply</button>
           </div>
           </div>
           </HeaderSection>
           
           <AddnewClassModal show={show} title="Scheduled a Class" onClose={closeModal}/>
            
        </div>
    )
}

export default Header

const HeaderSection = styled.div`
    display : flex;
    flex-direction: row; 
    justify-content : space-between;

    @media screen and (max-width: 768px) {
        display : flex;
        flex-direction: column; 
    }
`;
