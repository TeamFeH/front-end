var raycaster;
var mouse;
var objects = [];

// create scene and camera
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 30;
camera.position.y = 10;
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
var shelf = JSON.parse(localStorage.getItem("shelf"));

// Generate drawer
generateDrawer(shelf, 'images/shelf.jpg', 0, 0, 0);
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

    // Mouse position
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

    // Useful to interact with objets on a scene
    raycaster.setFromCamera(mouse, camera);

    // Get clicked object
    var intersects = raycaster.intersectObjects(objects);

    // Cube trick
    // Search all objects (faces) of the same drawer and move them on click
    if (intersects.length > 0) {
        var drawerName = intersects[0].object.drawer_name;
        for (var i = 0; i < objects.length; i++) {
            if (objects[i].name === drawerName) {
                if (objects[i].is_opened === false) {
                    objects[i].position.z += 5;
                    objects[i].is_opened = true;
                } else {
                    objects[i].position.z -= 5;
                    objects[i].is_opened = false;
                }
            }
        }
    }
}