var Node = function(pos, domain, dir) {
	
	this.pos = pos;
	this.domain = domain;
	this.dir = dir; // True x axis, False y axis
	this.delay = 16;
};

Node.prototype.shift = function() {
	// Calculate new target position
	var nX, nY;
	if(this.dir) {
		nX = this.domain[0] + Math.random()*this.domain[1];
		nY = this.pos.y;
	} else {
		nX = this.pos.x;
		nY = this.domain[0] + Math.random()*this.domain[1];
	}
	this.target = new b2Vec2(nX, nY);
};


Node.prototype.update = function() {
	if(this.target) {
  	this.pos.x += (this.target.x-this.pos.x)/this.delay;
  	this.pos.y += (this.target.y-this.pos.y)/this.delay;
  }
};

