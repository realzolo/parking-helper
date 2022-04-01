<template>
	<view>
		<navigator :url="`/subpages/car-edit?car=${JSON.stringify(item)}`" open-type="navigate" v-for="item in cars" :key="id">
			<van-cell center :title="item.plateNo" :label="item.phone"><van-icon slot="right-icon" name="edit" class="custom-icon" :key="id" /></van-cell>
		</navigator>
		<view class="button_wrapper">
			<van-button type="info" round icon="plus" @click="toEditPage" custom-style="width: 680rpx; height: 75rpx">添加车辆</van-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cars: [
				{ id: 1, plateNo: "陕A666666", owner: "李秀明", phone: "18391563384" },
				{ id: 2, plateNo: "陕A777777", owner: "李秀明", phone: "18391563384" },
				{ id: 3, plateNo: "陕A888888", owner: "李秀明", phone: "18391563384" }
			]
		};
	},
	onLoad(options) {
		const data = options.data;
		if (data) {
			const { operation, car } = JSON.parse(data);
			if (operation === "save") {
				car.id = this.cars.length + 1;
				this.cars.push(car);
				return;
			}
			if (operation === "delete") {
				this.cars = this.cars.filter(c => {
					return c.id != car.id;
				})
			}
		}
	},
	methods: {
		saveOrDelete(options) {
			console.log(options);
		},
		toEditPage() {
			uni.navigateTo({
				url: "/subpages/caredit"
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.button_wrapper {
	position: absolute;
	display: flex;
	justify-content: center;
	width: 100%;
	bottom: 40rpx;
}
</style>
