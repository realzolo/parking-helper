<template>
	<view class="wrapper">
		<van-notify id="van-notify" />
		<view class="search_wrapper">
			<view @click="toSearch"><van-search disabled placeholder="搜索附近停车场" background="transprent" shape="round" input-class="input-class" field-class="field-class" /></view>
		</view>
		<view class="map_wrapper">
			<map
				id="map"
				enable-rotate
				@markertap="toMarkerForm"
				polyline="polyline"
				:latitude="location.latitude"
				:longitude="location.longitude"
				:markers="markers"
				:include-points="markers"
				show-location
			></map>
		</view>
		<view class="trace_wrapper" v-if="canTarce">
			<view class="target_title_wrapper">
				<text>{{ target.title }}</text>
				<van-tag type="success" v-show="isShortest">最近</van-tag>
			</view>
			<view class="target_address_wrapper">
				<text>{{ target.address }}</text>
			</view>
			<van-button type="info" icon="guide-o" round block @click="queryRoute">到这去</van-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			canTarce: false,
			location: {},
			iconPath: "../../static/image/p.png",
			target: {},
			isShortest: true,
			markers: [],
			sharedMarkers: [] // 用于与其他页面共享标记点数据
		};
	},
	onLoad() {
		// this.init();
	},
	onReady() {
		this.$hasLogin();
	},
	methods: {
		async init() {
			const location = await this.getLocation();
			if (location) {
				await this.searchNearParkingLots(location);
				uni.setStorage({
					key: "_shared_markers",
					data: this.sharedMarkers
				});
			}
		},
		// 根据我的位置标记附近停车点
		async searchNearParkingLots({ latitude, longitude }) {
			const res = await uni.request({
				url: "https://apis.map.qq.com/ws/place/v1/search",
				data: {
					keyword: "停车",
					boundary: `nearby(${latitude},${longitude},1000,1)`,
					orderby: "_distance",
					key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X"
				}
			});
			const { status, data } = res[1].data;
			if (status != 0) {
				this.$notify({ type: "danger", message: "请求数据失败！请检查网络是否正常。" });
				return;
			}
			this.target = { title: data[0].title, address: data[0].address, longitude: data[0].location.lng, latitude: data[0].location.lat, width: 50, height: 50 };
			this.canTarce = true;
			data.forEach(item => {
				const tempObj = {
					id: Number.parseInt(item.id.substring(0, 8)),
					title: item.title,
					longitude: item.location.lng,
					latitude: item.location.lat,
					address: item.address
				};
				this.markers.push({
					...tempObj,
					iconPath: this.iconPath,
					width: 30,
					height: 30
				});
				this.sharedMarkers.push(tempObj);
			});
		},
		// 查询路线
		queryRoute() {
			const plugin = requirePlugin("routePlan");
			const key = "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X";
			const referer = "quick-park";
			const endPoint = JSON.stringify({
				name: this.target.title,
				navigation: 1,
				latitude: this.target.latitude,
				longitude: this.target.longitude
			});
			uni.navigateTo({
				url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
			});
		},
		// 从标记点中获取定位
		toMarkerForm(e) {
			const { markerId } = e.detail;
			this.target = this.markers.filter(e => e.id == markerId)[0];
			this.isShortest = false;
		},
		// 跳转搜索页
		toSearch() {
			uni.navigateTo({
				url: `/subpages/search?data=${JSON.stringify(this.markers)}`
			});
		},
		// 获取我的位置
		async getLocation() {
			// 1. 通过uni的API获取经纬度坐标
			let res = await uni.getLocation({
				type: "gcj02",
				cacheTimeout: 360,
				accuracy: "best",
				isHighAccuracy: true
			});
			const { errMsg, longitude, latitude } = res[1];
			if (errMsg != "getLocation:ok") {
				this.$notify({ type: "danger", message: "定位失败！请检查位置服务是否正常。" });
				return;
			}
			// 2. 通过腾讯位置服务API获取详细地址信息
			res = await uni.request({
				url: "https://apis.map.qq.com/ws/geocoder/v1",
				data: {
					key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X",
					location: `${latitude},${longitude}`
				}
			});
			const { status, result } = res[1].data;
			if (status != 0) {
				this.$notify({ type: "danger", message: "定位失败！请检查位置服务是否正常。" });
				return;
			}
			const { province, city, district } = result.address_component;
			// 3. 将位置信息存入本地缓存
			uni.setStorageSync("_location", { address: province + city + district, longitude, latitude });
			return { longitude, latitude };
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.search_wrapper {
		position: absolute;
		top: 40rpx;
		width: 100vw;
		z-index: 1;
		van-search {
			box-shadow: 10px 10px 5px #888888;
		}
	}
	.map_wrapper {
		map {
			width: 100vw;
			height: 100vh;
		}
	}
	.button_wrapper {
		position: absolute;
		width: 100%;
		bottom: 40rpx;
	}
	.trace_wrapper {
		display: flex;
		flex-direction: column;
		position: absolute;
		width: 95%;
		bottom: 20rpx;
		left: 2.5%;
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #ffffff;
		.target_title_wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			text {
				font-weight: bold;
				padding: 15rpx 0;
			}
		}
		.target_address_wrapper {
			margin: 10rpx 0;
			color: $uni-text-color-grey;
			max-height: 2em;
			text-overflow: ellipsis;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		van-button {
			margin-top: 20rpx;
		}
	}
}
</style>
<style>
.input-class {
	height: 80rpx !important;
}
.field-index--van-field {
	display: flex !important;
	align-items: center !important;
}
</style>
