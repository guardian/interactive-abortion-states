var data = JSON.parse('{{ data }}');
var windowTop, windowHeight, stepToShow, steps;

module.exports =  {
    init: function() {
        this.bindings();
        this.populateMap();
    },

    bindings: function() {
        $(window).scroll(function() {
            this.onScroll();
        }.bind(this))
    },

    onScroll: function() {
        this.updateValues();
        this.fixMap();
        this.setStep();
    },

    populateMap: function() {
        steps = [];

        $('.uit-step').each(function(i, el) {
            steps.push($(el).data('step'));
        }.bind(this));

        $('.uit-map g').each(function(i, el) {
            var state = $(el).attr('id');

            for (var step in steps) {
                if (data[state][steps[step]]) {
                    $(el).addClass('is-' + steps[step]);
                }
            }
        }.bind(this));
    },

    updateValues: function() {
        windowTop = window.pageYOffset || document.documentElement.scrollTop;
        windowHeight = $(window).height();
        mapHeight = $('.uit-map').height();
    },

    fixMap: function() {
        if (windowTop > $('.uit-map__point').offset().top - this.percentageOfHeight(20)) {
            $('.uit-map').addClass('is-fixed');
            $('.uit-map__point').attr('style', 'margin-bottom:' + mapHeight + 'px;');
        } else {
            $('.uit-map').removeClass('is-fixed');
            $('.uit-map__point').removeAttr('style');
        }
    },

    setStep: function() {
        stepToShow = null;

        $('.uit-step').each(function(i, el) {
            if (windowTop > $(el).offset().top - this.percentageOfHeight(20)) {
                stepToShow = $(el).data('step');
            }
        }.bind(this));

        this.highlightStates(stepToShow);
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    },

    highlightStates: function(currentStep) {
        for (var step in steps) {
            $('.uit-map').removeClass('is-' + steps[step])
        }

        $('.uit-map').addClass('is-' + currentStep);
    }
};
