var raycaster;
var mouse;
var objects = [];
var objectsPdf = [];
var mouse = {x: 0, y: 0}, intersected;

// create scene and camera
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 45;
camera.position.y = 13;
controls = new THREE.OrbitControls(camera);
// create a renderer, set its size, append it to the document.
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000011, 1);
document.body.appendChild(renderer.domElement);

console.log(THREE.FontUtils.faces);

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

// Generate floor
generateFloor('images/floor.jpg', 100, 100);
// Generate drawer
generateShelf(shelf, 'images/shelf.jpg', 'images/shelf_edge.jpg', 0, 0, 0, "normal");
//generateEdges(shelf, 'images/shelf_edge.jpg', 0,0,0, "common");

scene.add(new THREE.AmbientLight(0x000000));

// Listen to mouse down event (call onDocumentMouseDown)
document.addEventListener('mousedown', onDocumentMouseDown, false);
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

    // Mouse position
    mouse.x = (event.clientX / renderer.domElement.width) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.height) * 2 + 1;

    // Useful to interact with objets on a scene
    raycaster.setFromCamera(mouse, camera);

    // Get clicked object
    var intersects = raycaster.intersectObjects(objects);

//    console.log(objectsPdf);

    // Cube trick
    var tweenOpen, tweenClose;
    var PDFOpen, PDFClose;
    var theWindow = null;
    // Search all objects (faces) of the same drawer and move them on click
    if (intersects.length > 0) {
        var drawerName = intersects[0].object.drawer_name;

        // Click on PDF 
        // TODO TIMEOUT
        if (intersects[0].object.is_pdf === true) {
            var pdfName = intersects[0].object.pdf_name;
            for (var i=0; i < objectsPdf.length; i++){
                if (objectsPdf[i].pdf_name === pdfName){
                    if (objectsPdf[i].is_PDFopened === false ){
                        PDFOpen = new TWEEN.Tween(objectsPdf[i].position)
                            .to({ y : objectsPdf[i].base_pos_y + 3}, 1000)
                            .start();
                        objectsPdf[i].is_opened = true;
                        objectsPdf[i].is_PDFopened = true;
                    }
                    else
                    {
                        if (objectsPdf[i].is_PDFopened === true && theWindow == null){
                        var theWindow=window.open(objectsPdf[i].pdf_url,'_blank', 'fullscreen=yes');
                        console.log(theWindow);
                        }
                        if(objectsPdf[i].is_PDFopened == true && theWindow){
                            
                            PDFClose = new TWEEN.Tween(objectsPdf[i].position)
                                .to ({ y : objectsPdf[i].base_pos_y}, 1000)
                                .start();
                            objectsPdf[i].is_PDFopened = false;
                        }
                    }

                }

            }            

        // Click oon drawer
        } else {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].name === drawerName) {
                    // Ouvre le drawer
                    if (objects[i].is_opened === false) {
                        // Animation open
                        tweenOpen = new TWEEN.Tween(objects[i].position)
                                .to({z: objects[i].base_pos_z + 5}, 1000);
                        tweenOpen.start();

                        objects[i].is_opened = true;
                    } else {

                        //On ferme les PDFs si on ferme les tiroirs
                        for (var y=0; y < objectsPdf.length;y++){
                            if(objectsPdf[y].name == drawerName){

                                 PDFClose = new TWEEN.Tween(objectsPdf[y].position)
                                    .to ({ y : objectsPdf[y].base_pos_y}, 1000)
                                    .start();
                                objectsPdf[y].is_PDFopened = false;

                            }
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

/**
 * Resize scene on window resize
 * @returns {undefined}
 */
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}