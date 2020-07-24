async function message(playerId, subject, message, robloxsec) {
    console.log("messaging")
    await global.noblox.setCookie(robloxsec)
    /*await global.noblox.follow(playerId)
    await global.noblox.sendFriendRequest(playerId)*/
    global.noblox.message(playerId, subject, message).then((response) => {
        if (response.success == true) {
            global.logUser(playerId)
        }
    })
}

module.exports = message;