<template>
	<view class="wrapper">
		<van-notify id="van-notify" />
		<view class="nickname_wrapper">
			<van-cell-group><van-field :value="value" @change="binding" /></van-cell-group>
		</view>
		<view class="button_wrapper"><van-button round block type="info" @click="onSave">保存</van-button></view>
	</view>
</template>

<script>
const uco_user = uniCloud.importObject("user");
export default {
	data() {
		return {
			value: ""
		};
	},
	onLoad(options) {
		this.init(options);
	},
	methods: {
		init({ type, data }) {
			this.type = type;
			this.value = data == "undefined" ? "" : data;
			let title = "";
			switch (type) {
				case "nickname":
					title = "更改昵称";
					break;
				case "phone":
					title = "更改手机号码";
					break;
				case "address":
					title = "更改地址";
					break;
				default:
					break;
			}
			uni.setNavigationBarTitle({
				title: title
			});
		},
		binding(e) {
			this.value = e.detail;
		},
		async onSave() {
			const { type, value } = this;
			if (type != "nickname" && type != "phone" && type != "address") return;
			const { user_id } = uni.getStorageSync("_user");

			const userinfo = {};
			userinfo[type] = value;
			const { code } = await uco_user.updateUserinfo(user_id, userinfo);
			if (code != 0) {
				this.$notify({ type: "danger", message: "修改失败！" });
				return;
			}
			this.$notify({ type: "success", message: "修改成功！" });
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 1000);
		}
	}
};
</script>

<style scoped>
.button_wrapper {
	margin-top: 200rpx;
	padding: 0 10%;
}
</style>
