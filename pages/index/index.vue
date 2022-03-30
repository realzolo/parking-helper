<template>
	<view class="wrapper">
		<view class="search_wrapper"><van-search placeholder="搜索附近停车场" background="transprent" shape="round" input-class="input-class" field-class="field-class"/></view>
		<view class="map_wrapper"><map :latitude="location.latitude" :longitude="location.longitude"></map></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			location: {},
			banners: [
				{
					id: 1,
					name: "",
					src: "https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/3931/202203272035786.png"
				},
				{
					id: 2,
					name: "",
					src: "https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/3931/202203272035786.png"
				}
			],
			recommends: [
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
				}
			]
		};
	},
	onLoad() {
		this.location = uni.getStorageSync("my_location");
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.search_wrapper {
		position: absolute;
		top: 40rpx;
		width: 100vw;
		z-index: 999;
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
}
</style>
<style>
.input-class {
	height: 80rpx !important;
}
.field-index--van-field{
	display: flex !important;
	align-items: center !important;
}
</style>
