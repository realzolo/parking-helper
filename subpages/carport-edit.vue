<template>
	<view>
		<van-notify id="van-notify" />
		<view class="loading_wrapper" v-show="loading"><van-loading vertical type="spinner">加载中...</van-loading></view>
		<van-cell-group>
			<van-field :value="carport.name" title-width="4rem" placeholder="请输入车位/车库名称" label="车位名称" @change="binding('name', $event)" clearable />
			<van-field :value="carport.address" title-width="4rem" placeholder="请输入车位/车库详细地址" label="所在地址" @change="binding('address', $event)" clearable />
			<van-field :value="carport.price" title-width="4rem" placeholder="请输入车位单价(元/时)" label="单位价格" @change="binding('price', $event)" clearable />
			<van-field :value="carport.phone" title-width="4rem" placeholder="请输入联系人电话" label="联系电话" @change="binding('phone', $event)" clearable />
			<van-field :value="carport.description" title-width="4rem" placeholder="请简要介绍一下您的车位/车库" label="简要描述" @change="binding('description', $event)" clearable />
			<van-field :value="carport.worktime" title-width="4rem" placeholder="请输入工作时间" label="工作时间" @change="binding('worktime', $event)" clearable />
			<van-field :value="carport.total" title-width="4rem" placeholder="请输入车位剩余数量" label="车位数量" @change="binding('total', $event)" clearable />
			<!-- 车位图片描述 -->
			<view class="image_wrapper"><van-uploader :file-list="carport.images" @afterRead="onUpload" @delete="onDelete" max-count="5" /></view>
		</van-cell-group>
		<view class="button_wrapper">
			<van-button v-if="isEdit" type="danger" round icon="delete-o" block @click="doDelete" custom-style="height: 75rpx;width: 90%;margin: 40rpx">删除</van-button>
			<van-button type="info" round icon="certificate" block @click="doSave" custom-style=" height: 75rpx;width: 90%">保存</van-button>
		</view>
	</view>
</template>

<script>
import { isEmpty } from "@/utils/string-utils";
const uco_carport = uniCloud.importObject("carport");
const uco_file = uniCloud.importObject("file");
export default {
	data() {
		return {
			isEdit: false,
			tempAddress: "", // 记录初始地址，用于减少不必要的请求次数
			carport: {
				name: "",
				address: "",
				location: {},
				price: 0.0,
				phone: "",
				description: "",
				worktime: "",
				total: 0,
				images: []
			},
			loading: false,
			userId: ""
		};
	},
	onLoad(options) {
		this.init(options);
	},
	methods: {
		init(options) {
			const { user_id } = uni.getStorageSync("_user");
			this.userId = user_id;
			if (options.data) {
				const data = JSON.parse(options.data);
				this.isEdit = true;
				this.tempAddress = data.address;
				this.carport = {
					_id: data._id,
					name: data.name || "",
					address: data.address || "",
					location: data.location || {},
					price: data.price || 0.0,
					phone: data.phone || "",
					description: data.description || "",
					worktime: data.worktime || "",
					total: data.total || 0,
					images: data.images || []
				};
			}
		},
		// 发布/保存记录
		async doSave() {
			const { name, address, price, phone, description, worktime, total, images } = this.carport;
			if (isEmpty(name) || isEmpty(address) || isEmpty(phone) || isEmpty(description) || isEmpty(worktime)) {
				this.$notify({ type: "warning", message: "请将内容填写完整!" });
				return;
			}
			if (price <= 0 || total < 0) {
				this.$notify({ type: "warning", message: "数据非法!" });
				return;
			}
			this.loading = true;
			// 地址解析(地址->经纬度)
			const location = await this.parseAddress(address);
			if (!location) {
				this.$notify({ type: "warning", message: "无效地址，解析失败！" });
				this.loading = false;
				return;
			}
			this.carport.location = location;
			this.carport.valid_address = location.province + location.city + location.district;   // 此属性仅用于判断同一地域
			// 上传图片
			const _images = await this.doUpload(images);
			_images.forEach(e => {
				this.carport.images[e.index] = { url: e.url };
			});

			let result;
			if (this.isEdit) {
				// 修改模式
				result = await uco_carport.update(this.userId, this.carport);
			} else {
				// 创建模式
				result = await uco_carport.add(this.userId, this.carport);
			}
			this.loading = false;
			if (result.code != 0) {
				this.$notify({ type: "danger", message: "发布失败!" });
				return;
			}
			this.$notify({ type: "success", message: "发布成功!" });
			setTimeout(() => {
				uni.navigateBack({
					delta: 1
				});
			}, 1500);
		},
		// 删除记录
		async doDelete() {
			const result = await uco_carport.deleteByUserID(this.userId, this.carport._id);
			if (result.code != 0) {
				this.$notify({ type: "error", message: "数据删除失败!" });
			} else {
				this.$notify({ type: "success", message: "删除成功!" });
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			}
		},
		async parseAddress(address) {
			// 如果地址没有变化，则无需不必要的请求
			if (address == this.tempAddress) {
				return this.carport.location;
			}
			console.log(11)
			const res = await uni.request({
				url: `https://apis.map.qq.com/ws/geocoder/v1`,
				data: {
					key: "FLQBZ-67GCW-7SHRW-OOOZQ-WCJA5-W3B2X",
					address: address
				}
			});
			const { status, result } = res[1].data;
			if (status != 0) return; // 地址解析失败

			const { location, address_components } = result;
			const { lng: longitude, lat: latitude } = location;
			const { province, city, district } = address_components;
			return { longitude, latitude, province, city, district };
		},
		// 绑定输入框数据
		binding(field, e) {
			this.carport[field] = e.detail;
		},
		// 本地图片预览
		onUpload(e) {
			const { file } = e.detail;
			console.log(e);
			this.carport.images.push({ url: file.url });
		},
		// 上传图片
		async doUpload(images) {
			const promises = [];
			images.map((item, index) => {
				if (item.url.startsWith("https")) {
					return;
				}
				const ext = item.url.substring(item.url.lastIndexOf("."));
				const promise = new Promise(resolve => {
					uniCloud.uploadFile({
						filePath: item.url,
						cloudPath: `${this.userId}/${new Date().getTime()}${ext}`,
						success: async res => {
							await resolve({ index: index, url: res.fileID });
						}
					});
				});
				promises.push(promise);
			});
			return Promise.all(promises);
		},
		// 删除图片
		async onDelete(e) {
			console.log(e);
			const { index } = e.detail;
			const fileID = this.carport.images[index].url;
			this.carport.images.splice(index, 1);
			// 本地图片(未上传)
			if (fileID.startsWith("http://tmp")) {
				return;
			}
			// 网络图片
			await uco_file.deleteFile(fileID);
		}
	}
};
</script>

<style lang="scss" scoped>
.loading_wrapper {
	position: absolute;
	left: 50%;
	top: 30%;
	transform: translate(-50%, -50%);
	z-index: 999;
}
.image_wrapper {
	background-color: #ffffff;
	padding: 20rpx;
}
.button_wrapper {
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	bottom: 120rpx;
	margin-top: 80rpx;
}
</style>
