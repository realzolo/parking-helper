<template>
	<view class="f-box" hover-class="f-box-hover">
		<view class="s-box" hover-class="s-box-hover">小</view>
		大
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.f-box {
	width: 100px;
	height: 100px;
	background-color: $uni-color-success;
	.s-box {
		width: 50px;
		height: 50px;
		background-color: $uni-color-error;
	}
}
.f-box-hover {
	background-color: $uni-color-warning;
}
.s-box-hover {
	background-color: $uni-color-primary;
}
</style>
