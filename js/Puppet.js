var sz = new Vector3(0.5,1,3)

var boxShape = new CANNON.Box(new CANNON.Vec3(sz.x / 2,sz.y/ 2,sz.z/ 2));

var geometry = new THREE.BoxGeometry(sz.x,sz.y,sz.z);
var material = new THREE.MeshPhongMaterial( { color: 0x888888 } );

class Puppet{
    constructor(x,y,z){
        this.body = new CANNON.Body({mass: 4, shape: boxShape});
        this.mesh = new THREE.Mesh( geometry, material );
        
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