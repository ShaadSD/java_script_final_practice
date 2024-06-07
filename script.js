const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const playerName = document.querySelector('.player-name');
const playerContainer=document.querySelector('.player-cont');
const playerDetailsContainer = document.querySelector('.player-details-container');

const loadAllPlayers = (pler) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${pler}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            displayPlayers(data.player);
        });
};

const displayPlayers = (players) => {
    playerContainer.innerHTML = '';
    players.forEach(player => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
        <div class="players-details">
            <img class="card-img" src=${player.strThumb} alt="${player.strPlayer}"/>
            <h2>${player.strPlayer}</h2>
            <p>Position: ${player.strPosition}</p>
            <p>Team: ${player.strTeam}</p>
            <p>Nation:${player.strNationality}</p>
            <p>Game:${player.strSport}</p>
            <p>sallary:${player.strWage}</p>
            <p>Gender:${player.strGender}</p>
            <button class="singleplayer" onclick="viewdetails('${player.idPlayer}')">Details</button>
            <button onclick="addToCart('${player.strPlayer.slice(0,10)}', '${player.strTeam}', '${player.strWage}')">Add Team</button>
        </div>`;
        playerContainer.appendChild(div);
    });
};

const viewdetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        displayPlayerDetails(data.players[0]);
    });
};
const hidePlayerDetails = () => {
    playerDetailsContainer.style.display = 'none';
};

const displayPlayerDetails = (player) => {
    playerDetailsContainer.innerHTML = `
    <div class="player-details">
        <img class="card-img" src=${player.strThumb} alt="${player.strPlayer}"/>
        <h2>${player.strPlayer}</h2>
        <p>Position: ${player.strPosition}</p>
        <p>Team: ${player.strTeam}</p>
        <p>Nation:${player.strNationality}</p>
        <p>Game:${player.strSport}</p>
        <p>Sallary:${player.strWage}</p>
        <p>Gender:${player.strGender}</p>
        <button class="back-btn" onclick="hidePlayerDetails()">Close</button>
    </div>`;
    playerDetailsContainer.style.display = 'block';
};

const addToCart = (name, team, wage) => {
    const cartCount = document.getElementById("count").innerText;
    let convertedCount = parseInt(cartCount);
    if (convertedCount >= 11) {
        return;
    }
    convertedCount += 1;
    document.getElementById("count").innerText = convertedCount;
    const container = document.getElementById("card-main-container");
    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `
    <p>${name}</p>
    `;
    container.appendChild(div);
    UpdateTotal();
};

const UpdateTotal = () => {
    const allPrices = document.getElementsByClassName("salary");
    let count = 0;
    for (const element of allPrices) {
        count = count + parseFloat(element.innerText);
    }
    document.getElementById("total").innerText = count.toFixed(2);
};

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const searchInput = searchBox.value.trim();
    loadAllPlayers(searchInput);
});

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('singleplayer')) {
        const playerId = event.target.dataset.playerId;
        singlePlayer(playerId);
    }
});

loadAllPlayers('');
