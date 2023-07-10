import fs from 'fs'

function uniqueID(string,length = 7) {
	return string + Math.random().toString(36).substring(2,length + 2)
}

// Multi input file uploading
function fileUploadMI (pathname,files) {
	let arrPath = {}
	let arrUpload = {}
	let uniqueImageName
	let uploadedImage
	let imageExt
	let uploadPath
	let uploadFile

	Object.keys(files).forEach(async (file) => {
		uploadedImage = files[file]
		imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
		uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
		uploadPath = `/uploads/${pathname}/` + uniqueImageName + imageExt
		uploadFile = globalDirName + `/public/uploads/${pathname}/` + uniqueImageName + imageExt
		arrUpload[file] = uploadPath
		arrPath[file] = uploadFile
	})

	return {arrUpload,arrPath}
}

// Single input file uploading
async function fileUploadSI (pathname,file,showname) {
	let uploadedImage = file
	let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
	let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
	let uploadPath = `/uploads/${pathname}/${showname}/` + uniqueImageName + imageExt
	let uploadFile = globalDirName + `/public/uploads/${pathname}/${showname}/` + uniqueImageName + imageExt

	await uploadedImage.mv(uploadFile)
	return uploadPath
}

// Updating the files in multi inputs
async function fileUpdate(model,pathname,files,body) {
	const media = await model.findOne({_id: body.episodeID})
	let uploadPaths = {}	
	   Object.keys(files).forEach(async (file) => { 
		let uploadedImage = files[file]
		let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
		let uniqueImageName = uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
		let uploadPath = `/uploads/${pathname}/` + uniqueImageName + imageExt
		let filePath =  globalDirName + '/public' + uploadPath
		let removePath = globalDirName + '/public' + media[file]
		uploadPaths[file] = uploadPath

		fs.unlinkSync(removePath)
		await files[file].mv(filePath)
	})
	return uploadPaths
} 

export {uniqueID,fileUpdate,fileUploadSI,fileUploadMI}