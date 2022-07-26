const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function(e) {
	e.preventDefault();
	const searchTerm = form.elements.query.value;
	const config = { params: { q: searchTerm } };
	const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
	removePrevResults();
	makeResults(res.data);
	form.elements.query.value = '';
});

const makeResults = (shows) => {
	if (shows.length == 0) {
		const noResText = document.createElement('h4');
		noResText.id = 'noResText';
		noResText.innerHTML = 'No Results Found';
		document.body.append(noResText);
	}
	for (let result of shows) {
		if (result.show.image) {
			console.log(result.show);
			makeShowDiv(result.show);
		}
	}
};

const removePrevResults = () => {
	const noResText = document.querySelector('#noResText');
	noResText && noResText.remove();
	const shows = document.querySelectorAll('.show');
	shows.forEach((show) => show.remove());
};

function makeShowDiv(s) {
	const showDiv = document.createElement('div');
	showDiv.classList.add('show');
	showDiv.innerHTML = `
        <img src=${s.image.original}></img>
        <h4>${s.name}</h4>
        ${s.summary}
        <div class='genre-container'>
        ${s.genres
			.map((g) => {
				return `<span class="genre">${g}</span>`;
			})
			.join('')}
        </div>
        
        ${s.officialSite ? `<h6 class="watchNow"><a href="${s.officialSite}">Watch now</h6>` : ``}
        

        
    `;

	document.querySelector('.results-container').append(showDiv);
}
