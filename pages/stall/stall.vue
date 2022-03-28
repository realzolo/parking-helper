<template>
	<view>
		<map name="" :latitude="location.latitude" :longitude="location.longitude"></map>
		<button type="default" @click="getLocation()">getLocation</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			app: {},
			longitude: 0, // 经度
			latitude: 0, // 纬度
			marker: {
				// 地图当前标记点
				id: 0, // 标记点ID，不用变更
				latitude: 39.9086, // 标记点所在纬度
				longitude: 116.3974, // 标记点所在经度
				iconPath: "../../asset/local.png", // 标记点图标，png或jpg类型
				width: "20", // 标记点图标宽度
				height: "20" // 标记点图标高度
			}
		};
	},
	onLoad() {
		// getMyApp();
	},
	methods: {
		getMyApp() {
			this.app = getApp();
		},
		async getLocation (data = null) {
		    const {
		      latitude,
		      longitude
		    } = data || that.data // 如果传入为空，则使用data内数据
		    await app.call({ // 发起云函数请求
		      name: 'location', // 业务为location，获取经纬度信息
		      data: { // 传入经纬度信息
		        location: `${latitude},${longitude}`
		      },
		      load: false // 不显示加载loading，静默执行
		    }).then((res) => { // 请求成功后
		      that.setData({ // 将信息存储data数据
		        info: res
		      })
		    })
		  },
		getLocation() {
			const that = this;
			wx.getLocation({
				type: "wgs84",
				success(res) {
					const latitude = res.latitude;
					const longitude = res.longitude;
					const speed = res.speed;
					const accuracy = res.accuracy;
					this.location = { latitude, longitude };
				}
			});
		}
	}
};
</script>

<style lang="scss"></style>
