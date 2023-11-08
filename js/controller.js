class Controller {
  parentDiv;
  tag;
  slider;
  valueBox;
  constructor(div, tagText, callback, sliderOptions) {
    // this.parentDiv = document.getElementById(divId);
    this.parentDiv = div;

    let contentDiv = document.createElement("div");
    contentDiv.setAttribute("class", "slide");

    this.tag = document.createElement("label");
    this.tag.innerHTML = tagText;

    this.slider = document.createElement("input");
    this.slider.type = "range";
    this.slider.min = sliderOptions.min;
    this.slider.max = sliderOptions.max;
    this.slider.step = sliderOptions.step;
    this.slider.value = sliderOptions.value;

    this.valueBox = document.createElement("span");
    this.valueBox.innerHTML = this.slider.value;

    callback(this.slider.value);

    this.parentDiv.appendChild(contentDiv);
    this.tag.appendChild(this.slider);
    contentDiv.appendChild(this.tag);
    contentDiv.appendChild(this.valueBox);

    this.slider.addEventListener("input", (e) => {
      callback(e.target.value);
      this.valueBox.innerHTML = e.target.value;
    });
  }
}

class ControllerFactory {
  static chargeController(div, particle) {
    return new Controller(
      div,
      "电荷量<math><mi>q</mi></math>",
      particle.setQ.bind(particle),
      {
        min: -5,
        max: 5,
        step: 0.01,
        value: 2.5,
      }
    );
  }
  static eMagController(div, eField) {
    return new Controller(
      div,
      "电场强度大小<math><mi>E</mi></math>",
      eField.setIntensity.bind(eField),
      {
        min: -5,
        max: 5,
        step: 0.01,
        value: 2,
      }
    );
  }
  static eAngleController(div, eField) {
    return new Controller(
      div,
      "电场强度方向<math><mi>θ</mi></math>",
      eField.setRotation.bind(eField),
      {
        min: 0,
        max: 6.28,
        step: 0.01,
        value: 0,
      }
    );
  }
  static BMagController(div, mField) {
    return new Controller(
      div,
      "磁感应强度<math><mi>B</mi></math>",
      mField.setIntensity.bind(mField),
      {
        min: -8,
        max: 8,
        step: 4,
        value: 4,
      }
    );
  }

  static massController(div, particle) {
    return new Controller(
      div,
      "质量<math><mi>m</mi></math>",
      particle.setM.bind(particle),
      {
        min: 0.5,
        max: 1,
        step: 0.01,
        value: 0.5,
      }
    );
  }

  static vxController(div, particle) {
    return new Controller(
      div,
      "水平速度<math><msubsup><mi>v</mi><mi>x</mi></msubsup></math>",
      particle.setVx.bind(particle),
      {
        min: 2,
        max: 5,
        step: 1,
        value: 3,
      }
    );
  }
}
