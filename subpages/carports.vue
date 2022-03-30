<template>
	<view>
		<navigator :url="`/subpages/preview?carport=${JSON.stringify(item)}`" open-type="navigate" v-for="item in carports" :key="id" v-if="distanceFilter(item)">
			<van-card
				:num="item.residue"
				:price="method != 'all' ? (item.can_rent ? item.rent_price + '/月' : item.price + '/小时') : item.price + '/小时'"
				:desc="subDescription(item.description)"
				:title="item.name"
				:thumb="item.images[0]"
				lazy-load="true"
				thumb-class="thumb-class"
			/>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			method: "all",
			myLocation: {},
			carports: [
				{
					id: 1,
					name: "遵化如意停车场",
					price: "9.8",
					address: "河北省遵化市遵化东高速高速口",
					longitude: 108.94712,
					latitude: 34.39318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg",
						"http://pic5.58cdn.com.cn/hbgsydcpostpc/n_v2198955e6989e431d8a3c1fc7de661ac4.jpg"
					],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 2,
					name: "红运停车场",
					price: "9.8",
					address: "武汉市东西湖区高桥五路",
					longitude: 108.94712,
					latitude: 34.49318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic5.58cdn.com.cn/hbgsydcpostpc/n_v2198955e6989e431d8a3c1fc7de661ac4.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: false,
					rent_price: 600
				},
				{
					id: 3,
					name: "山东潍坊诸城翔鹤家具经营部",
					price: "9.8",
					address: "山东潍坊诸城密州街道普桥村西",
					longitude: 108.94712,
					latitude: 34.29318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: ["http://pic3.58cdn.com.cn/p1/small/n_v2ef4d85b099604378a502e9b0dfbbd5f4.jpg", "http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 4,
					name: "上海在顺物流停车场",
					price: "9.8",
					address: "北青公路6511号",
					longitude: 108.94712,
					latitude: 34.69318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic4.58cdn.com.cn/mobile/small/n_v27713ea91cd7f43f090b4b93154d912c6.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: true,
					rent_price: 600
				},
				{
					id: 5,
					name: "晋州市高速口停车场",
					price: "9.8",
					address: "石家庄市晋州市宿村",
					longitude: 108.94712,
					latitude: 34.29318,
					description: "本停车场现有大量停车位，物流园建设中，修车，住宿，餐饮,一应俱全。",
					residue: 99,
					images: [
						"http://pic7.58cdn.com.cn/mobile/small/n_v25e82df0e13d5477a9c4ef87cc60dcd9c.jpg",
						"http://pic6.58cdn.com.cn/mobile/small/n_v229972578815d46a7ae8dde22014d746e.jpg"
					],
					can_rent: false,
					rent_price: 600
				}
			]
		};
	},
	onLoad(options) {
		this.method = options.method ? options.method : this.method;
		this.getMyLocation();
	},
	methods: {
		subDescription: str => {
			return str.length <= 30 ? str : str.substring(0, 30) + "...";
		},
		distanceFilter(item) {
			switch (this.method) {
				case "all":
					return item;
				case "rent":
					return item.can_rent && item;
				case "near":
					const dis = this.getDistance(this.myLocation.longitude, this.myLocation.latitude, item.longitude, item.latitude);
					return dis <= 3000.0;
			}
		},
		getMyLocation() {
			const that = this;
			uni.getStorage({
				key: "my_location",
				success: res => {
					const { longitude, latitude } = res.data;
					that.myLocation = { longitude, latitude };
				}
			});
		},
		// 根据经纬度获取距离(单位: 米)
		getDistance(lat1, lng1, lat2, lng2) {
			let EARTH_RADIUS = 6378137.0; //单位M
			let radLat1 = (lat1 * Math.PI) / 180.0;
			let f = this.getRad((lat1 + lat2) / 2);
			let g = this.getRad((lat1 - lat2) / 2);
			let l = this.getRad((lng1 - lng2) / 2);

			let sg = Math.sin(g);
			let sl = Math.sin(l);
			let sf = Math.sin(f);

			let s, c, w, r, d, h1, h2;
			let a = EARTH_RADIUS;
			let fl = 1 / 298.257;

			sg = sg * sg;
			sl = sl * sl;
			sf = sf * sf;

			s = sg * (1 - sl) + (1 - sf) * sl;
			c = (1 - sg) * (1 - sl) + sf * sl;

			w = Math.atan(Math.sqrt(s / c));
			r = Math.sqrt(s * c) / w;
			d = 2 * w * a;
			h1 = (3 * r - 1) / 2 / c;
			h2 = (3 * r + 1) / 2 / s;

			const dis = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
			return dis ? dis : 0;
		},
		getRad(d) {
			return (d * Math.PI) / 180.0;
		}
	}
};
</script>

<style lang="scss" scoped></style>
