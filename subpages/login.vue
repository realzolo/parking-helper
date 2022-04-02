<template>
	<view>
		<view class="image_wrapper">
			<van-image round width="188rpx" height="188rpx" src="/static/image/logo.png" />
			<text>即停</text>
		</view>
		<view class="button_wrapper"><van-button type="info" block round @click="toLogin" custom-style="width: 70%; height: 80rpx">微信登录</van-button></view>
	</view>
</template>

<script>
const uco_user = uniCloud.importObject("user");
export default {
	methods: {
		async toLogin() {
			const userinfo = await this.getUserInfo();
			if (!userinfo) return;

			uni
				.login({
					provider: "weixin"
				})
				.then(async res => {
					const loginRes = await uco_user.login(res[1].code, userinfo);
					if (loginRes.code != 0) {
						// handle error.
					}
					uni.setStorageSync("_user", {
						user_id: loginRes.user_id,
						user_info: userinfo
					});
					// 问题： 为什么使用 redirectTo、navigtorTo 不起作用？
					uni.reLaunch({
						url: "/pages/index/index"
					});
				});
		},
		getUserInfo() {
			return new Promise((resolve, reject) => {
				uni
					.getUserProfile({
						desc: "获取用户信息"
					})
					.then(res => {
						const { avatarUrl, nickName } = res[1].userInfo;
						resolve({ avatar: avatarUrl, nickname: nickName });
					})
					.catch(err => {
						// handle error.
					});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.image_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 200rpx 0 100rpx;

	text {
		margin-top: 40rpx;
	}
}

.button_wrapper {
}
</style>
