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
export default {
	methods: {
		toLogin() {
			uni.getUserProfile({
				desc: "获取用户信息",
				success(res) {
					// 存储用户信息
					const { avatarUrl, nickName } = res.userInfo;
					uni.setStorage({
						key: "user_info",
						data: JSON.stringify({ avatar: avatarUrl, nickname: nickName })
					});
					// 请求登录
					uni.login({
						provider: "weixin",
						success(res) {
							// TODO 向后端发送请求登录
							// res -> login.js:144 {errMsg: "login:ok", code: "0833ywGa1ET4VC0SVzHa1Vm01p03ywGz"}
							// 1. 携带此 code 请求后端认证端口, 同时携带用户信息(用户不存在时注册)
							// 2. 后端根据code请求微信官方API,获取openid
							// 3. 后端根据此openid查表。
							// 		3.1 数据已存在：给前端返回登陆成功
							// 		3.1 数据不存在：插入数据，给前端返回登陆成功
							// 3. 后端将openid返回给前端，前端保存在storage中

							uni.setStorageSync({
								key: "user_id",
								data: "o7_pW5VjCgnTu-SEpal7q37xQyMs"
							});
							uni.switchTab({
								url: "/pages/index/index"
							});
						},
						fail(e) {
							this.$toast("系统错误!");
						}
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
	.image_wrapper{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 200rpx 0 100rpx;
		text{
			margin-top: 40rpx;
		}
	}
	.button_wrapper{
		
	}
</style>
