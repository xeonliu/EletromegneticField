"use strict";
var Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Runner = Matter.Runner,
  Events = Matter.Events;

class Field {
  mSim;
  // for matter.js
  mWorld;
  mBody;
  // for outline
  width;
  height;
  x;
  y;
  rotation;
  //for drawing
  visibility;
  // own propertity
  intensity; // E or B

  constructor(sim, x, y, w, h, r, I) {
    this.mSim = sim;
    this.mWorld = sim.world;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.rotation = r;
    this.intensity = I;
    this.visibility = true;
    // Matter.js
    this.mBody = Bodies.rectangle(x, y, w, h, {
      isSensor: true,
      isStatic: true,
    });
    this.setRotation(r); //有待考证
    World.add(this.mWorld, this.mBody);
    this.mSim.addField(this);
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    Matter.Body.setPosition(this.mBody, this.x, this.y);
  }

  // setWidth(w) {
  //   this.w = w;
  //   if (w != this.w) {
  //     this.mBody = Bodies.rectangle(this.x, this.y, this.w, this.h, {
  //       isSensor: true,
  //       isStatic: true,
  //     });
  //   }
  // }

  // setHeight(h) {
  //   this.h = h;
  //   this.mBody = Bodies.rectangle(this.x, this.y, this.w, this.h, {
  //     isSensor: true,
  //     isStatic: true,
  //   });
  // }

  setRotation(r) {
    this.rotation = r;
    Matter.Body.setAngle(this.mBody, r);
  }

  setIntensity(I) {
    this.intensity = I;
  }

  getIntensity() {
    return this.intensity;
  }

  setVisibility(visible) {
    this.visibility = visible;
  }

  draw(sketch) {
    //绘制矩形区域
    sketch.push();
    sketch.translate(this.x, this.y);
    sketch.rotate(this.rotation);
    sketch.noFill();
    sketch.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    if (this.visibility === true) {
      this.drawField(sketch);
    }
    sketch.pop();
  }
}

class ElectricField extends Field {
  showPlane;
  constructor(sim, x, y, w, h, r, I) {
    super(sim, x, y, w, h, r, I);
    this.showPlane = false;
  }

  draw(sketch) {
    sketch.push();
    {
      sketch.translate(this.x, this.y);
      sketch.rotate(this.rotation);
      //绘制矩形区域
      sketch.noFill();
      sketch.rect(-this.width / 2, -this.height / 2, this.width, this.height);
      if (this.visibility === true) {
        this.drawField(sketch);
      }
      if (this.showPlane) {
        this.drawPlane(sketch);
      }
    }
    sketch.pop();
  }

  setShowPlane(pred) {
    this.showPlane = pred;
  }

  drawField(sketch) {
    //绘制箭头
    sketch.push();
    sketch.translate(-this.width / 2, -this.height / 2);
    let density = Math.round(Math.abs(this.intensity * 5));
    for (let i = 0; i < density; i++) {
      if (this.intensity >= 0) {
        drawArrow(
          sketch,
          i * (this.width / (density - 1)),
          0,
          i * (this.width / (density - 1)),
          this.height
        );
      } else {
        drawArrow(
          sketch,
          i * (this.width / (density - 1)),
          this.height,
          i * (this.width / (density - 1)),
          0
        );
      }
    }
    sketch.pop();
  }

  drawPlane(sketch) {
    sketch.push();
    sketch.translate(-this.width / 2, -this.height / 2);
    let density = Math.round(Math.abs(this.intensity * 5));
    for (let i = 0; i < density; i++) {
      drawCharge(
        sketch,
        i * (this.width / (density - 1)),
        -5,
        2.5,
        this.intensity
      );
      drawCharge(
        sketch,
        i * (this.width / (density - 1)),
        this.height + 5,
        2.5,
        -this.intensity
      );
    }
    sketch.pop();
  }
}

// function drawArrow(sketch, x1, y1, x2, y2) {
//   let arrowLength = sketch.dist(x1, y1, x2, y2);
//   let triangleLength = arrowLength / 5;
//   let arrowWidth = 5;
//   let arrowAngle = sketch.atan2(y2 - y1, x2 - x1);
//   sketch.push();
//   // 绘制箭头的矩形部分
//   const c = sketch.color(255, 204, 0);
//   sketch.fill(c);
//   sketch.push();
//   sketch.noStroke();
//   sketch.translate(x1, y1);
//   sketch.rotate(arrowAngle);
//   sketch.rect(0, -arrowWidth / 2, arrowLength - triangleLength, arrowWidth);
//   sketch.pop();

//   // 绘制箭头的三角形部分
//   sketch.push();
//   sketch.noStroke();
//   sketch.translate(x2, y2);
//   sketch.rotate(arrowAngle);
//   sketch.triangle(
//     -triangleLength,
//     arrowWidth,
//     0,
//     0,
//     -triangleLength,
//     -arrowWidth
//   );
//   sketch.pop();
//   sketch.pop();
// }

class MagneticField extends Field {
  constructor(sim, x, y, w, h, r, I) {
    super(sim, x, y, w, h, r, I);
  }
  draw(sketch) {
    //绘制矩形区域
    sketch.push();
    sketch.translate(this.x, this.y);
    sketch.rotate(this.rotation);
    sketch.noFill();
    sketch.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    sketch.pop();

    if (this.visibility === true) {
      this.drawField(sketch);
    }
  }
  drawField(sketch) {
    sketch.push();
    sketch.translate(this.x, this.y);
    sketch.rotate(this.rotation);
    sketch.translate(-this.width / 2, -this.height / 2);
    let density = Math.abs(this.intensity);
    for (let i = 0; i < density; i++) {
      for (let j = 0; j < density; j++) {
        if (this.intensity >= 0) {
          this.drawX(
            sketch,
            j * (this.width / (density - 1)),
            i * (this.height / (density - 1))
          );
        } else {
          this.drawDot(
            sketch,
            j * (this.width / (density - 1)),
            i * (this.height / (density - 1))
          );
        }
      }
    }
    sketch.pop();
  }

  drawX(sketch, x, y, r = 5) {
    sketch.push();
    sketch.translate(x, y);
    sketch.rotate(Math.PI / 4);
    sketch.noStroke();
    sketch.rect(-r, -r * 0.2, r * 2, r * 0.4);
    sketch.rect(-r * 0.2, -r, r * 0.4, r * 2);
    sketch.pop();
  }

  drawDot(sketch, x, y, r = 2.5) {
    sketch.push();
    sketch.noStroke();
    sketch.circle(x, y, r * 2);
    sketch.pop();
  }
}

class Indicator extends Field {
  drawFunc;
  constructor(sim, drawFunc) {
    super(sim, 10, 10, 10, 10, 10, 10);
    this.drawFunc = drawFunc;
  }
  draw(sketch) {
    if (this.visibility === true) {
      this.drawFunc(sketch);
    }
  }
}
