<template>
	<view class="wrapper">
		<van-tabs :active="active">
			<van-tab title="全部">
				<navigator :url="`/subpages/order?carport=${JSON.stringify(item)}`" open-type="navigate" v-for="item in orders" :key="id">
					<van-card :price="item.price + '/时'" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover">
						<view slot="footer" class="item_footer">
							<van-button plain round size="mini" color="#666666" v-show="item.status == ORDER_STATUS.USING">结束使用</van-button>
							<van-button plain round size="mini" color="#666666" v-show="item.status == ORDER_STATUS.EVALUATE">立即评价</van-button>
							<van-button plain round size="mini" color="#666666">删除订单</van-button>
							<van-button type="warning" plain round size="mini">查看详情</van-button>
						</view>
					</van-card>
				</navigator>
			</van-tab>
			<van-tab title="使用中">
				<navigator :url="`/subpages/order?carport=${JSON.stringify(item)}`" open-type="navigate" v-for="item in orders" :key="id" v-if="item.status == ORDER_STATUS.USING">
					<van-card :price="item.price + '/时'" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover">
						<view slot="footer" class="item_footer">
							<van-button plain round size="mini" color="#666666" v-show="item.status == ORDER_STATUS.USING">结束使用</van-button>
							<van-button type="warning" plain round size="mini">查看详情</van-button>
						</view>
					</van-card>
				</navigator>
			</van-tab>
			<van-tab title="已完成">
				<navigator
					:url="`/subpages/order?carport=${JSON.stringify(item)}`"
					open-type="navigate"
					v-for="item in orders"
					:key="id"
					v-if="item.status == ORDER_STATUS.PREFECT || item.status == ORDER_STATUS.EVALUATE"
				>
					<van-card :price="item.price + '/时'" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover">
						<view slot="footer" class="item_footer">
							<van-button plain round size="mini" color="#666666" v-show="item.status == ORDER_STATUS.EVALUATE">立即评价</van-button>
							<van-button plain round size="mini" color="#666666">删除订单</van-button>
							<van-button type="warning" plain round size="mini">查看详情</van-button>
						</view>
					</van-card>
				</navigator>
			</van-tab>
			<van-tab title="已取消">
				<navigator :url="`/subpages/order?carport=${JSON.stringify(item)}`" open-type="navigate" v-for="item in orders" :key="id" v-if="item.status == ORDER_STATUS.CANCELED">
					<van-card :price="item.price + '/时'" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover">
						<view slot="footer" class="item_footer">
							<!-- 	<view style="float: left;">1</view> -->
							<van-button plain round size="mini" color="#666666">删除订单</van-button>
							<van-button type="warning" plain round size="mini">查看详情</van-button>
						</view>
					</van-card>
				</navigator>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
import { ORDER_STATUS } from "@/utils/constant";

export default {
	data() {
		return {
			ORDER_STATUS: 0,
			active: 0,
			orders: [
				{
					id: 1,
					name: "广东财经大学华商学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: ORDER_STATUS.USING,
					price: 10.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 2,
					name: "湖北工业大学",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: ORDER_STATUS.EVALUATE,
					price: 20.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 3,
					name: "湖北文理学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: ORDER_STATUS.CANCELED,
					price: 140.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 4,
					name: "天津机电职业技术学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: ORDER_STATUS.PREFECT,
					price: 140.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 5,
					name: "徐州工程学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: ORDER_STATUS.USING,
					price: 8.0,
					time: "2020-10-10 12:13"
				}
			]
		};
	},
	created() {
		this.ORDER_STATUS = ORDER_STATUS;
	},
	methods: {
		subDescription: str => {
			return str.length <= 30 ? str : str.substring(0, 30) + "...";
		}
	}
};
</script>

<style scoped>
.wrapper {
	margin-bottom: 20rpx;
}
van-card::before {
	content: "";
	display: block;
	height: 20rpx;
}
van-button {
	margin-left: 10rpx;
}
.item_footer{
	margin-top: 28rpx;
}
</style>
