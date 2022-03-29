<template>
	<view class="wrapper">
		<view class="result_wrapper"><image src="../static/image/pay-success.svg"></image></view>
		<view class="info_wrapper">
			<text>{{ `订单【${carport.name}】创建成功!` }}</text>
			<text>{{ `单价: ${carport.price} 元/小时` }}</text>
			<text>{{ `计费时间: ${getCurrentTime()}` }}</text>
		</view>
		<view class="button_wrapper"><van-button type="info" round block custom-style="width: 50%" @click="toOrderPage">在我的订单中查看</van-button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carport: {}
		};
	},
	onLoad(options) {
		this.carport = JSON.parse(options.carport);
	},
	methods: {
		toOrderPage() {
			uni.switchTab({
				url: "/pages/order/order"
			});
		},
		getCurrentTime() {
			const date = new Date();
			const _d = date.toLocaleDateString().replaceAll(/\//g, "-");
			const _t = date.toLocaleTimeString();
			return _d + _t;
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	height: 100vh;
	background-color: #ffffff;
}
.result_wrapper {
	display: flex;
	justify-content: center;
}
.info_wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-top: 60rpx;
	text {
		font-size: 32rpx;
		margin: 15rpx;
		color: #555555;
	}
}
.button_wrapper {
	margin-top: 100rpx;
}
</style>
