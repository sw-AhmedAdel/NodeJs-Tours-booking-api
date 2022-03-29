const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

function getPagination(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit; 
 
  return {
    skip,
    limit,
  };
}

function getTopTours (req , res , next) {
  req.query.limit=5;
  req.query.sort ='price,ratingsAverage';
  req.query.fileds ='name,price,ratingsAverage,difficulty,summary,description,maxGroupSize';
  next();
}


class filterFeatures {
  constructor(query , filter) {
    this.query = query;
    this.filter=filter;
  }

  //)  advanced filter use it for testing ?duration[gte]=7&price[gte]=497  
  filterFun (){
    let modifyFilter = JSON.stringify(this.filter);
    modifyFilter = modifyFilter.replace(/\b(gte|gt|lt|lte)\b/g , match => `$${match}`) ;
    return  JSON.parse(modifyFilter);
  }
  // sort , ust it for testing ?sort=price,ratingsAverage
  sortBy(){
    if(this.query.sort) {
      return  this.query.sort.split(',').join(' ');
    }else  
    return 'createdAt';
  }

  //filter Fileds use it for testing ?fields=name,price
  filterFileds(){
   
    if(this.query.fields) {
      return  req.query.fields.split(',').join(' ');
     }
  }
}

module.exports = {
  getPagination,
  getTopTours,
  filterFeatures
};