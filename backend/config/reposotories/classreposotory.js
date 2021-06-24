const Class = require('../models').Class;
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
            'createdById',
            'updatedById'
          ]),
        },
    );
   
    return record;
  }

    async getalldata(){
       
        const record = await Class.findAll();

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

    
};
