const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000;

const db = require('./models');

//middleware

app.use(express.json());
app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

app.use(require('./apinew'));

const frontendDir = path.join(
    __dirname,
    '../../calenderapp/build',
);
  
  if (fs.existsSync(frontendDir)) {
    app.use('/', express.static(frontendDir));
  
    app.get('*', function(request, response) {
      response.sendFile(
        path.resolve(frontendDir, 'index.html'),
      );
    });
  }

db.sequelize.sync().then((res) =>{
    app.listen(port,()=> console.log(`Hello World We are listening to the port no ${port}`));
});


  


    


