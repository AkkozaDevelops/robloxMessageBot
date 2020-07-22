var allOwners = [] // will fill up over time

async function getOwners(itemId, cursor) { // needs replaced, errors on the second time around, not used atm.
    if (!cursor) {
        let itemResponse = await global.fetch(`https://inventory.roblox.com/v2/assets/${itemId}/owners?sortOrder=Asc&limit=100`)
        let itemOwners = await itemResponse.json();

        for (i = 0; i < itemOwners.data.length; i++) {
            allOwners.push(itemId, itemOwners.data[i])
            console.log(allOwners.length)
        }

        if (itemOwners.nextPageCursor) {
            getOwners(itemOwners.nextPageCursor);
        }
    } else {
        let itemResponse = await global.fetch(`https://inventory.roblox.com/v2/assets/${itemId}/owners?sortOrder=Asc&limit=100&cursor=${cursor}`)
        let itemOwners = await itemResponse.json();

        for (i = 0; i < itemOwners.data.length; i++) {
            allOwners.push(itemOwners.data[i])
            console.log(allOwners.length)
        }

        if (itemOwners.nextPageCursor) {
            getOwners(itemId, itemOwners.nextPageCursor);
        }
    }
}

async function findUsers(cookie) {

    allOwners = []

    let response = await global.fetch("https://data.rbxcity.com/values/fetch-asset-value/all")
    let data = await response.json();

    var itemData = data.data
    var randomItem = itemData[Math.floor(Math.random() * itemData.length)]

    console.log("getting users from item: " + randomItem._id)

    var itemId = randomItem._id

    var headers = {
        'Cookie': `.ROBLOSECURITY=${cookie}`
    }

    let itemResponse = await global.fetch(`https://inventory.roblox.com/v2/assets/${itemId}/owners?sortOrder=Asc&limit=100`, {method: 'GET', headers: headers})
    let itemOwners = await itemResponse.json();

    for (i = 0; i < itemOwners.data.length; i++) {
        //console.log(itemOwners.data[i])
        if (itemOwners.data[i].owner != null) {
            allOwners.push(itemOwners.data[i].owner["id"]);
            //console.log(allOwners.length)
        }
    }

    //await getOwners(randomItem._id)
    //console.log("owners: " + allOwners.length)
    //console.log(allOwners)
    return allOwners

}

module.exports = findUsers;