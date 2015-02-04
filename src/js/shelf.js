/*
 * Generate one shelf and add it to scene
 */
function generateShelf(obj_shelf, url_texture, position) {
    nbDrawers = (obj_shelf.drawers).length;
    for (var i = 0; i < nbDrawers; i++) {
        var cubegeometry = new THREE.BoxGeometry(5, 1, 5);
        texture = THREE.ImageUtils.loadTexture(url_texture);
        var cubematerial = new THREE.MeshBasicMaterial({wireframe: false, map: texture, side: THREE.DoubleSide});
        // The mesh basically takes the geometry and material specified above and uses them to create the actual cube.
        var cube = new THREE.Mesh(cubegeometry, cubematerial);
        cube.position.set(position, i + 1, 0);
        // The cube is then added to the scene.
        scene.add(cube);
        objects.push(cube);
    }
}