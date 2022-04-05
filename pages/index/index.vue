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
			<van-button type="info" icon="guide-o" round block @click="onQueryRoute">到这去</van-button>
		</view>
	</view>
</template>

<script>
import { getCurrentCoord,  queryRoute, searchLocation } from "@/service/geo";
export default {
	data() {
		return {
			location: {},
			target: {},
			markers: [],
			isShortest: true,
			canTarce: false,
			iconPath: "../../static/image/p.png",
			sharedMarkers: [] // 用于与其他页面共享标记点数据
		};
	},
	onLoad() {
		this.init();
	},
	onReady() {
		this.$hasLogin();
	},
	methods: {
		async init() {
			const { longitude, latitude } = await getCurrentCoord();
			if (longitude && latitude) {
				await this.searchNearParkingLots(longitude, latitude);
				uni.setStorage({
					key: "_shared_markers",
					data: this.sharedMarkers
				});
			}
		},
		// 根据我的位置标记附近停车点
		async searchNearParkingLots(longitude, latitude) {
			const data = await searchLocation(longitude, latitude);
			if (!data) {
				this.$notify({ type: "danger", message: "网络错误，请稍后重试！" });
				return;
			}
			// 第一个数据为最近定位点
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
		// 从标记点中获取定位
		toMarkerForm(e) {
			const { markerId } = e.detail;
			this.target = this.markers.filter(e => e.id == markerId)[0];
			this.isShortest = false;
		},
		// 跳转搜索页
		toSearch() {
			uni.navigateTo({
				url: "/subpages/search"
			});
		},
		onQueryRoute(){
			queryRoute();
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
