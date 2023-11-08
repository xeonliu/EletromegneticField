"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(200, 200);
  const particle1 = new ChargedParticle(s.sim, 20, 100, 5, 5);

  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 100, 100, 100, 40, 0, 3);
  s.controls.push(ControllerFactory.vxController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.massController(s.controlDiv, particle1));
});
let simblock2 = new SimBlock("sim2", (s) => {
  s.sim = new DefaultSim(200, 200);
  const particle1 = new ChargedParticle(s.sim, 20, 100, 5, 0);
  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);
  s.sim.engine.gravity.scale = 0.0001;
  s.controls.push(ControllerFactory.vxController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.massController(s.controlDiv, particle1));
});
