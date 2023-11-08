"use strict";

let simblock1 = new SimBlock("sim1", (s) => {
  s.sim = new DefaultSim(200, 200);

  const field1 = new MagneticField(s.sim, 100, 100, 100, 100, 0, 10);
  s.figureCaption.innerHTML = "磁感线垂直于纸面向里";
  s.startButton.remove();
});

let simblock2 = new SimBlock("sim2", (s) => {
  s.sim = new DefaultSim(200, 200);
  const field1 = new MagneticField(s.sim, 100, 100, 100, 100, 0, -10);
  s.figureCaption.innerHTML = "磁感线垂直于纸面向外";
  s.startButton.remove();
});
