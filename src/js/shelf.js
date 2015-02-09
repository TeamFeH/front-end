/**
 * Generate one shelf and add it to scene
 * @param object obj_shelf
 * @param string url_texture
 * @param integer position
 * @returns {undefined}
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

/**
 * Generate 5 planes for each drawer
 * @param {type} obj_shelf
 * @param {type} url_texture
 * @param {type} position
 * @returns {undefined}
 */
function generateDrawer(obj_shelf, url_texture, pos_x, pos_y, pos_z) {
    nbDrawers = (obj_shelf.drawers).length;
    texture = THREE.ImageUtils.loadTexture(url_texture);

    // Geometry used for bottom plane
    var geometry = new THREE.PlaneBufferGeometry(5, 5);
    var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    // Used for smaller planes of drawer (sides and back)
    var geometrySmall = new THREE.PlaneBufferGeometry(5, 1);
    var materialSmall = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    for (var i = 0; i < nbDrawers; i++) {
        // Bottom plane
        var planeBottom = new THREE.Mesh(geometry, material);
        planeBottom.rotation.x = Math.PI / 2;
        planeBottom.position.x = pos_x;
        planeBottom.position.y = 0.5 + i + pos_y;
        planeBottom.position.z = 5 + pos_z;
        planeBottom['base_pos_x'] = pos_x;
        planeBottom['base_pos_y'] = 0.5 + i + pos_y;
        planeBottom['base_pos_z'] = 5 + pos_z;
        planeBottom['name'] = obj_shelf.drawers[i].name;
        planeBottom["shelf_name"] = obj_shelf.name;
        planeBottom["drawer_name"] = obj_shelf.drawers[i].name;
        planeBottom["drawer_type"] = "bottom";
        planeBottom["is_opened"] = false;

        // Left Plane
        var planeLeft = new THREE.Mesh(geometrySmall, materialSmall);
        planeLeft.rotation.y = Math.PI / 2;
        planeLeft.position.x = -2.5 + pos_x;
        planeLeft.position.y = 1 + i + pos_y;
        planeLeft.position.z = 5 + pos_z;
        planeLeft['base_pos_x'] = -2.5 + pos_x;
        planeLeft['base_pos_y'] = 1 + i + pos_y;
        planeLeft['base_pos_z'] = 5 + pos_z;
        planeLeft['name'] = obj_shelf.drawers[i].name;
        planeLeft["shelf_name"] = obj_shelf.name;
        planeLeft["drawer_name"] = obj_shelf.drawers[i].name;
        planeLeft["drawer_type"] = "left";
        planeLeft["is_opened"] = false;

        // Right Plane
        var planeRight = new THREE.Mesh(geometrySmall, materialSmall);
        planeRight.rotation.y = Math.PI / 2;
        planeRight.position.x = 2.5 + pos_x;
        planeRight.position.y = 1 + i + pos_y;
        planeRight.position.z = 5 + pos_z;
        planeRight['base_pos_x'] = 2.5 + pos_x;
        planeRight['base_pos_y'] = 1 + i + pos_y;
        planeRight['base_pos_z'] = 5 + pos_z;
        planeRight['name'] = obj_shelf.drawers[i].name;
        planeRight["shelf_name"] = obj_shelf.name;
        planeRight["drawer_name"] = obj_shelf.drawers[i].name;
        planeRight["drawer_type"] = "right";
        planeRight["is_opened"] = false;

        // Front Plane
        var planeFront = new THREE.Mesh(geometrySmall, materialSmall);
        planeFront.position.x = pos_x;
        planeFront.position.y = 1 + i + pos_y;
        planeFront.position.z = 7.5 + pos_z;
        planeFront['base_pos_x'] = pos_x;
        planeFront['base_pos_y'] = 1 + i + pos_y;
        planeFront['base_pos_z'] = 7.5 + pos_z;
        planeFront['name'] = obj_shelf.drawers[i].name;
        planeFront["shelf_name"] = obj_shelf.name;
        planeFront["drawer_name"] = obj_shelf.drawers[i].name;
        planeFront["drawer_type"] = "front";
        planeFront["is_opened"] = false;

        // Back Plane
        var planeBack = new THREE.Mesh(geometrySmall, materialSmall);
        planeBack.position.x = pos_x;
        planeBack.position.y = 1 + i + pos_y;
        planeBack.position.z = 2.5 + pos_z;
        planeBack['base_pos_x'] = pos_x;
        planeBack['base_pos_y'] = 1 + i + pos_y;
        planeBack['base_pos_z'] = 2.5 + pos_z;
        planeBack['name'] = obj_shelf.drawers[i].name;
        planeBack["shelf_name"] = obj_shelf.name;
        planeBack["drawer_name"] = obj_shelf.drawers[i].name;
        planeBack["drawer_type"] = "back";
        planeBack["is_opened"] = false;

        // Add planes to scene
        scene.add(planeBottom);
        scene.add(planeLeft);
        scene.add(planeRight);
        scene.add(planeFront);
        scene.add(planeBack);

        // Add planes to objects list
        objects.push(planeBottom);
        objects.push(planeLeft);
        objects.push(planeRight);
        objects.push(planeFront);
        objects.push(planeBack);
    }
}
