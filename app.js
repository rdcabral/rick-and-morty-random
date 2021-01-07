const btn = document.querySelector('.btn-next');
const nameCharacter = document.querySelector('.name');
const profileImage = document.querySelector('.profile-image');
const header = document.querySelector('.header');
const status = document.querySelector('.status');
const locationCharacter = document.querySelector('.location');
const lastKnowLocation = document.querySelector('.last-know-location');
const firstSeenIn = document.querySelector('.first-seen-in');
const species = document.querySelector('.species');
const tooltiptext = document.querySelector('.tooltiptext');

const randomUser = () => {
    const random = Math.floor(Math.random() * 672);
    return random;
}

const rickAndMortyApi = (idCharacter) => {
    idCharacter = randomUser();
    return fetch(`https://rickandmortyapi.com/api/character/${idCharacter}`);
}

const episodesApi = (episode) => {
    return fetch(`https://rickandmortyapi.com/api/episode/${episode}`);
}

const getEpisodeByCharacter = async (episode) => {
    const response = await episodesApi(episode);
    const data = await response.json();

    firstSeenIn.innerText = data.name
}

const getCharacterInfo = async () => {
    const response = await rickAndMortyApi();
    const data = await response.json();

    const checkStatus = data.status == "Alive" ? "status-green" : data.status == "Dead" ? "status-red" : "status-unknown";
    status.classList.add(checkStatus);

    if(data.status === "Dead") {
        header.style.filter = 'grayscale(100%)';
    }

    nameCharacter.innerHTML = `${data.name} <i class="fa fa-check-circle">`;
    profileImage.src = data.image;
    header.style.backgroundImage = `url("${data.image}")`
    tooltiptext.innerText = data.status;
    locationCharacter.innerText = data.location.name;
    lastKnowLocation.innerText = data.origin.name;
    species.innerText = data.species;

    const characterFirstSeenIn = Number(data.episode[0].split("/").pop());

    getEpisodeByCharacter(characterFirstSeenIn)
}

const showCharacterInfo = getCharacterInfo();
btn.addEventListener('click', getCharacterInfo);