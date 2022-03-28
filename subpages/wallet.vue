<template>
	<view class="wrapper">
		<view class="balance_wrapper">
			<view class="balance_text">
				<van-icon name="points" color="#999" custom-style=""/>
				<text>我的零钱</text>
			</view>
			<text class="balance">￥ {{ balance.toFixed(2) }}</text>
		</view>
		<view class="options_wrapper">
			<van-cell-group>
				<van-cell title="可提现金额" :value="'￥' + forWithdraw.toFixed(2)" />
				<van-cell title="待结算金额" :value="'￥' + forSettle.toFixed(2)" />
			</van-cell-group>
		</view>
		<view class="button_wrapper">
			<van-button type="primary" block custom-style="height: 80rpx">立即提现</van-button>
		</view>
		<view class="explain_wrapper">
			<text>常见问题</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			balance: 1322.2,
			forWithdraw: 0,
			forSettle: 0
		};
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.balance_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 240rpx;
		.balance_text {
			display: flex;
			align-items: center;
			text {
				margin-left: 8rpx;
				font-size: 30rpx;
				color: $uni-text-color-grey;
			}
		}
		.balance {
			font-size: 44rpx;
			font-weight: bold;
			padding: 20rpx;
		}
	}
	.options_wrapper {
	}
	.button_wrapper{
		margin-top: 80rpx;
		padding: 0 50rpx;
	}
	.explain_wrapper{
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		bottom: 30rpx;
		font-size: 26rpx;
		color: $uni-text-color-grey;
	}
}
</style>
