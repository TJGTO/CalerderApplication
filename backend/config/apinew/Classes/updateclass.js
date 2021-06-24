const classService = require('../../services/classService');

module.exports = async (req, res) => {

   try{
    
    console.log(req.body);
     
    let payload = await new classService().updatedata(req.body);
     
    if(payload){
      res.status(200).send(payload);
    }else{
       console.log("sending error");
      res.status(404).send(payload);
    }
    
     
   }catch(error){
       
    if ([400, 403, 404].includes(error.code)) {
        return res.status(error.code).send(error.message);
    }
  
      console.error(error);
      return res.status(500).send(error.message);
   }

}