<template>
	<view>
		<van-notify id="van-notify" />
		<van-cell-group>
			<van-field :value="carport.name" title-width="2rem" placeholder="请输入车位/车库名称" label="名称" @change="save('name', $event)" clearable />
			<van-field :value="carport.address" title-width="2rem" placeholder="请输入车位/车库详细地址" label="地址" @change="save('address', $event)" clearable />
			<van-field :value="carport.price" title-width="2rem" placeholder="请输入车位单价(元/时)" label="价格" @change="save('price', $event)" clearable />
			<van-field :value="carport.phone" title-width="2rem" placeholder="请输入联系人电话" label="电话" @change="save('phone', $event)" clearable />
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
			carport: {
				name: "",
				address: "",
				price: 0.0,
				phone: ""
			}
		};
	},
	onLoad(options) {
		if (options.data) {
			this.carport = JSON.parse(options.data);
		}
	},
	methods: {
		doSaveOrDelete(operation) {
			const { name, address, price, phone } = this.carport;
			// if (operation === "save") {
			// 	if (!name.trim() || !address.trim() | !phone.trim()) {
			// 		this.$notify({ type: "warning", message: "请将内容填写完整!" });
			// 		return;
			// 	}
			// }
			const data = JSON.stringify({
				operation: operation,
				carport: this.carport
			});
			uni.navigateTo({
				url: `/subpages/carport-list?data=${data}`
			});
		},
		save(field, e) {
			this.carport[field] = e.detail;
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
