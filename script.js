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

var coinArray =[]

getAllCoin()
.then((data)=>{
    console.log(data)
    for(let i=0;i<20;i++)
    {
    var coinNames = document.querySelector('ul.coin-hidden')
    let list = document.createElement('li')
    roundOff = Math.round(parseFloat(data[i].priceUsd) *100)/100
    coinArray.push(data[i].id)
    list.innerHTML=`<a href="#" id=${data[i].id}>${data[i].symbol}</a> <span class="crypto-value">${roundOff}</span>`
    coinNames.appendChild(list)
    coinNames.appendChild(document.createElement('hr'))
    }
    coinArray.forEach(element => {
        document.getElementById(element).addEventListener('click',()=>{
            coinGraph('bitcoin')
        })
    });
})
.catch((err)=>{
    var body = document.querySelector('body')
    body.innerHTML=""
    body.innerHTML ="<h1>Not Found</h1>"

})





async function getPerticularCoin(coin)
{
    try {
        let coinData = await fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=d1`)
        let singleCoin = await coinData.json()
        return singleCoin.data
        
    } catch (error) {
        var body = document.querySelector('body')
        body.innerHTML=""
        body.innerHTML ="<h1>Not Found</h1>"
    }
}

coinGraph('bitcoin')
function coinGraph(coin){ 
    console.log(coin)
    getPerticularCoin(coin)
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
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: coinDate,
                datasets: [{
                    label: 'BTC',
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

}