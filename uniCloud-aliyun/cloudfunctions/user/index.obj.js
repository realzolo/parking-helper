// 开发文档: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const config = {
	APP_ID: 'wxa5ce8313e99b6489',
	APP_SECRET: '7372f6d2834164e131423a6fafb17f2c'
}
const WECHAT_API = "https://api.weixin.qq.com/sns/jscode2session";
const db = uniCloud.database();
const TABLE = "user";
module.exports = {
	login: async (code, userinfo) => {
		let data = {
			appid: config.APP_ID,
			secret: config.APP_SECRET,
			js_code: code,
			grant_type: 'authorization_code'
		}
		const res = await uniCloud.httpclient.request(WECHAT_API, {
			method: 'GET',
			data,
			dataType: 'json'
		})
		if (!(res.status === 200 && res.data && res.data.openid)) {
			return {
				code: -1,
				message: '登陆失败!'
			}
		}
		const openid = res.data.openid

		const records = await db.collection(TABLE).where({
			user_id: openid
		}).get();

		if (records.data.length === 0) {
			await db.collection(TABLE).add({
				user_id: openid,
				...userinfo
			})
		} else {
			await db.collection(TABLE).where({
				user_id: openid
			}).update(userinfo)
		}
		return {
			code: 0,
			user_id: openid,
			message: '登陆成功'
		}
	},
	
	updateUserinfo: async (userId, userinfo) => {
		if (!userId || !userinfo) {
			return {
				code: -1,
				message: "无效参数"
			}
		}

		const result = await db.collection(TABLE).where({
			user_id: userId
		}).update(userinfo);
		if (result && result.affectedDocs === 1) {
			return {
				code: 0,
				message: "修改成功！"
			}
		}
		return {
			code: -1,
			message: "修改失败！",
			error: result
		}
	}
}
