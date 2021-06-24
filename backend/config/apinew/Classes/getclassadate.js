const classService = require('../../services/classService');

module.exports = async (req, res) => {

   try{
   
    let payload = await new classService().getdata();

    res.status(200).send(payload);
     
   }catch(error){
       
    if ([400, 403, 404].includes(error.code)) {
        return res.status(error.code).send(error.message);
    }
  
      console.error(error);
      return res.status(500).send(error.message);
   }

}