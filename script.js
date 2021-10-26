async function getCoin(){
    try{
       let getCoinList = await fetch(`https://api.jikan.moe/v3/search/anime?q=${AnimeName}`)
       let data = await getCoinList.json()
       data = data.results
       return data
    }
    catch(err){
        console.log(err)
    }
}



const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [1,2,3,4,5]
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

