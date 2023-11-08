"use strict";
var Engine = Matter.Engine,
  World = Matter.World,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Runner = Matter.Runner,
  Events = Matter.Events;

class DefaultSim {
  width;
  height;

  // startButton;
  // restartButton;
  // sliders;

  fields;
  particles;

  engine;
  world;
  runner;

  mP5;

  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.fields = [];
    this.particles = [];
    this.engine = Engine.create();
    this.engine.enableSleeping = true;
    this.world = this.engine.world;
    this.engine.gravity.scale = 0;
    this.runner = Runner.create();
    // Runner.run(this.engine);

    Events.on(this.engine, "afterUpdate", this.update.bind(this));
  }

  sim(sketch) {
    sketch.setup = () => {
      sketch.createCanvas(this.width, this.height);
    };
    sketch.draw = () => {
      sketch.background(100);
      for (let f of this.fields) {
        f.draw(sketch);
      }
      for (let p of this.particles) {
        p.draw(sketch);
      }
    };
  }

  create(parentId) {
    this.mP5 = new p5(this.sim.bind(this), parentId);
  }

  addField(f) {
    this.fields.push(f);
  }

  addParticle(p) {
    this.particles.push(p);
  }

  update() {
    let record;
    for (let f of this.fields) {
      for (let p of this.particles) {
        record = Matter.Collision.collides(f.mBody, p.mBody);
        if (record != null) {
          if (record.collided) {
            console.log(record.penetration);
            console.log(f);
            console.log(p);
            if (f.constructor.name === "ElectricField") {
              Body.applyForce(p.mBody, p.mBody.position, {
                x: -Math.sin(f.rotation) * f.intensity * p.q * 0.000001,
                y: Math.cos(f.rotation) * f.intensity * p.q * 0.000001,
              });
            }
            if (f.constructor.name === "MagneticField") {
              let v0 = Matter.Body.getVelocity(p.mBody);

              // let s = Matter.Body.getSpeed(p.mBody);
              Body.applyForce(
                p.mBody,
                p.mBody.position,
                Matter.Vector.mult(
                  Matter.Vector.perp(v0, true),
                  p.q * f.intensity * 0.0000005
                )
              );
            }
          }
        }
      }
    }
  }
}

class CyclotronSim extends DefaultSim {
  update() {
    let record;
    for (let f of this.fields) {
      for (let p of this.particles) {
        record = Matter.Collision.collides(f.mBody, p.mBody);
        if (record != null) {
          if (record.collided) {
            console.log(record.penetration);
            console.log(f);
            console.log(p);
            if (f.constructor.name === "ElectricField") {
              Body.applyForce(p.mBody, p.mBody.position, {
                x: -Math.sin(f.rotation) * f.intensity * p.q * 0.000001,
                y: Math.cos(f.rotation) * f.intensity * p.q * 0.000001,
              });
            }
            if (f.constructor.name === "MagneticField") {
              let v0 = Matter.Body.getVelocity(p.mBody);
              Body.applyForce(
                p.mBody,
                p.mBody.position,
                Matter.Vector.mult(
                  Matter.Vector.perp(v0, true),
                  p.q * f.intensity * 0.0000005
                )
              );
              console.log("speed" + Matter.Body.getSpeed(p.mBody));

              if (this.fields[0] === f) {
                console.log("yes" + this.particles[0].y);
                if (
                  this.particles[0].y >= 130 &&
                  this.particles[0].getVelocity().y > 0
                ) {
                  this.fields[2].setIntensity(
                    Math.sign(this.particles[0].q) *
                      Math.abs(this.fields[2].getIntensity())
                  );
                }
              } else {
                // console.log("yes" + this.particles[0].y);
                console.log("yes" + this.particles[0].getVelocity().y);
                if (
                  this.particles[0].y <= 170 &&
                  this.particles[0].getVelocity().y < 0
                ) {
                  this.fields[2].setIntensity(
                    -Math.sign(this.particles[0].q) *
                      Math.abs(this.fields[2].getIntensity())
                  );
                }
              }
            }
          }
        }
      }
    }
  }
}
