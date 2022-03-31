const hasLogin = () => {
	if(!uni.getStorageSync("user_id")){
		uni.redirectTo({
			url: "/subpages/login"
		});
	}
}

export default hasLogin;
