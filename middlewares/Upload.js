
function checkImageUpload (extensions,mimetypes) {
    return (req,res,next) => {  
        if(req.files !== null && req.files.landscapeImage && req.files.portraitImage) { 
            for(let fileKey in req.files) { 
                const file = req.files[fileKey]
                const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
                const allowedExtensions = extensions
                const allowedMimeTypes = mimetypes
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
            return res.json('Please, provide two images!')
             
       }
    }
}

export {checkImageUpload}