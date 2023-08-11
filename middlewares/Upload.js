
function checkUpload (sort) { 
    let allowedExt
    let allowedMimetypes
    const obj = {
        image: {ext:['png', 'jpeg', 'jpg', 'gif'],mimetype:['image/png', 'image/jpeg', 'image/jpg', 'image/gif']},
        video: {ext:['mp4','flv','avi','ts'],mimetype: ['video/mp4', 'video/flv', 'video/avi', 'video/ts']}
    }
    Object.keys(obj).forEach(item => {
        if(item === sort) {
            allowedExt = obj[item].ext 
            allowedMimetypes = obj[item].mimetype 
        }
    }) 
      
    return (req,res,next) => {  
        if(req.files !== null) { 
            if(Object.keys(req.files).map(item => req.files[item] === 'undefined')[0]) {
                return res.json('All picture fields require to be filled in!')
            }
            for(let fileKey in req.files) { 
                const file = req.files[fileKey]
                const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
                const allowedExtensions = allowedExt
                const allowedMimeTypes = allowedMimetypes
                const allowedFileSize = 5
                
                if(!allowedExtensions.includes(fileExtension) || !allowedMimeTypes.includes(file.mimetype)) {
                    // req.flash('error', 'Extensions like these is not allowed! Please use image extensions!')
                    // return res.status(400).redirect('/register')
                    return res.json('Ext not allowed')
                } 
                
                if((file.size / (1024*1024) > allowedFileSize)) {
                    // req.flash('error', 'File too large!')
                    // return res.status(400).redirect('/register')
                    return res.json('File too large!')
                }

            }
            next()
       
       } else {
            // req.flash('error', 'Please upload an image!')
            // return res.status(400).redirect('/register')
            return res.json('Please, provide any images!')
             
       }
    }
}

function updateUploadCheck(req,res,next) {
    if(!req.body.hiddenLandscape) {
        checkUpload('image')
    }
    next()
}

export {checkUpload,updateUploadCheck}