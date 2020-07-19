await function findUsers() {
    //https://data.rbxcity.com/values/fetch-asset-value/all api to get all limited item values

    let response = await fetch("https://data.rbxcity.com/values/fetch-asset-value/all")
    let data = await response.json();

}

module.exports = findUsers;