function uniqueID(string,length = 7) {
	return string + Math.random().toString(36).substring(2,length + 2)
}

export {uniqueID}