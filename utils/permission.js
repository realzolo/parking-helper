const hasLogin = () => {
	const r = uni.getStorageSync("user_id")
	if(!uni.getStorageSync("user_id")){
		uni.redirectTo({
			url: "/subpages/login"
		});
	}
}

export default hasLogin;
