<template>
	<view>
		<van-notify id="van-notify" />
		<view class="loading_wrapper" v-show="loading"><van-loading vertical type="spinner">加载中...</van-loading></view>
		<van-cell-group>
			<van-field :value="carport.name" title-width="4rem" placeholder="请输入车位/车库名称" label="车位名称" @change="save('name', $event)" clearable />
			<van-field :value="carport.address" title-width="4rem" placeholder="请输入车位/车库详细地址" label="所在地址" @change="save('address', $event)" clearable />
			<van-field :value="carport.price" title-width="4rem" placeholder="请输入车位单价(元/时)" label="单位价格" @change="save('price', $event)" clearable />
			<van-field :value="carport.phone" title-width="4rem" placeholder="请输入联系人电话" label="联系电话" @change="save('phone', $event)" clearable />
			<van-field :value="carport.description" title-width="4rem" placeholder="请简要介绍一下您的车位/车库" label="简要描述" @change="save('description', $event)" clearable />
			<van-field :value="carport.worktime" title-width="4rem" placeholder="请输入工作时间" label="工作时间" @change="save('worktime', $event)" clearable />
			<van-field :value="carport.total" title-width="4rem" placeholder="请输入车位剩余数量" label="车位数量" @change="save('total', $event)" clearable />
			<!-- 车位图片描述 -->
		</van-cell-group>
		<view class="button_wrapper">
			<van-button v-if="isEdit" type="danger" round icon="delete-o" block @click="doSaveOrDelete('delete')" custom-style="height: 75rpx;width: 90%;margin: 40rpx">删除</van-button>
			<van-button type="info" round icon="certificate" block @click="doSaveOrDelete('save')" custom-style=" height: 75rpx;width: 90%">保存</van-button>
		</view>
	</view>
</template>

<script>
import { isEmpty } from "@/utils/string-utils";
const uco_carport = uniCloud.importObject("carport");
export default {
	data() {
		return {
			isEdit: false,
			carport: {
				name: "",
				address: "",
				price: 0.0,
				phone: "",
				description: "",
				worktime: "",
				total: 0
			},
			loading: false
		};
	},
	onLoad(options) {
		this.init(options);
	},
	methods: {
		async doSaveOrDelete(operation) {
			const { name, address, price, phone, description, worktime, total } = this.carport;
			const { user_id } = uni.getStorageSync("_user");
			// 发布操作
			if (operation == "save") {
				if (isEmpty(name) || isEmpty(address) || isEmpty(phone) || isEmpty(description) || isEmpty(worktime)) {
					this.$notify({ type: "warning", message: "请将内容填写完整!" });
					return;
				}
				if (price <= 0 || total < 0) {
					this.$notify({ type: "warning", message: "数据非法!" });
					return;
				}
				this.loading = true;
				let result;
				if (this.isEdit) {
					// 修改模式
					result = await uco_carport.update(user_id, this.carport);
				} else {
					// 创建模式
					result = await uco_carport.add(user_id, this.carport);
				}
				this.loading = false;
				if (result.code != 0) {
					this.$notify({ type: "danger", message: "发布失败!" });
					return;
				}
				this.$notify({ type: "success", message: "发布成功!" });
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			}
			// 删除操作
			if (operation == "delete") {
				console.log(user_id);
				console.log(this.carport._id);
				const result = await uco_carport.deleteByUserID(user_id, this.carport._id);
				if (result.code != 0) {
					this.$notify({ type: "error", message: "数据删除失败!" });
				} else {
					this.$notify({ type: "success", message: "删除成功!" });
					uni.navigateBack({
						delta: 1
					});
				}
			}
		},
		init(options) {
			if (options.data) {
				const data = JSON.parse(options.data);
				this.isEdit = true;
				this.carport = {
					_id: data._id,
					name: data.name || "",
					address: data.address || "",
					price: data.price || 0.0,
					phone: data.phone || "",
					description: data.description || "",
					worktime: data.worktime || "",
					total: data.total || 0
				};
			}
		},
		// 绑定输入框数据
		save(field, e) {
			this.carport[field] = e.detail;
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
.button_wrapper {
	position: absolute;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	width: 100%;
	bottom: 120rpx;
}
</style>
