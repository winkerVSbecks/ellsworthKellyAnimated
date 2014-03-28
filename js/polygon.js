var Polygon = function(nodes, col, bg, w, h) {
	
	this.nodes = nodes;
	this.col = col;
	this.bg = bg;
	this.w = w;
	this.h = h;
};

Polygon.prototype.update = function() {

	ctx.fillStyle = this.col;
	ctx.beginPath();
	ctx.moveTo( this.nodes[0].pos.x, this.nodes[0].pos.y );

	for (var i = 1; i < this.nodes.length; i++) {
		ctx.lineTo( this.nodes[i].pos.x, this.nodes[i].pos.y );
	};

	ctx.closePath();
	ctx.fill();

	// Update Nodes
	for (var i = this.nodes.length - 1; i >= 0; i--) {
		this.nodes[i].update();
	};
};

Polygon.prototype.impulse = function () {
	for (var i = this.nodes.length - 1; i >= 0; i--) {
		this.nodes[i].shift();
	};
};
