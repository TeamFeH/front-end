var raycaster;
var mouse;
var objects = [];
var objectsPdf = [];
var mouse = {x: 0, y: 0}, intersected;

// create scene and camera
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(12, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 45;
camera.position.y = 13;
controls = new THREE.OrbitControls(camera);
// create a renderer, set its size, append it to the document.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000011, 1);
document.body.appendChild(renderer.domElement);

var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

// Call server to get shelf's json
$.ajax({
    type: "GET",
    dataType: "text",
    crossDomain: true,
    url: "http://127.0.0.1:8000/get_json/" + QueryString.name + "/",
    success: function (responseData, textStatus, jqXHR) {
        localStorage.setItem("shelf", responseData);
    },
    error: function (responseData, textStatus, errorThrown) {
        console.log('Ajax call failed');
    }
});

// Get the shelf in the local storage
var shelf = JSON.parse(localStorage.getItem("shelf"));

// Generate floor
generateFloor('images/floor.jpg', 100, 100);
// Generate drawer
generateShelf(shelf, 'images/shelf.jpg', 'images/shelf_edge.jpg', 0, 0, 0, "normal");

// Listen to mouse down event (call onDocumentMouseDown)
document.addEventListener('click', onDocumentMouseDown, false);
// Resize scene on window resize
window.addEventListener('resize', onWindowResize, false);

// Usefull to color cubes on click
raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

// The render loop that makes things visible and also contains the code for the rotational motion of the shapes.
var render = function () {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    TWEEN.update();
};

// Calling the render function
render();

function onDocumentMouseDown(event) {

    event.preventDefault();

    // Left click only
    if (event.which === 1) {
        // Mouse position
        mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

        // Useful to interact with objets on a scene
        raycaster.setFromCamera(mouse, camera);

        // Get clicked object
        var intersects = raycaster.intersectObjects(objects);

        // Cube trick
        var tweenOpen, tweenClose;
        var PDFOpen, PDFClose;
        var theWindow = null;
        // Search all objects (faces) of the same drawer and move them on click
        if (intersects.length > 0) {
            var drawerName = intersects[0].object.drawer_name;

            // Click on PDF 
            if (intersects[0].object.is_pdf === true) {
                var pdfName = intersects[0].object.pdf_name;
                for (var i = 0; i < objectsPdf.length; i++) {
                    // Open clicked pdf
                    if (objectsPdf[i].pdf_name === pdfName) {
                        if (objectsPdf[i].is_PDFopened === false) {
                            PDFOpen = new TWEEN.Tween(objectsPdf[i].position)
                                    .to({y: objectsPdf[i].base_pos_y + 3}, 1000)
                                    .start();
                            objectsPdf[i].is_opened = true;
                            objectsPdf[i].is_PDFopened = true;

                            // var used to handle closing of pdf
                            var handlePdf = objectsPdf[i];
                            // Timeout with anonymous function to close pdf
                            setTimeout(function () {
                                (function (handlePdf) {
                                    PDFClose = new TWEEN.Tween(handlePdf.position)
                                            .to({y: handlePdf.base_pos_y}, 1000)
                                            .start();
                                    handlePdf.is_PDFopened = false;
                                })(handlePdf);
                            }, 5000);
                        } else {
                            if (objectsPdf[i].is_PDFopened === true && theWindow == null) {
                                var theWindow = window.open("http://127.0.0.1:8000" +objectsPdf[i].pdf_url, '_blank', 'fullscreen=yes');
                                console.log(theWindow);
                            }
                            if (objectsPdf[i].is_PDFopened == true && theWindow) {

                                PDFClose = new TWEEN.Tween(objectsPdf[i].position)
                                        .to({y: objectsPdf[i].base_pos_y}, 1000)
                                        .start();
                                objectsPdf[i].is_PDFopened = false;
                            }
                        }
                    }
                }
                // Click on drawer
            } else {


                for (var i = 0; i < objects.length; i++) {
                    if (objects[i].name === drawerName) {
                        // Ouvre le drawer
                        if (objects[i].is_opened === false) {
                            // Close all pdf when opening a drawer
                            for (var y = 0; y < objectsPdf.length; y++) {
                                PDFClose = new TWEEN.Tween(objectsPdf[y].position)
                                        .to({y: objectsPdf[y].base_pos_y}, 1000)
                                        .start();
                                objectsPdf[y].is_PDFopened = false;
                            }

                            // Animation open
                            tweenOpen = new TWEEN.Tween(objects[i].position)
                                    .to({z: objects[i].base_pos_z + 5}, 1000);
                            tweenOpen.start();

                            objects[i].is_opened = true;
                        } else {

                            //On ferme les PDFs si on ferme les tiroirs
                            for (var y = 0; y < objectsPdf.length; y++) {

                                PDFClose = new TWEEN.Tween(objectsPdf[y].position)
                                        .to({y: objectsPdf[y].base_pos_y}, 1000)
                                        .start();
                                objectsPdf[y].is_PDFopened = false;

                            }
                            // Animation close
                            tweenClose = new TWEEN.Tween(objects[i].position)
                                    .to({z: objects[i].base_pos_z}, 1000)
                                    .start();

                            objects[i].is_opened = false;
                        }
                    }
                }
            }
        }
    }
}

/**
 * Resize scene on window resize
 * @returns {undefined}
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}