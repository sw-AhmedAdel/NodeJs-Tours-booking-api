 const fs = require('fs');
 const path = require('path');
 let tours;

 async function loadToursData() {
  
  return new Promise((resolve , rejects) => {
   fs.createReadStream(path.join(__dirname,'..','..','data','tours.json'))
    
   .on('data', (data) => {
    saveToures(data)
   })
   .on('error', (err) => {
     console.log(err);
     rejects(err);
   })
   .on('end' , () => {
     resolve();
   })
  })
}

function saveToures(tour) {
 tours = JSON.parse(tour);

}

function getAllTours () {
return tours;
}

module.exports = {
  loadToursData,
  getAllTours,
}