export default class ChainsawControl {

	constructor() {

		this.createHintContainer();
		this.bindEvents();
		this.hideHint();

	}

	bindEvents() {

		var hints = document.querySelectorAll('.year[data-tooltip]');
		for (let i = 0; i < hints.length; i++) {
			hints[i].addEventListener("click", this.toggleHint.bind(this), false);
		}

		var c = this;

		document.addEventListener("click", function (e) {
			if (!e.target.getAttribute('data-tooltip') || ((!e.target.classList.contains('year') && !e.target.parentNode.classList.contains('year')) && (e.target.parentNode && e.target.parentNode.id !== 'nrtk-chainsaw-container'))) {
				c.hideHint();
			}
		}, false);

	}

	toggleHint(e) {
		console.log('click')
		if (!this.hintContainer.classList.contains('visible')) {
			this.showHint(e.currentTarget);
		} else if (this.hintContainer.classList.contains('visible') && e.currentTarget.classList.contains('active')) {
			this.hideHint();
		} else {
			this.hideHint();
			this.showHint(e.currentTarget);
		}

		return false;

	}

	createHintContainer() {

		if (!document.getElementById('nrtk-chainsaw-container')) {
			document.getElementsByTagName("body")[0].insertAdjacentHTML('beforeEnd', '<div id="nrtk-chainsaw-container"></div>');
		}

		this.hintContainer = document.getElementById('nrtk-chainsaw-container');

	}

	showHint(obj) {
		const bcr = obj.getBoundingClientRect();
		let leftOffset;

		if (bcr.left > document.body.clientWidth / 2) {
			leftOffset = document.body.clientWidth / 2 - 100;
		} else {
			leftOffset = bcr.left - 20;
		}

		this.hintContainer.style.left = leftOffset + 'px';
		this.hintContainer.style.top = (obj.offsetTop + 30) + 'px';

		this.hintContainer.innerHTML = obj.getAttribute('data-tooltip');

		if (obj.getAttribute('data-tooltip').length < 30) {
			this.hintContainer.classList.add("hint-short");
			if (document.body.clientWidth < 380) {
				if (obj.offsetLeft > document.body.clientWidth / 2) {
					this.hintContainer.classList.add("hint-right");
				}
			}
		}

		this.hintContainer.classList.add("visible");
		obj.classList.add("active");

	}

	hideHint() {

		this.hintContainer.style.left = '-1000px';
		this.hintContainer.style.top = '-1000px';

		this.hintContainer.classList.remove("visible");
		this.hintContainer.classList.remove("hint-short");
		this.hintContainer.classList.remove("hint-right");

		var activeHints = document.querySelectorAll(".year.active");
		if (activeHints.length > 0)
			activeHints[0].classList.remove('active');

	}

}