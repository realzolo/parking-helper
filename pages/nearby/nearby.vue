<template>
	<view class="wrapper">
		<van-notify id="van-notify" />
		<view class="loading_wrapper" v-show="loading"><van-loading vertical type="spinner">加载中...</van-loading></view>
		<view class="goods_wrapper">
			<view class="goods_item" v-for="(item, index) in carports" @click="toPreview(item)" :key="index">
				<view class="item_header">
					<text>{{ item.name }}</text>
					<text>{{ 100 }} M</text>
				</view>
				<view class="item_body">
					<text>{{ item.address }}</text>
					<text>{{ item.price }} 元/时</text>
				</view>
				<view class="item_footer" @click.stop="toNavigate(item)"><image src="../../static/image/navigation.svg"></image></view>
			</view>
		</view>
		<view class="options_wrapper"></view>
	</view>
</template>

<script>
const uco_carport = uniCloud.importObject("carport");
export default {
	data() {
		return {
			start: 0,
			loading: true,
			carports: [],
			carports_bak: [
				{
					id: 1,
					name: "遵化如意停车场",
					price: "9.8",
					address: "河北省遵化市遵化东高速高速口",
					longitude: 108.94712,
					latitude: 34.39318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg",
						"http://pic5.58cdn.com.cn/hbgsydcpostpc/n_v2198955e6989e431d8a3c1fc7de661ac4.jpg"
					],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 2,
					name: "红运停车场",
					price: "9.8",
					address: "武汉市东西湖区高桥五路",
					longitude: 108.94712,
					latitude: 34.49318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic5.58cdn.com.cn/hbgsydcpostpc/n_v2198955e6989e431d8a3c1fc7de661ac4.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: false,
					rent_price: 600
				},
				{
					id: 3,
					name: "山东潍坊诸城翔鹤家具经营部",
					price: "9.8",
					address: "山东潍坊诸城密州街道普桥村西",
					longitude: 108.94712,
					latitude: 34.29318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: ["http://pic3.58cdn.com.cn/p1/small/n_v2ef4d85b099604378a502e9b0dfbbd5f4.jpg", "http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 4,
					name: "上海在顺物流停车场",
					price: "9.8",
					address: "北青公路6511号",
					longitude: 108.94712,
					latitude: 34.69318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic4.58cdn.com.cn/mobile/small/n_v27713ea91cd7f43f090b4b93154d912c6.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 5,
					name: "晋州市高速口停车场",
					price: "9.8",
					address: "石家庄市晋州市宿村",
					longitude: 108.94712,
					latitude: 34.29318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic7.58cdn.com.cn/mobile/small/n_v25e82df0e13d5477a9c4ef87cc60dcd9c.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: false,
					rent_price: 600
				}
			]
		};
	},
	onLoad() {
		this.getDataFromDB();
	},
	onPullDownRefresh() {
		this.start = 0;
		this.getDataFromDB();
	},
	onReachBottom() {
		this.getDataFromDB();
	},
	methods: {
		async getDataFromDB() {
			this.loading = true;
			const result = await uco_carport.get(this.start, 10);
			this.loading = false;
			this.start += 10;
			if (result.code != 0) {
				this.$notify({ type: "danger", message: "获取数据失败!" });
				return;
			}
			this.carports = result.data;
			uni.stopPullDownRefresh();
		},
		toPreview(item) {
			uni.navigateTo({
				url: `/subpages/preview?data=${JSON.stringify(item)}`
			});
		},
		toNavigate(item) {
			// 根据位置解析坐标
			console.log(item);
			return;
			const plugin = requirePlugin("routePlan");
			const key = "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X";
			const referer = "quick-park";
			const endPoint = JSON.stringify({
				name: carport.name,
				navigation: 1,
				latitude: carport.latitude,
				longitude: carport.longitude
			});
			uni.navigateTo({
				url: "plugin://routePlan/index?key=" + key + "&referer=" + referer + "&endPoint=" + endPoint
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.loading_wrapper {
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translate(-50%, -50%);
	z-index: 999;
}
.goods_wrapper {
	.goods_item {
		position: relative;
		background-color: #ffffff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		.item_header {
			display: flex;
			justify-content: space-between;
			text {
				&:nth-child(1) {
					font-size: 34rpx;
					font-weight: bold;
				}
				&:nth-child(2) {
					color: $uni-text-color-grey;
					font-size: 30rpx;
				}
			}
		}
		.item_body {
			display: flex;
			flex-direction: column;
			font-size: 32rpx;
			text {
				&:nth-child(1) {
					padding: 8rpx 0;
					color: $uni-text-color-grey;
				}
				&:nth-child(2) {
					padding: 8rpx 0;
					color: red;
					font-size: 34rpx;
					font-weight: 600;
				}
			}
		}
		.item_footer {
			position: absolute;
			right: 20rpx;
			bottom: 20rpx;
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			z-index: 999;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
