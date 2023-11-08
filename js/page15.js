"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new CyclotronSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 150, 150, 5, 5);
  //   particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  //   particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 150, 30, 400, 200, 0, 15);
  const field2 = new MagneticField(s.sim, 150, 270, 400, 200, 0, 15);
  const field3 = new ElectricField(s.sim, 150, 150, 400, 20, 0, 3);
  s.controls.push(ControllerFactory.massController(s.controlDiv, particle1));
  //   s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.figureCaption.innerHTML = "观察当质量改变时电场变化的周期";
});

let simblock2 = new SimBlock("sim2", (s) => {
  s.sim = new CyclotronSim(300, 300);
  const particle1 = new ChargedParticle(s.sim, 150, 150, 5, 5);
  particle1.setM(0.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(true);
  //   particle1.setPrintVelocity(true);
  // particle1.setPrintVelocity(true);
  s.sim.addParticle(particle1);

  const field1 = new MagneticField(s.sim, 150, 30, 400, 200, 0, 15);
  const field2 = new MagneticField(s.sim, 150, 270, 400, 200, 0, 15);
  const field3 = new ElectricField(s.sim, 150, 150, 400, 20, 0, 3);
  //   s.controls.push(ControllerFactory.massController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.figureCaption.innerHTML =
    "<p>观察当电荷量改变时电场变化的周期</p><p>（探究：电荷正负对加速器运转有何影响？）</p>";
});
