const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    removePrevResults()
    makeImages(res.data)
    form.elements.query.value = '';
})

const makeImages = (shows) => {

    if(shows.length == 0) {
        const noResText = document.createElement('h4')
        noResText.id = "noResText"
        noResText.innerHTML = "No Results Found"
        document.body.append(noResText)
    }
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}

const removePrevResults = () => {
    const noResText = document.querySelector('#noResText')
    noResText && noResText.remove();
    const imgs = document.querySelectorAll('img')
    imgs.forEach(img => img.remove())
}