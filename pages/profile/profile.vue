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
					<view class="profile_info_right"><van-icon name="arrow" color="#c8c9cc" size="30rpx" /></view>
				</view>
			</view>
			<view class="header_bottom">
				<navigator :url="item.to" open-type="navigate" v-for="item in metadata" :key="id" class="item">
					<text>{{ item.count }}</text>
					<text>{{ item.name }}</text>
				</navigator>
			</view>
		</view>
		<view class="bills">
			<van-cell-group>
				<navigator :url="item.to" open-type="navigate" v-for="item in bills" :key="id">
					<van-cell :title="item.name" :icon="item.icon"><van-icon name="arrow" class="custom-icon" /></van-cell>
				</navigator>
			</van-cell-group>
		</view>
		<view class="options">
			<van-cell-group>
				<navigator :url="item.to" :open-type="item.id === 1 ? 'switchTab' : 'navigate'" v-for="item in options" :key="id">
					<van-cell :title="item.name" :icon="item.icon"><van-icon name="arrow" class="custom-icon" /></van-cell>
				</navigator>
				<!-- 
				{ id: 2, name: "分享好友", icon: "share-o", to: "/pages/index/index" }
				-->
				<van-cell title="分享好友" icon="share-o" @click="onClick" ><van-icon name="arrow" class="custom-icon" /></van-cell>
			</van-cell-group>
			<van-share-sheet :show="showShare" title="立即分享给好友" :options="shareOptions" @select="onSelect" @close="onClose" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			metadata: [
				{ id: 1, name: "足迹", count: 55, to: "/pages/index/index" },
				{ id: 2, name: "车位", count: 0, to: "/pages/index/index" },
				{ id: 3, name: "消息", count: 4, to: "/pages/index/index" }
			],
			bills: [
				{ id: 1, name: "钱包", icon: "gold-coin-o", to: "/subpages/wallet" },
				{ id: 2, name: "优惠券", icon: "coupon-o", to: "/subpages/coupon" },
				{ id: 3, name: "积分", icon: "discount", to: "/subpages/point/point" }
			],
			options: [
				{ id: 1, name: "我的订单", icon: "orders-o", to: "/pages/order/order" },
				{ id: 2, name: "车辆管理", icon: "font-o", to: "/subpages/carlist" },
				{ id: 3, name: "停车记录", icon: "completed", to: "/pages/index/index" },
				{ id: 4, name: "我要投诉", icon: "service-o", to: "/pages/index/index" },
				{ id: 5, name: "我要反馈", icon: "smile-comment-o", to: "/pages/index/index" }
			],
			showShare: false,
			shareOptions: [
				{ name: "微信", icon: "wechat", openType: "share" },
				{ name: "复制链接", icon: "link" },
				{ name: "分享海报", icon: "poster" },
				{ name: "二维码", icon: "qrcode" }
			]
		};
	},
	methods: {
		onClick(event) {
			this.showShare = true;
		},

		onClose() {
			this.showShare = false;
		},

		onSelect(event) {
			// Toast(event.detail.name);
			console.log(event.detail.name)
			this.onClose();
		}
	}
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
				.profile_info_left {
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
				.profile_info_right {
					van-icon {
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
