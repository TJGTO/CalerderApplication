var Sequelize = require("sequelize");

module.exports=function(sequelize, DataTypes){ 
  return Teacher = sequelize.define("Teacher", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4 ,      
        primaryKey: !0
    },
    lastName: {               
      type: DataTypes.STRING,  
      field: "lastName"      
    },
    firstName: {                
      type: DataTypes.STRING,  
      field: "firstName"       
    },
    address: {               
        type: DataTypes.STRING,  
        field: "address"      
    },
    city: {               
        type: DataTypes.STRING,  
        field: "city"      
    },
    subject: {               
        type: DataTypes.STRING,  
        field: "subject"      
    },
    fullName: {               
        type: DataTypes.STRING,  
        field: "fullName"      
    },
  });
};