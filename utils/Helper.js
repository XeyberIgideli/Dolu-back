import fs from 'fs'

function uniqueID(string,length = 7) {
	return string + Math.random().toString(36).substring(2,length + 2)
}

async function fileUpdate(model,pathname,files,body) {
	const media = await model.findOne({title: body.title})
 
	   Object.keys(files).forEach(async (file) => { 
		let uploadedImage = files[file]
		let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
		let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
		let uploadPath = `/uploads/${pathname}/` + uniqueImageName + imageExt
		let filePath =  globalDirName + '/public' + uploadPath
		let removePath = globalDirName + '/public' + media[file]

		fs.unlinkSync(removePath)
		await files[file].mv(filePath)
		
		media[file] = uploadPath
		await media.save() 
	})
}

export {uniqueID,fileUpdate}