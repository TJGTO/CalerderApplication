var Sequelize = require("sequelize");

module.exports=function(sequelize, DataTypes){ 
  return Class = sequelize.define("Class", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 ,      
        primaryKey: !0
    },
    className: {               
      type: DataTypes.STRING,  
      field: "classname"      
    },
    subjectName: {                
      type: DataTypes.STRING,  
      field: "subjectname"       
    },
    date: {               
        type: DataTypes.DATE,  
        field: "date"      
    },
    startTime: {               
        type: DataTypes.STRING,  
        field: "starttime"      
    },
    endTime: {               
        type: DataTypes.STRING,  
        field: "endtime"      
    },
    teacherId: {               
        type: DataTypes.STRING,  
        field: "teacherid"      
    },
    Description: {               
        type: DataTypes.STRING,  
        field: "Description"      
    },
    teacherName: {               
        type: DataTypes.STRING,  
        field: "teacherName"      
    },
    day :{
        type: DataTypes.STRING,  
        field: "day"
    },
    createdById :{
      type: DataTypes.STRING,  
      field: "day"
    },
    updatedById :{
    type: DataTypes.STRING,  
    field: "day"
   }
  },
  {
    timestamps: true,
  },
  );
};