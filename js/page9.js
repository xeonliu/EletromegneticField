"use strict";
let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(300, 200);
  const particle1 = new ChargedParticle(s.sim, 125, 100, 5, 2.5);
  particle1.setShowForce(false);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 150, 100, 150, 50, -Math.PI / 2, 1);
  //   s.sim.addField(field1);

  s.figureCaption.innerHTML =
    "带电粒子从静止开始在两极板之间的运动（板间距离50）";

  let ctrler = new Controller(
    s.controlDiv,
    "电场强度大小<math><mi>E</mi></math>",
    field1.setIntensity.bind(field1),
    {
      min: 1,
      max: 9,
      step: 1,
      value: 1,
    }
  );
  s.controls.push(ctrler);
  //   s.controls.push(ControllerFactory.widthController(s.controlDiv, field1));
});

let simblock2 = new SimBlock("sim2", (s) => {
  s.sim = new DefaultSim(300, 200);
  const particle1 = new ChargedParticle(s.sim, 100, 100, 5, 2.5);
  particle1.setShowForce(false);
  particle1.setShowVelocity(true);
  particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 150, 100, 150, 100, -Math.PI / 2, 1);
  //   s.sim.addField(field1);

  s.figureCaption.innerHTML =
    "带电粒子从静止开始在两极板之间的运动（板间距离100）";

  let ctrler = new Controller(
    s.controlDiv,
    "电场强度大小<math><mi>E</mi></math>",
    field1.setIntensity.bind(field1),
    {
      min: 1,
      max: 9,
      step: 1,
      value: 1,
    }
  );
  s.controls.push(ctrler);
  //   s.controls.push(ControllerFactory.widthController(s.controlDiv, field1));
});
