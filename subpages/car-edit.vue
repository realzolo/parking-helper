<template>
	<view>
		<van-notify id="van-notify" />
		<van-cell-group><van-field :value="carInfo.license_plate" placeholder="请输入车牌号" label="车牌号" @change="binding('license_plate', $event)" /></van-cell-group>
		<view class="button_wrapper">
			<van-button v-if="mode == 'update'" type="danger" round icon="delete-o" block @click="onDelete" custom-style="height: 75rpx;width: 90%;margin: 40rpx">删除</van-button>
			<van-button type="info" round icon="certificate" block @click="onSave" custom-style=" height: 75rpx;width: 90%">保存</van-button>
		</view>
	</view>
</template>

<script>
const uco_car = uniCloud.importObject("car");
export default {
	data() {
		return {
			carInfo: {
				_id: 0,
				license_plate: "",
				owner: ""
			},
			mode: ""
		};
	},
	onLoad(options) {
		this.init(options);
	},
	methods: {
		init(options) {
			const { data, mode } = options;
			if (mode == "update") {
				this.carInfo = JSON.parse(options.data);
			}
			this.mode = mode;
		},
		async onSave() {
			const { _id, license_plate } = this.carInfo;
			const { user_id } = uni.getStorageSync("_user");
			if (!license_plate.trim()) {
				this.$notify({ type: "warning", message: "数据无效!" });
				return;
			}
			let res;
			if (this.mode == "update") {
				res = await uco_car.update(_id, license_plate);
			} else {
				res = await uco_car.add(user_id, license_plate);
			}
			const { code, data, message } = res;
			if (code != 0) {
				this.$notify({ type: "warning", message: message });
				return;
			}
			this.$notify({ type: "success", message: "保存成功!" });
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 1000);
		},
		async onDelete() {
			const { _id, license_plate } = this.carInfo;
			const { code } = await uco_car.delete(_id, license_plate);
			if (code != 0) {
				this.$notify({ type: "warning", message: "删除失败" });
				return;
			}
			this.$notify({ type: "success", message: "删除成功!" });
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 500);
		},
		binding(key, e) {
			this.carInfo[key] = e.detail;
		}
	}
};
</script>

<style lang="scss" scoped>
.button_wrapper {
	position: absolute;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	width: 100%;
	bottom: 120rpx;
}
</style>
