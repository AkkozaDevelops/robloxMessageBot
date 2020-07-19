var logFile = `${global.mainDir}/logs/messagedUsers.json`
var fs = global.fs;

function logUser(id) {
    var existingData = JSON.parse(fs.readFileSync(logFile))
    existingData.push(id)
    fs.writeFileSync(logFile,JSON.stringify(existingData))
}