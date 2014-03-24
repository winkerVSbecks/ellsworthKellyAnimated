// ***********************************************************
//  Based on the work of Silver Moon
//  http://www.binarytides.com/make-rope-box2d-javascript/
// ***********************************************************

var RopeInterface = function(rHeight, bg, w, h) {

  this.bg = bg;
  this.w = w;
  this.h = h;
  this.p = [];

  this.ceiling = createBox(this.w * 0.5, -10, this.w, 10, b2Body.b2_staticBody);
  var lastLink = this.ceiling;    
  var lastAnchorPoint = new b2Vec2(0, -10 / scale);    
  var revoluteJoint = new b2RevoluteJointDef;                          

  for (var i = 1; i <= 40; i++)     {        
    var body = createBox(512, i * 3 * rHeight, 15, rHeight, b2Body.b2_dynamicBody);                         
    revoluteJoint.bodyA = lastLink;        
    revoluteJoint.bodyB = body;        
    revoluteJoint.localAnchorA = lastAnchorPoint;        
    revoluteJoint.localAnchorB = new b2Vec2(0, -1 * rHeight / scale);
    lastAnchorPoint = new b2Vec2(0, rHeight / scale);    
    world.CreateJoint(revoluteJoint);                         
    lastLink = body;
    this.p.push(body);
  }

  this.wall = createBox(this.w + 10, 0, 10, this.h, b2Body.b2_staticBody);
  revoluteJoint.bodyA = lastLink;        
  revoluteJoint.bodyB = this.wall;        
  revoluteJoint.localAnchorA = lastAnchorPoint;        
  revoluteJoint.localAnchorB = new b2Vec2(0, 451 / scale);   
  world.CreateJoint(revoluteJoint);                        

};

var createBox = function(x, y, width, height, bodyType) {

  var fixDef = new b2FixtureDef;
  fixDef.density = 2.0;
  fixDef.friction = 0.9;
  fixDef.restitution = 0.8;
  var bodyDef = new b2BodyDef;
  bodyDef.type = bodyType;
  bodyDef.position.x = x / scale;
  bodyDef.position.y = y / scale;
  fixDef.shape = new b2PolygonShape;
  fixDef.shape.SetAsBox(width / scale, height / scale);
  var b = world.CreateBody(bodyDef);
  var f = b.CreateFixture(fixDef);

  return b;

};

RopeInterface.prototype.update = function() {

  // Draw Static Red Box
  ctx.fillStyle = '#FF0014';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(352, 0);
  ctx.lineTo(352, 492);
  ctx.lineTo(0, 492);
  ctx.closePath();
  ctx.fill();
  // Draw the blue interface
  ctx.fillStyle = '#091D7C';
  ctx.beginPath();
  ctx.moveTo(this.p[0].GetPosition().x * scale, this.p[0].GetPosition().y * scale);
  for (var i = 1; i < this.p.length; i++) {
    ctx.lineTo(this.p[i].GetPosition().x * scale, this.p[i].GetPosition().y * scale);
  };
  ctx.lineTo(this.w + 50, 0);
  ctx.closePath();
  ctx.fill();

};

RopeInterface.prototype.impulse = function() {
  // No impulse in this one
};