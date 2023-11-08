"use strict";
class SimBlock {
  parentDiv;
  controlDiv;
  simDiv;
  initFunc;
  controls;
  sim;
  figureCaption;
  statsDiv;
  startButton;

  constructor(parentId, initFunc) {
    this.controls = [];
    this.initFunc = initFunc;
    this.parentDiv = document.getElementById(parentId);
    //开始按钮
    this.startButton = document.createElement("button");
    this.startButton.innerHTML = "启动模拟";
    this.startButton.setAttribute("value", "off");
    //滑杆控制区
    this.controlDiv = document.createElement("div");
    this.controlDiv.setAttribute("class", "control");
    //演示区
    let figureDiv = document.createElement("figure");
    this.figureCaption = document.createElement("figcaption");
    this.simDiv = document.createElement("div");
    //数据显示区
    // this.statsDiv = document.createElement("div");

    this.parentDiv.appendChild(this.startButton);
    this.parentDiv.appendChild(this.controlDiv);
    this.parentDiv.appendChild(figureDiv);
    // this.parentDiv.appendChild(this.statsDiv);

    figureDiv.appendChild(this.simDiv);
    figureDiv.appendChild(this.figureCaption);

    // this.startButton.setAttribute("class", "button-3");

    this.startButton.addEventListener("click", (e) => {
      console.log(e.target.value);
      if (e.target.value === "off") {
        e.target.value = "on";
        e.target.innerHTML = "重置模拟";
        Matter.Runner.run(this.sim.engine);
      } else if (e.target.value === "on") {
        e.target.value = "off";
        this.sim.mP5.remove();
        e.target.innerHTML = "启动模拟";
        for (let ctl of this.controls) {
          ctl.parentDiv.innerHTML = "";
        }
        this.controls = [];

        this.init();
      }
    });
    this.init();
  }

  init() {
    this.initFunc(this);
    this.sim.create(this.simDiv);
  }
}
