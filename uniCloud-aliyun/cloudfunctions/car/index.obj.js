// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
const db = uniCloud.database();
const TABLE = "car";
module.exports = {
	add: async (userId, licensePlate) => {
		let result = await db.collection(TABLE).where({
			license_plate: licensePlate
		}).get();

		// 已经存在数据
		if (result && result.affectedDocs != 0) {
			return {
				code: -1,
				message: "添加失败,该数据已存在。"
			}
		}
		result = await db.collection(TABLE).add({
			owner: userId,
			license_plate: licensePlate
		})
		return {
			code: 0,
			data: result.data
		}
	},
	delete: async (id, licensePlate) => {
		let result = await db.collection(TABLE).doc(id).remove();
		return {
			code: 0,
			data: result.result
		}
	},
	/**
	 * 获取当前用户的所有车牌数据
	 */
	get: async (userId) => {
		const res = await db.collection(TABLE).where({
			owner: userId
		}).get();
		return {
			code: 0,
			data: res.data
		}
	},

	update: async (id, licensePlate) => {
		let result = await db.collection(TABLE).where({
			license_plate: licensePlate
		}).get();

		// 已经存在数据
		if (result && result.affectedDocs != 0) {
			return {
				code: -1,
				message: "更新失败,该数据已存在。"
			}
		}
		result = await db.collection(TABLE).doc(id).update({
			license_plate: licensePlate
		})
		return {
			code: 0,
			message: "修改成功"
		}
	}
}
