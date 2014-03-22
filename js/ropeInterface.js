var RopeInterface = function(locs, col, bg, w, h) {

  // Particles
  this.locs = locs;
  // TL TR BR BL =  0 1 2 3

  this.col = col;
  this.bg = bg;
  this.w = w;
  this.h = h;

  var ground, ceiling;

  ground = ceiling = createBox(world, this.w / 2, this.h - 0.5, 16, 1, {
    type: b2Body.b2_staticBody
  });         
  var last_link = ceiling;    
  var last_anchor_point = new b2Vec2(0, -0.5);    
  var revolute_joint = new b2RevoluteJointDef();             
  var r_height = 1.1;             
  for (var i = 1; i <= 10; i++)     {        
    var body = createBox(world, this.w / 2, this.h - 1 - i * 1.5, 0.25, r_height);                         
    revolute_joint.bodyA = last_link;        
    revolute_joint.bodyB = body;        
    revolute_joint.localAnchorA = last_anchor_point;        
    revolute_joint.localAnchorB = new b2Vec2(0, r_height / 2);                 
    last_anchor_point = new b2Vec2(0, -1 * r_height / 2);                         
    world.CreateJoint(revolute_joint);                         
    last_link = body;    
  }         
  var body = createBox(world, this.w / 2, this.h - 1 - i * 1.5, r_height, r_height, {
    density: 5.0
  });                 
  revolute_joint.bodyA = last_link;    
  revolute_joint.bodyB = body;    
  revolute_joint.localAnchorA = last_anchor_point;    
  revolute_joint.localAnchorB = new b2Vec2(0, r_height / 2);         
  last_anchor_point = new b2Vec2(0, -1 * r_height / 2);             
  world.CreateJoint(revolute_joint);  
};

var createBox = function(x, y, width, height, options) {
  //default setting
  options = $.extend(true, {
    'density': 1.0,
    'friction': 1.0,
    'restitution': 0.5,

    'type': b2Body.b2_dynamicBody
  }, options);

  var body_def = new b2BodyDef();
  var fix_def = new b2FixtureDef();

  fix_def.density = options.density;
  fix_def.friction = options.friction;
  fix_def.restitution = options.restitution;

  fix_def.shape = new b2PolygonShape();

  fix_def.shape.SetAsBox(width / scale / 2, height / scale / 2);

  body_def.position.Set(x, y);

  body_def.type = options.type;
  body_def.userData = options.user_data;

  var b = world.CreateBody(body_def);
  var f = b.CreateFixture(fix_def);

  return b;
};

RopeInterface.prototype.update = function() {

  // ctx.fillStyle = this.col;
  // ctx.beginPath();
  // ctx.moveTo(this.p[0].getPosition().x * scale, this.p[0].getPosition().y * scale);

  // for (var i = 1; i < this.p.length; i++) {
  //   ctx.lineTo(this.p[i].getPosition().x * scale, this.p[i].getPosition().y * scale);
  // };

  // ctx.closePath();
  // ctx.fill();

};

RopeInterface.prototype.impulse = function() {

  // var f = this.impMag;
  // var appliedForce = new b2Vec2(-f * scale, f * scale);
  // // apply impulse to top particle
  // this.imp = this.p[1].getPosition();
  // this.p[1].body.ApplyImpulse(appliedForce, this.imp);
  // // apply impulse to bottom particle
  // this.imp = this.p[2].getPosition();
  // this.p[2].body.ApplyImpulse(appliedForce, this.imp);
};