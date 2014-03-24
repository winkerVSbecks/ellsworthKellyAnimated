var Particle = function(x, y, fixed) {

  this.r = 20 / scale;
  this.x = x / scale;
  this.y = y / scale;
  this.fixed = fixed;

  // Define a body
  var bd = new b2BodyDef;
  // static or dynamic
  bd.type = this.fixed ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
  // Set its position
  bd.position.Set(this.x, this.y);
  var fixDef = new b2FixtureDef;
  fixDef.shape = new b2CircleShape(this.r);
  // Parameters that affect physics
  fixDef.density = 1;
  fixDef.friction = 0.3;
  fixDef.restitution = 0.5;
  // Create the body and fixture
  this.body = world.CreateBody(bd)
  this.body.CreateFixture(fixDef);
};

Particle.prototype.getPosition = function() {
  // We look at each body and get its screen position
  pos = this.body.GetPosition();
  return pos;

};


Particle.prototype.update = function() {
  // this.circle.translation.set(this.body.GetPosition().x * scale, this.body.GetPosition().y * scale);
};