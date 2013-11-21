// springyTriangle

//Define a functional object to hold persons in javascript
var Curve = function(points, centre, col, bg, w, h) {

	// Particle positions
	this.points = points;
	this.centre = centre;
	// Particles
	this.p = [];

	this.col = col;  
	this.bg = bg;
	this.w = w;
	this.h = h;

	// Build Particles
	for (var i = this.points.length - 1; i >= 0; i--) {

		var fixed = (i===0 || i===this.points.length - 1) ? true : false;

		this.p.push( 
			new Particle( this.points[i].x, this.points[i].y, fixed )
		);

	};

	this.a_cent = new Particle( this.centre.x, this.centre.y, true );

	this.buildJoints();

};




Curve.prototype.buildJoints = function() {

	for (var i = this.p.length - 1; i >= 0; i--) {

		// Joint to centre
		var djd = new b2DistanceJointDef();
		djd.bodyA = this.p[i].body;
		djd.bodyB = this.a_cent.body;
		var len = dist(this.centre.x, this.centre.y, this.points[i].x, this.points[i].y);
		djd.length = len/scale;
		djd.length = djd.length;
		djd.frequencyHz = 1;  // Try a value less than 5
		djd.dampingRatio = 0.25; // Ranges between 0 and 1
		var dj = world.CreateJoint(djd);

		if(i>0) {
			// Curve joints
			var djd = new b2DistanceJointDef();
			djd.bodyA = this.p[i].body;
			djd.bodyB = this.p[i-1].body;
			var len = dist(this.points[i].x, this.points[i].y, this.points[i-1].x, this.points[i-1].y);
			djd.length = len/scale;
			djd.length = djd.length;
			djd.frequencyHz = 1;  // Try a value less than 5
			djd.dampingRatio = 0.25; // Ranges between 0 and 1
			var dj = world.CreateJoint(djd);
		}

	}

};


Curve.prototype.impulse = function () {

	for (var i = this.p.length - 1; i >= 0; i--) {
    var ping = Math.random(-1,1);
    var pinger = 1;
    if (ping > 0) pinger = 1;
    if (ping <= 0) pinger = -1;
    var appliedForce = new b2Vec2(Math.random(50)*scale*pinger, Math.random(50)*scale*pinger );
    this.imp = this.p[i].getPosition();
    this.p[i].body.ApplyImpulse(appliedForce, this.imp);
  }

};


Curve.prototype.update = function () {
	
	ctx.fillStyle = this.col;

	ctx.beginPath();

	ctx.moveTo(this.p[0].getPosition().x*scale, this.p[0].getPosition().y*scale);

	for (i = 1; i < this.p.length - 2; i++) {

		var xc = (this.p[i].getPosition().x + this.p[i + 1].getPosition().x) / 2;
    var yc = (this.p[i].getPosition().y + this.p[i + 1].getPosition().y) / 2;
    ctx.quadraticCurveTo(this.p[i].getPosition().x*scale, this.p[i].getPosition().y*scale, xc*scale, yc*scale);
	}
	ctx.quadraticCurveTo(this.p[i].getPosition().x*scale, this.p[i].getPosition().y*scale, this.p[i+1].getPosition().x*scale,this.p[i+1].getPosition().y*scale);

  ctx.fill();

  ctx.fillStyle = '#ff0000';

 	// ctx.beginPath();
 	// ctx.moveTo(this.p[0].getPosition().x*scale, this.p[0].getPosition().y*scale);
 	// // ctx.arc(this.p[0].getPosition().x * scale, this.p[0].getPosition().y * scale, 5, 0, 2 * Math.PI, false);
 	// // ctx.arc(this.p[this.p.length-1].getPosition().x * scale, this.p[this.p.length-1].getPosition().y * scale, 5, 0, 2 * Math.PI, false);
  // for (i = 0; i < this.p.length; i++) {
  // 	ctx.arc(this.p[i].getPosition().x * scale, this.p[i].getPosition().y * scale, 5, 0, 2 * Math.PI, false);
  // }
  // ctx.fillStyle = '#000000';
  // ctx.fill();

};