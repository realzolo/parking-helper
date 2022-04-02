const trimSpace = (str) => {
	return str.replace(/s+/g, "").trim()
}
const isEmpty = (str) => {
	if (!str) return true;
	return !trimSpace(str)
}
export {
	trimSpace,
	isEmpty
};
