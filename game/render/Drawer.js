export default class Drawer {
	constructor(c) {
		this.c = c;
	}

	clear(x, y, width, height) {
		this.c.clearRect(x, y, width, height);
	}

	/**
	 * @param {String} color
	 */
	set fill(color) {
		this.c.fillStyle = color;
	}

	/**
	 * @param {String} color
	 */
	set stroke(color) {
		this.c.strokeStyle = color;
	}
	/**
	 * @param {Number} lineWidth
	 */
	set weight(lineWidth) {
		this.c.lineWidth = lineWidth;
	}
	/**
	 * @param {String} font
	 */
	set font(font) {
		this.c.font = font;
	}

	circle(x, y, radius, fillBool) {
		this.c.beginPath();
		this.c.arc(x, y, radius, 0, Math.PI * 2, false);
		fillBool ? this.c.fill() : this.c.stroke();
		this.c.closePath();
	}

	text(text, color, x, y) {
		this.c.beginPath();
		this.setFill(color);
		this.c.fillText(text, x, y);
		this.c.closePath();
	}

	rect(x, y, width, height, fillBool) {
		this.c.beginPath();
		this.c.rect(x, y, width, height);
		fillBool ? this.c.fill() : this.c.stroke();
		this.c.closePath();
	}

	drawLine(p1, p2) {
		this.c.beginPath();
		this.c.moveTo(p1.x, p1.y);
		this.c.lineTo(p2.x, p2.y);
		this.c.stroke();
		this.c.closePath();
	}
}
