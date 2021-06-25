const ClassRepository = require('../reposotories/classreposotory');
var uuid = require('uuid');

module.exports = class ClassService {
    constructor(){
        this.repository = new ClassRepository();
    }

    async getdata(){

        try{
            const records = await this.repository.getalldata();
            
            let wholedatasetarr = [];

            for(let i = 1 ; i <32; i++){
                
                let onedataset = {};
                let classesonday = records.filter(oneclass => oneclass.day === i);
                onedataset.dayno = i;
                onedataset.classes = classesonday;
                wholedatasetarr.push(onedataset);
            }

            return wholedatasetarr;

        }catch(err){
            
            console.log(err);
             
            let string = "erro occur";
            return string;

        }
    }
   
    async deletedata(data){
        try{
            const records = await this.repository.deletedata(data.id);
            console.log("records",records);
            return records;
        }catch(err){
            console.log(err);
        }

    }

    async createdata(reciveddata){
         
        let datapresent = await this.repository.getdataforaparticularDay(new Date(reciveddata.date).getDate(),reciveddata.teacher);
        console.log(datapresent.length);

        let today = new Date();
        let starthour = parseInt((reciveddata.starttime).split(":")[0]);
        let startminutes = parseInt((reciveddata.starttime).split(":")[1]);
        let starttime1 = today.setHours(starthour);
        let starttime2 = today.setMinutes(startminutes);
        console.log("starttime2",starttime2);
        
        let endhour = parseInt((reciveddata.endTime).split(":")[0]);
        let endminutes = parseInt((reciveddata.endTime).split(":")[1]);
        let endtime1 = today.setHours(endhour);
        let endtime2 = today.setMinutes(endminutes);
        console.log("endminutes",endtime2);
        
         
        try{
           
            for(let i = 0 ; i < datapresent.length ;i++){
               
                let starthour = parseInt((datapresent[i].startTime).split(":")[0]);
                let startminutes = parseInt((datapresent[i].startTime).split(":")[1]);
                let starttime1 = today.setHours(starthour);
                let starttime3 = today.setMinutes(startminutes);
                 
                let endhour = parseInt((datapresent[i].endTime).split(":")[0]);
                let endminutes = parseInt((datapresent[i].endTime).split(":")[1]);
                let endtime1 = today.setHours(endhour);
                let endtime3 = today.setMinutes(endminutes); 
                
                if(starttime2 >= starttime3 && starttime2 <= endtime3 ){
                    console.log("Conflict");
                    return;
                }
                if(endtime2 >= starttime3 && endtime2 <= endtime3 ){
                    console.log("Conflict");
                    return;
                    
                }

            }
            let data = {};
            data.id= uuid.v4();
            data.className =reciveddata.classname;
            data.subjectName = "Default Sub";
            data.date =new Date(reciveddata.date);
            data.startTime=reciveddata.starttime;
            data.endTime=reciveddata.endTime;
            data.teacherId=""+reciveddata.teacher;
            data.Description=reciveddata.description;
            data.teacherName=reciveddata.teachername;
            data.day=new Date(reciveddata.date).getDate();
            data.batchId =reciveddata.batchid;
            data.batchName = reciveddata.batchname;
            const record = await this.repository.create(data);

            return record;

        }catch(err){
            
            console.log(err);
             
            let string = "erro occur";
            return string;

        }
    }

    async updatedata(reciveddata){
         
        let datapresent = await this.repository.getdataforaparticularDayforupdate(new Date(reciveddata.date).getDate(),reciveddata.teacher,reciveddata.id);
        console.log(datapresent.length);

        let today = new Date();
        let starthour = parseInt((reciveddata.starttime).split(":")[0]);
        let startminutes = parseInt((reciveddata.starttime).split(":")[1]);
        let starttime1 = today.setHours(starthour);
        let starttime2 = today.setMinutes(startminutes);
        console.log("starttime2",starttime2);
        
        let endhour = parseInt((reciveddata.endTime).split(":")[0]);
        let endminutes = parseInt((reciveddata.endTime).split(":")[1]);
        let endtime1 = today.setHours(endhour);
        let endtime2 = today.setMinutes(endminutes);
        console.log("endminutes",endtime2);
        
         
        try{
            
            for(let i = 0 ; i < datapresent.length ;i++){
                
                let starthour = parseInt((datapresent[i].startTime).split(":")[0]);
                let startminutes = parseInt((datapresent[i].startTime).split(":")[1]);
                let starttime1 = today.setHours(starthour);
                let starttime3 = today.setMinutes(startminutes);
              
                let endhour = parseInt((datapresent[i].endTime).split(":")[0]);
                let endminutes = parseInt((datapresent[i].endTime).split(":")[1]);
                let endtime1 = today.setHours(endhour);
                let endtime3 = today.setMinutes(endminutes); 
                
                if(starttime2 >= starttime3 && starttime2 <= endtime3 ){
                    console.log("Conflict");
                    return;
                }
                if(endtime2 >= starttime3 && endtime2 <= endtime3 ){
                    console.log("Conflict");
                    return;
                    
                }

            }
            let data = {};
            data.id= reciveddata.id;
            data.className =reciveddata.classname;
            data.subjectName =reciveddata.subject;
            data.date =new Date(reciveddata.date);
            data.startTime=reciveddata.starttime;
            data.endTime=reciveddata.endTime;
            data.teacherId=""+reciveddata.teacher;
            data.Description=reciveddata.description;
            data.teacherName=reciveddata.teachername;
            data.day=new Date(reciveddata.date).getDate();
            const record = await this.repository.update(data,reciveddata.id);

            return record;

        }catch(err){
            
            console.log(err);
             
            let string = "erro occur";
            return string;

        }
    }
};