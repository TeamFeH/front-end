/**
 * Generate 5 planes for each drawer
 * @param {type} obj_shelf
 * @param {type} url_texture
 * @param {type} position
 * @returns {undefined}
 */
function generateShelf(obj_shelf, url_texture, url_texture_edge, pos_x, pos_y, pos_z, drawer_type) {
    nbDrawers = (obj_shelf.drawers).length;
    //nbPdfs = (.pdf).length;

    console.debug;
    texture = THREE.ImageUtils.loadTexture(url_texture);
    texture_edge = THREE.ImageUtils.loadTexture(url_texture_edge);

    // Get General Position and Geometry of a drawer type
    var geomPos = getGeometryPositon(drawer_type);

    // Geometry used for bottom plane
    var geometry = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometry);
    var material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    // Used for smaller planes (sides and back)
    var geometrySmall = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometryOther);
    var materialSmall = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});

    // Geometry for Edges
    var geometryEdge = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometry);
    var materialEdge = new THREE.MeshBasicMaterial({map: texture_edge, side: THREE.DoubleSide});

    // Used for smaller edges (sides and back)
    var geometryEdgeSmall = new THREE.PlaneBufferGeometry(geomPos.geometry, geomPos.geometryOther);
    var materialEdgeSmall = new THREE.MeshBasicMaterial({map: texture_edge, side: THREE.DoubleSide});

    // Loop to add each drawer to scene
    for (var i = 0; i < nbDrawers; i++) {
        // Bottom plane
        var planeBottom = new THREE.Mesh(geometry, material);
        planeBottom.rotation.x = Math.PI / 2;
        planeBottom.position.x = pos_x;
        planeBottom.position.y = -(geomPos.scale / 2) + (i * geomPos.scale) + pos_y;
        planeBottom.position.z = geomPos.geometry + pos_z;
        planeBottom['base_pos_x'] = pos_x;
        planeBottom['base_pos_y'] = -(geomPos.scale / 2) + (i * geomPos.scale) + pos_y;
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
        planeLeft.position.y = (i * geomPos.scale) + pos_y;
        planeLeft.position.z = geomPos.geometry + pos_z;
        planeLeft['base_pos_x'] = -(geomPos.geometry / 2) + pos_x;
        planeLeft['base_pos_y'] = (i * geomPos.scale) + pos_y;
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
        planeRight.position.y = (i * geomPos.scale) + pos_y;
        planeRight.position.z = geomPos.geometry + pos_z;
        planeRight['base_pos_x'] = (geomPos.geometry / 2) + pos_x;
        planeRight['base_pos_y'] = (i * geomPos.scale) + pos_y;
        planeRight['base_pos_z'] = geomPos.geometry + pos_z;
        planeRight['name'] = obj_shelf.drawers[i].name;
        planeRight["shelf_name"] = obj_shelf.name;
        planeRight["drawer_name"] = obj_shelf.drawers[i].name;
        planeRight["drawer_type"] = "right";
        planeRight["is_opened"] = false;

        // Front Plane
        var planeFront = new THREE.Mesh(geometrySmall, materialSmall);
        planeFront.position.x = pos_x;
        planeFront.position.y = (i * geomPos.scale) + pos_y;
        planeFront.position.z = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z;
        planeFront['base_pos_x'] = pos_x;
        planeFront['base_pos_y'] = (i * geomPos.scale) + pos_y;
        planeFront['base_pos_z'] = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z;
        planeFront['name'] = obj_shelf.drawers[i].name;
        planeFront["shelf_name"] = obj_shelf.name;
        planeFront["drawer_name"] = obj_shelf.drawers[i].name;
        planeFront["drawer_type"] = "front";
        planeFront["is_opened"] = false;

        // Back Plane
        var planeBack = new THREE.Mesh(geometrySmall, materialSmall);
        planeBack.position.x = pos_x;
        planeBack.position.y = (i * geomPos.scale) + pos_y;
        planeBack.position.z = (geomPos.geometry / 2) + pos_z;
        planeBack['base_pos_x'] = pos_x;
        planeBack['base_pos_y'] = (i * geomPos.scale) + pos_y;
        planeBack['base_pos_z'] = (geomPos.geometry / 2) + pos_z;
        planeBack['name'] = obj_shelf.drawers[i].name;
        planeBack["shelf_name"] = obj_shelf.name;
        planeBack["drawer_name"] = obj_shelf.drawers[i].name;
        planeBack["drawer_type"] = "back";
        planeBack["is_opened"] = false;

        // Text
        var materialText = new THREE.MeshBasicMaterial({
            color: 0x000000
        });
        var textGeom = new THREE.TextGeometry(obj_shelf.drawers[i].name, {
            size: 0.35, height: 0,
            font: 'helvetiker', weight: 'normal',
            bevelThickness: 0.05,
            bevelSize: 0,
            bevelEnabled: true
        });

        var drawerNameMesh = new THREE.Mesh(textGeom, materialText);
        drawerNameMesh.position.x = pos_x - (geomPos.geometry / 2) + (geomPos.spacingText * geomPos.scale);
        drawerNameMesh.position.y = pos_y + geomPos.geometryOther * i;
        drawerNameMesh.position.z = pos_z + (geomPos.geometry + (geomPos.geometry / 2));
        drawerNameMesh['base_pos_x'] = pos_x - (geomPos.geometry / 2) + (geomPos.spacingText * geomPos.scale);
        drawerNameMesh['base_pos_y'] = geomPos.scale + i + pos_y;
        drawerNameMesh['base_pos_z'] = pos_z + (geomPos.geometry + (geomPos.geometry / 2));
        drawerNameMesh['name'] = obj_shelf.drawers[i].name;
        drawerNameMesh['drawer_name'] = obj_shelf.drawers[i].name;
        drawerNameMesh['is_opened'] = false;
        drawerNameMesh['type'] = "text";

        // Left edge
        var edgeLeft = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeLeft.rotation.y = Math.PI / 2;
        edgeLeft.position.x = -((geomPos.geometry / 2) + geomPos.spacing) + pos_x;
        edgeLeft.position.y = pos_y + (i * geomPos.scale);
        edgeLeft.position.z = geomPos.geometry + pos_z;

        // Right edge
        var edgeRight = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeRight.rotation.y = Math.PI / 2;
        edgeRight.position.x = (geomPos.geometry / 2) + geomPos.spacing + pos_x;
        edgeRight.position.y = pos_y + (i * geomPos.scale);
        edgeRight.position.z = geomPos.geometry + pos_z;

        // Back edge
        var edgeBack = new THREE.Mesh(geometryEdgeSmall, materialEdgeSmall);
        edgeBack.position.x = pos_x;
        edgeBack.position.y = pos_y + (i * geomPos.scale);
        edgeBack.position.z = (geomPos.geometry / 2) - geomPos.spacing + pos_z;

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
        edgeTop.position.y = -(geomPos.scale / 2) + (nbDrawers * geomPos.scale) + pos_y;
        edgeTop.position.z = geomPos.geometry + pos_z;

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
        scene.add(edgeTop);
        scene.add(edgeBottom);

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

        var nbPdf = obj_shelf.drawers[i].pdfs.length;
        var maxPdfLine = 9;
        // Loop to add every pdf in drawer (1 Pdf = 1 Plane)
        for (var j = 0; j < nbPdf; j++) {
            if (j < maxPdfLine) {
                var position_x = pos_x - (geomPos.geometryThumb / 2);
                var position_z = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z - ((j / 2) + geomPos.spacingThumb);
            } else {
                var position_x = pos_x + (geomPos.geometryThumb / 2);
                var position_z = (geomPos.geometry + (geomPos.geometry / 2)) + pos_z - ((j / 2) + geomPos.spacingThumb - maxPdfLine / 2);
            }

            var path = "http://127.0.0.1:8000" + obj_shelf.drawers[i].pdfs[j].thumbnail_url;

            var geometryPdf = new THREE.PlaneBufferGeometry(geomPos.geometryThumb - geomPos.spacingThumb, geomPos.geometryOther);
            var materialPdf = new THREE.MeshBasicMaterial({map: loadImage(path)});

            // Pdf Plane
            var planePdf = new THREE.Mesh(geometryPdf, materialPdf);
            planePdf.rotation.x = Math.PI * geomPos.thumbAngle;
            planePdf.position.x = position_x;
            planePdf.position.y = (i * geomPos.scale) + pos_y;
            planePdf.position.z = position_z;
            planePdf['base_pos_x'] = position_x;
            planePdf['base_pos_y'] = i * geomPos.scale + pos_y;
            planePdf['base_pos_z'] = position_z;
            planePdf['name'] = obj_shelf.drawers[i].name;
            planePdf['pdf_name'] = obj_shelf.drawers[i].pdfs[j].name;
            planePdf["shelf_name"] = obj_shelf.name;
            planePdf["drawer_name"] = obj_shelf.drawers[i].name;
            planePdf["pdf_url"] = obj_shelf.drawers[i].pdfs[j].image_url;
            planePdf["is_PDFopened"] = false;
            planePdf["is_opened"] = false;
            planePdf["is_pdf"] = true;

            scene.add(planePdf);
            // Add pdf to Pdfs list
            objectsPdf.push(planePdf);
            // Add Pdf to objects list
            objects.push(planePdf);
        }
    }
}

