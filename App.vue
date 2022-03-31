<script>
export default {
	onLaunch() {
		// 用户登录判断
		this.$hasLogin();
	},
	onShow() {},
	onHide() {}
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
