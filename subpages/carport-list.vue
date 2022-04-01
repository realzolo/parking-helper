<template>
	<view class="wrapper">
		<view class="nodata_wrapper" v-if="carports.length === 0">
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
export default {
	data() {
		return {
			carports: [
				{
					id: 1,
					name: "西安交通大学城市学院1号车位",
					address: "西安未央区尚稷路西安交通大学城市学院",
					price: 23.0
				}
			]
		};
	},
	onLoad(options) {
		const dataString = options.data;
		if (dataString) {
			const { operation, carport } = JSON.parse(dataString);
			if (operation === "save") {
				carport.id = this.carports.length + 1;
				this.carports.push(carport);
				return;
			}
			if (operation === "delete") {
				this.carports = this.carports.filter(c => {
					return c.id != carport.id;
				});
			}
		}
	},
	methods: {
		toPublish() {
			uni.navigateTo({
				url: "/subpages/carport-edit"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
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
