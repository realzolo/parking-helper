<template>
	<view class="wrapper">
		<van-dialog id="van-dialog" />
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in carport.images" :key="index">
				<image :src="item"></image>
			</swiper-item>
		</swiper>
		<view class="param_wrapper">
			<view class="param_item">
				<text>名称：</text>
				<text>{{ carport.name }}</text>
			</view>
			<view class="param_item">
				<text>地址</text>
				<text>{{ carport.address }}</text>
			</view>
			<view class="param_item">
				<text>简介：</text>
				<text>{{ carport.description }}</text>
			</view>
			<view class="param_item">
				<text>长期租用：</text>
				<text>{{ carport.can_rent ? "可以" : "不可以" }}</text>
			</view>
			<view class="param_item">
				<text>租用价格：</text>
				<text>{{ carport.rent_price }} 元/月</text>
			</view>
		</view>
		<view class="button_wrapper"><van-button type="info" round block custom-style="width: 90%" @click="onSubmit">创建订单</van-button></view>
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
		const carport = options.carport;
		if (carport) {
			this.carport = JSON.parse(carport);
			return;
		}
		uni.navigateBack({
			delta: 1
		});
	},
	methods: {
		onSubmit() {
			this.$dialog
				.confirm({
					title: "请确认您订单",
					message: `您确定要创建[${this.carport.name}]的订单吗？`
				})
				.then(() => {
					uni.navigateTo({
						url: `/subpages/result?carport=${JSON.stringify(this.carport)}`
					});
				})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #ffffff;
	height: 100vh;
}
.param_wrapper {
	padding: 30rpx;
	.param_item {
		display: flex;
		border-bottom: 1rpx solid $uni-border-color;
		text {
			color: $uni-text-color;
			font-size: 32rpx;
			line-height: 80rpx;
			&:nth-child(1) {
				min-width: 180rpx;
			}
		}
	}
}
.button_wrapper {
	width: 100%;
	position: absolute;
	bottom: 40rpx;
}
</style>
