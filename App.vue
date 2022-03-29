<script>
	export default {
		onLaunch: function() {
			this.getMyLocation() // 获取并保存我的位置
		},
		onShow: function() {
		},
		onHide: function() {
		},
		methods:{
			// 获取并保存我的位置
			getMyLocation() {
				uni.getLocation({
					success(res) {
						const longitude = res.longitude;
						const latitude = res.latitude;
						uni.setStorage({
							key: "my_location",
							data: { longitude, latitude }
						})
					}
				});
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "@/wxcomponents/vant/dist/common/index.wxss";
	page{
		background-color: #EFEFEF;
	}
	view{
		box-sizing: border-box;
	}
</style>
