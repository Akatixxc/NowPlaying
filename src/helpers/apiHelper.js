const request = async (url) =>
    fetch(url, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('spotify-access-token')}`,
        },
    }).then((res) => res.json());

export default request;
