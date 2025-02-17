class Camera {
    constructor(aspectRatio) {
        this.fov = 60;
        this.eye = new Vector3([0, 0, 7]);
        this.at = new Vector3([-10, 0, -1]);
        this.up = new Vector3([0, 1, 0]);
        
        //set up view
        this.viewMatrix = new Matrix4();
        this.updateViewMatrix();
        
      //set up projection 
        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(this.fov, aspectRatio, 0.1, 1000);
        
        // movement speed
        this.speed = 0.1;
    }
    
    updateViewMatrix() {
        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0], this.at.elements[1], this.at.elements[2],
            this.up.elements[0], this.up.elements[1], this.up.elements[2]
        );
    }
    
//idk whats wrong :(

    moveForward() {
        //  f = at - eye
        let f = new Vector3();
        f = f.set(this.at);
        f = f.sub(this.eye);
        
        // normalize and scale
        f = f.normalize();
        f = f.mul(this.speed);
        
        // Update positions
        this.eye = this.eye.add(f);
        this.at = this.at.add(f);
        
        this.updateViewMatrix();
    }
    
    moveBackward() {
        //  b = eye - at
        let b = new Vector3();
        b.set(this.eye);
        b.sub(this.at);
        
        b.normalize();
        b.mul(this.speed);
        
        this.eye.add(b);
        this.at.add(b);
        
        this.updateViewMatrix();
    }


    //normalize not working right i give up 
    moveLeft() {
        this.eye.elements[0] -= 0.1;
    
        this.updateViewMatrix();
    }
    
    moveRight() {
        this.eye.elements[0] += 0.1;

        this.updateViewMatrix();
    }
    

    panLeft() {
       
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        
        let rotationMatrix = new Matrix4();
        const alpha = 5; 
        rotationMatrix.setRotate(alpha, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        
     
        let f_prime = rotationMatrix.multiplyVector3(f);
        
   
        this.at.set(this.eye);
        this.at.add(f_prime);
        
        this.updateViewMatrix();
    }
    
    panRight() {
     
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        
     
        let rotationMatrix = new Matrix4();
        const alpha = -5; 
        rotationMatrix.setRotate(alpha, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
 
        let f_prime = rotationMatrix.multiplyVector3(f);
        
   
        this.at.set(this.eye);
        this.at.add(f_prime);
        
        this.updateViewMatrix();
    }
}