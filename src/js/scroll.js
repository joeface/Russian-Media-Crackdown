function handleYearIntersect(entries, theobserver) {

	Array.prototype.slice.call(entries).forEach(function (entry) {

		if (entry.isIntersecting) {

			var activeMonth = document.querySelector("#timeline-nav .active");

			if (activeMonth) {
				activeMonth.classList.remove('active');
			}

			var yearSelector = document.querySelector('#timeline-nav a[data-year="' + entry.target.getAttribute('data-year') + '"]');

			if (yearSelector) {
				yearSelector.classList.add('active');
			}

		}
	});
}


export default class ScrollObserver {

	constructor() {

		var c = this;
		this.createObserver(document.querySelectorAll("#timeline .event"));

		Array.prototype.slice.call(document.querySelectorAll('#timeline-nav a[data-year]')).forEach(function (el) {

			el.addEventListener('click', function (e) {

				e.preventDefault();

				var yearContainer = document.querySelector('#timeline .event[data-year="' + this.getAttribute('data-year') + '"]');

				if (yearContainer) {

					var elementPosition = yearContainer.getBoundingClientRect().top;
					var offsetPosition = elementPosition + window.pageYOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});
				}
			}, true);

		});



	}

	createObserver(elements) {

		var observer;

		var options = {
			root: null,
			rootMargin: "-60px 0px -60px 0px",
			threshold: 0.01
		};

		observer = new IntersectionObserver(handleYearIntersect, options);

		Array.prototype.slice.call(elements).forEach(function (el) {

			observer.observe(el);

		});

	}

}