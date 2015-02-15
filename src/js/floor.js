/*
 * Generate floor and add it to scene
 */
function generateFloor(url_texture, floor_width, floor_height, drawer_type) {

    var floorTexture = new THREE.ImageUtils.loadTexture(url_texture);
    var geometry = new THREE.PlaneBufferGeometry(floor_width, floor_height);
    var material = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});

    var geomPos = getEdgeGeometryPositon(drawer_type);

    var floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = Math.PI / 2;
    floor.position.x = 0;
    floor.position.y = -geomPos.scale;
    floor.position.z = 0;


    scene.add(floor);
}