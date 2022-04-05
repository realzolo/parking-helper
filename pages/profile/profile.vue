<template>
	<view class="wrapper">
		<van-toast id="van-toast" />
		<view class="header">
			<navigator url="/subpages/profile" open-type="navigate" class="header_top">
				<van-image class="profile_image" round width="112rpx" height="112rpx" :src="userInfo.avatar" fit="cover" />
				<view class="profile_info">
					<view class="profile_info_left">
						<text class="nickname">{{ userInfo.nickname || "***" }}</text>
						<text class="phone">{{ userInfo.phone || "***********" }}</text>
					</view>
					<view class="profile_info_right"><van-icon name="arrow" color="#c8c9cc" size="30rpx" /></view>
				</view>
			</navigator>
			<view class="header_bottom">
				<navigator :url="item.to" open-type="navigate" class="item">
					<text>足迹</text>
					<text>0</text>
				</navigator>
				<navigator :url="item.to" open-type="navigate" class="item">
					<text>车位</text>
					<text>{{ carportCount }}</text>
				</navigator>
				<navigator :url="item.to" open-type="navigate" class="item">
					<text>消息</text>
					<text>0</text>
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
				<navigator :url="item.to" open-type="navigate" v-for="item in options" :key="id">
					<van-cell :title="item.name" :icon="item.icon"><van-icon name="arrow" class="custom-icon" /></van-cell>
				</navigator>
				<van-cell title="分享好友" icon="share-o" @click="onClick"><van-icon name="arrow" class="custom-icon" /></van-cell>
				<!-- 待开发 -->
				<van-cell title="我要投诉" icon="service-o" @click="this.$toast('功能正在开发中...')"><van-icon name="arrow" class="custom-icon" /></van-cell>
				<van-cell title="我要反馈" icon="share-o" @click="this.$toast('功能正在开发中...')"><van-icon name="arrow" class="custom-icon" /></van-cell>
			</van-cell-group>
			<van-share-sheet :show="showShare" title="立即分享给好友" :options="shareOptions" @select="onSelect" @close="onClose" />
		</view>
	</view>
</template>

<script>
const uco_user = uniCloud.importObject("user");
const uco_carport = uniCloud.importObject("carport");
export default {
	data() {
		return {
			userInfo: {},
			carportCount: 0,
			bills: [
				{ id: 1, name: "钱包", icon: "gold-coin-o", to: "/subpages/wallet" },
				{ id: 2, name: "优惠券", icon: "coupon-o", to: "/subpages/coupon" },
				{ id: 3, name: "积分", icon: "discount", to: "/subpages/point/point" }
			],
			options: [
				{ id: 1, name: "我的车位", icon: "orders-o", to: "/subpages/carport-list" },
				{ id: 2, name: "我的爱车", icon: "font-o", to: "/subpages/car-list" },
				{ id: 3, name: "停车记录", icon: "completed", to: "/pages/index/index" }
				// { id: 4, name: "我要投诉", icon: "service-o", to: "/pages/index/index" },
				// { id: 5, name: "我要反馈", icon: "smile-comment-o", to: "/pages/index/index" }
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
	async onLoad() {
		await this.getUserInfo();
		await this.getCount();
	},
	onReady() {
		this.$hasLogin();
	},
	methods: {
		async getUserInfo() {
			const { user_id } = uni.getStorageSync("_user");
			const { code, data } = await uco_user.getUserInfo(user_id);
			if (code != 0) {
				this.$notify({ type: "danger", message: "网络错误,获取数据失败！" });
				return;
			}
			this.userInfo = data[0];
		},
		async getCount() {
			const { user_id } = uni.getStorageSync("_user");
			const {code,data} = await uco_carport.getCount(user_id);
			this.carportCount = data;
		},
		onClick(event) {
			this.showShare = true;
		},

		onClose() {
			this.showShare = false;
		},

		onSelect(event) {
			// Toast(event.detail.name);
			console.log(event.detail.name);
			this.onClose();
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	background-color: #ffffff;
	.header_top {
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx 0 20rpx;
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
		padding: 0rpx 40rpx 20rpx 40rpx;
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
</style>
