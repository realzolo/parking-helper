// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
const db = uniCloud.database();
const TABLE = "carport";
module.exports = {
	/**
	 * userId: 用户的openid
	 * carportObj： 车位信息数据
	 */
	add: async (userId, carportObj) => {
		const t = {
			user_id: userId,
			...carportObj
		}
		const res = await db.collection(TABLE).add(t);
		return {
			code: 0,
			data: res
		}
	},

	update: async (userId, carportObj) => {
		const {
			_id
		} = carportObj;
		delete carportObj._id;
		const t = {
			user_id: userId,
			...carportObj
		}
		const res = await db.collection(TABLE).doc(_id).update(t);
		return {
			code: 0,
			data: res
		}
	},
	/**
	 * 获取多条数据(不指定user)
	 * start: 从何处开始
	 * count：获取条数
	 */
	get: async (start, count) => {
		const res = await db.collection(TABLE).skip(start).limit(count).get();
		return {
			code: 0,
			data: res.data
		}
	},
	/**
	 * 获取多条数据(指定user)
	 * userId：用户的openid
	 * start: 从何处开始
	 * count：获取条数
	 */
	getByUserID: async (userId, start, count) => {
		const res = await db.collection(TABLE).where({
			user_id: userId
		}).skip(start).limit(count).get();
		return {
			code: 0,
			data: res.data
		}
	},

	deleteByUserID: async (userId, id) => {
		const res = await db.collection(TABLE).doc(id).remove()
		return {
			code: 0,
			data: res.data
		}
	}
}
