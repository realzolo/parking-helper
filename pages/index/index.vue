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
			<van-button type="info" icon="guide-o" round block @click="onTrace">到这去</van-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			canTarce: false,
			location: {},
			ok: false,
			iconPath: "../../static/image/p.svg",
			target: {},
			isShortest: true,
			markers: [],
			tempMarker: []
		};
	},
	// onLoad() {
	// 	// 拿到我的位置坐标,然后搜寻附近停车点
	// 	this.getLocation()
	// 		.then(location => {
	// 			this.searchNearParkingLots(location);
	// 		})
	// 		.catch(error => {
	// 			setTimeout(() => {
	// 				this.$notify({ type: "danger", message: "定位失败！请检查位置服务是否正常。" });
	// 			}, 1000);
	// 		});
	// },
	onReady() {
		this.$hasLogin();
	},
	methods: {
		searchNearParkingLots({ latitude, longitude }) {
			uni.request({
				url: "https://apis.map.qq.com/ws/place/v1/search",
				data: {
					keyword: "停车",
					boundary: `nearby(${latitude},${longitude},1000,1)`,
					orderby: "_distance",
					key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X"
				},
				success: res => {
					const { data } = res.data;
					this.target = { title: data[0].title, address: data[0].address, longitude: data[0].location.lng, latitude: data[0].location.lat, width: 50, height: 50 };
					this.canTarce = true;
					for (let i = 0; i < data.length; i++) {
						this.markers.push({
							id: Number.parseInt(data[i].id.substring(0, 8)),
							title: data[i].title,
							longitude: data[i].location.lng,
							latitude: data[i].location.lat,
							address: data[i].address,
							// iconPath: this.iconPath,
							width: 50,
							height: 50
						});
					}
				}
			});
		},
		onTrace() {
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
		toMarkerForm(e) {
			const { markerId } = e.detail;
			this.target = this.markers.filter(e => e.id == markerId)[0];
			this.isShortest = false;
		},
		toSearch() {
			uni.navigateTo({
				url: `/subpages/search?markers=${JSON.stringify(this.markers)}`
			});
		},
		getLocation() {
			return new Promise((resolve, reject) => {
				uni.getLocation({
					type: "gcj02",
					cacheTimeout: 360,
					accuracy: "best",
					isHighAccuracy: true,
					success: res => {
						const location = {
							longitude: res.longitude,
							latitude: res.latitude
						};
						resolve(location);
					},
					fail: error => {
						reject(error);
					}
				});
			});
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
		height: 300rpx;
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
