"use strict";
// let sim1;
// let particle1;
// let field1;
// let field2;
// let controls = [];
// // let chargeSlide = document.getElementById("charge");
// // let chargeValue = document.getElementById("q");

// function initsim1() {
//   // chargeSlide.value = "2.5";
//   // chargeValue.innerHTML = "2.5";
//   sim1 = new DefaultSim(200, 200);

//   particle1 = new ChargedParticle(sim1, 100, 20, 10, 3);
//   particle1.setShowForce(true);
//   particle1.setShowVelocity(false);
//   sim1.addParticle(particle1);

//   field1 = new ElectricField(sim1, 100, 20, 100, 30, 0, 1);
//   field1.setVisibility(false);
//   sim1.addField(field1);

//   field2 = new ElectricField(sim1, 100, 100, 50, 100, Math.PI / 2, -1.5);
//   field2.setVisibility(false);
//   sim1.addField(field2);

//   sim1.create("sim1");
//   controls.push(ControllerFactory.chargeController("control", particle1));
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
//     for (let ctl of controls) {
//       ctl.parentDiv.innerHTML = "";
//     }
//     e.target.innerHTML = "启动模拟";
//     initsim1();
//   }
// });

// chargeSlide.addEventListener("input", (e) => {
//   particle1.setQ(e.target.value);
//   chargeValue.innerHTML = e.target.value;
// });

let simblock = new SimBlock("sim1", (s) => {
  s.figureCaption.innerHTML = "带电粒子在某电场中所受力的示意图";
  s.sim = new DefaultSim(200, 200);

  let particle1 = new ChargedParticle(s.sim, 100, 20, 10, 3);
  particle1.setShowForce(true);
  particle1.setShowVelocity(false);
  s.sim.addParticle(particle1);

  let field1 = new ElectricField(s.sim, 100, 20, 100, 30, 0, 1);
  field1.setVisibility(false);
  s.sim.addField(field1);

  let field2 = new ElectricField(s.sim, 100, 100, 50, 100, Math.PI / 2, -1.5);
  field2.setVisibility(false);
  s.sim.addField(field2);

  // s.sim.create("sim1");
  s.controls.push(ControllerFactory.chargeController(s.controlDiv, particle1));
});
