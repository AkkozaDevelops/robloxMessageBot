function start() {
    global.app.post("/start", (req,res) => {
        console.log("request for use requested")
        if (!req) return;
        
        var rap = req.body.rap
        var cookie = req.body.cookie
        var subject = req.body.subject
        var message = req.body.message
        var amount = req.body.amount

        if (rap == null || cookie == null || subject == null || message == null || amount == null) {
            return;
        }

        var operations = 0;
        var sentMessages = 0;

        function afterLoop(totalOperations, data) {
            if (operations == totalOperations) {
                continueAfter(data)
            }
        }

        async function run() {
            let toMessage = []
            operations = 0;

            let users = await global.findUsers(cookie);
            
            users.forEach((user) => {
                global.checkRap(user, function callback(data) {
                    operations += 1
                    if (data.statusCode == 300) {
                        if (data.rap >= rap && user != 1) {
                            toMessage.push(user)
                            afterLoop(users.length,toMessage)
                        } else {
                            afterLoop(users.length,toMessage)
                        }
                    } else {
                        afterLoop(users.length,toMessage)
                    }
                })
            })
        }

        async function continueAfter(data) {
            var int = 0;

            console.log(data)

            function rateTimeout() {
                console.log("rate limited")
                setTimeout(function() {
                    console.log("returning")
                    i -= 1
                    global.rateLimited = false;
                    loop();
                },60000)
            }

            function loop() {
                setTimeout(function(){
                    if (global.rateLimited == false) {
                        if (int != data.length && sentMessages <= amount) {
                            console.log(int + "/" + (data.length + 1) + " :: " + data[int])
                            int += 1;
                            sentMessages += 1
                            global.message(data[int],subject,message, cookie)
                            loop();
                        } else {
                            if (sentMessages <= amount) {
                                run() // relooping so it gets new users
                            } else {
                                console.log(`Finished ${amount} messages`);
                            }
                        }
                    } else {
                        rateTimeout();
                    }
                },2500)
            }

            loop();
        }

        run()
    })
}

module.exports = start;