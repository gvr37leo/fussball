var timeStep = 1.0 / 60.0;
var world, groundBody
var renderer, scene, camera

function initCannon(){
    world = new CANNON.World();
    world.stepFrequency = 600;
    world.gravity.set(0,0,-9.82);
    world.broadphase = new CANNON.NaiveBroadphase();

    var groundShape = new CANNON.Plane();
    groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    // world.add(groundBody);

    // Create a matrix of height values
            var matrix = [];
            var sizeX = 15,
                sizeY = 15;
            for (var i = 0; i < sizeX; i++) {
                matrix.push([]);
                for (var j = 0; j < sizeY; j++) {
                    var height = Math.cos(i/sizeX * Math.PI * 2)*Math.cos(j/sizeY * Math.PI * 2) + 2;
                    if(i===0 || i === sizeX-1 || j===0 || j === sizeY-1)
                        height = 3;
                    matrix[i].push(height);
                }
            }

            // Create the heightfield
            var hfShape = new CANNON.Heightfield(matrix, {
                elementSize: 1
            });
            var hfBody = new CANNON.Body({ mass: 0 });
            hfBody.addShape(hfShape);
            hfBody.position.set(-sizeX * hfShape.elementSize / 2, -20, -10);
            world.add(hfBody);
}

  
function initThree(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var planeGeometry = new THREE.PlaneGeometry( 20, 20, 10, 10);
    for(var x = 0; x <= 10; x++){
        for(var y = 0; y <= 10; y++){
            if(y == 0 || y == 10 || x == 0 || x == 10)planeGeometry.vertices[index(x,y,11)].z = 1
            
        }
    }
    
    // planeGeometry.vertices[10].z = 2
    var planeMaterial = new THREE.MeshPhongMaterial( { color: 0x777777, side: THREE.DoubleSide} );
    planeMaterial.shading = THREE.FlatShading
    var floor = new THREE.Mesh( planeGeometry, planeMaterial );
    floor.receiveShadow = true;
    floor.quaternion.copy(groundBody.quaternion)
    scene.add( floor );

    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 10, 10, 10 );
    light.castShadow = true;
    scene.add( light );

    camera.position.z = 10;
    camera.position.y = -15;

    camera.lookAt(new THREE.Vector3(0,0,0))
}

initCannon()
initThree()
var balls = [];
balls.push(new Ball(-6,0,10))
// var spread = 10
// for(var i = 0; i < 40; i++){
//     balls.push(new Ball(random(-spread,spread), random(-spread,spread), random(-spread,spread) + 15))
// }

var columns = [1,2,5,3]
var rods = []
for(var i = 0; i < 4; i++){
    rods.push(new Rod(new Vector3(i * 6 - 12,-7,2), columns[i]))
}

var angle = 0;

var rodKeyMap = ['a','s','d','f']
var rodKeyMapUp = ['q','w','e','r']
var rodKeyMapDown = ['z','x','c','v']

var render = function () {
    requestAnimationFrame( render );
    world.step(timeStep);
    for(var ball of balls)ball.updateMesh();
    // camera.lookAt(balls[0].mesh.position)
    // camera.up.set( 0, 0, 1 );
    // angle += 0.1;
    for(var rod of rods){
        rod.update()
    }
    for(var i = 0; i < rodKeyMap.length; i++){
        if(keyMap[rodKeyMap[i]]){
            rods[i].rotation -= 0.2;
            for(var puppet of rods[i].puppets)puppet.body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0), rods[i].rotation)
        }
        if(keyMap[rodKeyMapUp[i]]){
            rods[i].add(new CANNON.Vec3(0,0.3,0))
        }
        if(keyMap[rodKeyMapDown[i]]){
            rods[i].add(new CANNON.Vec3(0,-0.3,0))
        }
        if(keyMap['ArrowLeft']){
            camera.position.x -= 0.1
        }
        if(keyMap['ArrowRight']){
            camera.position.x += 0.1
        }

    }

            
    renderer.render(scene, camera);
};

var keyMap = {}

document.onkeydown = function(ev){
    keyMap[ev.key] = true
}

document.onkeyup = function(ev){
    keyMap[ev.key] = false;
}

function index(x,y,width){
    return y * width + x;
}

render();