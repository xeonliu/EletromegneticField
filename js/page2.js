"use strict";
let sim1;
function initsim1() {
  sim1 = new DefaultSim(200, 200);
  sim1.addParticle(new ChargedParticle(sim1, 100, 100, 10, 10));
  sim1.create("sim1");
}
initsim1();
let startbutton1 = document.getElementById("btn1");
startbutton1.addEventListener("click", (e) => {
  console.log(e.target.value);
  if (e.target.value === "off") {
    e.target.value = "on";
    e.target.innerHTML = "重置模拟";
    Matter.Runner.run(sim1.engine);
  } else if (e.target.value === "on") {
    e.target.value = "off";
    sim1.mP5.remove();
    e.target.innerHTML = "启动模拟";
    initsim1();
  }
});

let sim2;
function initsim2() {
  sim2 = new DefaultSim(200, 200);
  sim2.addParticle(new ChargedParticle(sim2, 100, 100, 10, -10));
  sim2.create("sim2");
}
initsim2();
let startbutton2 = document.getElementById("btn2");
startbutton2.addEventListener("click", (e) => {
  console.log(e.target.value);
  if (e.target.value === "off") {
    e.target.value = "on";
    e.target.innerHTML = "重置模拟";
    Matter.Runner.run(sim1.engine);
  } else if (e.target.value === "on") {
    e.target.value = "off";
    sim2.mP5.remove();
    e.target.innerHTML = "启动模拟";
    initsim2();
  }
});
