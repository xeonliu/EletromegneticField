"use strict";
let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 250, 50, 10, 2.5, 0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  particle1.setShowSC(true);
  // particle1.setPrintVelocity(true);
  //   particle1.setVelocity({
  //     x: 1,
  //     y: 0,
  //   });
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 100, 250, 400, 200, 0, -10);
  field1.setVisibility(true);
  const field2 = new ElectricField(s.sim, 300, 75, 100, 50, 0, 2.5);
  //   s.sim.addField(field1);
  const indicator = new Indicator(s.sim, (s) => {
    s.push();
    s.fill(222);
    drawValue(s, 10, 80, 10, "不同比荷(q/m)对应出射区域");
    drawValue(s, 8, 100, 10, "3");
    drawValue(s, 41, 100, 10, "4");
    drawValue(s, 63, 100, 10, "5");
    drawValue(s, 79, 100, 10, "6");
    drawValue(s, 92, 100, 10, "7");
    drawValue(s, 116, 100, 10, "10");
    drawValue(s, 164, 100, 10, "25");
    s.pop();
  });
  //   s.controls.push(ControllerFactory.BMagController(s.controlDiv, field1));
  let ctrler = new Controller(
    s.controlDiv,
    "电荷量<math><mi>q</mi></math>",
    particle1.setQ.bind(particle1),
    {
      min: 1,
      max: 5,
      step: 0.01,
      value: 2,
    }
  );

  s.controls.push(ctrler);
  s.controls.push(ControllerFactory.massController(s.controlDiv, particle1));
});
