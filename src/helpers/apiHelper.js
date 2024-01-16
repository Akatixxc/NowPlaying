const request = async (url) => {
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem('spotify-access-token')}`,
		},
	}).then((res) => res.json());
};

export default request;
