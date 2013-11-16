// ***********************************************************
//  MAIN ANIMATION LOOP
// ***********************************************************

var scale = 30; 

// Simplify Box2d namespace
var b2Vec2 = Box2D.Common.Math.b2Vec2,
  b2AABB = Box2D.Collision.b2AABB,
  b2BodyDef = Box2D.Dynamics.b2BodyDef,
  b2Body = Box2D.Dynamics.b2Body,
  b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
  b2Fixture = Box2D.Dynamics.b2Fixture,
  b2World = Box2D.Dynamics.b2World,
  b2MassData = Box2D.Collision.Shapes.b2MassData,
  b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
  b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
  b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
  b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef,
  b2DistanceJointDef =  Box2D.Dynamics.Joints.b2DistanceJointDef;

var tri, curve, c, ctx;


// Init the box2d world
var world = new b2World(
  //gravity
  new b2Vec2(0, 20/scale),
  //allow sleep   
  true                       
);
 
window.setInterval(update, 1000 / 60);

// ***********************************************************
//  SETUP
// ***********************************************************

$(function () {

  c = document.getElementById('canvas');
  ctx = c.getContext("2d");

  var w = 640;
  
  tri = new SpringyTriangle(
    new b2Vec2( w/4, 200 ),
    new b2Vec2( w/2, 60 ),
    new b2Vec2( 3*w/4, 200 ),
    '#F4513F',
    new b2Vec2(0, 50*scale), 
    1);

  curve = new SpringyTriangle(
    new b2Vec2( w/4, 470 ),
    new b2Vec2( w/4, 114 ),
    new b2Vec2( w/4+356, 114 ),
    '#2D2A22',
    new b2Vec2(50*scale, 50*scale),
    4 );

  console.log(Box2D);

}); 


// ***********************************************************
//  DRAW @ 60 FPS
// ***********************************************************
function update() {

  if(isMouseDown && (!mouseJoint)) {
    var body = getBodyAtMouse();
    if(body) {
      var md = new b2MouseJointDef();
      md.bodyA = world.GetGroundBody();
      md.bodyB = body;
      md.target.Set(mouseX, mouseY);
      md.collideConnected = true;
      md.maxForce = 300.0 * body.GetMass();
      mouseJoint = world.CreateJoint(md);
      body.SetAwake(true);
     }
  }

  if(mouseJoint) {
    if(isMouseDown) {
      mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
    } else {
      world.DestroyJoint(mouseJoint);
      mouseJoint = null;
    }
  }

  world.Step(1 / 60, 10, 10);
  // world.DrawDebugData();
  world.ClearForces();
  // Clear canvas
  ctx.clearRect(0, 0, 640, 480);
  // Update triangles
  tri.update();
  curve.update();
}

function impulse () {
  tri.impulse();
  curve.impulse();
}



// ***********************************************************
//  Mouse Events and Selecting Bodies, Forces, etc
// ***********************************************************
var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
var canvasPosition = getElementPosition(document.getElementById('canvas').children[0]);

document.addEventListener("mousedown", function(e) {
  isMouseDown = true;

  impulse();

  handleMouseMove(e);
  document.addEventListener("mousemove", handleMouseMove, true);
}, true);

document.addEventListener("mouseup", function() {
  document.removeEventListener("mousemove", handleMouseMove, true);
  isMouseDown = false;
  mouseX = undefined;
  mouseY = undefined;
}, true);

function handleMouseMove(e) {
  mouseX = (e.clientX - canvasPosition.x) / scale;
  mouseY = (e.clientY - canvasPosition.y) / scale;
};

function getBodyAtMouse() {
  mousePVec = new b2Vec2(mouseX, mouseY);
  var aabb = new b2AABB();
  aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
  aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
  
  // Query the world for overlapping shapes.
  selectedBody = null;
  world.QueryAABB(getBodyCB, aabb);
  return selectedBody;
}

function getBodyCB(fixture) {
  if(fixture.GetBody().GetType() != b2Body.b2_staticBody) {
    if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
      selectedBody = fixture.GetBody();
      return false;
    }
  }
  return true;
}


// ***********************************************************
//  HELPERS
// ***********************************************************         
//http://js-tut.aardon.de/js-tut/tutorial/position.html
function getElementPosition(element) {
  var elem=element, 
  tagname="",
  x=0,
  y=0;

  while((typeof(elem) == "object") && (typeof(elem.tagName) != "undefined")) {
  y += elem.offsetTop;
  x += elem.offsetLeft;
  tagname = elem.tagName.toUpperCase();

  if(tagname == "BODY") elem=0;

  if(typeof(elem) == "object") {
    if(typeof(elem.offsetParent) == "object")
      elem = elem.offsetParent;
    }
  }

  return {x: x, y: y};
}

// Calculate distance between two points
function dist (x1, y1, x2, y2) {
  d = Math.sqrt( (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2) )
  return d;
}