"use strict";
// let sim1;
// let particle1;
// let field1;
// let field2;
// let controls = [];
// // let chargeSlide = document.getElementById("charge");
// let chargeValue = document.getElementById("q");
// let magSlide = document.getElementById("intensity");
// let magValue = document.getElementById("eMag");
// let angleSlide = document.getElementById("angle");
// let angleValue = document.getElementById("eAng");

// function initsim1() {
//   // chargeSlide.value = "2.5";
//   // chargeValue.innerHTML = "2.5";
//   sim1 = new DefaultSim(200, 200);

//   particle1 = new ChargedParticle(sim1, 100, 100, 10, 2.5);
//   particle1.setShowForce(true);
//   particle1.setShowVelocity(false);
//   Matter.Body.setMass(particle1.mBody, 10000000);
//   sim1.addParticle(particle1);

//   field1 = new ElectricField(sim1, 100, 100, 200, 200, 0, 1);
//   field1.setVisibility(false);
//   sim1.addField(field1);

//   sim1.create("sim1");
//   controls.push(
//     ControllerFactory.chargeController(
//       document.getElementById("control"),
//       particle1
//     )
//   );
//   controls.push(
//     ControllerFactory.eMagController(document.getElementById("control"), field1)
//   );
//   controls.push(
//     ControllerFactory.eAngleController(
//       document.getElementById("control"),
//       field1
//     )
//   );
// }
// initsim1();
// let startbutton1 = document.getElementById("btn1");
// startbutton1.addEventListener("click", (e) => {
//   console.log(e.target.value);
//   if (e.target.value === "off") {
//     e.target.value = "on";
//     e.target.innerHTML = "重置模拟";
//     Matter.Runner.run(sim1.engine);
//   } else if (e.target.value === "on") {
//     e.target.value = "off";
//     sim1.mP5.remove();
//     e.target.innerHTML = "启动模拟";
//     for (let ctl of controls) {
//       ctl.parentDiv.innerHTML = "";
//     }
//     initsim1();
//   }
// });

// chargeSlide.addEventListener("input", (e) => {
//   particle1.setQ(e.target.value);
//   chargeValue.innerHTML = e.target.value;
// });

// magSlide.addEventListener("input", (e) => {
//   field1.setIntensity(e.target.value);
//   magValue.innerHTML = e.target.value;
// });

// magSlide.addEventListener("input", (e) => {
//   field1.setIntensity(e.target.value);
//   magValue.innerHTML = e.target.value;
// });

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(200, 200);
  const particle1 = new ChargedParticle(s.sim, 100, 100, 10, 2.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(false);
  Matter.Body.setMass(particle1.mBody, 10000000);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 100, 100, 400, 400, 0, 1);
  field1.setVisibility(false);
  s.sim.addField(field1);

  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));

  let emag = ControllerFactory.eMagController(s.controlDiv, field1);
  emag.slider.setAttribute("disabled", "true");
  s.controls.push(emag);

  let eang = ControllerFactory.eAngleController(s.controlDiv, field1);
  eang.slider.setAttribute("disabled", true);
  s.controls.push(eang);
});

let simblock2 = new SimBlock("sim2", (s) => {
  s.sim = new DefaultSim(200, 200);
  const particle1 = new ChargedParticle(s.sim, 100, 100, 10, 2.5);
  particle1.setShowForce(true);
  particle1.setShowVelocity(false);
  Matter.Body.setMass(particle1.mBody, 10000000);
  s.sim.addParticle(particle1);

  const field1 = new ElectricField(s.sim, 100, 100, 400, 400, 0, 1);
  field1.setVisibility(false);
  s.sim.addField(field1);
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
  s.controls.push(ControllerFactory.eMagController(s.controlDiv, field1));
  s.controls.push(ControllerFactory.eAngleController(s.controlDiv, field1));
});
