
async function checkRap(uId, callback) {
    var rap = 0
    var knownUsers = global.unRequire(global.mainDir + "/logs/messagedUsers.json")
    console.log(uId)
    let player = await global.fetch(`https://inventory.roblox.com/v1/users/${uId}/assets/collectibles?limit=100&sortOrder=Asc`)
    let playerItems = await player.json()
    //console.log(player)
    //console.log(playerItems)
    if (knownUsers.indexOf(uId) == -1 && playerItems) {

        if (playerItems.data["errors"]) {
            callback("errors")
            return;
        }

        playerItems.data.forEach((item) => {
            rap += item.recentAveragePrice
        })

        if (callback) {callback(rap)}
    } else {
        if (callback) {callback(0)}
    }
}

module.exports = checkRap;