var RevoluteTriangle = function(nodes, rotCenter, omega, col, bg, w, h) {
  this.nodes = nodes;
  this.rotCenter = rotCenter;
  this.omega = omega;
  this.col = col;
  this.bg = bg;
  this.w = w;
  this.h = h;
  this.alpha = 0;
  // // Calculate the centroid
  // var centX = (this.nodes[0].x + this.nodes[1].x + this.nodes[2].x) / 3;
  // var centY = (this.nodes[0].y + this.nodes[1].y + this.nodes[2].y) / 3;
  // this.centroid = new b2Vec2(centX, centY);
};

RevoluteTriangle.prototype.update = function() {
  // Update rotation
  if (isMouseDown) this.alpha += this.omega;
  ctx.save();
  ctx.fillStyle = this.col;
  // Rotate the triangle
  // ctx.translate(this.rotCenter.x, this.rotCenter.y);
  // ctx.rotate(this.alpha * Math.PI / 180);
  // ctx.translate(-this.rotCenter.x, -this.rotCenter.y);
  ctx.beginPath();
  ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
  // Draw the triangle
  for (var i = 1; i < this.nodes.length; i++) {
    ctx.lineTo(this.nodes[i].x, this.nodes[i].y);
  };
  ctx.closePath();
  ctx.fill();
};