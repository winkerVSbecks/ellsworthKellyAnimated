var RevoluteTriangle = function(nodes, rotCenter, direction, col, bg, w, h) {
  this.nodes = nodes;
  this.rotCenter = rotCenter;
  this.direction = direction;
  this.col = col;
  this.bg = bg;
  this.w = w;
  this.h = h;
  this.omega = 1;
};

RevoluteTriangle.prototype.update = function() {
  ctx.fillStyle = this.col;
  // Update rotation
  ctx.save();
  if (isMouseDown) {
    this.omega += 10;
    this.alpha = this.direction * 8 * Math.sin(this.omega * Math.PI / 180);
    ctx.translate(this.rotCenter.x, this.rotCenter.y);
    ctx.rotate(this.alpha * Math.PI / 180);
    ctx.translate(-this.rotCenter.x, -this.rotCenter.y);
  }
  ctx.beginPath();
  ctx.moveTo(this.nodes[0].x, this.nodes[0].y);
  // Draw the triangle
  for (var i = 1; i < this.nodes.length; i++) {
    ctx.lineTo(this.nodes[i].x, this.nodes[i].y);
  };
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};