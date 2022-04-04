<template>
	<view class="wrapper">
		<view class="search_wrapper">
			<view class="area_select_wrapper" @click="onSelect">
				<text>{{ district }}</text>
				<van-icon name="arrow-down" />
			</view>
			<view class="input_wrapper">
				<van-search placeholder="请输入搜索关键词" use-action-slot @change="bindingData">
					<view class="button" slot="action" @click="doSearch">搜索</view>
				</van-search>
			</view>
		</view>
		<view class="preview_wrapper">
			<view class="goods_item_wrapper" v-for="(item, index) in carports" :key="index" @click="queryRoute(item)">
				<view class="goods_item_header">{{ item.title }}</view>
				<view class="goods_item_footer">{{ item.address }}</view>
			</view>
		</view>
		<view class="options_wrapper" v-show="showAreaList">
			<van-area :area-list="areaList" :value="adcode" @confirm="onSelectConfirm"  @cancel="onSelectCancel" />
		</view>
	</view>
</template>

<script>
import { areaList } from "@vant/area-data";
export default {
	data() {
		return {
			areaList,
			showAreaList: false,
			district: "",
			adcode: 0,
			pcd: "", // Provice City District
			page: 1,
			inputData: "", //输入框的数据
			carports: [],
			myLocation: {} // 我当前位置坐标
		};
	},
	async onLoad() {
		await this.init();
		await this.doSearch();
	},
	methods: {
		async init() {
			// 从定位中拿到位置数据(当前位置经纬度)
			await this.getLocation();
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
			const { adcode } = result.ad_info;
			const { province, city, district } = result.address_component;
			// 3. 将位置信息存入本地缓存
			// uni.setStorageSync("_location", { address: province + city + district, longitude, latitude });
			// return { longitude, latitude };
			this.adcode = adcode;
			this.pcd = province + city + district;
			this.district = district;
		},
		async doRequestSearch(longitude, latitude) {
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
			this.carports = [];
			data.forEach(item => {
				this.carports.push({
					title: item.title,
					longitude: item.location.lng,
					latitude: item.location.lat,
					address: item.address
				});
			});
		},
		async parseAddress(address) {
			// 如果地址没有变化，则无需不必要的请求
			if (address == this.tempAddress) {
				return this.carport.location;
			}
			const res = await uni.request({
				url: `https://apis.map.qq.com/ws/geocoder/v1`,
				data: {
					key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X",
					address: address
				}
			});
			const { status, result } = res[1].data;
			if (status != 0) return; // 地址解析失败

			const { location, address_components } = result;
			const { lng: longitude, lat: latitude } = location;
			const { province, city, district } = address_components;
			return { longitude, latitude, province, city, district };
		},
		// 点击按钮发送搜索请求
		async doSearch() {
			// 1. 解析地址获取经纬度
			const address = this.pcd + this.inputData;
			const location = await this.parseAddress(address);
			if (!location) {
				// this.$notify({ type: "warning", message: "无效地址，解析失败！" });
				// this.loading = false;
				return;
			}
			// 2. 根据经纬度查询附近停车场
			const { longitude, latitude } = location;
			await this.doRequestSearch(longitude, latitude);
		},
		onSearch() {
			this.showAreaList = true;
		},
		onSelect() {
			this.showAreaList = true;
		},
		// 获取选择框中的数据(省市区)
		onSelectConfirm(e) {
			const { values } = e.detail;
			let pcd = "";
			values.forEach(item => {
				pcd += item.name;
			});
			this.city = values[0].name;
			this.pcd = pcd;
			this.showAreaList = false;
		},
		onSelectCancel() {
			this.showAreaList = false;
		},
		bindingData(e) {
			this.inputData = e.detail;
		},
		// 查询路线
		queryRoute(item) {
			const plugin = requirePlugin("routePlan");
			const key = "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X";
			const referer = "quick-park";
			const endPoint = JSON.stringify({
				name: item.title,
				navigation: 1,
				latitude: item.latitude,
				longitude: item.longitude
			});
			uni.navigateTo({
				url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search_wrapper {
	display: flex;
	justify-content: space-between;
	padding: 0 20rpx;
	background-color: #ffffff;
	.area_select_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 150rpx;
		width: 150rpx;
		font-size: 26rpx;
		text {
			margin-right: 5rpx;
		}
	}
	.input_wrapper {
		width: 100%;
		.button {
			background-color: #f7f8fa;
			padding: 0 8px;
		}
	}
}
.preview_wrapper {
	background-color: #ffffff;
	.goods_item_wrapper {
		padding: 20rpx;
		border-bottom: 1px solid #efefef;
		.goods_item_header {
			font-size: 28rpx;
			color: #333;
			padding: 10rpx 0;
		}
		.goods_item_footer {
			font-size: 26rpx;
			color: #777;
		}
	}
}
.options_wrapper {
	position: absolute;
	width: 100%;
	bottom: 0;
}
</style>
<style>
.van-search__action {
	padding: 0 !important;
}
.van-search--withaction {
	padding-left: 0 !important;
	border-radius: 10rpx !important;
}
</style>
