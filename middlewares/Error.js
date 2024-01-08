function errorHandlerMiddleware (err,req,res,next) {
    const customErr = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong. Please try again!'
    }  

    if(err.name === 'ValidationError') {
        customErr.statusCode = 400
        customErr.msg = Object.values(err.errors).map(item => item.message).join(',')
    }
 

    if(err.name === 'CastError') {
        customErr.statusCode = 404
        customErr.msg = `No item found like this`
    }

    if(err.code && err.code === 11000) {
        customErr.statusCode = 400
        customErr.msg = `Duplicated value entered for ${Object.keys(err.keyValue)} field, please choose another value.`
    }
     
    return res.status(customErr.statusCode).json(customErr.msg)  
}

function notFound(req,res,next) {
    res.status(404).send('Page not found!')
}

export {errorHandlerMiddleware,notFound}