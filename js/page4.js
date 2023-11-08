"use strict";
let sim1;
let particle1;
let field1;
let field2;
let chargeSlide = document.getElementById("charge");
let chargeValue = document.getElementById("q");

function initsim1() {
  chargeSlide.value = "2.5";
  chargeValue.innerHTML = "2.5";
  sim1 = new DefaultSim(200, 200);

  particle1 = new ChargedParticle(sim1, 100, 20, 10, 3);
  particle1.setShowVelocity(false);
  sim1.addParticle(particle1);

  field1 = new ElectricField(sim1, 100, 20, 100, 30, 0, 1);
  field1.setVisibility(false);
  sim1.addField(field1);

  field2 = new ElectricField(sim1, 100, 100, 50, 100, Math.PI / 2, -1.5);
  field2.setVisibility(false);
  sim1.addField(field2);

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

chargeSlide.addEventListener("input", (e) => {
  particle1.setQ(e.target.value);
  chargeValue.innerHTML = e.target.value;
});
