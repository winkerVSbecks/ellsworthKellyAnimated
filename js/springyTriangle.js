// springyTriangle

//Define a functional object to hold persons in javascript
var SpringyTriangle = function(p_start, p_mid, p_end, col, force, curve, bg, w, h) {

	// Particle positions
	this.p_start = p_start;
	this.p_mid = p_mid;
	this.p_end = p_end;
	// Calculate position for particle with an impulse
	this.p_imp = new b2Vec2( 
		(this.p_start.x + this.p_end.x) / 2, 
		(this.p_start.y + this.p_end.y) / 2
	);

	this.force = force;
	this.col = col;  
	this.bg = bg;
	this.w = w;
	this.h = h;

	// Build Particles
	this.a_mid = new Particle( this.p_mid.x, this.p_mid.y, true );
	this.a_imp = new Particle( this.p_imp.x, this.p_imp.y, false );
	this.a_start = new Particle( this.p_start.x, this.p_start.y, true );
	this.a_end = new Particle( this.p_end.x, this.p_end.y, true );

	this.curve = curve;

	this.buildJoints();

};




SpringyTriangle.prototype.buildJoints = function() {

	// this.p_start <-> topStart
	// this.p_mid <-> topAnchor
	// this.P_end <-> tEnd
	// this.p_imp <-> topMp

	// this.a_mid <-> tAnchor 
	// this.a_imp <-> tStartAnchor  
	// this.a_start <-> tEndAnchor 
	// this.a_end <-> tImpactor 
	
	// Joint 1
	var djd = new b2DistanceJointDef();
	djd.bodyA = this.a_imp.body;
	djd.bodyB = this.a_mid.body;
	var len = dist(this.p_imp.x, this.p_imp.y, this.p_mid.x, this.p_mid.y);
	djd.length = len/scale;
	djd.length = djd.length/this.curve;
	djd.frequencyHz = 1;  // Try a value less than 5
	djd.dampingRatio = 0.25; // Ranges between 0 and 1
	var dj = world.CreateJoint(djd);

	// Joint 2
	djd = new b2DistanceJointDef();
	djd.bodyA = this.a_imp.body;
	djd.bodyB = this.a_start.body;
	var len = dist(this.p_imp.x, this.p_imp.y, this.p_start.x, this.p_start.y);
	djd.length = len/scale;
	djd.frequencyHz = 1;  // Try a value less than 5
	djd.dampingRatio = 0.25; // Ranges between 0 and 1
	var dj = world.CreateJoint(djd);

	// Joint 3
	djd = new b2DistanceJointDef();
	djd.bodyA = this.a_imp.body;
	djd.bodyB = this.a_end.body;
	var len = dist(this.p_imp.x, this.p_imp.y, this.p_end.x, this.p_end.y);
	djd.length = len/scale;
	djd.frequencyHz = 1;  // Try a value less than 5
	djd.dampingRatio = 0.25; // Ranges between 0 and 1
	var dj = world.CreateJoint(djd);

};


SpringyTriangle.prototype.impulse = function () {

	var ping = Math.random(-1,1);
	var pinger = 1;
	if (ping > 0) pinger = 1;
	if (ping <= 0) pinger = -1;
	var appliedForce = new b2Vec2(this.force.x*pinger / scale, this.force.y / (2*scale) );
	this.imp = this.a_imp.getPosition();
	// Apply force
	this.a_imp.body.ApplyImpulse(appliedForce, this.imp);

	// this.a_mid.update(); 
	// this.a_imp.update(); 
	// this.a_start.update();
	// this.a_end.update();

};


SpringyTriangle.prototype.update = function () {
	
	// this.a_mid.update(); 
	// this.a_imp.update(); 
	// this.a_start.update();
	// this.a_end.update();

	ctx.fillStyle = this.col;

	ctx.beginPath();

	ctx.moveTo(this.a_end.getPosition().x*scale, this.a_end.getPosition().y*scale);

	ctx.lineTo(this.a_mid.getPosition().x*scale, this.a_mid.getPosition().y*scale);

  ctx.lineTo(this.a_start.getPosition().x*scale, this.a_start.getPosition().y*scale);
  
  ctx.bezierCurveTo(
  	this.a_start.getPosition().x*scale, this.a_start.getPosition().y*scale,
  	this.a_imp.getPosition().x*scale, this.a_imp.getPosition().y*scale,
  	this.a_end.getPosition().x*scale, this.a_end.getPosition().y*scale);

  ctx.moveTo(this.a_imp.getPosition().x*scale, this.a_imp.getPosition().y*scale);

  ctx.fill();

  ctx.fillStyle = '#ff0000';

};
