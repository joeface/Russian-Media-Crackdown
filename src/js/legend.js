export default class LegendControl {

    constructor() {

        console.log('Init Legend')
        this.bindEvents();

    }

    bindEvents() {

        var legend_items = document.querySelectorAll('#grid-legend > div');

        for (let i = 0; i < legend_items.length; i++) {

            legend_items[i].addEventListener("click", this.toggleSelection.bind(this), false);

        }

    }

    toggleSelection(e) {

        e.currentTarget.classList.toggle('active');

        var selected_colors = document.querySelectorAll('#grid-legend > div.active');

        if (selected_colors.length > 0) {
            document.querySelectorAll('#main-grid .year[class*=" color"]').forEach(el => {
                el.classList.remove('highlight');
                el.classList.add('fade');
            });
        } else {
            document.querySelectorAll('#main-grid .year.fade').forEach(el => {
                el.classList.remove('fade');
            });
        }

        for (let i = 0; i < selected_colors.length; i++) {

            document.querySelectorAll('#main-grid .year.' + selected_colors[i].dataset.color).forEach(element => {
                element.classList.add('highlight');
            });

        }

    }

}