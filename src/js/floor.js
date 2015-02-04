/*
 * Generate floor and add it to scene
 */
function generateFloor(url_texture) {
    var floorTexture = new THREE.ImageUtils.loadTexture(url_texture);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    var floorMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
    var floorGeometry = new THREE.BoxGeometry(100, 100, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.doubleSided = true;
    scene.add(floor);
}