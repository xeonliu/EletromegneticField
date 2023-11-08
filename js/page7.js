"use strict";
let sim1 = new DefaultSim(200, 200);
let intensitySlide = document.getElementById("intensity");
let intensityValue = document.getElementById("E");

intensitySlide.value = 1;
intensityValue.innerHTML = 1;

let field = new ElectricField(sim1, 100, 100, 100, 100, 0, 1);
field.setShowPlane(true);
sim1.create("sim1");
intensitySlide.addEventListener("input", (e) => {
  intensityValue.innerHTML = e.target.value;
  field.setIntensity(e.target.value);
});

let simblock2 = new SimBlock("sim2", (s) => {
  s.figureCaption.innerHTML = "固定的带电粒子在电场中所受电场力示意图";
  s.sim = new DefaultSim(200, 200);
  const particle1 = new ChargedParticle(s.sim, 100, 100, 10, 2.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(false);
  Matter.Body.setMass(particle1.mBody, 10000000);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 100, 100, 150, 150, 0, 1);
  field1.setShowPlane(true);
  // field1.setVisibility(false);
  s.sim.addField(field1);
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.eMagController(s.controlDiv, field1));
  s.controls.push(ControllerFactory.eAngleController(s.controlDiv, field1));
});

let simblock3 = new SimBlock("sim3", (s) => {
  s.figureCaption.innerHTML = "带电粒子在某电场中所受力的示意图";
  s.sim = new DefaultSim(200, 200);

  let particle1 = new ChargedParticle(s.sim, 100, 20, 10, 3);
  particle1.setShowForce(true);
  particle1.setShowVelocity(false);
  s.sim.addParticle(particle1);

  let field1 = new ElectricField(s.sim, 100, 20, 100, 30, 0, 1);
  // field1.setVisibility(false);
  s.sim.addField(field1);

  let field2 = new ElectricField(s.sim, 100, 100, 50, 100, Math.PI / 2, -1.5);
  // field2.setVisibility(false);
  s.sim.addField(field2);

  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  // s.sim.create("sim1");
});
