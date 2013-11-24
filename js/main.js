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
  b2DistanceJointDef =  Box2D.Dynamics.Joints.b2DistanceJointDef,
  b2PrismaticJointDef =  Box2D.Dynamics.Joints.b2PrismaticJointDef;

var c, ctx, 
    activeWork = 0,
    works = [],
    sMouseX,
    sMouseY;
var drawDebug = false;



// Init the box2d world
// var world = new b2World(
//   //gravity
//   new b2Vec2(0, 20/scale),
//   //allow sleep   
//   true                       
// );
// Create individual worlds for each artwork
var worlds = [];
for (var i = 0; i < 6; i++) {
  worlds.push(
    new b2World(new b2Vec2(0, 20/scale), true));
};
var world = worlds[0];
 
window.setInterval(update, 1000 / 60);

// ***********************************************************
//  SETUP
// ***********************************************************

$(function () {

  c = document.getElementById('canvas');
  ctx = c.getContext("2d");

  // Red Blue
  buildRedBlue();

  // Shifty Polygon
  buildShiftyPolygon();

  var w = 640,
      h = 480;

  // Orange Curve
  var curvePoints = [];

  for (var i = 0; i < 6; i++) {
    curvePoints.push(
      new b2Vec2( 
        w/2 - w/2 * Math.cos(Math.PI*i/5), 
        h - 0.85*h * Math.sin(Math.PI*i/5)
      ));
  };

  world = worlds[2];
  works.push(
    new Curve(
      curvePoints,
      new b2Vec2( w/2, h ),
      '#F4513F',
      '#F5F8FE',
      w, h ));

  
  // Triangles and Triangle Curves
  world = worlds[3];
  works.push( 
    new SpringyTriangle(
      new b2Vec2( 0, 356 ),
      new b2Vec2( 0, 0 ),
      new b2Vec2( 356, 0 ),
      '#2D2A22',
      new b2Vec2(50*scale, 50*scale),
      4,
      '#F7F3EB',
      356, 356 ));

  world = worlds[4];
  works.push( 
    new SpringyTriangle(
      new b2Vec2( 0, 0 ),
      new b2Vec2( 355.3, 0 ),
      new b2Vec2( 355.3, h ),
      '#BB1523',
      new b2Vec2(50*scale, 50*scale),
      0.85,
      '#ffffff',
      355.3, h ));

  world = worlds[5];
  works.push( 
    new SpringyTriangle(
      new b2Vec2( 45, 434-45 ),
      new b2Vec2( 45+265, 434-45 ),
      new b2Vec2( 45+265, 434-336-45 ),
      '#222222',
      new b2Vec2(150*scale, 150*scale),
      1,
      '#DFDFDB',
      606, 434 ));

  console.log(Box2D);

  // Apply BG color to canvas
  $('#canvas').css({backgroundColor: works[activeWork].bg});
  // Resize canvas
  ctx.canvas.height = works[activeWork].h;
  ctx.canvas.width = works[activeWork].w;
  // Set to world 1
  world = worlds[0];

  //setup debug draw
  var debugDraw = new b2DebugDraw();
  debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
  debugDraw.SetDrawScale(scale);
  debugDraw.SetFillAlpha(0.5);
  debugDraw.SetLineThickness(1.0);
  debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  for (var i = worlds.length - 1; i >= 0; i--) {
    worlds[i].SetDebugDraw(debugDraw);
  };

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
  world.ClearForces();
  // Clear canvas
  ctx.clearRect(0, 0, 640, 640);
  // Update triangles
  works[activeWork].update();
  // Draw debug view 
  if(drawDebug && !Polygon.prototype.isPrototypeOf(works[activeWork])) world.DrawDebugData();

}

function impulse () {
  works[activeWork].impulse();
}

function moveImp () {
  var deltaX = sMouseX - mouseX;
  // var deltaY = sMouseY - mouseY;

  var pos = works[activeWork].a_imp.body.GetPosition();
  works[activeWork].a_imp.body.SetPosition(
    new b2Vec2( pos.x-deltaX / scale, 
                pos.y-deltaY / scale ));
}



// ***********************************************************
//  Navigation
// ***********************************************************
$( '#next' ).click(function() {
  if(activeWork < works.length-1) activeWork++;
  $('#canvas').css({backgroundColor: works[activeWork].bg});
  // Resize canvas
  ctx.canvas.height = works[activeWork].h;
  ctx.canvas.width = works[activeWork].w;
  world = worlds[activeWork];
});

$( '#prev' ).click(function() {
  if(activeWork > 0) activeWork--;
  $('#canvas').css({backgroundColor: works[activeWork].bg});
  // Resize canvas
  ctx.canvas.height = works[activeWork].h;
  ctx.canvas.width = works[activeWork].w;
  world = worlds[activeWork];
});


// ***********************************************************
//  Mouse Events and Selecting Bodies, Forces, etc
// ***********************************************************
var mouseX, mouseY, mousePVec, isMouseDown, selectedBody, mouseJoint;
var canvasPosition = getElementPosition(document.getElementById('canvas'));

document.addEventListener("mousedown", function(e) {
  isMouseDown = true;

  impulse();

  handleMouseMove(e);

  sMouseX = mouseX;
  sMouseY = mouseY;

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

// Toggle debug mode
$(window).keypress( function (e) {
  if(e.keyCode === 100) {
    drawDebug = !drawDebug;
  }
});


// ***********************************************************
//  BUILD WORKS
// ***********************************************************         
function buildShiftyPolygon () {

  var w = 424,
      h = 440;

  world = worlds[1];
  
  var nodes = [];

  nodes.push(
    new Node(
      new b2Vec2(0,0),
      [0,w],
      true ));
  nodes.push(
    new Node(
      new b2Vec2(w,0),
      [0,h],
      false ));
  nodes.push(
    new Node(
      new b2Vec2(0.66*w,h),
      [0, w],
      true ));
  nodes.push(
    new Node(
      new b2Vec2(0,0.484*h),
      [0, h],
      false ));

  works.push(
    new Polygon(
      nodes,
      '#2E2C2D',
      '#F8F9FB',
      424, 440 ));
}

function buildRedBlue () {

  var locs = [];
  world = worlds[0];

  locs.push(
    new b2Vec2( 66,38 ));
  locs.push(
    new b2Vec2( 66+508,38 ));
  locs.push(
    new b2Vec2( 66+508,156+38 ));
  locs.push(
    new b2Vec2( 66,156+ 38));

  works.push(
    new JellyQuad(
      locs,
      '#F35452',
      '#F0F0EE',
      640, 640 ));
}

// blue #0196CE