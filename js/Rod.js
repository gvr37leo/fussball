var rodLength = 10;

class Rod{
    constructor(pos, count){
        this.puppets = []

        for(var i = 0; i < count; i++){
            var spacing = rodLength / count
            var offset = spacing * i + spacing / 2;
            var puppet = new Puppet(pos.x, pos.y + offset, pos.z);
            puppet.body.mass = 0;
            puppet.body.updateMassProperties();

            this.puppets.push(puppet)
        }
        this.rotation = 0;
    }

    add(v){
        for(var puppet of this.puppets)puppet.body.position.vadd(v,puppet.body.position)
    }

    update(){
        for(var puppet of this.puppets)puppet.updateMesh()
    }
}