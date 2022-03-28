<template>
	<view>
		<van-tabs :active="active">
			<van-tab title="全部">
				<van-card :price="item.price" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover" :key="id" v-for="item in orders">
					<view slot="footer">
						<van-button type="warning" size="mini" v-show="item.status!==1">查看详情</van-button>
						<van-button type="warning" size="mini" v-show="item.status===1">立即付款</van-button>
						<van-button type="warning" size="mini" v-show="item.status===3">立即评价</van-button>
					</view>
				</van-card>
			</van-tab>
			<van-tab title="已完成">
				<van-card :price="item.price" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover" v-for="item in orders" :key="id" v-if="item.status !== 0 && item.status !== 1">
					<view slot="footer"><van-button type="warning" size="mini">查看详情</van-button></view>
				</van-card>
			</van-tab>
			<van-tab title="待付款">
				<van-card :price="item.price" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover" v-for="item in orders" :key="id" v-if="item.status === 0">
					<view slot="footer"><van-button type="warning" size="mini">立即付款</van-button></view>
				</van-card>
			</van-tab>
			<van-tab title="待评价">
				<van-card :price="item.price" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover" v-for="item in orders" :key="id" v-if="item.status === 2">
					<view slot="footer"><van-button type="warning" size="mini">立即评价</van-button></view>
				</van-card>
			</van-tab>
			<van-tab title="已取消">
				<van-card :price="item.price" :desc="subDescription(item.description)" :title="item.name" :thumb="item.cover" v-for="item in orders" :key="id" v-if="item.status === 1">
					<view slot="footer"><van-button type="warning" size="mini">删除订单</van-button></view>
				</van-card>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
			// status: {0: 待付款,1: 已取消, 2: 待评价, 3：完成 ,!=0or1: 完成}
			orders: [
				{
					id: 1,
					name: "广东财经大学华商学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: 0, // 待付款
					price: 10.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 2,
					name: "湖北工业大学",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: 2, // 待评价
					price: 20.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 3,
					name: "湖北文理学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: 1, // 已取消
					price: 140.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 4,
					name: "天津机电职业技术学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: 3, // 待评价
					price: 140.0,
					time: "2020-10-10 12:13"
				},
				{
					id: 5,
					name: "徐州工程学院",
					cover: "https://cdn.jsdelivr.net/npm/@vant/assets/ipad.jpeg",
					description: "暂只针对国内主体且具备与地理位置强相关的使用场景的小程序开放，在小程序管理后台，「开发」-「开发管理」-「接口设置」中自助开通该接口权限。",
					status: 1,  // 已取消
					price: 8.0,
					time: "2020-10-10 12:13"
				}
			]
		};
	},
	methods: {
		subDescription: str => {
			return str.length <= 30 ? str : str.substring(0, 30) + "...";
		}
	}
};
</script>

<style scoped>
van-card:nth-child(1)::before {
	content: "";
	display: block;
	height: 20rpx;
}
van-card::after {
	content: "";
	display: block;
	height: 20rpx;
}
van-button{
	margin-left: 10rpx;
}
</style>
