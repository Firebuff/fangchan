export const getHouseList = () => {
    return fetch('https://house.08cms.com/webapp/houseslist').then( (res) => {
        console.log(res.json())
    })
}