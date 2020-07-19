
async function checkRap(uId, callback) {
    var rap = 0
    let player = await global.fetch(`https://inventory.roblox.com/v1/users/${uId}/assets/collectibles?limit=100&sortOrder=Asc`)
    let playerItems = await player.json()

    if (playerItems.data.errors) {
        callback("errors")
        return;
    }

    playerItems.data.forEach((item) => {
        rap =+ item.recentAveragePrice
    })

    callback(rap)
}

module.exports = checkRap;