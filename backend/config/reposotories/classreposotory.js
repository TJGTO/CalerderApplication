const Class = require('../models').Class;
const { Op } = require("sequelize");
const lodash = require('lodash');

module.exports = class RoleReposotory{


  async create(data){
       
    const record = await Class.create(
        {
          ...lodash.pick(data, [
            'id',
            'className',
            'subjectName',
            'date',
            'startTime',
            'endTime',
            'teacherId',
            'Description',
            'teacherName',
            'day',
            'batchId',
            'batchName'
          ]),
        },
    );
   
    return record;
  }
  
  async update(data,id){

    let record = await Class.findByPk(id);

    record = await record.update(
      {
        ...lodash.pick(data, [
          'id',
          'className',
          'subjectName',
          'date',
          'startTime',
          'endTime',
          'teacherId',
          'Description',
          'teacherName',
          'day',
          'batchId',
          'batchName'
        ]),
      },
    
    );

    return record;
  }


  async getalldata(){
       
    const record = await Class.findAll();

    return record;
  }
    
    async deletedata(id){
           
      console.log(id);
      const record = await Class.destroy({
        where: {
          id: id
        }
      });

      return record;

    }

    async getdataforaparticularDay(day,teacherId){
       
      const record = await Class.findAll({
        where: {
          day: day,
          teacherid: ""+teacherId
        }
      });

      return record;
  }

  async getdataforaparticularDayforupdate(day,teacherId,Id){
       
    const record = await Class.findAll({
      where: {
        day: day,
        teacherid: ""+teacherId,
        id: {
           [Op.not]: Id
        }
      }
    });

    return record;
}

    
};
