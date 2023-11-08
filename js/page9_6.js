"use strict";
let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(400, 200);
  const particle1 = new ChargedParticle(s.sim, 20, 100, 10, 1);
  particle1.setM(10000);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  // particle1.setPrintVelocity(true);
  particle1.setVelocity({
    x: 1,
    y: 0,
  });
  s.sim.addParticle(particle1);
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.vxController(s.controlDiv, particle1));
  const field1 = new MagneticField(s.sim, 200, 100, 300, 80, 0, 10);
  let ctrler = new Controller(
    s.controlDiv,
    "磁感应强度<math><mi>B</mi></math>",
    field1.setIntensity.bind(field1),
    {
      min: -8,
      max: 8,
      step: 4,
      value: 5,
    }
  );
  s.controls.push(ctrler);
  //   field1.setVisibility(true);
  //   s.controls.push(ControllerFactory.BMagController(s.controlDiv, field1));
  s.controls.push(ctrler);
});
