<template>
	<view class="wrapper">
		<view class="search_wrapper"><van-search placeholder="搜索附近停车场" background="transprent" shape="round" input-class="input-class" field-class="field-class" /></view>
		<view class="preview_wrapper">区域占位-查询预览</view>
		<view class="history_wrapper">区域占位-历史记录</view>
		<view class="recommend_wrapper">区域占位-附近推荐</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			recommends: []
		};
	},
	onLoad(options) {
		this.recommends = JSON.parse(options.markers);
	}
};
</script>

<style lang="scss" scoped>
.history_wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
	height: 10vh;
	border: 1rpx solid #EFEFEF;
	background-color: #FFFFFF;
}
.preview_wrapper,.recommend_wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20rpx;
	height: 30vh;
	border: 1rpx solid #EFEFEF;
	background-color: #FFFFFF;
}
</style>
