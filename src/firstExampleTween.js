//FIRST EXAMPLE IN TWEEN.js

	init();
    animate();

    function init() {

        var output = document.createElement( 'div' );
        output.style.cssText = 'position: absolute; left: 50px; top: 300px; font-size: 100px';
        document.body.appendChild( output );

        var tween = new TWEEN.Tween( { x: 50, y: 0 } )
            .to( { x: 400 }, 2000 )
            .easing( TWEEN.Easing.Elastic.InOut )
            .onUpdate( function () {

                output.innerHTML = 'x == ' + Math.round( this.x );
                var transform = 'translateX(' + this.x + 'px)';
                output.style.webkitTransform = transform;
                output.style.transform = transform;

            } )
            .start();

    }

    function animate(time) {

        requestAnimationFrame( animate ); // js/RequestAnimationFrame.js needs to be included too.
        TWEEN.update(time);

    }