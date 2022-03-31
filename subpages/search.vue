<template>
	<view class="wrapper">
		<view class="search_wrapper"><van-search placeholder="搜索附近停车场" background="transprent" shape="round" input-class="input-class" field-class="field-class" /></view>
		<view class="preview_wrapper">区域占位-查询预览</view>
		<view class="history_wrapper">区域占位-历史记录</view>
		<view class="recommend_wrapper">
			<view v-for="item in recommends" :key="id" class="recommend_item">
				<view class="item_top">
					<text>{{ item.name }}</text>
					<view class="item_top_nav">
						<text>{{ item.distance }}</text>
						<image src="@/static/image/navigation.svg"></image>
					</view>
				</view>
				<view class="item_bottom">{{ item.address }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
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
	onLoad(options) {
		this.recommends = JSON.parse(options.markers);
	}
};
</script>

<style lang="scss" scoped>
.history_wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
	height: 10vh;
	border: 1rpx solid #efefef;
	background-color: #ffffff;
}
.preview_wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
	height: 30vh;
	border: 1rpx solid #efefef;
	background-color: #ffffff;
}
.recommend_wrapper{
	.recommend_item{
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx;
		.item_top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text{}
			.item_top_nav{
				image{
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
	}
}
</style>
