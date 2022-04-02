<template>
	<view class="wrapper">
		<van-notify id="van-notify" />
		<view class="loading_wrapper" v-show="loading"><van-loading vertical type="spinner">加载中...</van-loading></view>
		<view class="nodata_wrapper" v-if="!loading && carports.length === 0">
			<image src="../static/image/no-carport.svg"></image>
			<text>你暂未发布车位</text>
		</view>
		<view class="carport_wrapper" v-else>
			<navigator :url="`/subpages/carport-edit?data=${JSON.stringify(item)}`" open-type="navigate" v-for="item in carports" :key="id">
				<van-cell center :title="item.name" :label="item.address"><van-icon slot="right-icon" name="edit" class="custom-icon" :key="id" /></van-cell>
			</navigator>
		</view>
		<view class="button_wrapper"><van-button type="info" icon="plus" block round custom-style="width: 90%;" @click="toPublish">发布我的车位</van-button></view>
	</view>
</template>

<script>
const uco_carport = uniCloud.importObject("carport");
export default {
	data() {
		return {
			start: 0,
			carports: [],
			loading: true
		};
	},
	onShow() {
		this.start = 0;
		this.getDataFromDB();
	},
	onPullDownRefresh() {
		this.start = 0;
		this.getDataFromDB();
	},
	methods: {
		async getDataFromDB() {
			this.loading = true;
			const { user_id } = uni.getStorageSync("_user");
			const result = await uco_carport.getByUserID(user_id, this.start, 10);
			this.loading = false;
			this.start += 10;
			if (result.code != 0) {
				this.$notify({ type: "danger", message: "获取数据失败!" });
				return;
			}
			this.carports = result.data;
			uni.stopPullDownRefresh()
		},
		toPublish() {
			uni.navigateTo({
				url: "/subpages/carport-edit"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.loading_wrapper {
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translate(-50%, -50%);
	z-index: 999;
}
.nodata_wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: $uni-text-color-grey;
	font-size: 30rpx;
}
.button_wrapper {
	position: absolute;
	bottom: 60rpx;
	width: 100%;
}
</style>
