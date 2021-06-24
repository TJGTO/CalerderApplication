
import React, { useRef, useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled,  { keyframes } from 'styled-components';
import Modal from "./Modal/Modal";
import UpdateClassModal from "./Modal/UpdateClassModal";
import axios from 'axios';
import * as Actions from '../Store/actions';



function Calendar() {
    const filteredId = useSelector((state)=>state.calenderReducer.filteredTeacherID);
    const filteredviewId = useSelector((state)=>state.calenderReducer.filteredView);
    const fetcheddataofclass = useSelector((state)=>state.calenderReducer.calssData);
    const dispatch = useDispatch();
    const [days, setdays] = useState(null);
    const [show, setShow] = useState(false);
    const [dateforupdate, setdateforupdate] = useState(new Date());
    const [updateshow,setUpdateshow] = useState(false);
    const [classdataforMOdal, setclassdataforMOdal] = useState([]);
    const [weekdays, setweekdays] = useState(["Sun","Mon","Tues","Wed","Thrus","Fri","Sat"]);
    const [glovalweekdayslevel, setglovalweekdayslevel] = useState([]);
    const [weekdayslevel, setweekdayslevel] = useState([]);
    const [globalonedaylevel, setglobalonedaylevel] = useState([]);
    const [onedaylevel, setonedaylevel] = useState([]);
    

    useEffect(()=>{

        console.log("In useeffect",fetcheddataofclass);

    },[fetcheddataofclass])

    useEffect(()=>{
        
        let intteacherId = parseInt(filteredId);
        let tempays = days;
        let daysarray = [];
        
        if(filteredviewId==1 && fetcheddataofclass){
            
            if(filteredId=="ALL"){
                setdays(fetcheddataofclass);
            }else{
                for(let i = 0 ; i < fetcheddataofclass.length; i++ ){
                    let classes = fetcheddataofclass[i].classes;
                    let arr = [];
                    if(classes.length>0){
                        let filteredarray = classes.filter(oneclass => oneclass.teacherId == filteredId);
                        arr = filteredarray;
                    }
                    daysarray.push({
                        dayno:i+1,
                        classes : arr
                    })   
                }
                setdays(daysarray);
            }
            
            //console.log(daysarray);
            //setdays(daysarray);
        }else if(filteredviewId==2 && days){
            if(filteredId=="ALL"){
                setweekdayslevel(glovalweekdayslevel);
            }else{
                for(let i = 0 ; i < glovalweekdayslevel.length; i++ ){
                    let classes = glovalweekdayslevel[i].classes;
                    let level = glovalweekdayslevel[i].level;
                    let arr = [];
                    if(classes.length>0){
                        let filteredarray = classes.filter(oneclass => oneclass.teacherId == filteredId);
                        arr = filteredarray;
                    }
                    daysarray.push({
                        level: level,
                        classes : arr
                    })   
                }
                console.log(daysarray);
                setweekdayslevel(daysarray);
            }
            
        }else if(filteredviewId==3 && days){
            console.log("globalonedaylevel",globalonedaylevel);
            if(filteredId=="ALL"){
                setonedaylevel(globalonedaylevel);
            }else{
                let classes = globalonedaylevel[0].classes;
                let level = globalonedaylevel[0].level;
                let arr = []; 
                let onedayarray =[];
                if(classes.length>0){
                    let filteredarray = classes.filter(oneclass => oneclass.teacherId == filteredId);
                    arr = filteredarray;
                }
                onedayarray.push({
                    level: level,
                    classes : arr
                })  
                setonedaylevel(onedayarray); 
            }
        }
        
    },[filteredId]);

    useEffect(() => {
        console.log("In calender",filteredviewId);
        let today = new Date();
        let date = today.getDate();
        let stardate = 7*Math.trunc(parseInt(date) / 7)+1;
        let enddate = stardate + 6;
        if(enddate>31){
            enddate = 31;
        }
        let levelaraay = [];
        let index = 0;
        
        for(let i = stardate-1 ; i< enddate ; i++){
            let classarray =[];

            if(fetcheddataofclass && fetcheddataofclass[i]){
               classarray = fetcheddataofclass[i].classes;
            }
            
            levelaraay.push({
               level: weekdays[index] + "  :  June" +(i+1),
               classes : classarray
            });
            index++;
        }

        setglovalweekdayslevel(levelaraay);
        setweekdayslevel(levelaraay);
 
        let levelaraayforday = [];
        let classarrayforday = [];
        if(fetcheddataofclass && fetcheddataofclass[date]){
            classarrayforday = fetcheddataofclass[date-1].classes;
        }

        levelaraayforday.push({
            level:  weekdays[date-stardate] + "  :  June" +date,
            classes : classarrayforday
        });
        
        setglobalonedaylevel(levelaraayforday);
        setonedaylevel(levelaraayforday);

    },[filteredviewId,fetcheddataofclass]);

    useEffect(() => {
         
        axios.get('/class-data')
        .then(res => {
          const persons = res.data;
          console.log("class-data",persons);
          setdays(res.data);
          dispatch(Actions.getSchedulers(res.data));
        })

    }, []);

    useEffect(() => {
         
        
        setdays(fetcheddataofclass);
          

    }, [fetcheddataofclass]);

    function closeModal(){
        setShow(false);
    }
    function openModalwithclassData(oneclass){
        
        console.log(oneclass);
        setShow(true);
        let date = oneclass.date.toLocaleString().split("T")[0];
        console.log("date",date);
        setdateforupdate(date);
        setclassdataforMOdal(oneclass);
    }
    function updatetheclass(){
        setShow(false);
        setUpdateshow(true);
    }
    function closeupdateModal(){
        setUpdateshow(false);
    }
    return (
        <div style={{marginTop:"20px"}} onClick={closeModal}>
           
           <Modal show={show} title="hi" datatoshow={classdataforMOdal} onClose={closeModal} onUpdate={updatetheclass}>
            <p>Modal</p>
           </Modal>
           <UpdateClassModal show={updateshow} datatoupdate={classdataforMOdal} date={dateforupdate} title="update a class" onClose={closeupdateModal}/>
           {/* <Modal show={show} datatoshow={classdataforMOdal} handleClose={closeModal}>
            <p>Modal</p>
           </Modal> */}
            {filteredviewId ===1 && days && <CalenderDiv>
                {days.map((data)=>(
                    <Day key={data.dayno}>
                      {data.dayno} 

                      {data.classes.map((oneclass)=>(
                        <Class 
                            key={oneclass.id} 
                            onClick={e=> {
                                e.stopPropagation()
                                openModalwithclassData(oneclass)
                            }}
                        >
                          {oneclass.className}
                        </Class>
                      ))}
                      
                    </Day>
                ))}
           </CalenderDiv>}
           {filteredviewId === 2 && <WeekViewDiv>
                {weekdayslevel.map((data)=>(
                    
                    <Weekdaysone key ={data.level}>
                       {data.level}

                       {data.classes.map((oneclass)=>(
                        <ClassofWeek 
                            key={oneclass.id} 
                            onClick={e=> {
                                e.stopPropagation()
                                openModalwithclassData(oneclass)
                            }}
                        >
                          <Textdiv>{oneclass.className}</Textdiv>
                        </ClassofWeek>
                      ))}
                    </Weekdaysone>
                    
                ))}
           </WeekViewDiv> }

           {filteredviewId === 3 && <WeekViewDiv>
                {onedaylevel.map((data)=>(
                    
                    <Weekdaysone leftborder={true} key ={data.level}>
                       {data.level}

                       {data.classes.map((oneclass)=>(
                        <ClassofWeek 
                            key={oneclass.id} 
                            onClick={e=> {
                                e.stopPropagation()
                                openModalwithclassData(oneclass)
                            }}
                        >
                          <Textdiv>{oneclass.className}</Textdiv>
                        </ClassofWeek>
                      ))}
                    </Weekdaysone>
                    
                ))}
           </WeekViewDiv> }
        </div>
    )
}

export default Calendar

const Day = styled.div`
   border-style: solid;
   border-width: 1px;
   height: 100px;
   overflow : auto ;
`;
const CalenderDiv = styled.div`
   display : grid;
   grid-template-columns : repeat(7,1fr);
   grid-template-rows : repeat(5,1fr);
   height: 100%;
`;
const WeekViewDiv = styled.div`
   display : grid;
   grid-template-columns : repeat(7,1fr);
   height: 100%;
`;
const Weekdaysone = styled.div`
   height : 100vh;
   border-left: 1px solid black;
   border-top: 1px solid black;
   border-right : ${({leftborder}) => (leftborder ? '1px solid black':'none')};
   text-align: center;
   //border-bottom: 1px solid black;
`;
// const Weekdaysoneforday = styled.div`
//    height : 100vh;
//    border-left: 1px solid black;
//    border-top: 1px solid black;
//    border-right : 1px solid black;
//    text-align: center;
//    //border-bottom: 1px solid black;
// `;
const Class = styled.div`
    font-size: 1.8vmin;
    background : #a1eafb;
    height: 20%;
    margin-left:4%;
    margin-right:4%;
    margin-bottom:3%;
    text-align: center;
    overflow : hidden;
    font-weight: bold;
`;
const ClassofWeek = styled.div`
    font-size: 3vmin;
    background : #a1eafb;
    border-radius : 10%;
    margin-top:18%;
    height: 10%;
    margin-left:4%;
    margin-right:4%;
    margin-bottom:2%;
`;

const Textdiv = styled.div`

`;