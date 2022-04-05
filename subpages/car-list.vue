<template>
	<view>
		<van-notify id="van-notify" />
		<navigator :url="`/subpages/car-edit?data=${JSON.stringify(item)}&mode=update`" open-type="navigate" v-for="item in cars" :key="item._id">
			<van-cell center :title="item.license_plate"><van-icon slot="right-icon" name="edit" class="custom-icon" /></van-cell>
		</navigator>
		<view class="button_wrapper"><van-button type="info" round icon="plus" @click="toEditPage" custom-style="width: 680rpx; height: 75rpx">添加车辆</van-button></view>
	</view>
</template>

<script>
const uco_car = uniCloud.importObject("car");
export default {
	data() {
		return {
			cars: []
		};
	},
	onLoad() {},
	onShow() {
		this.getDataFromDB();
	},
	onPullDownRefresh() {
		this.getDataFromDB();
	},
	methods: {
		async getDataFromDB() {
			const { user_id } = uni.getStorageSync("_user");
			const { code, data } = await uco_car.get(user_id);
			if (code != 0) {
				this.$notify({ type: "danger", message: "网络错误，获取数据失败!" });
				return;
			}
			this.cars = data;
			uni.stopPullDownRefresh();
		},
		toEditPage() {
			uni.navigateTo({
				url: "/subpages/car-edit"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.button_wrapper {
	position: absolute;
	display: flex;
	justify-content: center;
	width: 100%;
	bottom: 40rpx;
}
</style>
