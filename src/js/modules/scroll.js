var data = JSON.parse('{{ data }}');
var windowTop, windowHeight, stepToShow;

module.exports =  {
    init: function() {
        console.log(data);
        this.bindings();
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

        // remove current step
        $('.uit-map').removeClass(function(i, className) {
            if (className) {
                return (className.match(/uit-map-state--[0-9]{1,2}/g) || []).join(' ');
            }
        });

        if (stepToShow !== null) {
            $('.uit-map').addClass('uit-map-state--' + stepToShow);
        }
    },

    percentageOfHeight: function(percentage) {
        return (windowHeight / 100) * percentage;
    }
};
