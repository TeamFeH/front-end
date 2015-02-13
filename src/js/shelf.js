/**
 * Generate 5 planes for each drawer
 * @param {type} obj_shelf
 * @param {type} url_texture
 * @param {type} position
 * @returns {undefined}
 */
function generateShelf(obj_shelf, url_texture, url_texture_edge, pos_x, pos_y, pos_z, drawer_type) {
    nbDrawers = (obj_shelf.drawers).length;
    texture = THREE.ImageUtils.loadTexture(url_texture);
    texture_edge = THREE.ImageUtils.loadTexture(url_texture_edge);

    var geomPos = getEdgeGeometryPositon(drawer_type);
    
    // Geometry used for bottom plane
    var geometry = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometry);
    var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    // Used for smaller planes of drawer (sides and back)
    var geometrySmall = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometryOther);
    var materialSmall = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    var geometryEdge = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometry);
    var materialEdge = new THREE.MeshBasicMaterial({map: texture_edge, side: THREE.DoubleSide});

    var geometryEdgeSmall = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometryOther);
    var materialEdgeSmall = new THREE.MeshBasicMaterial({map: texture_edge, side: THREE.DoubleSide});

    

    for (var i = 0; i < nbDrawers; i++) {
        // Bottom plane
        var planeBottom = new THREE.Mesh(geometry, material);
        planeBottom.rotation.x = Math.PI / 2;
        planeBottom.position.x = pos_x;
        planeBottom.position.y = -(geomPos.scale / 2) + (i*geomPos.scale) + pos_y;
        planeBottom.position.z = geomPos.geometry + pos_z;
        planeBottom['base_pos_x'] = pos_x;
        planeBottom['base_pos_y'] = geomPos.spacing + i + pos_y;
        planeBottom['base_pos_z'] = geomPos.geometry + pos_z;
        planeBottom['name'] = obj_shelf.drawers[i].name;
        planeBottom["shelf_name"] = obj_shelf.name;
        planeBottom["drawer_name"] = obj_shelf.drawers[i].name;
        planeBottom["drawer_type"] = "bottom";
        planeBottom["is_opened"] = false;

        // Left Plane
        var planeLeft = new THREE.Mesh(geometrySmall, materialSmall);
        planeLeft.rotation.y = Math.PI / 2;
        planeLeft.position.x = -(geomPos.geometry / 2) + pos_x;
        planeLeft.position.y = (i*geomPos.scale) + pos_y;
        planeLeft.position.z = geomPos.geometry + pos_z;
        planeLeft['base_pos_x'] = -(geomPos.geometry / 2) + pos_x;
        planeLeft['base_pos_y'] = (i*geomPos.scale) + pos_y;
        planeLeft['base_pos_z'] = geomPos.geometry + pos_z;
        planeLeft['name'] = obj_shelf.drawers[i].name;
        planeLeft["shelf_name"] = obj_shelf.name;
        planeLeft["drawer_name"] = obj_shelf.drawers[i].name;
        planeLeft["drawer_type"] = "left";
        planeLeft["is_opened"] = false;

        // Right Plane
        var planeRight = new THREE.Mesh(geometrySmall, materialSmall);
        planeRight.rotation.y = Math.PI / 2;
        planeRight.position.x = (geomPos.geometry / 2) + pos_x;
        planeRight.position.y = (i*geomPos.scale) + pos_y;
        planeRight.position.z = geomPos.geometry + pos_z;
        planeRight['base_pos_x'] = (geomPos.geometry / 2) + pos_x;
        planeRight['base_pos_y'] = (i*geomPos.scale) + pos_y;
        planeRight['base_pos_z'] = geomPos.geometry + pos_z;
        planeRight['name'] = obj_shelf.drawers[i].name;
        planeRight["shelf_name"] = obj_shelf.name;
        planeRight["drawer_name"] = obj_shelf.drawers[i].name;
        planeRight["drawer_type"] = "right";
        planeRight["is_opened"] = false;

        // Front Plane
        var planeFront = new THREE.Mesh(geometrySmall, materialSmall);
        planeFront.position.x = pos_x;
        planeFront.position.y = (i*geomPos.scale) + pos_y;
        planeFront.position.z = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z;
        planeFront['base_pos_x'] = pos_x;
        planeFront['base_pos_y'] = (i*geomPos.scale) + pos_y;
        planeFront['base_pos_z'] = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z;
        planeFront['name'] = obj_shelf.drawers[i].name;
        planeFront["shelf_name"] = obj_shelf.name;
        planeFront["drawer_name"] = obj_shelf.drawers[i].name;
        planeFront["drawer_type"] = "front";
        planeFront["is_opened"] = false;

        // Back Plane
        var planeBack = new THREE.Mesh(geometrySmall, materialSmall);
        planeBack.position.x = pos_x;
        planeBack.position.y = (i*geomPos.scale) + pos_y;
        planeBack.position.z = (geomPos.geometry / 2) + pos_z;
        planeBack['base_pos_x'] = pos_x;
        planeBack['base_pos_y'] = (i*geomPos.scale) + pos_y;
        planeBack['base_pos_z'] = (geomPos.geometry / 2) + pos_z;
        planeBack['name'] = obj_shelf.drawers[i].name;
        planeBack["shelf_name"] = obj_shelf.name;
        planeBack["drawer_name"] = obj_shelf.drawers[i].name;
        planeBack["drawer_type"] = "back";
        planeBack["is_opened"] = false;

        // Text
        var materialText = new THREE.MeshBasicMaterial({
            color: 0xDAB30A
        });
        var textGeom = new THREE.TextGeometry( obj_shelf.drawers[i].name, {
            size: 0.35, height: 0,
            font: 'helvetiker', weight: 'normal',
            bevelThickness: 0.01,
            bevelSize: 0,
            bevelEnabled: true
        });

        var drawerNameMesh = new THREE.Mesh (textGeom, materialText);
        drawerNameMesh.position.x = pos_x - (geomPos.geometry / 2) + geomPos.spacingText;
        drawerNameMesh.position.y = pos_y + geomPos.geometryOther * i ;
        drawerNameMesh.position.z = pos_z + (geomPos.geometry + (geomPos.geometry/2));
        drawerNameMesh['base_pos_x'] = pos_x - (geomPos.geometry / 2) + geomPos.spacingText;
        drawerNameMesh['base_pos_y'] = geomPos.scale + i + pos_y;
        drawerNameMesh['base_pos_z'] = pos_z +  (geomPos.geometry + (geomPos.geometry/2));
        drawerNameMesh['name'] = obj_shelf.drawers[i].name;
        drawerNameMesh['drawer_name'] = obj_shelf.drawers[i].name;
        drawerNameMesh['is_opened'] = false;
        drawerNameMesh['type'] = "text";

        // Left edge
        var edgeLeft = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeLeft.rotation.y = Math.PI / 2;
        edgeLeft.position.x = -((geomPos.geometry / 2) + geomPos.spacing) + pos_x;
        edgeLeft.position.y = pos_y + (i*geomPos.scale);
        edgeLeft.position.z = geomPos.geometry + pos_z;

        // Right edge
        var edgeRight = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeRight.rotation.y = Math.PI / 2;
        edgeRight.position.x = (geomPos.geometry / 2) + geomPos.spacing + pos_x;
        edgeRight.position.y = pos_y + (i*geomPos.scale);
        edgeRight.position.z = geomPos.geometry + pos_z;

        // Back edge
        var edgeBack = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeBack.position.x = pos_x;
        edgeBack.position.y = pos_y + (i*geomPos.scale);
        edgeBack.position.z = (geomPos.geometry / 2) - geomPos.spacing + pos_z;


        // Add planes to scene
        scene.add(planeBottom);
        scene.add(planeLeft);
        scene.add(planeRight);
        scene.add(planeFront);
        scene.add(planeBack);

        // Add edges to scene
        scene.add(edgeLeft);
        scene.add(edgeRight);
        scene.add(edgeBack);

        // Aded text to scene
        scene.add(drawerNameMesh);

        // Add planes to objects list
        objects.push(planeBottom);
        objects.push(planeLeft);
        objects.push(planeRight);
        objects.push(planeFront);
        objects.push(planeBack);

        //Add text to objets list
        objects.push(drawerNameMesh);
    }

    // Bottom edge
    var edgeBottom = new THREE.Mesh(geometryEdge, materialEdge);
    edgeBottom.rotation.x = Math.PI / 2;
    edgeBottom.position.x = pos_x;
    edgeBottom.position.y = -(geomPos.scale / 2) + pos_y - geomPos.spacing;
    edgeBottom.position.z = geomPos.geometry + pos_z;

    // Top edge
    var edgeTop = new THREE.Mesh(geometryEdge, materialEdge);
    edgeTop.rotation.x = Math.PI / 2;
    edgeTop.position.x = pos_x;
    edgeTop.position.y = -(geomPos.scale / 2) + (nbDrawers*geomPos.scale) + pos_y;
    edgeTop.position.z = geomPos.geometry + pos_z;

    scene.add(edgeTop);
    scene.add(edgeBottom);
}

/**
 * 
 * @param {type} drawer_type
 * @returns {unresolved}
 */
function getEdgeGeometryPositon(drawer_type) {
    switch (drawer_type) {
        case "common":
            var geomPos = {
                geometry: 5,
                geometryOther: 1,
                spacing: 0.01,
                spacingText: 0.5,
                scale: 1
            };
            return geomPos;
            break;
    }

}