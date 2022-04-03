// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
module.exports = {
	deleteFile: async (fileID) => {
		const result = await uniCloud.deleteFile({
			fileList: [fileID]
		})
		return {
			code: 0,
			message: "删除成功！"
		}
	}
}
