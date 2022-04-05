 const KEY = "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X";
/**
 * 获取当前位置经纬度坐标
 */
const getCurrentCoord = async () => {
	const res = await uni.getLocation({
		type: "gcj02",
		cacheTimeout: 360,
		accuracy: "best",
		isHighAccuracy: true
	});
	const { errMsg, longitude, latitude } = res[1];
	if (errMsg != "getLocation:ok") {
		// this.$notify({
		// 	type: "danger",
		// 	message: "定位失败！请检查位置服务是否正常。"
		// });
		return;
	}
	
	return { longitude, latitude };
}

/**
 * 根据经纬度坐标获取位置信息(by腾讯位置服务API)
 * 返回：省 市 区
 */
const getLocationByCoord = async (longitude, latitude) => {
	const res = await uni.request({
		url: "https://apis.map.qq.com/ws/geocoder/v1",
		data: {
			key: KEY,
			location: `${latitude},${longitude}`
		}
	});
	const { status, result } = res[1].data;
	if (status != 0) {
		// this.$notify({ type: "danger", message: "定位失败！请检查位置服务是否正常。" });
		return;
	}
	const { adcode } = result.ad_info;
	const { province, city, district } = result.address_component;
	return { province, city, district , adcode };
}

const getCoordByAddress = async (address) => {
	const res = await uni.request({
			url: "https://apis.map.qq.com/ws/geocoder/v1",
			data: {
				key: KEY,
				address: address
			}
	});
	const { status, result } = res[1].data;
	if (status != 0) {
		// this.$notify({ type: "danger", message: "定位失败！请检查位置服务是否正常。" });
		return;
	}
	const { lng: longitude, lat: latitude } = result.location;
	return { longitude, latitude };
}

/**
 * 查询路线
 */
const queryRoute= (name, longitude, latitude) =>{
	const plugin = requirePlugin("routePlan");
	const key = KEY;
	const referer = "quick-park";
	const endPoint = JSON.stringify({ name, navigation: 1, latitude, longitude });
	uni.navigateTo({
		url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
	});
}

/**
 * 地点搜索
 */
const searchLocation = async (longitude, latitude) => {
	const res = await uni.request({
		url: "https://apis.map.qq.com/ws/place/v1/search",
		data: {
			keyword: "停车",
			boundary: `nearby(${latitude},${longitude},1000,1)`,
			orderby: "_distance",
			key: KEY
		}
	});
	const { status, data } = res[1].data;
	if (status != 0) {
		// this.$notify({ type: "danger", message: "请求数据失败！请检查网络是否正常。" });
		return;
	}
	return data;
}

export { getCurrentCoord, getLocationByCoord, getCoordByAddress, queryRoute, searchLocation };