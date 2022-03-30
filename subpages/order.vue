<template>
	<view class="wrapper">
		<van-dialog id="van-dialog" />
		<view class="param_wrapper">
			<view class="param_item">
				<text>名称：</text>
				<text>{{ carport.name }}</text>
			</view>
			<view class="param_item">
				<text>订单状态：</text>
				<text>{{ statusArray[0] }}</text>
			</view>
			<view class="param_item">
				<text>地址</text>
				<text>{{ carport.address }}</text>
			</view>
			<view class="param_item">
				<text>简介：</text>
				<text style="line-height: 1.5em;">{{ carport.description }}</text>
			</view>
			<view class="param_item">
				<text>购买方式：</text>
				<text>{{ carport.method ? "按时计费" : "包月" }}</text>
			</view>
			<view class="param_item" v-if="carport.can_rent">
				<text>价格：</text>
				<!-- 按时计费/包月介个 -->
				<text>{{ "*" }}</text>
			</view>
			<view class="param_item">
				<text>开始时间：</text>
				<!-- 订单创建时间 -->
				<text>{{ carport.cerated_at || "*" }}</text>
			</view>
			<view class="param_item" v-if="carport.status == ORDER_STATUS.PREFECT || carport.status == ORDER_STATUS.EVALUATE">
				<text>结束时间：</text>
				<!-- 订单结束时间 -->
				<text>{{ carport.finised_at || "*" }}</text>
			</view>
			<view class="param_item">
				<!-- 按时计费时显示：(当前时间-订单创建时间的小时数) * 单价 -->
				<text>当前消费：</text>
				<text>{{ carport.price * 10 || "*" }} 元</text>
			</view>
			<view class="param_item" v-if="carport.status == ORDER_STATUS.PREFECT || carport.status == ORDER_STATUS.EVALUATE">
				<text>订单金额：</text>
				<!-- 订单结束状态显示 -->
				<text>{{ carport.price * 10 || "*" }} 元</text>
			</view>
			<view class="param_item">
				<text>卖家昵称：</text>
				<text>{{}}</text>
			</view>
			<view class="param_item">
				<text>订单编号：</text>
				<text>{{ "*" }}</text>
			</view>
			<view class="param_item">
				<text>交易时间：</text>
				<text>{{ "*" }}</text>
			</view>
		</view>
		<view class="button_wrapper" v-if="status != ORDER_STATUS.PREFECT">
			<van-button type="info" round block custom-style="width: 90%;height: 90rpx" @click="statusArray[2] || null">{{ statusArray[1] }}</van-button>
		</view>
	</view>
</template>

<script>
import { ORDER_STATUS } from "@/utils/constant";
export default {
	data() {
		return {
			carport: {},
			status: 0,
			statusArray: [],
			ORDER_STATUS: {}
		};
	},
	onLoad(options) {
		const carport = options.carport;
		if (carport) {
			this.carport = JSON.parse(carport);
			this.status = this.carport.status;
			this.ORDER_STATUS = ORDER_STATUS;
			this.statusArray = this.getStatusArray();
			return;
		}
		uni.navigateBack({
			delta: 1
		});
	},
	methods: {
		getStatusArray() {
			const { status } = this;
			if (status == ORDER_STATUS.USING) {
				return ["正在使用中", "结束订单", this.toEnd];
			} else if (status == ORDER_STATUS.EVALUATE) {
				return ["订单已完成", "立即评价", this.toEvaluate];
			} else if (status == ORDER_STATUS.CANCELED) {
				return ["订单已取消", "删除订单", this.toDelete];
			}
		},
		toEnd() {
			this.$dialog
				.confirm({
					title: "请确认您的操作",
					message: `您确定要结束[${this.carport.name}]的订单吗？`
				})
				.then(() => {
					this.$notify("结束订单功能未完成!");
				});
		},
		toEvaluate() {
			this.$notify("评价功能未完成!");
		},
		toDetele() {
			this.$notify("删除订单功能未完成!");
		}
	}
};
</script>

<style lang="scss" scoped>
.wrapper {
	background-color: #ffffff;
}
.param_wrapper {
	padding: 30rpx;
	.param_item {
		display: flex;
		border-bottom: 1rpx solid $uni-border-color;
		text {
			color: $uni-text-color;
			font-size: 32rpx;
			// line-height: 80rpx;
			padding: 30rpx 0;
			&:nth-child(1) {
				min-width: 180rpx;
			}
		}
	}
}
.button_wrapper {
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #ffffff;
	border-top: 1rpx solid #efefef;
	box-shadow: 10px 10px 5px #888888;
	padding: 20rpx 0;
	z-index: 1;
}
</style>
