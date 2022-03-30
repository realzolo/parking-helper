const hasLogin = () => {
	console.log("hasLogin");
	uni.getStorageSync({
		key: "user_id",
		fail(res) {
			uni.redirectTo({
				url: "/subpages/login"
			});
		}
	});
}

export default hasLogin;
