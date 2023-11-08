"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 50, 150, 5, 5);
  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 50, 150, 400, 20, -Math.PI / 2, 3);
  const field2 = new ElectricField(s.sim, 100, 150, 400, 30, -Math.PI / 2, 3);
  const field3 = new ElectricField(s.sim, 150, 150, 400, 40, -Math.PI / 2, 3);
  const field4 = new ElectricField(s.sim, 210, 150, 400, 50, -Math.PI / 2, 3);
});
