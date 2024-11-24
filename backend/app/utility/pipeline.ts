export const createPipeline = (query : any) => {
    const pipeline = [];

    const {page,limit = 2,sort,sortDirection,fields,...queryObj} = query

    if(queryObj){
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gt|lt|gte|lte|eq)\b/g, (match) => `$${match}`)
        pipeline.push({
            $match : JSON.parse(queryString)
        })
    }

    if(sort){
        let field = query.sort;

        if(!sortDirection){
            const sortObject = {[field] : -1};
            pipeline.push ({
                $sort : sortObject
            })
        }

        if(sortDirection == 'ascending' || sortDirection == '1'){
            const sortObject = {[field] : 1};
            pipeline.push ({
                $sort : sortObject
            })
        }
        
    }

    if(page){
        pipeline.push(
            {
                $skip : (Number(page-1))*limit
            }
        )
        pipeline.push(
            {
                $limit : Number(limit)
            }
        )
    }
    return pipeline;

}