 const {
   GetALLTours,
   CreateNewTour,
   findTour,
   UpdateTour,
   deleteAllData,
   GetToursStates,
   GetToursForEachMonth,
   FindToursWitn,
   getDistances
} = require('../../models/tours.model');

const {
  getPagination ,
} = require('../../services/query');

const filterFeatures = require('../../services/class.filters');
const appError = require('../../services/class.err.middleware');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();
const multerFilter = (req , file , cb) => {
  if(file.mimetype.startsWith('image')) 
  {
    cb(null , true);
  }else {
    cb(new appError ('Not an image! please upload only images', 400 ) , false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter : multerFilter,
})

// use fields in case i want to upload many images to the same page
const uploadToursImages = upload.fields([
  {name :'imageCover' , maxCount: 1},
  {name: 'images' , maxCount: 3},
])
// upload.single('name of the field to upload one image) >> req.file
//upload.array('name of the filed to store many images' , max count for images >> 3) >> req.files

const resizeToursImages = async (req , res , next) => {
 next();
}

async function httpGetOneTour (req , res , next) {
  const id = req.params.id;
  const tour = await findTour(id);
  
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }
   await tour.populate('reviews')
   return res.status(200).json({
    status:'success',
    data : tour,
  
  })
}

async function httpGetALLTours(req , res , next) {
  const filter = {...req.query};
  const {skip , limit} = getPagination(filter);

  const execludeFileds = ['page','sort','limit','fields'];
  execludeFileds.forEach((el) => delete filter[el]);
  const features = new filterFeatures(req.query , filter);

  const finalFilter = features.filterFun();
  const sortBy = features.sortBy();
  const fields =features.filterFileds();
 
 const tours = await GetALLTours(finalFilter , skip , limit , sortBy , fields)
 
  return res.status(200).json({
    success:true,
    results: tours.length,
    tours ,
  }) ;
}



  async function  httpCreateNewTour  (req , res , next)  {
   
   const tour = req.body;
   const NewTour= await CreateNewTour(tour);
   return res.status(201).json(NewTour);

 }

async function httpUpdateTour (req , res , next) {
  console.log(req.fields);
  const id = req.params.id;
  const tour = await findTour(id);
 
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }

   const NewTour = await UpdateTour(id , req.body);
   return res.status(200).json(NewTour);
}


async function httpDeleteTour (req , res , next) {
 
  const id = req.params.id;
  const tour = await findTour(id);
 
  if(!tour) {
    return  next(new appError('No tour found with that id', 404));
  }

  await tour.remove();
  return res.status(200).json({
    status:'success',
    data : tour,
  });

}

async function httpdeleteAllData(req , res , next) {
  const data = await deleteAllData();
  
  if(!data) {
    return  next(new appError('there is no data to be deleted', 200));
  }

  return res.status(200).json({
    ok : true,
  })
}

async function httpGetToursStates(req , res , next ) {
  const stats = await GetToursStates();
 
  if(!stats) {
    return  next(new appError('something went wrong', 404));
  }

  return res.status(200).json({
    status :'success',
    data : stats
  })
}

async function httpGetToursForEachMonth (req , res , next) {
  const year = Number(req.params.year);
  const tours = await GetToursForEachMonth(year);
  if(!tours) {
    return  next(new appError('something went wrong', 404));
  }
  
  return res.status(200).json({
    status :'success',
    data : tours
  })
}
///within/:distance/center/:latlng/unit/:unit
// {{url}}/v1/tours/within/233/center/34.111745,-118.113491/unit/mi
//user will give his lat and lang and dis and i will give him the nearst tours 
// if dis in k like 200 k , i wil give him the nearst tours in this range depend on his location
async function httpGetAllToursWithin (req , res , next) {
  const {distance ,latlng, unit} = req.params;
  const [lat , lng] = latlng.split(',');
  const reduis = unit ==='mi' ? distance / 3963.2 : distance / 6378.1 ;

  if (!lat || ! lng) {
    return  next(new appError('please provide  latitude and lanitude in the format lat,lng', 400));
  }

  const tours = await FindToursWitn(lat , lng , reduis);
  if(!tours) {
    return  next(new appError('No tours in this location', 404));
  }
  return res.status(200).json({
    status:'success',
    results: tours.length,
    data: tours 
  })
}

//{{url}}/v1/tours/distance/center/34.111745,-118.113491/unit/mi
//user will put his lat and lang and i will give him the distance for each tour
async function httpCalculatingDistances (req , res , next) {
  const {latlng, unit} = req.params;
  const [lat , lng] = latlng.split(',');

  if (!lat || ! lng) {
    return  next(new appError('please provide  latitude and lanitude in the format lat,lng', 400));
  }
  //cal dis in mi or k
  const multiplier = unit ==='mi' ? 0.000621371 : 0.001; 
  const distances = await getDistances(lat, lng ,multiplier );
  return res.status(200).json({
    status:'success',
    data: distances 
  })
}

 module.exports = {
   httpGetOneTour ,
   httpCreateNewTour,
   httpGetALLTours,
   httpUpdateTour,
   httpDeleteTour,
   httpdeleteAllData,
   httpGetToursStates,
   httpGetToursForEachMonth,
   httpGetAllToursWithin,
   httpCalculatingDistances,
   uploadToursImages,
   resizeToursImages,
 }