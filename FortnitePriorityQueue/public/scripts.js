// Array para almacenar los jugadores encolados
var playerQueue = [];
// Array para almacenar el escuadrón actual
var currentSquad = [];
// Array para almacenar los jugadores de la segunda vuelta
var secondRound = [];
// Array para almacenar los jugadores sentados
var sentados = [];

var playerImages = ["Imagenes/QoobeeMamon.png", "Imagenes/PeelyRobotizado.webp",
  "Imagenes/PeelyAnimado.webp", "Imagenes/PeelyIce.webp", "Imagenes/PeelyMuerto.webp",
  "Imagenes/PeelyHuesudo.webp", "Imagenes/PeelyAgent.webp", "Imagenes/PeelyPotasius.webp"];

function enqueuePlayer() {
  var playerName = document.getElementById("player-name").value;
  var isVIP = document.getElementById("vip").checked;
  var isSub = document.getElementById("sub").checked;
  var isMod = document.getElementById("mod").checked;

  //Jugador Vacio
  if (playerName === "") {
    alert("NO PUEDES AGREGAR JUGADORES VACIOS");
    return;
  }

  // Verificar si el jugador es "TheKingCerberu"
  if (playerName === "TheKingCerberu") {
    alert("No puedes agregar a 'TheKingCerberu' manualmente. Este jugador está reservado.");
    return;
  }

  var player = {
    name: playerName,
    isVIP: isVIP,
    isSub: isSub,
    isMod: isMod,
    remainingMatches: 3
  };

  // Verificar si el jugador es "Mi Puchurrumina" y asignarle partidas ilimitadas
  if (playerName === "Mi Kiubis") {
    player.remainingMatches = 999999; // Partidas ilimitadas
  }

  // Insertar el jugador en la cola de acuerdo a la prioridad
  playerQueue.push(player);
  playerQueue.sort(comparePlayers);

  // Limpiar los campos de entrada
  document.getElementById("player-name").value = "";
  document.getElementById("vip").checked = false;
  document.getElementById("sub").checked = false;
  document.getElementById("mod").checked = false;

  // Actualizar la lista de espera
  updateCurrentSquadList();
  updateQueueList();
  updateSecondRoundList();
  updateSelectPlayer();
  updateSelectPlayerQueue();
  updateSelectPlayerReturn();
  updateSentados();
}

// Cola de Prioridad
function comparePlayers(player1, player2) {
  if (player1.isSub && player1.isMod) {
    if (!(player2.isSub && player2.isMod)) {
      return -1;
    }
  } else if (player2.isSub && player2.isMod) {
    return 1;
  }

  if (player1.isSub && player1.isVIP) {
    if (!(player2.isSub && player2.isVIP)) {
      return -1;
    }
  } else if (player2.isSub && player2.isVIP) {
    return 1;
  }

  if (player1.isSub && !player2.isSub) {
    return -1;
  } else if (!player1.isSub && player2.isSub) {
    return 1;
  }

  if (player1.isMod && !player2.isMod) {
    return -1;
  } else if (!player1.isMod && player2.isMod) {
    return 1;
  }

  if (player1.isVIP && !player2.isVIP) {
    return -1;
  } else if (!player1.isVIP && player2.isVIP) {
    return 1;
  }

  return 0;
}



function updateRemainingMatches() {
  // Verificar si "TheKingCerberu" está en el escuadrón actual
  var isTheKingCerberuPresent = false;
  for (var i = 0; i < currentSquad.length; i++) {
    if (currentSquad[i].name === "TheKingCerberu") {
      isTheKingCerberuPresent = true;
      break;
    }
  }

  // Si "TheKingCerberu" no está presente, agregarlo con partidas ilimitadas
  if (!isTheKingCerberuPresent) {
    var theKingCerberu = {
      name: "TheKingCerberu",
      isVIP: false,
      isSub: false,
      isMod: false,
      remainingMatches: 9999999 // Partidas ilimitadas
    };
    currentSquad.push(theKingCerberu);
  }

  for (var i = 0; i < currentSquad.length; i++) {
    var player = currentSquad[i];
    player.remainingMatches--;

    if (player.remainingMatches === 0) {
      player.remainingMatches = 3; // Reinicia las partidas restantes
      secondRound.push(player);
      currentSquad.splice(i, 1);
      i--;
    }
  }

  if (currentSquad.length < 4 && playerQueue.length > 0) {
    while (currentSquad.length < 4 && playerQueue.length > 0) {
      currentSquad.push(playerQueue.shift());
    }
  }

  if (playerQueue.length === 0 && secondRound.length > 0) {
    playerQueue = secondRound;
    secondRound = [];
  }

  updateCurrentSquadList();
  updateQueueList();
  updateSecondRoundList();
  updateSelectPlayer();
  updateSelectPlayerQueue();
  updateSelectPlayerReturn();
  updateSentados();
}

