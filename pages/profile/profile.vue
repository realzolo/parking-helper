<template>
	<view class="wrapper">
		<view class="header">
			<view class="header_top">
				<van-image class="profile_image" round width="112rpx" height="112rpx" src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
				<view class="profile_info">
					<view class="profile_info_left">
						<text class="nickname">{{ nickname || "Zolo" }}</text>
						<text class="phone">{{ phone || "183********" }}</text>
					</view>
					<view class="profile_info_right">
						<van-icon name="arrow" color="#c8c9cc" size="30rpx"/>
					</view>
				</view>
			</view>
			<view class="header_bottom">
				<view v-for="item in metadata" :key="id" class="item">
					<text>{{ item.count }}</text>
					<text>{{ item.name }}</text>
				</view>
			</view>
		</view>
		<view class="bills">
			<van-cell-group>
				<van-cell :title="item.name" v-for="item in bills" :key="id" :icon="item.icon"><van-icon name="arrow" class="custom-icon" /></van-cell>
			</van-cell-group>
		</view>
		<view class="options">
			<van-cell-group>
				<van-cell :title="item.name" v-for="item in options" :key="id" :icon="item.icon"><van-icon name="arrow" class="custom-icon" /></van-cell>
			</van-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			metadata: [{ id: 1, name: "足迹", count: 55, to: "" }, { id: 2, name: "车位", count: 0, to: "" }, { id: 3, name: "消息", count: 4, to: "" }],
			bills: [{ id: 1, name: "钱包", icon: "gold-coin-o", to: "" }, { id: 2, name: "优惠券", icon: "coupon-o", to: "" }, { id: 3, name: "积分", icon: "discount", to: "" }],
			options: [
				{ id: 1, name: "我的订单", icon: "orders-o" },
				{ id: 2, name: "车牌管理", icon: "font-o" },
				{ id: 2, name: "分享好友", icon: "share-o" },
				{ id: 4, name: "我要投诉", icon: "service-o" },
				{ id: 5, name: "我要反馈", icon: "smile-comment-o" }
			]
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
.wrapper {
	.header {
		background-color: #ffffff;
		padding: 20rpx;
		.header_top {
			display: flex;
			align-items: center;
			.profile_image {
				margin: 20rpx;
			}
			.profile_info {
				width: 100%;
				display: flex;
				justify-content: space-between;
				.profile_info_left{
					display: flex;
					flex-direction: column;
					margin-left: 10rpx;
					.nickname {
						font-size: 34rpx;
						padding-bottom: 10rpx;
						color: $uni-text-color;
						font-weight: bold;
					}
					.phone {
						font-size: 28rpx;
						font-weight: normal;
						color: $uni-text-color-grey;
					}
				}
				.profile_info_right{
					van-icon{
						margin-right: 16rpx;
					}
				}
			}
		}
		.header_bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8rpx 20rpx;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: calc(100% / 5);
				font-size: 30rpx;
				color: $uni-text-color;
				// }
			}
		}
	}
	.bills {
		margin-top: 20rpx;
	}
	.options {
		margin-top: 20rpx;
	}
}
</style>
