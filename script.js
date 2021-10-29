async function getAllCoin(){
    try{
       let getCoinList = await fetch(`https://api.coincap.io/v2/assets`)
       let allCoins = await getCoinList.json()
        allCoins = allCoins.data
       return allCoins;
    }
    catch(err){
        var body = document.querySelector('body')
        body.innerHTML=""
        body.innerHTML =err
    }
}



getAllCoin()
.then((data)=>{
    console.log(data)
    for(let i=0;i<20;i++)
    {
    var coinNames = document.querySelector('ul.coin-hidden')
    let list = document.createElement('li')
    roundOff = Math.round(parseFloat(data[i].priceUsd) *100)/100
    list.innerHTML=`<a href="#">${data[i].symbol}</a> <span class="crypto-value">${roundOff}</span>`
    coinNames.appendChild(list)
    coinNames.appendChild(document.createElement('hr'))
    }
})
.catch((err)=>{
    var body = document.querySelector('body')
    body.innerHTML=""
    body.innerHTML ="<h1>Not Found</h1>"

})




async function getPerticularCoin()
{
    try {
        let coinData = await fetch(`https://api.coincap.io/v2/assets/bitcoin/history?interval=d1`)
        let singleCoin = await coinData.json()
        return singleCoin.data
        
    } catch (error) {
        var body = document.querySelector('body')
        body.innerHTML=""
        body.innerHTML ="<h1>Not Found</h1>"
    }
}

getPerticularCoin()
.then((data)=>{
    console.log(data)
    let coinDate =[]
    let coinValue=[]

    for(i in data)
    {
        let everyDate =data[i].date
        everyDate =  everyDate.split("T")[0]
        coinDate.push(everyDate)
        coinValue.push(data[i].priceUsd)
    }
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: coinDate,
            datasets: [{
                label: '# of Votes',
                data: coinValue
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

})


