var raycaster;
var mouse;
var objects = [];

// create scene and camera
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 20;
camera.position.y = 40;
controls = new THREE.OrbitControls(camera);
// create a renderer, set its size, append it to the document.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000011, 1);
document.body.appendChild(renderer.domElement);

// Call server to get shelf's json
$.ajax({
    type: "GET",
    dataType: "text",
    crossDomain: true,
    url: "http://127.0.0.1:8000/get_json/shelf_dev/",
    success: function (responseData, textStatus, jqXHR) {
        localStorage.setItem("shelf", responseData);
    },
    error: function (responseData, textStatus, errorThrown) {
        console.log('Ajax call failed');
    }
});

// Get the shelf in the local storage
shelf = JSON.parse(localStorage.getItem("shelf"));

// Generate shelf
// TODO : loop on shelf list (json)
generateShelf(shelf, 'images/white-wood.jpg', 0);

// Generate floor
generateFloor('images/floor.jpg');

// Listen to mouse down event (call onDocumentMouseDown)
document.addEventListener('mousedown', onDocumentMouseDown, false);

// Usefull to color cubes on click
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// The render loop that makes things visible and also contains the code for the rotational motion of the shapes.
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

// Calling the render function
render();

function onDocumentMouseDown(event) {

    event.preventDefault();

    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        intersects[ 0 ].object.material.color.setHex(Math.random() * 0xffffff);
        console.debug(intersects[ 0 ].object.material);
    }
}