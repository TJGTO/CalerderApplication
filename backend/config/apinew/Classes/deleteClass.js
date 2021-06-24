const classService = require('../../services/classService');

module.exports = async (req, res) => {

   try{
    
    console.log("req.body",req.body);
     
    let payload = await new classService().deletedata(req.body);
     
    console.log("payload",payload);

    res.status(200).send("brgabjabsjgbasjg");

     
   }catch(error){
       
    if ([400, 403, 404].includes(error.code)) {
        return res.status(error.code).send(error.message);
    }
  
      console.error(error);
      return res.status(500).send(error.message);
   }

}