function createImage(src, width, marginRight, marginLeft, marginBottom, borderRadius, className) {
  var playerMod = document.createElement("img");
  playerMod.src = src;
  playerMod.style.width = width;
  playerMod.style.marginRight = marginRight;
  playerMod.style.marginLeft = marginLeft;
  playerMod.style.marginBottom = marginBottom;
  playerMod.style.borderRadius = borderRadius;
  playerMod.classList.add(className);
  return playerMod;
}

function updateQueueList() {
  var queueList = document.getElementById("queue-list");
  queueList.innerHTML = "";

  for (var i = 0; i < playerQueue.length; i++) {
    var player = playerQueue[i];
    var playerInfo = document.createElement("li");
    playerInfo.classList.add("player-info");

    var randomIndex = Math.floor(Math.random() * playerImages.length);
    var randomImage = playerImages[randomIndex];

    var playerImage = document.createElement("img");
    playerImage.src = randomImage;
    playerImage.classList.add("player-image");
    playerInfo.appendChild(playerImage);

    var playerName = document.createElement("span");
    playerName.classList.add("player-name");
    let left = "10px";
    if (player.isSub) {
      playerInfo.appendChild(createImage("Imagenes/SUB.png", "15px", "10px", "10px", "4px", "5px", "player-sub"));
      left = "1px";
    }
    if (player.isMod) {
      playerInfo.appendChild(createImage("Imagenes/MOD.jpg", "15px", "10px", left, "4px", "5px", "player-mod"));
    }
    if (player.isVIP) {
      playerInfo.appendChild(createImage("Imagenes/VIP.png", "15px", "10px", left, "4px", "5px", "player-vip"));
    }

    playerName.textContent = player.name + " - Partidas restantes: " + player.remainingMatches;
    playerName.style.color = "#000";
    playerName.style.fontSize = "20px";
    playerInfo.appendChild(playerName);
    queueList.appendChild(playerInfo);
  }
}

function updateCurrentSquadList() {
  var currentSquadList = document.getElementById("current-squad-list");
  currentSquadList.innerHTML = "";

  for (var i = 0; i < currentSquad.length; i++) {
    var player = currentSquad[i];
    var playerInfo = document.createElement("li");
    playerInfo.classList.add("player-info"); // Agrega la clase "player-info" al elemento li

    var randomIndex = Math.floor(Math.random() * playerImages.length); // Obtiene un índice aleatorio de la lista de imágenes
    var randomImage = playerImages[randomIndex];

    var playerImage = document.createElement("img");
    if (player.name === "TheKingCerberu") {
      playerImage.src = "Imagenes/Peely.webp";
    } else if (player.name === "Mi Puchurrumina") {
      playerImage.src = "Imagenes/PeelyPlayero.png";
    } else {
      playerImage.src = randomImage;
    }

    playerImage.classList.add("player-image");
    playerInfo.appendChild(playerImage);

    var playerName = document.createElement("span");
    playerName.classList.add("player-name"); // Agrega la clase "player-name" al elemento span
    let left = "10px";
    if (player.isSub) {
      playerInfo.appendChild(createImage("Imagenes/SUB.png", "15px", "10px", "10px", "4px", "5px", "player-sub"));
      left = "1px";
    }
    if (player.isMod) {
      playerInfo.appendChild(createImage("Imagenes/MOD.jpg", "15px", "10px", left, "4px", "5px", "player-mod"));
    }
    if (player.isVIP) {
      playerInfo.appendChild(createImage("Imagenes/VIP.png", "15px", "10px", left, "4px", "5px", "player-vip"));
    }
    if (player.name == "TheKingCerberu"){
      playerInfo.appendChild(createImage("Imagenes/Streamer.png", "15px", "10px", "10px", "4px", "5px", "player-streamer"));
      playerName.textContent = player.name;
    } else {
      if (player.name == "Mi Kiubis"){
        playerName.textContent = player.name;
      } else {
        playerName.textContent = player.name + " - Partidas restantes: " + player.remainingMatches;
      }
    }
    playerName.style.color = "#000";
    playerName.style.fontSize = "20px";
    playerInfo.appendChild(playerName);
    currentSquadList.appendChild(playerInfo);
  }
}