/**
 * Get general Geometry of a drawer
 * @param {type} drawer_type
 * @returns {unresolved}
 */
function getGeometryPositon(drawer_type) {
    switch (drawer_type) {
        case "small":
            var geomPos = {
                geometry: 5,
                geometryOther: 1,
                geometryThumb: 2.5,
                spacing: 0.01,
                spacingText: 1,
                spacingThumb: 0.5,
                thumbAngle: 1.95,
                scale: 1
            };
            return geomPos;
            break;
        case "normal":
            var geomPos = {
                geometry: 5,
                geometryOther: 2,
                geometryThumb: 2.5,
                spacing: 0.01,
                spacingText: 0.5,
                spacingThumb: 0.5,
                thumbAngle: 1.95,
                scale: 2
            };
            return geomPos;
            break;
        case "big":
            var geomPos = {
                geometry: 10,
                geometryOther: 3,
                geometryThumb: 5,
                spacing: 0.01,
                spacingText: 0.5,
                spacingThumb: 0.5,
                thumbAngle: 1.95,
                scale: 3
            };
            return geomPos;
            break;
    }

}

/**
 * Create a texture from an image path 
 * @param string path
 * @returns {THREE.Texture|loadImage.texture}
 */
function loadImage(path) {
    // Create a canvas
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    // Create a texture with canvas
    var texture = new THREE.Texture(canvas);

    // Create image
    var img = new Image();
    img.crossOrigin = true;
    // Load image on canvas
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;

        var context = canvas.getContext('2d');

        context.strokeStyle = 'grey';
        context.lineWidth = 3;
        context.drawImage(img, 0, 0);
        context.moveTo(0, 0);
        context.lineTo(canvas.width, 0);
        context.lineTo(canvas.height, canvas.height);
        context.moveTo(0, 0);
        context.lineTo(0, canvas.height);
        context.lineTo(canvas.width, canvas.height);
        context.stroke();

        // Update texture (if not loaded yet)
        texture.needsUpdate = true;
    };
    img.src = path;
    return texture;
}