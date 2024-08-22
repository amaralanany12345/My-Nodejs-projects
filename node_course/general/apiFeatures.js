class apiFeatures {
    constructor(queryString,mongooseQuery){
        this.queryString=queryString
        this.mongooseQuery=mongooseQuery
    }

    filter(){
        const queryStringObj={ ...this.queryString}
        const excludedFields=['sort','limit','page','fields']
        excludedFields.forEach((field)=>{
            delete queryStringObj[field]
        })
        let queryStr=JSON.stringify(queryStringObj)
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g , (match)=>`$${match}`)
        this.mongooseQuery=this.mongooseQuery.find(JSON.parse(queryStr))
        return this;
    }
    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join(' ')
            this.mongooseQuery=this.mongooseQuery.sort(sortBy)
          }
          return this
    }

    filedLimit(){
        if(this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ')
            this.mongooseQuery=this.mongooseQuery.select(fields)
          }
          else{
            this.mongooseQuery=this.mongooseQuery.select("-__v")
          }
          return this
    }

    search(modelName){
        if(this.queryString.keyword){
            let query ={}
            if(modelName=="productModel"){
                query.$or = [
                  {title: {$regex: this.queryString.keyword, $options:"i"} },
                  {discription: {$regex: this.queryString.keyword, $options:'i'} },
                ]
                this.mongooseQuery=this.mongooseQuery.find(query)
            }
            else{
                // query.$or = [
                //     {name: {$regex: this.queryString.keyword, $options:'i'} },
                //   ]
                //   this.mongooseQuery=this.mongooseQuery.find(query)
                query={name: {$regex: this.queryString.keyword, $options:'i'} }
                  
            }
          }
          return this
    }

    paginate(currentDocument){
        const page=this.queryString.page*1
        const limit=this.queryString.limit*1
        const skip=(page-1)*limit
        const endIndex=page*limit


        const pagination={}
        pagination.currentPage=page
        pagination.limit=limit
        pagination.numOgPages=Math.ceil(currentDocument/limit)

        if(endIndex<currentDocument){
            pagination.next=page-1
        }

        if(skip>0){
            pagination.prev=page - 1
        }

        this.mongooseQuery=this.mongooseQuery.skip(skip).limit(limit)
        this.paginationResult=pagination
        // .populate({path:'category',select:'name -_id'})
        return this
    }
}

module.exports=apiFeatures;