function updateSecondRoundList() {
  var secondRoundList = document.getElementById("second-round-list");
  secondRoundList.innerHTML = "";

  for (var i = 0; i < secondRound.length; i++) {
    var player = secondRound[i];
    var playerInfo = document.createElement("li");
    playerInfo.classList.add("player-info");

    var randomIndex = Math.floor(Math.random() * playerImages.length); // Obtiene un índice aleatorio de la lista de imágenes
    var randomImage = playerImages[randomIndex];

    var playerImage = document.createElement("img");
    playerImage.src = randomImage;
    playerImage.classList.add("player-image");
    playerInfo.appendChild(playerImage);

    let left = "10px";
    if (player.isSub) {
      playerInfo.appendChild(createImage("Imagenes/SUB.png", "15px", "10px", "10px", "4px", "5px", "player-sub"));
      left = "1px";
    }
    if (player.isMod) {
      playerInfo.appendChild(createImage("Imagenes/MOD.jpg", "15px", "10px", left, "4px", "5px", "player-mod"));
    }
    if (player.isVIP) {
      playerInfo.appendChild(createImage("Imagenes/VIP.png", "15px", "10px", left, "4px", "5px", "player-vip"));
    }

    var playerName = document.createElement("span");
    playerName.classList.add("player-name");
    playerName.textContent = player.name + " - Partidas restantes: " + player.remainingMatches;
    playerName.style.color = "#000";
    playerName.style.fontSize = "20px";
    playerInfo.appendChild(playerName);
    secondRoundList.appendChild(playerInfo);
  }
}

function updateSentados() {
  var sentadosList = document.getElementById("sentados-list");
  sentadosList.innerHTML = "";

  for (var i = 0; i < sentados.length; i++) {
    var player = sentados[i];
    var playerInfo = document.createElement("li");
    playerInfo.classList.add("player-info");

    var randomIndex = Math.floor(Math.random() * playerImages.length); // Obtiene un índice aleatorio de la lista de imágenes
    var randomImage = playerImages[randomIndex];

    var playerImage = document.createElement("img");
    playerImage.src = randomImage;
    playerImage.classList.add("player-image");
    playerInfo.appendChild(playerImage);

    var playerName = document.createElement("span");
    playerName.classList.add("player-name");

    let left = "10px";
    if (player.isSub) {
      playerInfo.appendChild(createImage("Imagenes/SUB.png", "15px", "10px", "10px", "4px", "5px", "player-sub"));
      left = "1px";
    }
    if (player.isMod) {
      playerInfo.appendChild(createImage("Imagenes/MOD.jpg", "15px", "10px", left, "4px", "5px", "player-mod"));
    }
    if (player.isVIP) {
      playerInfo.appendChild(createImage("Imagenes/VIP.png", "15px", "10px", left, "4px", "5px", "player-vip"));
    }

    playerName.textContent = player.name + " - Partidas restantes: " + player.remainingMatches;
    playerName.style.color = "#000";
    playerName.style.fontSize = "20px";
    playerInfo.appendChild(playerName);
    playerInfo.setAttribute("data-index", i); // Agrega el atributo data-index
    playerInfo.addEventListener("click", selectPlayerFromSentados); // Agrega el evento click
    sentadosList.appendChild(playerInfo);
  }
}

function selectPlayerFromSentados(event) {
  var playerIndex = event.target.getAttribute("data-index");
  var returnPlayerButton = document.getElementById("return-player-button");
  returnPlayerButton.setAttribute("data-index", playerIndex);
}

function returnPlayerToQueue() {
  var returnPlayerButton = document.getElementById("return-player-button");
  var playerIndex = returnPlayerButton.getAttribute("data-index");

  if (playerIndex !== null) {
    var player = sentados[playerIndex];
    sentados.splice(playerIndex, 1);
    playerQueue.unshift(player); // Inserta al principio de la lista de espera

    updateCurrentSquadList();
    updateQueueList();
    updateSecondRoundList();
    updateSelectPlayer();
    updateSelectPlayerQueue();
    updateSelectPlayerReturn();
    updateSentados();
  }
}

function updateSelectPlayer() {
  var selectPlayer = document.getElementById("select-player");
  selectPlayer.innerHTML = "";

  for (var i = 0; i < currentSquad.length; i++) {
    var player = currentSquad[i];
    var option = document.createElement("option");
    option.value = i;
    option.textContent = player.name;
    selectPlayer.appendChild(option);
  }
}

function updateSelectPlayerQueue() {
  var selectPlayer = document.getElementById("select-player-mandar");
  selectPlayer.innerHTML = "";

  for (var i = 0; i < playerQueue.length; i++) {
    var player = playerQueue[i];
    var option = document.createElement("option");
    option.value = i;
    option.textContent = player.name;
    selectPlayer.appendChild(option);
  }
}

