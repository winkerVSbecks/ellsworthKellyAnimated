var JellyQuad = function(locs, col, bg, w, h, impMag) {

  // Particles
  this.locs = locs;
  // TL TR BR BL =  0 1 2 3

  this.col = col;
  this.bg = bg;
  this.w = w;
  this.h = h;
  this.impMag = impMag;

  this.p = [];

  this.p.push(
    new Particle(this.locs[0].x, this.locs[0].y, true));
  this.p.push(
    new Particle(this.locs[1].x, this.locs[1].y, false));
  this.p.push(
    new Particle(this.locs[2].x, this.locs[2].y, false));
  this.p.push(
    new Particle(this.locs[3].x, this.locs[3].y, true));

  // Define the Ground
  // Basic properties of ground
  var fixDef = new b2FixtureDef;
  fixDef.density = 2.0;
  fixDef.friction = 0.9;
  fixDef.restitution = 0.8;
  // Ground is simply a static rectangular body with its center at screenW/2 and screenH
  var bodyDef = new b2BodyDef;
  bodyDef.type = b2Body.b2_staticBody;
  bodyDef.position.x = this.w * 0.5 / scale;
  bodyDef.position.y = this.h / scale;
  // here we define ground as a rectangular box of width = screenW
  // and height = 10 (just some small number to make a thin strip placed at the bottom)
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(this.w / scale, 10 / scale);
  // And finally add our ground object to our world
  this.ground = world.CreateBody(bodyDef);
  this.ground.CreateFixture(fixDef);

  this.buildJoints();
};

JellyQuad.prototype.buildJoints = function() {

  // Top joint
  var djd = new b2DistanceJointDef();
  djd.bodyA = this.p[0].body;
  djd.bodyB = this.p[1].body;
  var len = dist(this.p[0].getPosition().x, this.p[0].getPosition().y,
    this.p[1].getPosition().x, this.p[1].getPosition().y);
  djd.length = len;
  djd.length = djd.length;
  djd.frequencyHz = 1; // Try a value less than 5
  djd.dampingRatio = 0.1; // Ranges between 0 and 1
  var dj = world.CreateJoint(djd);

  // Bottom joint
  var djd = new b2DistanceJointDef();
  djd.bodyA = this.p[2].body;
  djd.bodyB = this.p[3].body;
  var len = dist(this.p[2].getPosition().x, this.p[2].getPosition().y,
    this.p[3].getPosition().x, this.p[3].getPosition().y);
  djd.length = len;
  djd.length = djd.length;
  djd.frequencyHz = 1; // Try a value less than 5
  djd.dampingRatio = 0.1; // Ranges between 0 and 1
  var dj = world.CreateJoint(djd);

  // Vertical joint - right
  var djd = new b2DistanceJointDef();
  djd.bodyA = this.p[2].body;
  djd.bodyB = this.p[1].body;
  var len = dist(this.p[2].getPosition().x, this.p[2].getPosition().y,
    this.p[1].getPosition().x, this.p[1].getPosition().y);
  djd.length = len;
  djd.length = djd.length;
  var dj = world.CreateJoint(djd);

  // Vertical joint - left
  var djd = new b2DistanceJointDef();
  djd.bodyA = this.p[0].body;
  djd.bodyB = this.p[3].body;
  var len = dist(this.p[0].getPosition().x, this.p[0].getPosition().y,
    this.p[3].getPosition().x, this.p[3].getPosition().y);
  djd.length = len;
  djd.length = djd.length;
  var dj = world.CreateJoint(djd);

  // Prismatic joint
  var worldAxis = new b2Vec2(1.0, 0.0);
  var pjd = new b2PrismaticJointDef();
  pjd.Initialize(this.p[2].body, this.ground, this.p[2].getPosition(), worldAxis);
  pjd.lowerTranslation = -66 / scale;
  pjd.upperTranslation = 450 / scale;
  pjd.enableLimit = true;
  world.CreateJoint(pjd);

  var worldAxis = new b2Vec2(1.0, 0.0);
  var pjd = new b2PrismaticJointDef();
  pjd.Initialize(this.p[1].body, this.ground, this.p[1].getPosition(), worldAxis);
  pjd.lowerTranslation = -66 / scale;
  pjd.upperTranslation = 450 / scale;
  pjd.enableLimit = true;
  world.CreateJoint(pjd);

};

JellyQuad.prototype.update = function() {

  ctx.fillStyle = this.col;
  ctx.beginPath();
  ctx.moveTo(this.p[0].getPosition().x * scale, this.p[0].getPosition().y * scale);

  for (var i = 1; i < this.p.length; i++) {
    ctx.lineTo(this.p[i].getPosition().x * scale, this.p[i].getPosition().y * scale);
  };

  ctx.closePath();
  ctx.fill();

};

JellyQuad.prototype.impulse = function() {
  var f = this.impMag / 2;
  var appliedForce = new b2Vec2(-f * scale, f * scale);
  // apply impulse to top particle
  this.imp = this.p[1].getPosition();
  this.p[1].body.ApplyImpulse(appliedForce, this.imp);
  // apply impulse to bottom particle
  this.imp = this.p[2].getPosition();
  this.p[2].body.ApplyImpulse(appliedForce, this.imp);
};