await function message(playerId, subject, message, robloxsec) {
    await noblox.setCookie(robloxsec)
    global.noblox.message(playerId,subject,message)
}

module.exports = message;