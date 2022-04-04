<template>
	<view class="wrapper">
		<van-toast id="van-toast" />
		<view class="image_wrapper"><van-image round width="188rpx" height="188rpx" src="/static/image/logo.png" /></view>
		<view class="text_wrapper">
			<text>即停APP</text>
			<text>你的智能停车助手</text>
		</view>
		<view class="button_wrapper"><van-button type="info" block round @click="toLogin" custom-style="width: 70%; height: 80rpx">微信用户一键登录</van-button></view>
	</view>
</template>

<script>
const uco_user = uniCloud.importObject("user");
export default {
	methods: {
		async toLogin() {
			const userinfo = await this.getUserInfo();
			if (!userinfo) return;

			this.$toast.loading({ message: "登录中...", forbidClick: true, duration: 0 });
			let res = await uni.login({ provider: "weixin" });
			const { errMsg, code } = res[1] || {};

			if (errMsg == "login:ok") {
				res = await uco_user.login(code, userinfo);
				if (res.code != 0) {
					this.$toast.fail("登录失败！");
					return;
				}
				uni.setStorageSync("_user", {
					user_id: res.user_id,
					user_info: userinfo
				});
				this.$toast.success("登录成功！");
				uni.switchTab({
					url: `/pages/index/index`
				});
			} else {
				this.$toast.fail("获取用户信息失败，请稍后重试！");
			}
		},
		async getUserInfo() {
			const res = await uni.getUserProfile({ desc: "获取用户信息" });
			const { avatarUrl: avatar, nickName: nickname } = res[1].userInfo;
			return { avatar, nickname };
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #ffffff;
	width: 100vw;
	height: 100vh;
}
.image_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 300rpx;
}
.text_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 30rpx 50rpx;
	text {
		&:nth-child(1) {
			font-size: 34rpx;
			font-weight: 600;
		}
		&:nth-child(2) {
			font-size: 28rpx;
			margin-top: 15rpx;
			color: $uni-text-color-grey;
		}
	}
}
.button_wrapper {
	margin-top: 160rpx;
}
</style>
