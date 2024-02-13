$(document).ready(() => {

    new WOW(({
        animateClass: 'animate__animated'
    })).init();

    $('#main-button').click(() => {
        $('#order')[0].scrollIntoView({behavior: "smooth"})
    })

    let video = $('#video');
    $('#prewatch-video').click(() => {
        video[0].scrollIntoView({behavior: "smooth"})
    });

    // burger
    $('#burger').click(() => {
        $('.menu').addClass('open');
        $('.close').show();


    })

    $('.menu *').click (() => {
        $('.menu').removeClass('open');
    })

    // places

    let placesButtons = $('.places__buttons').children();
    placesButtons.click((event) => {

        let newNumberElement = $(event.target).children().length === 1 ?
            $(event.target) :
            $(event.target).parent();
        let newNumber = $(event.target).text().trim();

        let currentNumberElement = $('.place_number_active');
        let currentNumber = currentNumberElement.children().text().trim();

        let currentPlaceElement = $('.place__active');
        let newPlaceElement = $('#place-' + newNumber);

        if (newNumber !== currentNumber) {
            currentNumberElement.removeClass('place_number_active');
            newNumberElement.addClass('place_number_active');

            currentPlaceElement.removeClass('place__active');
            newPlaceElement.addClass('place__active');
        }
    })

    // video

    let player = $('#player');

    $('#watch-video').click(() => {
        $('.video__circle-button').fadeOut();
        $('.iframe_wrapper').css('visibility', 'visible');
        player.attr('src', player.attr('src') + '&amp;autoplay=1');
    });

    // program

    $('.program__day_item').addClass('animate__animated animate__fadeIn')

    $('#day-prev').click(() => {
        let activeItem = $('.program__day_item_active');

        if (!activeItem.is(':first-child')) {

            let dayNumber = $('.program__day_active');
            dayNumber.text(+dayNumber.text() - 1);
            activeItem.removeClass('program__day_item_active');
            activeItem.prev().addClass('program__day_item_active');
            $('#day-next').removeClass('button__disabled');

            if (activeItem.prev().is(':first-child')) {
                $('#day-prev').addClass('button__disabled');
            }
        }
    })

    $('#day-next').click(() => {
        let activeItem = $('.program__day_item_active');

        if (!activeItem.is(':last-child')) {

            let dayNumber = $('.program__day_active');
            dayNumber.text(+dayNumber.text() + 1);
            activeItem.removeClass('program__day_item_active');
            activeItem.next().addClass('program__day_item_active');
            $('#day-prev').removeClass('button__disabled');

            if (activeItem.next().is(':last-child')) {
                $('#day-next').addClass('button__disabled');
            }
        }
    })

    // reviews

    $('.review__item').addClass('animate__animated animate__fadeIn')

    $('#review-prev').click(() => {
        let activeItem = $('.review__item_active');

        if (!activeItem.is(':first-child')) {

            activeItem.removeClass('review__item_active');
            activeItem.prev().addClass('review__item_active');
            $('#review-next').removeClass('button__disabled');

            if (activeItem.prev().is(':first-child')) {
                $('#review-prev').addClass('button__disabled');
            }
        }


    })

    $('#review-next').click(() => {
        let activeItem = $('.review__item_active');

        if (!activeItem.is(':last-child')) {

            activeItem.removeClass('review__item_active');
            activeItem.next().addClass('review__item_active');
            $('#review-prev').removeClass('button__disabled');

            if (activeItem.next().is(':last-child')) {
                $('#review-next').addClass('button__disabled');
            }
        }
    })

    // slider

    $('.slider__image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        }
    });

    $('#switch-prev').click(() => {
        let activeTab = $('.slider__images_active');
        let activeItem = $('.switch_item_active');

        activeTab.removeClass('slider__images_active');
        activeItem.removeClass('switch_item_active');

        activeTab.prev().addClass('slider__images_active');
        activeItem.prev().addClass('switch_item_active');

        if (activeTab.prev().length) {
            activeTab.prev().addClass('slider__images_active');
            activeItem.prev().addClass('switch_item_active');
        } else {
            $('.slider__images').last().addClass('slider__images_active');
            $('.slider__switch_item').last().addClass('switch_item_active');
        }
    })

    $('#switch-next').click(() => {
        let activeTab = $('.slider__images_active');
        let activeItem = $('.switch_item_active');

        activeTab.removeClass('slider__images_active');
        activeItem.removeClass('switch_item_active');

        if (activeTab.next().length) {
            activeTab.next().addClass('slider__images_active');
            activeItem.next().addClass('switch_item_active');
        } else {
            $('.slider__images').first().addClass('slider__images_active');
            $('.slider__switch_item').first().addClass('switch_item_active');
        }
    })

    // форма

    $('.people_count_button').click((event) => {
        $('.people_count_active').removeClass('people_count_active');
        $(event.target).addClass('people_count_active');
    })


    let name = $('#name');
    let phone = $('#phone');
    phone.inputmask({
        "mask": "+999 (99) 999 - 99 - 99"
    });

    $('#order-button').click(() => {
        let hasError = false;
        let loader = $('.loader-wrapper');

        $('.order__input_error').hide();
        $('.order__input').css('border-color', '#ffffff')

        if (!name.val()) {
            name.next().show();
            name.css('border-color', 'red');
            hasError = true;
        }

        if (!phone.val() || !phone.inputmask("isComplete")) {
            phone.next().show();
            phone.css('border-color', 'red');
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {peopleCount: $('.people_count_active').val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        $('.order__success').css('display', 'flex');
                    } else {
                        alert('Не удалось создать заказ. Пожалуйста, попробуйте снова')
                    }
                })
        }
    })

    function resetForm(event) {
        $('body,html').animate({scrollTop: 0}, 500);
        $('#form')[0].reset();
        $('.order__success').hide();
    }

    $('#back-order-button').click(resetForm);
    $('#close').click(resetForm);
})