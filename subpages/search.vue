<template>
	<view class="wrapper">
		<view class="search_wrapper">
			<view class="area_select_wrapper" @click="onSelect">
				<text>{{ district }}</text>
				<van-icon name="arrow-down" />
			</view>
			<view class="input_wrapper">
				<van-search placeholder="请输入搜索关键词" use-action-slot @change="bindingData"><view class="button" slot="action" @click="doSearch">搜索</view></van-search>
			</view>
		</view>
		<view class="preview_wrapper">
			<view class="goods_item_wrapper" v-for="(item, index) in carports" :key="index" @click="onQueryRoute(item)">
				<view class="goods_item_header">{{ item.title }}</view>
				<view class="goods_item_footer">{{ item.address }}</view>
			</view>
		</view>
		<view class="options_wrapper" v-show="showAreaList"><van-area :area-list="areaList" :value="adcode" @confirm="onSelectConfirm" @cancel="onSelectCancel" /></view>
	</view>
</template>

<script>
import { getCurrentCoord, getLocationByCoord, getCoordByAddress, queryRoute, searchLocation } from "@/service/geo";
import { areaList } from "@vant/area-data";
export default {
	data() {
		return {
			areaList,
			showAreaList: false,
			district: "",
			adcode: 0, // 当前位置代码
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
			await this.getMyLocation();
		},
		// 获取我的位置
		async getMyLocation() {
			const { longitude, latitude } = await getCurrentCoord();
			const { province, city, district, adcode } = await getLocationByCoord(longitude, latitude);
			this.adcode = adcode;
			this.pcd = province + city + district;
			this.district = district;
		},
		//
		async doRequestSearch(longitude, latitude) {
			const data = await searchLocation(longitude, latitude);
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
		async parseAddress(fullAddress) {
			// 如果地址没有变化，则无需不必要的请求
			if (fullAddress == this.tempAddress) {
				return this.carport.location;
			}
			return await getCoordByAddress(fullAddress);
		},
		// 点击按钮发送搜索请求
		async doSearch() {
			// 1. 解析地址获取经纬度
			const fullAddress = this.pcd + this.inputData;
			const location = await this.parseAddress(fullAddress);
			if (!location) {
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
		onQueryRoute({ name, longitude, latitude }) {
			queryRoute(name, longitude, latitude);
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
