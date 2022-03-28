<template>
	<view>
		<view class="swiper_wrapper">
			<swiper indicator-dots circular autoplay interval="3000">
				<swiper-item v-for="item in banners" :key="id"><image :src="item.src" mode="widthFix"></image></swiper-item>
			</swiper>
		</view>
		<view class="home_wrapper">
			<view class="nav_wrapper">
				<view class="row row_1">
					<view class="col">
						<text>找车位</text>
						<image src="@/static/image/search.svg"></image>
					</view>
					<view class="col">
						<text>附近3KM停车场</text>
						<image src="@/static/image/park.svg"></image>
					</view>
				</view>
				<view class="row row_2">
					<view class="col">
						<text>租车位</text>
						<image src="@/static/image/rent.svg"></image>
					</view>
					<view class="col">
						<text>全天</text>
						<image src="@/static/image/allday.svg"></image>
					</view>
					<view class="col">
						<text>白天</text>
						<image src="@/static/image/sun.svg"></image>
					</view>
					<view class="col">
						<text>夜间</text>
						<image src="@/static/image/moon.svg"></image>
					</view>
				</view>
				<view class="row row_3">
					<view class="col">
						<text>拼车位</text>
						<image src="@/static/image/booking.svg"></image>
					</view>
					<view class="col">
						<text>医院预约</text>
						<image src="@/static/image/hospital.svg"></image>
					</view>
				</view>
			</view>
			<view class="rmd_wrapper">
				<view class="rmd_title">系统推荐</view>
				<navigator class="rmd_item" v-for="item in recommends" :url="item.to" :key="id">
					<view class="rmd_item_top">
						<text>{{ item.name }}</text>
						<view class="rmd_item_top_nav">
							<text>{{ item.distance }}</text>
							<image src="@/static/image/navigator.svg"></image>
						</view>
					</view>
					<view class="rmd_item_bottom">{{ item.address }}</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			banners: [
				{
					id: 1,
					name: '',
					src: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/3931/202203272035786.png'
				},
				{
					id: 2,
					name: '',
					src: 'https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/3931/202203272035786.png'
				}
			],
			recommends: [
				{
					id: 1,
					name: '停车场',
					address: '甘肃省 武威市 民勤县',
					distance: '431M'
				},
				{
					id: 2,
					name: '草滩停车场',
					address: '西安交通大学城市学院',
					distance: '232M'
				},
				{
					id: 3,
					name: '停车场',
					address: '黑龙江省 大兴安岭地区 呼玛县',
					distance: '21M'
				}
			]
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.home_wrapper {
	padding: 20rpx;
	.nav_wrapper {
		margin-top: 15rpx;
		.row {
			display: flex;
			height: 150rpx;
			margin-bottom: 15rpx;
			.col {
				position: relative;
				display: flex;
				border-radius: 15rpx;
				color: #ffffff;
				font-weight: 500;
				font-size: 34rpx;
				&:nth-child(1) {
					min-width: 220rpx;
					margin: 0 5rpx;
				}
				text {
					margin-top: 25rpx;
					margin-left: 25rpx;
				}
			}
			image {
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				right: 20rpx;
				bottom: 20rpx;
				margin-left: 15rpx;
			}
		}
	}
	.rmd_wrapper {
		padding: 30rpx 0;
		.rmd_title {
			font-weight: bold;
			margin-bottom: 25rpx;
		}
		.rmd_item{
			margin: 10rpx 0;
			padding: 15rpx;
			height: 130rpx;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			.rmd_item_top{
				display: flex;
				justify-content: space-between;
				margin-bottom: 15rpx;
				text{
					font-weight: bold;
					font-size: 34rpx;
				}
				.rmd_item_top_nav{
					display: flex;
					align-items: center;
					text{
						font-weight: normal;
						font-size: 30rpx;
						color: $uni-text-color-grey;
					}
					image{
						width: 60rpx;
						height: 60rpx;
						margin-left: 10rpx;
					}
				}
			}
			.rmd_item_bottom{
				font-size: 30rpx;
				color: $uni-text-color-grey;
			}
		}
	}
}
.row_1 .col:nth-child(2),
.row_3 .col:nth-child(2) {
	flex: 1;
	height: 100%;
	margin: 0 5rpx;
}
.row_2 .col {
	flex: 1;
	height: 100%;
	margin: 0 5rpx;
	background-color: rgba(166, 202, 250, 1);
}
.row_1 .col:nth-child(1) {
	background-color: rgb(253, 132, 74);
}
.row_2 .col:nth-child(1) {
	background-color: rgb(71, 155, 254);
}
.row_3 .col:nth-child(1) {
	background-color: rgb(64, 193, 173);
}
.row_1 .col:nth-child(2) {
	background-color: rgba(253, 131, 74, 0.767);
}
.row_3 .col:nth-child(2) {
	background-color: rgba(64, 193, 173, 0.767);
}
</style>
