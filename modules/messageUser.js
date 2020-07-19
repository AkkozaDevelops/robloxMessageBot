function message(playerId, subject, message, robloxsec, xcsrf) {
    if (!xcsrf) {
        xcsrf = ""
    }

    const data = JSON.stringify({
        recipientId: playerId,
        subject: subject,
        body: message
    })

    const options = {
        hostname: 'privatemessages.roblox.com',
        path: '/v1/messages/send',
        method: 'POST',
    
        headers: {
          'X-CSRF-TOKEN': xcsrf,
          'Content-Type': 'application/json',
          'Cookie': '.ROBLOSECURITY=' + robloxsec,
          'Content-Length': data.length
        }
    }

    const req = global.https.request(options, res => {
        if (res.statusCode === 403 || res.statusCode === 401) {
            global.message(playerId, subject, message, robloxsec, res.headers["x-csrf-token"])
            console.log("retrying with xcsrf token | " + res.statusCode + " | " + res.headers["x-csrf-token"])
            console.log(res.headers)
            return;
        }

        if (res.statusCode === 200) {
            return;
        }

        console.log(`weird status code? | ${res.statusCode}`)

        res.on("data", (d) => {
            console.log(d.toString())
        })
    })

    req.write(data);
    req.end();
}

module.exports = message;