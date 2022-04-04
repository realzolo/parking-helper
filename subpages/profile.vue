<template>
	<view class="wrapper">
		<view class="item">
			<text>头像</text>
			<view class="right">
				<!-- <van-image width="54" height="54" radius="6" fit="cover" :src="info.avatar" /> -->
				<!-- <van-uploader :file-list="[{url: info.avatar}]" deletable="false" max-count="1" @after-read="afterRead" /> -->
				<van-uploader @after-read="onUpload"><van-image width="54" height="54" radius="6" fit="cover" :src="info.avatar" /></van-uploader>
				<van-icon name="arrow" color="#999" style="margin-left: 10rpx;" />
			</view>
		</view>
		<navigator :url="`/subpages/profile-edit?type=nickname&data=${info.nickname}`" open-type="navigate" class="item">
			<text>昵称</text>
			<view class="right">
				<text>{{ info.nickname }}</text>
				<van-icon name="arrow" color="#999" style="margin-left: 10rpx;" />
			</view>
		</navigator>
		<navigator :url="`/subpages/profile-edit?type=phone&data=${info.phone}`" open-type="navigate" class="item">
			<text>电话号码</text>
			<view class="right">
				<text>{{ info.phone || "***" }}</text>
				<van-icon name="arrow" color="#999" style="margin-left: 10rpx;" />
			</view>
		</navigator>
		<navigator :url="`/subpages/profile-edit?type=address&data=${info.address}`" open-type="navigate" class="item">
			<text>我的地址</text>
			<view class="right">
				<text>{{ info.address || "***" }}</text>
				<van-icon name="arrow" color="#999" style="margin-left: 10rpx;" />
			</view>
		</navigator>
	</view>
</template>

<script>
const uco_user = uniCloud.importObject("user");
const uco_file = uniCloud.importObject("file");
export default {
	data() {
		return {
			info: {}
		};
	},
	async onShow() {
		await this.getUserInfo();
	},
	methods: {
		async getUserInfo() {
			const { user_id } = uni.getStorageSync("_user");
			const { code, data } = await uco_user.getUserInfo(user_id);
			if (code != 0) {
				this.$notify({ type: "danger", message: "网络错误,获取数据失败！" });
				return;
			}
			this.info = data[0];
		},
		// 上传头像
		async onUpload(e) {
			const originAvatar = this.info.avatar;
			const { url } = e.detail.file;
			const ext = url.substring(url.lastIndexOf("."));
			const res = await uniCloud.uploadFile({
				filePath: url,
				cloudPath: `avatar/${new Date().getTime()}${ext}`
			});
			const { fileID } = res;
			if (!fileID) {
				this.$notify({ type: "danger", message: "网络错误,图片上传失败！" });
				return;
			}
			this.info.avatar = fileID;
			const { user_id } = uni.getStorageSync("_user");
			await uco_user.updateUserinfo(user_id, { avatar: fileID });
			await uco_file.deleteFile(originAvatar);  // 将原头像删除
		}
	}
};
</script>

<style lang="scss" scoped="">
.wrapper {
	width: 100vw;
	background-color: #ffffff;
	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		border-bottom: 1px solid #efefef;
		font-size: 28rpx;
		.right {
			display: flex;
			align-items: center;
		}
	}
}
</style>
