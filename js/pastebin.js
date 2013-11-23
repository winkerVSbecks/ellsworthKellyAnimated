	//setup debug draw
  // var debugDraw = new b2DebugDraw();
  // debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
  // debugDraw.SetDrawScale(scale);
  // debugDraw.SetFillAlpha(0.5);
  // debugDraw.SetLineThickness(1.0);
  // debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
  // world.SetDebugDraw(debugDraw);



	// this.triangle =  two.makePolygon(
	// 	this.a_start.body.GetPosition().x* scale, this.a_start.body.GetPosition().y* scale,
	// 	this.a_mid.body.GetPosition().x* scale, this.a_mid.body.GetPosition().y* scale,
	// 	this.a_end.body.GetPosition().x* scale, this.a_end.body.GetPosition().y* scale,
	// 	this.a_imp.body.GetPosition().x* scale, this.a_imp.body.GetPosition().y* scale,
	//  	false);
	// this.triangle.fill = '#FF8000';
	// this.triangle.linewidth = 0;

	// this.membrane = two.makeCurve(
	// 	this.a_start.body.GetPosition().x* scale, this.a_start.body.GetPosition().y* scale,
	// 	mid,
	// 	this.a_end.body.GetPosition().x* scale, this.a_end.body.GetPosition().y* scale,
	//  	true);
	// this.membrane.fill = '#FF8000';
	// this.membrane.linewidth = 0;

	this.triangle =  two.makeCurve([

		new Two.Anchor(this.a_start.body.GetPosition().x* scale, this.a_start.body.GetPosition().y* scale, Two.Commands.line),
		
		new Two.Anchor(this.a_mid.body.GetPosition().x* scale, this.a_mid.body.GetPosition().y* scale, Two.Commands.line),

		new Two.Anchor(this.a_end.body.GetPosition().x* scale, this.a_end.body.GetPosition().y* scale, Two.Commands.line),
		
		new Two.Anchor(
		this.a_imp.body.GetPosition().x* scale, this.a_imp.body.GetPosition().y* scale,
		this.a_end.body.GetPosition().x* scale, this.a_end.body.GetPosition().y* scale,
		this.a_start.body.GetPosition().x* scale, this.a_start.body.GetPosition().y* scale, 
		Two.Commands.arc)],

	 	false);
	this.triangle.fill = '#FF8000';
	this.triangle.linewidth = 0;

		console.log(this.triangle.vertices[3]);



		      w, h ));

  // works.push( 
  //   new SpringyTriangle(
  //     new b2Vec2( w/4, 200 ),
  //     new b2Vec2( w/2, 60 ),
  //     new b2Vec2( 3*w/4, 200 ),
  //     '#F4513F',
  //     new b2Vec2(0, 50*scale), 
  //     1,
  //     '#ffffff',
  //     w, h ));