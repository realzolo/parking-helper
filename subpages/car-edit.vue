<template>
	<view>
		<van-notify id="van-notify" />
		<van-cell-group>
			<van-field :value="carInfo.plateNo" placeholder="请输入车牌号" label="车牌号" @change="savePlateNo" />
			<van-field :value="carInfo.owner" placeholder="请输入所属人姓名" label="所属人" @change="saveOwner" />
			<van-field :value="carInfo.phone" placeholder="请输入联系电话" label="联系电话" @change="savePhone" />
		</van-cell-group>
		<view class="button_wrapper">
			<van-button type="danger" round icon="delete-o" block @click="doSaveOrDelete('delete')" custom-style="height: 75rpx;width: 90%;margin: 40rpx">删除</van-button>
			<van-button type="info" round icon="certificate" block @click="doSaveOrDelete('save')" custom-style=" height: 75rpx;width: 90%">保存</van-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			carInfo: {
				plateNo: "",
				owner: "",
				phone: ""
			}
		};
	},
	onLoad(options) {
		if (options.car) {
			this.carInfo = JSON.parse(options.car);
		}
	},
	methods: {
		doSaveOrDelete(operation) {
			const { plateNo, owner, phone } = this.carInfo;
			if (operation === "save") {
				if (!plateNo.trim() || !owner.trim() || !phone.trim()) {
					this.$notify({ type: "warning", message: "请将内容填写完整!" });
					return;
				}
			}
			const data = JSON.stringify({
				operation: operation,
				car: this.carInfo
			});
			uni.navigateTo({
				url: `/subpages/carlist?data=${data}`
			});
		},
		savePlateNo(e) {
			this.carInfo.plateNo = e.detail;
		},
		saveOwner(e) {
			this.carInfo.owner = e.detail;
		},
		savePhone(e) {
			this.carInfo.phone = e.detail;
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
