
function logUsers(id) {
    var existingData = JSON.parse(global.fs.readFileSync(`${global.mainDir}/logs/messagedUsers.json`))
    existingData.push(id)
    global.fs.writeFileSync(`${global.mainDir}/logs/messagedUsers.json`, JSON.stringify(existingData))
}

module.exports = logUsers;