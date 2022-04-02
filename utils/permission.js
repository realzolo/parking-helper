const hasLogin = () => {
	const _user = uni.getStorageSync("_user")
	if(!_user.user_id){
		uni.redirectTo({
			url: "/subpages/login"
		});
	}
}

export default hasLogin;
