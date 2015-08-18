angular.module('wsp.app.directives', [])

    .constant('SUN_DISTANCE', 200)

    .factory('wspAngles2Cartesian', function(SUN_DISTANCE) {
        return function angles2cartesian(azimuth, altitude) {
            var x, y, z, radius;

            radius = SUN_DISTANCE;
            x = radius * Math.cos(altitude) * Math.sin(azimuth) * -1;
            y = radius * Math.sin(altitude);
            z = radius * Math.cos(altitude) * Math.cos(azimuth);

            return [x, y, z];
        };
    })

    .directive('wspThreeScene', function($rootScope) {
        return {
            restrict: 'E',
            scope: {
                datetime: '=datetime',
                axis: '='
            },
            link: function(scope, elem, attr) {
                var SUN_DISTANCE = 400;
                var CAMERA_DISTANCE = 250;
                var ZOOM = 15;

                var greyDark = 0x434A54;
                var red = 0xDA4453;
                var redLight = 0xED5565;
                var green = 0x48CFAD;
                var greenDark = 0x37BC9B;
                var yellow = 0xF6BB42;
                var yellowDark = 0xFFCE54;
                var blue = 0x4FC1E9;
                var blueDark = 0x3BAFDA;

                var camera;
                var scene;
                var renderer;
                var previous;

                var width,
                    height;

                var element = elem[0];

                // init scene
                init();

                function init() {
                    var VIEW_ANGLE = 75,
                        ASPECT = 1,
                        NEAR = 0.1,
                        FAR = 1000;

                    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
                    camera.position.set(0, -10, 8);
                    //camera.position.z = 5;
                    scene = new THREE.Scene();

                    //camera.lookAt(new THREE.Vector3(0, 0, 0));
                    //this.camera.rotation.z = Math.PI/2;
                    //camera.rotation.z = 0;

                    scene.fog = new THREE.FogExp2(0x000000, 0.035);
                    // Lights
                    scene.add(new THREE.AmbientLight(0xcccccc));

                    var directionalLight = new THREE.DirectionalLight(/*Math.random() * 0xffffff*/0xeeeeee);
                    directionalLight.position.x = 0;
                    directionalLight.position.y = 10;
                    directionalLight.position.z = 10;
                    directionalLight.position.normalize();
                    directionalLight.castShadow = true;
                    scene.add(directionalLight);

                    // Renderer
                    renderer = new THREE.WebGLRenderer();
                    renderer.setSize(500, 500);
                    renderer.setClearColor(yellow);
                    renderer.shadowMapEnabled = true;
                    renderer.shadowMapSoft = true;

                    // Add renderer to DOM
                    element.appendChild(renderer.domElement);

                    // Events
                    window.addEventListener('resize', onWindowResize, false);

                    createFloor();
                    addModel();
                    addSun();

                    var axes = new THREE.AxisHelper(200);
                    scene.add(axes);
                }

                function onWindowResize(event) {
                    renderer.setSize(element.offsetWidth, element.offsetHeight);
                    camera.aspect = element.offsetWidth / element.offsetHeight;
                    width = element.offsetWidth;
                    height = element.offsetHeight;
                    camera.updateProjectionMatrix();
                }
                function addModel() {
                    var roofGeo = new THREE.BoxGeometry(10, 10, 2);
                    var material = new THREE.MeshLambertMaterial({color: greyDark});
                    var roof = new THREE.Mesh(roofGeo, material);

                    roofGeo.receiveShadow = true;
                    scene.add(roof);

                    var panelGeo = new THREE.BoxGeometry(7, 3, 0.5);
                    var material = new THREE.MeshLambertMaterial({color: greenDark});
                    var panel = new THREE.Mesh(panelGeo, material);

                    panel.position.z = 2;

                    // Rotation to the south
                    var axis = new THREE.Vector3(0, 0, 1);
                    panel.rotateOnAxis(axis, (Math.PI / 180) * 45);

                    // Tilting up a couple of degrees
                    var axis = new THREE.Vector3(0, 1, 0);
                    panel.rotateOnAxis(axis, Math.PI / 180 * 10);

                    scene.add(panel);
                }
                function createFloor() {
                    // add a base plane on which we'll render our map
                    var planeGeo = new THREE.PlaneBufferGeometry(40, 40);
                    var planeMat = new THREE.MeshLambertMaterial({color: 0xffffff});

                    var plane = new THREE.Mesh(planeGeo, planeMat);
                    plane.side = THREE.DoubleSide;
                    plane.receiveShadow = true;

                    // rotate it to correct position
                    //plane.rotation.x = -Math.PI/2;
                    scene.add(plane);
                }
                function addSun() {
                    var sun = new THREE.SpotLight(0xFFFFFF);
                    scene.add(sun);
                    sun.castShadow = true;
                    sun.shadowDarkness = 0.4;
                    sun.shadowCameraVisible = false;
                    sun.shadowMapWidth = width * 2;
                    sun.shadowMapHeight = height * 2;
                    sun.position.x = 100;
                    sun.position.y = 100;
                    sun.position.z = 100;
                }


                var t = 0;

                function animate() {
                    requestAnimationFrame(animate);
                    render();
                }

                function render() {
                    var timer = Date.now() * 0.0005;
                    //camera.position.x = Math.cos(timer) * 10;
                    //camera.position.y = Math.sin(timer) * 10;
                    //camera.position.z = 4;
                    camera.lookAt(scene.position);
                    renderer.render(scene, camera);
                }
                render();

                scope.$watch('axis', function(value) {
                    console.log('axis', value);
                    switch (value) {
                        case 'camera':
                            camera.position.set(0, -10, 10);
                            render();
                            break;
                        case 'top':
                            camera.position.set(0, 0, 12);
                            render();
                            break;
                        case 'side':
                            camera.position.set(0, 12, -0.1);
                            render();
                            break;
                        case 'corner':
                            camera.position.set(12, 12, 0.1);
                            render();
                            break;
                    }
                });
            }
        }
    });

