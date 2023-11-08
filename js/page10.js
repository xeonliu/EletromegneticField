"use strict";
let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 150, 200, 10, 2.5);
  // particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  // particle1.setPrintVelocity(true);
  particle1.setVelocity({
    x: 0.5,
    y: 0,
  });
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 100, 100, 400, 400, 0, 10);
  field1.setVisibility(true);
  // s.sim.addField(field1);
  s.controls.push(ControllerFactory.BMagController(s.controlDiv, field1));
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
});
