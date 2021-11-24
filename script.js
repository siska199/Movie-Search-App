//Ambil elemen yang dibutukan di HTML Element
const searchInput = document.getElementById('search-input')
const buttonSearch = document.getElementById('search-button')
const containerFilm = document.getElementById('container-film')
const modalDetail = document.getElementById('modal-detail')

const urlSearch = 'http://www.omdbapi.com/?apikey=823b54a&s='
const urlDetail = 'http://www.omdbapi.com/?apikey=823b54a&i='
//Membuat fungsi untuk mengambil data dari API: Fungsi ini mengembalikan promise
const takeDataAPI = (url) => {
    const res = fetch(url)
                .then(res=>res.json())
    return res
} 



//Fungsi untuk mencari film
buttonSearch.addEventListener('click',async function(){
    const urls = urlSearch+searchInput.value
    const data = await takeDataAPI(urls)
    console.log("Search data: ", data)
    makeUIs(data.Search)
})

//Fungsi untuk membuat UI setiap film yang ditampilakn
function makeUIs(dataFilm){
    let filmsElement = ''
    for(d of dataFilm){
        filmsElement += cardElement(d)
    }
    containerFilm.innerHTML = filmsElement
}
//-------------------------------UI PAGE-------------------------------------------------------
//Make element card:
function cardElement({Poster,Title, Year, imdbID}){
    return `<div class="col-lg-3 col-md-6 col-sm-6 me-lg-2 mb-lg-4 mb-sm-3">
                <div class="card" style="background-color: #334756;" >
                    <p class="text-center px-4 pt-4 bg-light">
                        <img src="${Poster}" class="card-img-top img-fluid" style="height:450px; width:300px;" alt="...">
                    </p>
                    <div class="card-body" >
                        <div class="mb-${Title.length<30?"5":"0"}">
                            <h4 class="card-title">${Title}</h4>
                        </div>
                        <p class="card-text fs-4 mt-3">${Year}</p>
                        <button type="button" class="btn btn-lg btn-dark btn-show-detail" data-key=${imdbID} data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Show Detail
                        </button>
                    </div>
                </div>
            </div>`
}

//Make detail movie:
function addModalDetail({Poster, Title, Director, Actors, Writer, Plot}){
    return `
            <div class="modal-content" style="background-color: #506D84">
                <div class="modal-header">
                    <h2 class="modal-title" id="exampleModalLabel">Detail Movie</h2>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body" >
                    <!-- ISI ADA DI script.js -->
                    <div class="row">
                        <div class="col-3">
                            <img src="${Poster}" class="img-fluid" alt="">
                        </div>
                        <div class="col-9">
                            <div class="card" >
                                <ul class="list-group list-group-flush detail-list">

                                    <li class="list-group-item text-light"><h3>${Title}</h3></li>
                                    <li class="list-group-item text-light"><b>Director : </b> ${Director}</li>
                                    <li class="list-group-item text-light" ><b>Actors : </b> ${Actors}</li>
                                    <li class="list-group-item text-light"><b>Writer : </b> ${Writer}</li>
                                    <li class="list-group-item text-light"><b>Plot : </b> ${Plot}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-lg btn-dark" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
    `
}

//-----------------------------------------------------------------------------------------------

//Panggil Detail Movie
containerFilm.addEventListener('click', async function(){
    if(event.target.classList.contains('btn-show-detail')){
        const getKey = event.target.dataset.key
        console.log("url movie: ", urlDetail+getKey)
        //Memperoleh detail movie:
        const detMovie =  await takeDataAPI(urlDetail+getKey)
        console.log("Data Detail Movie",detMovie)
        modalDetail.innerHTML = addModalDetail(detMovie)
    }
})


// //COBA URL
// const takeData = async () =>{
//     const res = await fetch('http://www.omdbapi.com/?apikey=823b54a&s=Avengers') 
//     const resData = await res.json()
//     console.log(resData.Search)
// }

// console.log(takeData())