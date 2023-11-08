"use strict";
var Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Runner = Matter.Runner,
  Events = Matter.Events;

class ChargedParticle {
  mSim;
  //For matter.js
  mWorld;
  mBody;
  // for outline
  x;
  y;
  radius;
  //for property
  q;
  m;
  //for trace
  trace;

  //boolean
  showTrace;
  showForce;
  showVelocity;
  showVelocityValue;
  showSC;

  constructor(sim, x, y, r, q, m = 0.1) {
    this.mSim = sim;
    this.mWorld = sim.world;
    this.x = x;
    this.y = y;
    this.r = r;
    this.q = q;
    this.m = m;
    this.showTrace = true;
    this.showForce = false;
    this.showVelocity = true;
    this.showVelocityValue = false;
    this.showSC = false;
    this.trace = [];

    this.mBody = Bodies.circle(this.x, this.y, this.r, {
      friction: 0,
      frictionAir: 0,
      frictionStatic: 0,
    });
    this.setM(m);
    World.add(this.mWorld, this.mBody);
    console.log(this.mWorld);
  }

  setPosition(x, y) {
    Body.setPosition(this.mBody, x, y);
  }

  setQ(q) {
    this.q = q;
  }

  setM(m) {
    this.m = m;
    Matter.Body.setMass(this.mBody, m);
  }

  setVelocity(v) {
    Matter.Body.setVelocity(this.mBody, v);
  }

  setVx(vx) {
    let vy = this.getVelocity().y;
    Matter.Body.setVelocity(this.mBody, {
      x: vx,
      y: vy,
    });
  }

  setShowTrace(pred) {
    this.showTrace = pred;
  }

  setShowForce(pred) {
    this.showForce = pred;
  }

  setShowVelocity(pred) {
    this.showVelocity = pred;
  }

  setPrintVelocity(pred) {
    this.showVelocityValue = pred;
  }

  setShowSC(pred) {
    this.showSC = pred;
  }

  getVelocity() {
    return Matter.Body.getVelocity(this.mBody);
  }

  draw(sketch) {
    //update current position
    let pos = this.mBody.position;
    // console.log(pos);
    this.x = pos.x;
    this.y = pos.y;

    if (this.showTrace) {
      //store the trace
      this.trace.push(Matter.Vector.create(this.x, this.y));
      if (this.trace.length > 100) {
        this.trace.splice(0, 1);
      }

      //draw thr trace
      this.drawTrace(sketch);
    }
    //draw circle
    sketch.push();
    sketch.circle(this.x, this.y, this.r * 2);
    sketch.pop();

    ///can be replaced with drawCharge.
    //draw '+'/'-'
    sketch.push();
    sketch.translate(this.x, this.y);
    sketch.noStroke();
    sketch.fill(sketch.color(0, 0, 0));
    if (this.q < 0) {
      sketch.rect(-0.8 * this.r, -0.2 * this.r, 1.6 * this.r, 0.4 * this.r);
    } else if (this.q > 0) {
      sketch.rect(-0.8 * this.r, -0.2 * this.r, 1.6 * this.r, 0.4 * this.r);
      sketch.rect(-0.2 * this.r, -0.8 * this.r, 0.4 * this.r, 1.6 * this.r);
    }
    sketch.pop();
    if (this.showForce) {
      //draw force
      sketch.push();
      this.drawForce(sketch);
      sketch.pop();
    }
    if (this.showVelocity) {
      //draw velocity
      sketch.push();
      this.drawVelocity(sketch);
      sketch.pop();
    }
    if (this.showVelocityValue) {
      sketch.push();
      this.printVelocity(sketch);
      sketch.pop();
    }
    if (this.showSC) {
      sketch.push();
      this.printSC(sketch);
      sketch.pop();
    }
  }

  drawForce(sketch) {
    let f = Matter.Vector.mult(this.mBody.force, 2000000);
    // console.log(f);
    drawArrow(sketch, this.x, this.y, this.x + f.x, this.y + f.y, "#FF6B1A");
  }

  drawTrace(sketch) {
    sketch.push();
    sketch.noFill();
    sketch.stroke(255);
    sketch.beginShape();
    for (let pos of this.trace) {
      sketch.vertex(pos.x, pos.y);
    }
    sketch.endShape();
    sketch.pop();
  }

  drawVelocity(sketch) {
    let v = Matter.Vector.mult(Matter.Body.getVelocity(this.mBody), 30);
    drawArrow(sketch, this.x, this.y, this.x + v.x, this.y + v.y, "#00B3AD");
  }

  printVelocity(sketch) {
    sketch.push();
    sketch.rect(0, 0, 80, 30);
    let v = Matter.Vector.mult(Matter.Body.getVelocity(this.mBody), 30);
    drawValue(
      sketch,
      0,
      10,
      10,
      "水平速度Vx: " + v.x.toFixed(2) + "\n" + "竖直速度Vy: " + v.y.toFixed(2)
    );
  }

  printSC(sketch) {
    drawValue(sketch, 0, 10, 10, "比荷q/m：" + (this.q / this.m).toFixed(2));
  }
}
