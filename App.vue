<script>
export default {
	onLaunch() {
		console.log("App")
		// 用户登录判断
		this.$hasLogin();
		// 获取并保存我的位置
		this.getMyLocation();
	},
	onShow() {},
	onHide() {},
	methods: {
		// 获取并保存我的位置
		getMyLocation() {
			uni.getLocation({
				success(res) {
					const longitude = res.longitude;
					const latitude = res.latitude;
					uni.setStorage({
						key: "my_location",
						data: { longitude, latitude }
					});
				}
			});
		}
	}
};
</script>

<style>
/*每个页面公共css */
@import "@/wxcomponents/vant/dist/common/index.wxss";
page {
	background-color: #efefef;
}
view {
	box-sizing: border-box;
}
</style>
