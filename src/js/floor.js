/*
 * Generate floor and add it to scene
 */
function generateFloor(url_texture) {
    var floorTexture = new THREE.ImageUtils.loadTexture(url_texture);
    var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
    var floorGeometry = new THREE.BoxGeometry(100, 100, 0.1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.z = 0;
    scene.add(floor);
}