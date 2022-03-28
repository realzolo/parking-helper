<template>
	<view class="">
		<view class="nocoupon_wrapper" v-if="coupon===0">
			<image src="@/static/image/nocoupon.svg"></image>
			<text>您目前还没有积分</text>
			<van-button plain type="info" round size="small" custom-style="margin-top: 40rpx; background: #efefef">了解积分</van-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coupon: 0
			};
		}
	};
</script>

<style lang="scss" scoped>
	.nocoupon_wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		text{
			color: $uni-text-color-disable;
			font-size: 28rpx;
		}
	}
</style>
