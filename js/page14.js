"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new CyclotronSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 200, 150, 5, 5);
  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 100, 30, 300, 200, 0, 25);
  const field2 = new MagneticField(s.sim, 150, 270, 300, 200, 0, 25);
  const field3 = new ElectricField(s.sim, 100, 150, 300, 20, 0, 3);
  s.controls.push(
    new Controller(
      s.controlDiv,
      "电场强度大小<math><mi>E</mi></math>",
      field3.setIntensity.bind(field3),
      {
        min: 0.5,
        max: 3,
        step: 0.5,
        value: 1,
      }
    )
  );
  //   s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
});
