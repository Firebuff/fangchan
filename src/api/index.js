export const getHouseList = (pageIndex) => {

 

    let url = `https://house.08cms.com/webapp/houseslist?pageIndex=${pageIndex}`

    

    return fetch(url).then( (res) => {
        // console.log(res)
        if (res.status == 200) {
            return res.json()
        }
    }).catch((err) => {
        console.log(err)
    })
}