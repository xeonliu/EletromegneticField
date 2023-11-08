function drawArrow(sketch, x1, y1, x2, y2, color = [255, 204, 0]) {
  let arrowLength = sketch.dist(x1, y1, x2, y2);
  let triangleLength;
  let arrowWidth;
  if (arrowLength < 5) {
    arrowWidth = 0;
    triangleLength = 0;
  } else {
    arrowWidth = 3;
    triangleLength = 5;
  }
  let arrowAngle = sketch.atan2(y2 - y1, x2 - x1);
  sketch.push();
  // 绘制箭头的矩形部分
  //   const c = sketch.color(255, 204, 0);
  sketch.fill(color);
  sketch.push();
  sketch.noStroke();
  sketch.translate(x1, y1);
  sketch.rotate(arrowAngle);
  sketch.rect(0, -arrowWidth / 2, arrowLength - triangleLength, arrowWidth);
  sketch.pop();

  // 绘制箭头的三角形部分
  sketch.push();
  sketch.noStroke();
  sketch.translate(x2, y2);
  sketch.rotate(arrowAngle);
  sketch.triangle(
    -triangleLength,
    arrowWidth,
    0,
    0,
    -triangleLength,
    -arrowWidth
  );
  sketch.pop();
  sketch.pop();
}

function drawCharge(sketch, x, y, r, q) {
  //draw '+'/'-'
  sketch.push();
  sketch.translate(x, y);
  sketch.noStroke();
  sketch.fill(sketch.color(255));
  if (q < 0) {
    sketch.rect(-0.8 * r, -0.2 * r, 1.6 * r, 0.4 * r);
  } else if (q > 0) {
    sketch.rect(-0.8 * r, -0.2 * r, 1.6 * r, 0.4 * r);
    sketch.rect(-0.2 * r, -0.8 * r, 0.4 * r, 1.6 * r);
  }
  sketch.pop();
}

function drawValue(sketch, x, y, size, str) {
  sketch.push();
  sketch.textSize(size);
  sketch.text(str, x, y);
  sketch.pop();
}
