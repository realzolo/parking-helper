<template>
	<view class="wrapper">
		<van-dialog id="van-dialog" />
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item, index) in carport.images" :key="index" class="swiper_item_wrapper"><image :src="item.url"></image></swiper-item>
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
				<text>价格：</text>
				<text>{{ carport.price }}</text>
			</view>
			<view class="param_item">
				<text>联系方式：</text>
				<text>{{ carport.phone }}</text>
			</view>
			<view class="param_item">
				<text>简介：</text>
				<text style="line-height: 1.5em;">{{ carport.description }}</text>
			</view>
			<view class="param_item">
				<text>工作时间：</text>
				<text>{{ carport.worktime }}</text>
			</view>
			<view class="param_item">
				<text>车位剩余：</text>
				<text>{{ carport.total || 0 }} 元/时</text>
			</view>
		</view>
		<view class="button_wrapper"><van-button type="info" round block custom-style="width: 90%;height: 90rpx" @click="createOrder">创建订单</van-button></view>
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
		this.init(options);
	},
	methods: {
		init(options) {
			console.log(options);
			if (options.data) {
				this.carport = JSON.parse(options.data);
			}
		},
		createOrder() {
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
				.catch(() => {
					// on cancel
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.swiper_item_wrapper {
	display: flex;
	justify-content: center;
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
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #ffffff;
	border-top: 1rpx solid #efefef;
	box-shadow: 10px 10px 5px #888888;
	padding: 20rpx 0;
	z-index: 1;
}
</style>