function updateSelectPlayerReturn() {
  var selectPlayer = document.getElementById("return-player-select");
  selectPlayer.innerHTML = "";

  for (var i = 0; i < sentados.length; i++) {
    var player = sentados[i];
    var option = document.createElement("option");
    option.value = i;
    option.textContent = player.name;
    selectPlayer.appendChild(option);
  }
}

function movePlayer() {
  var selectPlayer = document.getElementById("select-player");
  var selectedIndex = selectPlayer.value;

  if (selectedIndex !== "") {
    var player = currentSquad[selectedIndex];
    currentSquad.splice(selectedIndex, 1);
    sentados.push(player);
    updateCurrentSquadList();
    updateQueueList();
    updateSecondRoundList();
    updateSelectPlayer();
    updateSelectPlayerQueue();
    updateSelectPlayerReturn();
    updateSentados(); // Agregada esta función para actualizar la lista de jugadores sentados
  }
}

function movePlayerSquad() {
  var selectPlayer = document.getElementById("select-player-mandar");
  var selectedIndex = selectPlayer.value;

  if (selectedIndex !== "" && currentSquad.length < 4) {
    var player = playerQueue[selectedIndex];
    playerQueue.splice(selectedIndex, 1);
    currentSquad.push(player);
    updateCurrentSquadList();
    updateQueueList();
    updateSecondRoundList();
    updateSelectPlayer();
    updateSelectPlayerQueue();
    updateSelectPlayerReturn();
    updateSentados(); // Agregada esta función para actualizar la lista de jugadores sentados
  }
}

function returnPlayerToQueue() {
  var selectPlayer = document.getElementById("return-player-select");
  var selectedIndex = selectPlayer.value;

  if (selectedIndex !== "") {
    var player = sentados[selectedIndex];
    sentados.splice(selectedIndex, 1);
    currentSquad.push(player);
    updateCurrentSquadList();
    updateQueueList();
    updateSecondRoundList();
    updateSelectPlayer();
    updateSelectPlayerQueue();
    updateSelectPlayerReturn();
    updateSentados(); // Agregada esta función para actualizar la lista de jugadores sentados
  }
}

const playerInput = document.getElementById('player-name');
const sugerenciasJugadores = document.getElementById('sugerencias-jugadores');
let selectedSuggestionIndex = -1;

playerInput.addEventListener('input', function () {
  const busqueda = playerInput.value.toLowerCase();

  if (busqueda === '') {
    sugerenciasJugadores.innerHTML = '';
    sugerenciasJugadores.style.display = 'none';
    return;
  }

  fetch('Seguidores.txt')
    .then(response => response.text())
    .then(data => {
      const seguidores = data.split('\n');
      const coincidencias = seguidores.filter(seguidor => seguidor.toLowerCase().includes(busqueda));

      mostrarCoincidencias(coincidencias);
    })
    .catch(error => {
      console.error('Error al leer el archivo:', error);
    });
});

playerInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    seleccionarOpcion();
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    navigateSuggestions('up');
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    navigateSuggestions('down');
  }
});

sugerenciasJugadores.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    seleccionarOpcion(event.target.textContent);
  }
});

function mostrarCoincidencias(coincidencias) {
  sugerenciasJugadores.innerHTML = '';

  if (coincidencias.length > 0) {
    coincidencias.forEach((coincidencia, index) => {
      const li = document.createElement('li');
      li.textContent = coincidencia;
      sugerenciasJugadores.appendChild(li);
    });

    sugerenciasJugadores.style.display = 'block';
  } else {
    sugerenciasJugadores.style.display = 'none';
  }

  selectedSuggestionIndex = -1;
}

function seleccionarOpcion(opcion) {
  if (opcion) {
    playerInput.value = opcion;
    sugerenciasJugadores.style.display = 'none';
  }
}

function navigateSuggestions(direction) {
  const suggestions = sugerenciasJugadores.querySelectorAll('li');
  const numSuggestions = suggestions.length;

  if (direction === 'up') {
    if (selectedSuggestionIndex > 0) {
      selectedSuggestionIndex--;
    }
  } else if (direction === 'down') {
    if (selectedSuggestionIndex < numSuggestions - 1) {
      selectedSuggestionIndex++;
    }
  }

  suggestions.forEach((suggestion, index) => {
    if (index === selectedSuggestionIndex) {
      suggestion.classList.add('selected');
    } else {
      suggestion.classList.remove('selected');
    }
  });
}

function animateCheckbox(checkboxId) {
  const checkbox = document.getElementById(checkboxId);
  checkbox.classList.add('animate__animated', 'animate__pulse');

  // Eliminar la clase de animación después de cierto tiempo (ajusta el valor según tus preferencias)
  setTimeout(function () {
    checkbox.classList.remove('animate__animated', 'animate__pulse');
  }, 1000);
}
