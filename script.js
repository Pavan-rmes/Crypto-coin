
//function to get all the coins from the api 
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



//To display first 20 coin on the screen
var coinArray =[]

getAllCoin()
.then((data)=>{
    console.log(data)
    for(let i=0;i<20;i++)
    {
    var coinNames = document.querySelector('ul.coin-hidden')
    let list = document.createElement('li')
    //round of to 2 decimal places
    roundOff = Math.round(parseFloat(data[i].priceUsd) *100)/100
    coinArray.push(data[i].id)
    list.innerHTML=`<a href="#" id=${data[i].id}>${data[i].symbol}</a> <span class="crypto-value">${roundOff}</span>`
    coinNames.appendChild(list)
    }
    coinArray.forEach(element => {
        document.getElementById(element).addEventListener('click',()=>{
            console.log("pavan")
            coinGraph('bitcoin')
        })
    });
})
.catch((err)=>{
    var body = document.querySelector('body')
    body.innerHTML=""
    body.innerHTML ="<h1>Not Found</h1>"

})




//fetch the chart of the perticular coin
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


//Display the chart of the perticular coin using chart js
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



//Navigation, where coins will be display on one click and hides on other click
var count =0

function showHide()
{
    let coins = document.getElementsByClassName('sideNav')[0]
    if(count===0){
        count =1
        coins.style.display="none"
    }
    else{
        count=0
        coins.style.display="grid"
    }
    
}


