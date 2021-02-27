var locations = {
    courtyard: {
        panorama: 'images/courtyard.jpg',
        eggs: [
            [-0.12587820712970976, 5.510338553759633, 0],
            [-0.028580325945409157, 5.445477327995103, 0],
            [0.053453344915963985, 5.5273236466781634, 0],
            [-0.26486446083318516, 5.881107170695541, 0],
            [0.007088363198832104, 5.822068560570339, 0],
            [-0.12362573067266247, 0.5002947765628827, 0]
        ]
    },
    picnic: {
        panorama: 'images/picnic.jpg',
        eggs: [
            [-0.5411422879785617, 5.040059193272677, 0],
            [-0.19165482472353412, 5.567485509988917, 0],
            [-0.03885405885440729, 5.4380490621106325, 0],
            [-0.06573531664068066, 5.455813268801782, 0],
            [-0.08358934776027893, 5.809494124320525, 0],
            [-0.05399251511869396, 5.638968077540507, 0]
        ]
    }
};

var currentLoc = locations.courtyard;

window.onclick = function(event) {
    var eggModal = document.getElementById('egg-modal');
    var basketModal = document.getElementById('basket-modal');

    if (event.target == eggModal) {
        eggModal.style.display = "none";
    }

    if (event.target == basketModal) {
        basketModal.style.display = "none";
    }
} 

function closeModal(data) {
    var eggModal = document.getElementById('egg-modal');
    var basketModal = document.getElementById('basket-modal');

    eggModal.style.display = "none";
    basketModal.style.display = "none";
}

function checkEggs(lat, long, markers) {
    currentLoc.eggs.forEach(function (egg, index) {
        var latDiff = Math.abs(egg[0] - lat);
        var longDiff = Math.abs(egg[1] - long);

        if((latDiff < 0.02) && (longDiff < 0.015)) {
            if(egg[3] == 1) {
                eggModal("Egg already found.");
            } else {
                eggModal("You found an Egg!");
                egg[3] = 1;

                markers.addMarker({
                    id: `egg=${index}`,
                    circle: 20,
                    latitude: egg[0],
                    longitude: egg[1],
                    svgStyle: {
                        opacity: '0.5',
                        stroke: 'blue',
                        strokeWidth: '3px',
                        fill: 'light-blue'
                    }
                });
            }
        }
    });
}

function registerClick(data, markers) {
    console.log("Double Click");
    console.log(`Lat: ${data.latitude}`);
    console.log(`Long: ${data.longitude}`);

    checkEggs(data.latitude, data.longitude, markers)
}

function closeInstructions() {
    var modal = document.getElementById("startup");
    var viewerEl = document.getElementById('viewer');

    modal.style.display = "none";
 
    viewerEl.style.visibility = "visible";
}

function checkBasket() {
    var msg = "You have found " + basket.eggs + " Egg";
        
    if (basket.eggs > 1) {
        msg = msg + "s";
    }

    basketModal(msg);
}

function eggModal(msg) {
    var eggModal = document.getElementById('egg-modal');
    var eggMsg = document.getElementById('egg-msg');

    eggMsg.innerText = msg;

    eggModal.style.display = "block";
}

function openMovement(loc) {
    var movementModal = document.getElementById('movement-modal');
    var movementImg = document.getElementById('movement-img');
    var viewerEl = document.getElementById('viewer');

    movementImg.src = "images/map-" + loc + ".jpg";
    movementModal.style.display = "block";
    viewerEl.style.visibility = "hidden";
}

function closeMovement() {
    var movementModal = document.getElementById('movement-modal');
    var modal = document.getElementById("startup");
    var viewerEl = document.getElementById('viewer');

    movementModal.style.display = "none";

    if(modal.style.display == "none") {
        viewerEl.style.visibility = "visible";
    }
}

function changePanorama(loc, viewer, markers) {
    currentLoc = locations[loc];

    viewer.setPanorama(currentLoc.panorama);
    markers.clearMarkers();

    currentLoc.eggs.forEach(function (egg, index) {
        if(egg[2] == 1) {
            markers.addMarker({
                id: `egg=${index}`,
                circle: markerSize,
                latitude: egg[0],
                longitude: egg[1],
                svgStyle: {
                    opacity: '0.5',
                    stroke     : 'blue',
                    strokeWidth: '3px',
                    fill: 'light-blue'
                }
            });
        }
    });
}