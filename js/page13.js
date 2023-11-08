"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new CyclotronSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 150, 150, 5, 5);
  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 150, 30, 400, 200, 0, 15);
  const field2 = new MagneticField(s.sim, 150, 270, 400, 200, 0, 15);
  const field3 = new ElectricField(s.sim, 150, 150, 400, 20, 0, 3);
  //   s.controls.push(
  //     new Controller(
  //       s.controlDiv,
  //       "电场强度大小<math><mi>E</mi></math>",
  //       field3.setIntensity.bind(field3),
  //       {
  //         min: 1,
  //         max: 5,
  //         step: 1,
  //         value: 1,
  //       }
  //     )
  //   );
  //   s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
});
