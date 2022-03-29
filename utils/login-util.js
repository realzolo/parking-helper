const hasLogin = () => {
	console.log("hasLogin");
	uni.getStorage({
		key: "user_id",
		fail(res) {
			uni.redirectTo({
				url: "/subpages/login"
			});
		}
	});
}

export default hasLogin;
