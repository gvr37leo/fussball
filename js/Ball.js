var radius = 0.8
var sphereShape = new CANNON.Sphere(radius);

var sphereGeometry = new THREE.SphereGeometry(radius);
var ballMaterial = new THREE.MeshPhongMaterial( { color: 0x888888 } );
ballMaterial.shading = THREE.FlatShading
class Ball{
    constructor(x,y,z){
        this.body = new CANNON.Body({mass: 4, shape: sphereShape});
        this.mesh = new THREE.Mesh( sphereGeometry, ballMaterial );
        
        this.body.position.set(x,y,z)
        scene.add( this.mesh );
        world.add(this.body);
        this.updateMesh();
    }

    updateMesh(){
        this.mesh.position.copy(this.body.position)
        this.mesh.quaternion.copy(this.body.quaternion)
    }
}