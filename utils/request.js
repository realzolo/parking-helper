const request = (url, method, data) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method || 'GET',
			data: data || {},
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}
export default request
