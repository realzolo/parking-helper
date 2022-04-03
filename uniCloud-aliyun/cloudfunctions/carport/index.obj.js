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
	},

	/**
	 * 1. 查询与我同区域的所有车位
	 * 2. 根据经纬度计算距离，筛选得到近距离的数据
	 */
	getCarportOfSamePlace: async (address, location) => {
		const res = await db.collection(TABLE).where({
			valid_address: address
		}).get();

		let list = [];
		const promises = [];
		res.data.forEach(item => {
			promises.push((async (item) => {
				const {
					distance,
					duration
				} = await computeDistanceByApi(location, item.location)
				if (distance <= 5000) {
					item.distance = distance;
					item.duration = duration;
					return item;
				}
			})(item))
		})
		const result = await (await Promise.all(promises)).filter(e => e != null || e != undefined)
		return {
			code: 0,
			data: result
		}
	}
}
/**
 * 根据两个经纬度坐标计算距离(直线距离)
 * 单位：千米
 */
const computeDistance = (location1, location2) => {
	const {
		longitude: lng1,
		latitude: lat1
	} = location1;
	const {
		longitude: lng2,
		latitude: lat2
	} = location2;
	const radLat1 = lat1 * Math.PI / 180.0;
	const radLat2 = lat2 * Math.PI / 180.0;
	const a = radLat1 - radLat2;
	const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
		Math.pow(
			Math.sin(b / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	return s;
}
/**
 * 调用腾讯位置服务API获取距离数据
 */
const computeDistanceByApi = async (location1, location2) => {
	const res = await uniCloud.httpclient.request("https://apis.map.qq.com/ws/distance/v1/matrix", {
		method: "GET",
		data: {
			key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X",
			mode: "driving",
			from: `${location1.latitude},${location1.longitude}`,
			to: `${location2.latitude},${location2.longitude}`
		},
		dataType: "json"
	})
	const {
		status,
		result
	} = res.data;
	if (status != 0) {
		return Number.MAX_VALUE;
	}
	return result.rows[0].elements[0];
}
