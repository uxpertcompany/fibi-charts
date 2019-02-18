(function ($) {

    var $window = $(window);
    var timerInputCheck;
    $(document).ready(function () {
        stickyHeader();

        // disabling default function for disabled links
        $('.disabled').click(function (event) {
            event.preventDefault();
            return false;
        });



        $('.full-width-header .main-nav').addClass('opened');


        // open & close help block in Login form
        $(".help-icon").click(function () {
            $(".help-icon").fadeOut(500);
            $(".help-content").fadeIn(500);
        });

        $('.help-content > img').click(function () {
            $(".help-content").fadeOut(500);
            $(".help-icon").fadeIn(500);
            $('.modal-body.modal-body').removeClass('help-mob-active-blur');
            $('.help-mob-active').css('display', 'none');
        });

        $(".schedule button").click(function () {
            $(".help-content").fadeOut(500);
            $(".help-icon").fadeIn(500);
        });

        $(".schedule button").on('keydown', function () {
            if (e.keyCode == 13) {
                $(".help-content").fadeOut(500);
                $(".help-icon").fadeIn(500);
            }
        });


        // close Login form at clicking beyond block & remove blur
        $(document).on('click', function (e) {
            var container = $(".modal");
            if ( !e.target.closest('.modal-content') && !e.target.closest('.login-trigger') )  {
                $('.wraper  > *').removeClass('blur');
                $('.modal-body .close').trigger('click');
            }

            container.on('keydown', function (e) {
                if (e.keyCode == 27) {
                    $('.wraper > *:not(#login)').removeClass('blur');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop.fade').css('display', 'none');
                    $('.menus-holder').css('opacity', '1');
                }
            });
        });


        //animation for open/close Login form (+ other elements behaviour)
        $('.modal').on('hide.bs.modal', function() {
            $('.modal.fade .modal-dialog.modal-dialog').addClass('login-closed');
            $('.modal.fade .modal-dialog.modal-dialog').removeClass('login-opened');
            $('.menus-holder').css('opacity', '1');
            $('body').removeClass('noScroll');

            $('#login-form')[0].reset();
            $('.form-input').removeClass('has-value');

        });

        $('.modal').on('show.bs.modal', function() {
            $('.modal.fade .modal-dialog.modal-dialog').addClass('login-opened');
            $('.modal.fade .modal-dialog.modal-dialog').removeClass('login-closed');
            setTimeout(function(){
                $('.menus-holder').css('opacity', '0');
            }, 200)
            $('body').addClass('noScroll');
            if ($('.helper-menu').hasClass('active')) {
                $('.helper-menu').removeClass('active');
                $('.helper-menu .content').css({'display': 'none', 'opacity': '0'});
            }

        });


        //animation for open/close Login form (mobile)
        if (($window.width() <= 768) && $(".modal").on('show.bs.modal', function() {
                $('.modal.fade .modal-dialog.modal-dialog').addClass('login-opened-mob');
                $('.modal.fade .modal-dialog.modal-dialog').removeClass('login-opened login-closed login-closed-mob');
            }));

        if (($window.width() <= 768) && $(".modal").on('hide.bs.modal', function() {
                $('.modal.fade .modal-dialog.modal-dialog').addClass('login-closed-mob');
                $('.modal.fade .modal-dialog.modal-dialog').removeClass('login-opened login-closed login-opened-mob');
            }));


        // add/remove blur effect when Login form opened/closed
        $(".menus-holder > ul li:first-of-type a").click(function () {
            setTimeout(function () {
                $('.wraper > *:not(#login)').addClass('blur');
            }, 200);
        });

        $("button.close").click(function () {
            $('.wraper > *:not(#login)').removeClass('blur');
        });

        $(".modal-backdrop.show").click(function () {
            $('.wraper > *:not(#login)').removeClass('blur');
        });


        // help block behavior in Login form on mobile
        // (at clicking beyond block & remove blur)
        $(document).mouseup(function (e) {
            var popap = $(".help-content");
            if (popap.has(e.target).length === 0) {
                popap.hide();
                $('.help-mob-active').css('display', 'none');
                $('.help-icon').css('display', 'flex');
                $('.modal-body.modal-body').removeClass('help-mob-active-blur');
            }

            var tooltip = $('.lightbox-menu:target ');
            if (tooltip.has(e.target).length === 0) {
                tooltip.hide();
            }

            if ($('.input-holder:first-of-type .question a').click(function() {
                $('.input-holder:first-of-type .lightbox-menu:target').show();
                $('.input-holder:last-of-type .lightbox-menu:target').hide();
            }));

            if ($('.input-holder:last-of-type .question a').click(function() {
                $('.input-holder:last-of-type .lightbox-menu:target').show();
                $('.input-holder:first-of-type .lightbox-menu:target').hide();
            }));

        });


        // help block behavior in Login form on mobile
        if (($window.width() <= 768) && $(".help-icon").click(function () {
                $('.help-mob-active').css('display', 'block');
                $('.modal-body.modal-body').addClass('help-mob-active-blur');
            }));

        if (($window.width() <= 768) && $(".schedule button").click(function () {
                $('.help-mob-active').css('display', 'none');
                $('.modal-body.modal-body').removeClass('help-mob-active-blur');
            }));


        // Login form validation (label & submit behavior)
        $('.form-input').focusout(function () {
            var text_val = $(this).val();

            if (text_val == '') {
                $(this).removeClass('has-value');
                $(this).css('border-bottom-color', '#f9ba02');
            } else {
                $(this).addClass('has-value');
                $(this).css('border-bottom-color', '#7c8fbd');
            }

        });


        // Input focus behaviour on mobile
        if(($window.width() <= 768) && $('.form-input').focusin(function() {
            $('.login-caption').css('margin-top', '1px');
            $('.close.close').css('display', ' none');
            $('.login').css('margin-top', '20px');
            $('.login-caption').css('padding-bottom', '40px');
        }));

        if(($window.width() <= 768) && $('.form-input').focusout(function() {
            $('.login-caption').css('margin-top', '41px');
            $('.close.close').css('display', ' block');
            $('.login').css('margin-top', '46px');
            $('.login-caption').css('padding-bottom', '55px');
        }));


        // Login form validation (pass input behavior)
        $('.form-input.password, .username').on('keydown', function (e) {
            $(this).trigger('change');
        });

        $('.form-input.password, .username').on('change', function (e) {

            clearTimeout(timerInputCheck);

            timerInputCheck = setTimeout(function(){

                if( $('.username').val().length !=0 && $('.password').val().length > 7 ){
                    $('.btn.login').addClass('submit-success');
                } else {
                    $('.btn.login').removeClass('submit-success');
                }

                passValidate();
                loginValidate();
            }, 20);

        });

        $('#login-form').submit(function(e){
            if( passValidate() === false && $('.password.form-input').val().length < 8 ) {
                return false;
            }

            if(loginValidate() === false) {
                return false;
            }
        });


        // $('.form-input.password').focusout(function (e) {
        //     if (e.type == 'focusout') {
        //         passValidate();
        //     }
        // });


        // Accessibility of help block in Login form
        $('.help-icon').on('keydown', function (e) {
            if (e.keyCode == 40 || e.keyCode == 13) {
                $(".help-icon").hide();
                $(".help-content").show();
            } else {
                $(".help-icon").show();
                $(".help-content").hide();
                $('.modal-body.modal-body').removeClass('help-mob-active-blur');
            }
        });


        if (($window.width() <= 1024)) {
            $('.login-link').before($('.full-width-header .main-nav.additional ul.extra-menu'));
        }


        // styles for clicking btn accessability
        $("a.accessability").toggle(
            function () {
                $(this).css('font-weight', '900');
            },
            function () {
                $(this).css('font-weight', '400');
            }
        );


        $('.login-trigger').click(function () {
            $('body, html').stop().animate({scrollTop: 0}, 100, function () {});
        });




        servicesListLinksDelay();

        //wrapping instruments-list for horizontal scroll only for mobile
        instrumentsHorizontalScroll();

        //cheking mobile menu is existist submenus in the header
        mobSubmenus();

        // equaling height "InstrumentsList" block
        boxHeightInstrumentsList();

        // animation for top menu (links to other pages)
        animatedMenuBorder();

        // open/close search
        search('.search button');

        // equaling mobile menu height
        mobileMenuHeight();

        // transference menu elements for mobile version and back to desktop version of site
        mobileHeader();

        // open/close footer submenus
        footerMobSubmenus();



        //ביטול אפקט פראלקס רגיל והפעלת אפקט מותאם לאקספלורר
        $('body').on("mousewheel", function (event) {
            if($('body').hasClass('noScroll')) {
                event.preventDefault();
                return false;
            }
        });

        $(document).on("touchmove", 'body.noScroll', function (event) {
            console.log('dfdfd');
            event.preventDefault();
            event.stopPropagation();
            return false;
        });



        if (navigator.userAgent.match(/Trident\/7\./)) { // if IE
            $('body').on("mousewheel", function (event) {
                // remove default behavior
                event.preventDefault();
                if($('body').hasClass('noScroll')) {
                    return false;
                }

                //scroll without smoothing
                var wheelDelta = event.originalEvent.wheelDelta * 3.5;
                var currentScrollPosition = window.pageYOffset;
                $('html, body').stop().animate({
                    scrollTop: currentScrollPosition - wheelDelta
                }, 200);
            });
        }
        //init news-line slider only for mobile
        if ($window.width() <= 1023 && !$('.news-line .bx-wrapper').length) {
            newsLineSlider();
            $('.news-line').css('direction', 'ltr');
        }
        ;

        // init main slider start

        $('.main-slider ul.slider').bxSlider({
                pause: 8000,
                autoStart: true,
                auto: true,
                pager: false,
                autoControls: true,
                nextText: '',
                prevText: '',
                startText: '',
                stopText: '',
                mode: 'fade',
                autoControlsCombine: true,
                onSliderLoad: function (current) {
                    $(this).closest('.bx-wrapper').find('.bx-prev').attr('aria-label', 'prev-slide');
                    $(this).closest('.bx-wrapper').find('.bx-next').attr('aria-label', 'next-slide');

                    $(this).closest('.bx-wrapper').find('.bx-controls-auto-item').click(function () {
                        $(this).find('a').attr('aria-label', 'play-pause');
                    });
                    $('li:first', this).addClass('active-slide');
                    if ($('li.active-slide video').length) {
                        $('li.active-slide video')[0].play();
                    }
                },
                onSlideAfter: function (el) {
                    $('li', this).removeClass('active-slide');
                    el.addClass('active-slide');
                    $('li video').each(function () {
                        this.pause();
                    });

                    if (el.find('video').length) {
                        el.find('video')[0].play();
                    }
                }
            }
        );


        //open-close (on click) and hide-show (on scroll) mobile menu
        mobileMenu();

        // paralax on bussiness and private pages
        if ($window.width() > 1023) {
            $('.promo-banner').parallaxie();
        }
        ;

        // init "3d" carousel slider

        if ($('.carousel-container').length) {
            initCarouselSlider();
        }

        // scroll to top of page
        $('.scroll-to-top').click(function (event) {
            $('body, html').stop().animate({scrollTop: 0}, 500, function () {

            });
        });

        // init "Fibi" helper menu
        if ($('.helper-menu').length) {
            helperMenu();
        }

        // scroll to "3d" carousel slider
        scrollToBlock('.scroll-down-button', 900, 'swing');


        // init video popupp
        $('.list-item a').fancybox({
            buttons: [
                'close'
            ],
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                media: {},
                title: {
                    type: 'inside',
                    position: 'top'
                }
            }
        });

        // adding class if news-line is on page
        if ($('.news-line').length) {
            $('body').addClass('has-news-line');
        }
        // adding class if news-line is on page

        // equaling height of "services-list items block"
        boxHeight('.services .services-list .services-item');
        if ($window.width() >= 768) {
            boxHeight('body .video-list ul .list-item');
        } else {
            boxHeightServives('.services .services-list .services-item');
        }
        // equaling height of "services-list items block"

        // init equaling height of blocks
        fixSizes();

        //init transference images from html to slide item background
        sliderBgImage();

        // בדיקה של הגעת העמוד לבלוק ".instruments" לצורך הפעלת אנימציה של יציאה משמאל
        if ($('.instruments').length) {
            $(window).scroll(function () {
                if ($window.scrollTop() > ($('.instruments').offset().top - $window.height() / 1.3) && $('.instruments:not(.activated)') && $window.width() <= 768) {
                    $('.instruments').addClass('activated');
                }
                ;
            });
        }
        ;
        
    });


    $(window).load(function () {

        // equaling height "InstrumentsList" block
        boxHeightInstrumentsList();

        // init equaling height of blocks
        fixSizes();

        // transference menu elements for mobile version
        mobileHeader();

        // equaling mobile menu height
        mobileMenuHeight();

        //adding class for "fade in" main slider gradient background when content is loaded
        $('.main-banner').addClass('main-slider-loaded');

        //fade in main slider items when content is loaded
        $('.main-banner .main-slider .bx-wrapper .bx-viewport ul li').animate({'opacity': 1}, 300);

        //init videos slider only for mobile
        if ($window.width() <= 768) {

            // הפיכת סקציה עם סרטוני וידאו לסליידר ברזולוציה נמוכה יותר מ-768

            var videoSliderLength = $('.video-list ul li').length - 1;
            $('.video-list ul').bxSlider({
                    autoStart: false,
                    auto: false,
                    pager: false,
                    infiniteLoop: false,
                    autoControls: false,
                    nextText: '',
                    prevText: '',
                    startText: '',
                    stopText: '',
                    slideWidth: 204,
                    maxSlides: 2,
                    slideMargin: 25,
                    startSlide: videoSliderLength,
                    oneToOneTouch: false
                }
            );
        }
        ;
    });

    $(window).resize(function () {

        //wrapping instruments-list for horizontal scroll only for mobile
        instrumentsHorizontalScroll();


        if (($window.width() <= 1024)) {
            $('.login-link').before($('.full-width-header .main-nav.additional ul.extra-menu'));
        }

        if (($window.width() > 1025)) {
            $('.full-width-header .main-nav ul.extra-menu').appendTo($('.full-width-header .main-nav.additional'));
        }

        //init news-line slider (bottom of main slider), only for mobile
        if ($window.width() <= 768 && !$('.news-line .bx-wrapper').length) {
            newsLineSlider();
            $('.news-line').css('direction', 'ltr');
        } else {
            $('.news-line').css('direction', 'rtl');
        }

        // equaling height of Instruments-List items
        boxHeightInstrumentsList();

        // transference menu elements for mobile version and back to desktop version of site
        mobileHeader();

        // equaling mobile menu height
        mobileMenuHeight();

        //equaling height of blocks
        fixSizes();

        // equaling height services-list items
        boxHeight('.services .services-list .services-item');

        // equaling height services-list items
        if ($window.width() >= 1023) {
            boxHeight('body .video-list ul .list-item');
        } else {
            boxHeightServives('.services .services-list .services-item');
        }
        ;


    });


    //functions start

    function initCarouselSlider() {

        // הפעלה והגדרה של קרוסלה

        var postSlider = $('.carousel-container').waterwheelCarousel();

        var startSlideInfo = $('.description-content:first').clone();
        $('.display-content').append(startSlideInfo);
        $('.current-slide').delay(4700).animate({'opacity': 0}, 300);

        $('.blog-posts-slider .controls .next').click(function (event) {
            postSlider.next();
        });

        $('.blog-posts-slider .controls .prev').click(function (event) {
            postSlider.prev();
        });

        $window.scroll(function () {

            // תנועה של שקופית אחת ועצירה בקרוסלה

            if ($window.scrollTop() > ($('.blog-posts-slider').offset().top - $window.height() / 1.3) && $('.blog-posts-slider').hasClass('activated') == false) {
                $('.blog-posts-slider').addClass('activated');

                // הגדרת האטה של שניה לקיבעת מיקום קרוסלה בטעינת עמוד
                setTimeout(function () {
                    postSlider.next();
                }, 1000);
            };

        });

        // הגדרות עבור רזולוציות גבוהות

        var optionsLarge = {
            autoPlay: 0,
            activeClassName: 'current-slide',
            separation: 200,
            separationMultiplier: 0.5,
            flankingItems: 2,
            forcedImageWidth: 357,
            forcedImageHeight: 349,
            movingToCenter: function (el, direction) {
                $('.image-bg').css({'opacity': 0, 'display': 'block'});
                var slideInfo;
                var curent = el.closest('.carousel-item');
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var index = caruselItems.index(curent);

                if (direction == 'forward') {
                    slideInfo = caruselItems.eq((index + 1) % caruselItems.length).find('.description-content').clone();
                } else if ('backward') {
                    slideInfo = caruselItems.eq((index - 1) % caruselItems.length).find('.description-content').clone();
                }
                ;

                caruselItems.eq((index - 1) % caruselItems.length).find('img').css('opacity', 0);

                slideInfo.css('opacity', 0);
                $('.display-content').append(slideInfo);
                $('.display-content > .description-content').delay(220).animate({'opacity': 1}, 250);
            },

            movedToCenter: function (el) {
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var curent = el.closest('.carousel-item');
                // var slideInfo = curent.find('.description-content').clone();
                var index = caruselItems.index(curent);
                var bgPosition = {
                    width: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('width'),
                    height: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('height'),
                    left: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('left'),
                    top: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('top'),
                    zIndex: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('zIndex')
                };

                caruselItems.eq((index + 2) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index - 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 3) % caruselItems.length).fadeOut(0);
                curent.css('display', 'block').find('img').animate({'opacity': 1}, 200);


                $('.image-bg').css({
                    'width': bgPosition.width,
                    'height': bgPosition.height,
                    'zIndex': bgPosition.zIndex,
                    'left': bgPosition.left,
                    'top': bgPosition.top
                }).animate({'opacity': 1}, 100);
            },

            movingFromCenter: function (el) {
                $('.display-content > .description-content').css({'position': 'absolute'}).stop().animate({'opacity': 0}, 150, function () {
                    $('.display-content > .description-content').eq(0).remove();

                });
            }
        };

        // הגדרות עבור רזולוציות ביניים

        var optionsMiddle = {
            autoPlay: 0,
            activeClassName: 'current-slide',
            separation: 140,
            separationMultiplier: 0.5,
            flankingItems: 2,
            forcedImageWidth: 300,
            forcedImageHeight: 287,
            movingToCenter: function (el, direction) {
                $('.image-bg').css({'opacity': 0, 'display': 'block'});
                var slideInfo;
                var curent = el.closest('.carousel-item');
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var index = caruselItems.index(curent);

                if (direction == 'forward') {
                    slideInfo = caruselItems.eq((index + 1) % caruselItems.length).find('.description-content').clone();
                } else if ('backward') {
                    slideInfo = caruselItems.eq((index - 1) % caruselItems.length).find('.description-content').clone();
                }
                ;

                caruselItems.eq((index - 1) % caruselItems.length).find('img').css('opacity', 0);

                slideInfo.css('opacity', 0);
                $('.display-content').append(slideInfo);
                $('.display-content > .description-content').delay(220).animate({'opacity': 1}, 250);
            },

            movedToCenter: function (el) {
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var curent = el.closest('.carousel-item');
                var index = caruselItems.index(curent);
                var bgPosition = {
                    width: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('width'),
                    height: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('height'),
                    left: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('left'),
                    top: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('top'),
                    zIndex: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('zIndex')
                };

                caruselItems.eq((index + 2) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index - 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 3) % caruselItems.length).fadeOut(0);
                curent.css('display', 'block').find('img').animate({'opacity': 1}, 200);


                $('.image-bg').css({
                    'width': bgPosition.width,
                    'height': bgPosition.height,
                    'zIndex': bgPosition.zIndex,
                    'left': bgPosition.left,
                    'top': bgPosition.top
                }).animate({'opacity': 1}, 100);
            },

            movingFromCenter: function (el) {
                $('.display-content > .description-content').css({'position': 'absolute'}).stop().animate({'opacity': 0}, 150, function () {
                    $('.display-content > .description-content').eq(0).remove();

                });
            }
        };

        // הגדרות לרזולוציות נמוכות

        var optionsSmall = {
            autoPlay: 0,
            activeClassName: 'current-slide',
            separation: 200,
            separationMultiplier: 1,
            flankingItems: 2,
            forcedImageWidth: 214,
            forcedImageHeight: 206,
            movingToCenter: function (el, direction) {
                $('.image-bg').css('display', 'none');
                var slideInfo;
                var curent = el.closest('.carousel-item');
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var index = caruselItems.index(curent);


                if (direction == 'forward') {
                    slideInfo = caruselItems.eq((index + 1) % caruselItems.length).find('.description-content').clone();
                } else if ('backward') {
                    slideInfo = caruselItems.eq((index - 1) % caruselItems.length).find('.description-content').clone();
                }
                ;

                caruselItems.eq((index - 1) % caruselItems.length).find('img').css('opacity', 0);

                slideInfo.css('opacity', 0);
                $('.display-content').append(slideInfo);
                $('.display-content > .description-content').delay(220).animate({'opacity': 1}, 250);
            },

            movedToCenter: function (el) {
                var caruselItems = el.closest('.carousel-container').find('.carousel-item');
                var curent = el.closest('.carousel-item');
                var index = caruselItems.index(curent);
                var bgPosition = {
                    width: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('width'),
                    height: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('height'),
                    left: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('left'),
                    top: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('top'),
                    zIndex: caruselItems.eq((index + 1) % caruselItems.length).find('img').css('zIndex')
                };

                caruselItems.eq((index + 2) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index - 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 1) % caruselItems.length).fadeIn(0);
                caruselItems.eq((index + 3) % caruselItems.length).fadeOut(0);
                curent.css('display', 'block').find('img').animate({'opacity': 1}, 200);


                $('.image-bg').css({
                    'width': bgPosition.width,
                    'height': bgPosition.height,
                    'zIndex': bgPosition.zIndex,
                    'left': bgPosition.left,
                    'top': bgPosition.top
                }).animate({'opacity': 1}, 100);
            },

            movingFromCenter: function (el) {
                $('.display-content > .description-content').css({'position': 'absolute'}).stop().animate({'opacity': 0}, 150, function () {
                    $('.display-content > .description-content').eq(0).remove();

                });
            }
        };

        if ($(window).width() <= 1279 && $(window).width() >= 998) {
            postSlider.reload(optionsMiddle);
        } else if ($(window).width() >= 1280) {
            postSlider.reload(optionsLarge);
        } else if ($window.width() < 768) {
            postSlider.reload(optionsSmall);
        }
        ;

        var lastWSize = $(window).width();
        $(window).resize(function () {
            var ww = $(window).width();
            if ((1280 - ww > 0) != (1280 - lastWSize > 0) || (1363 - ww > 0) != (1363 - lastWSize > 0) || (1437 - ww > 0) != (1437 - lastWSize > 0) || (1532 - ww > 0) != (1532 - lastWSize > 0) || (1595 - ww > 0) != (1595 - lastWSize > 0) || (1795 - ww > 0) != (1795 - lastWSize > 0) || (1900 - ww > 0) != (1900 - lastWSize > 0)) {
                setTimeout(function () {
                    postSlider.reload(optionsLarge);
                }, 1000);
            }
            ;

            if ((1024 - ww > 0) != (1024 - lastWSize > 0)) {
                postSlider.reload(optionsMiddle);
            }
            ;

            if ((768 - ww > 0) != (768 - lastWSize > 0)) {
                postSlider.reload(optionsSmall);
            }
            ;
            lastWSize = ww;
        })


    };

    //open-close search start
    function search(button) {

        // פתיחה וסגירה של חיפוש בדסקטופ ומובייל

        var input = $(button).siblings('input');
        var target;
        $(document).on('click', button, function (event) {
            $('.header-menu-holder').toggleClass('search-active');
            $('body').toggleClass('search-active');
        });

        $(document).click(function (event) {

            // בדיקה של פוקוס. האם בתוך השדה או לא

            if (input.is(':focus')) {
                input.closest('.search-active').addClass('focused');
            } else {
                input.closest('.search-active').removeClass('focused');
            }
            ;
        });
    };

    //open-close search end


    function stickyHeader() {
        // הדבקת תפריט ראשי לחלק עליון
        if (!$('body').hasClass('full-width-header')) {
            var header = $('.main-header-content').clone();

            //הוספת id לשכפול תפריט מודבק

            header.find('form input').attr('id', 'search-sticky');
            header.find('form label').attr('for', 'search-sticky');
            $('.header-sticky').append(header);
        }
        ;

        var curPos = 0;
        $(window).scroll(function () {
            if ($(window).scrollTop() > $('.main-header').innerHeight()) {
                $('.header-sticky').addClass('visible');
            } else {
                $('.header-sticky').removeClass('visible');
            }
            if ($(window).scrollTop() == curPos) {
                return false;
            }
            if ($(window).scrollTop() < curPos) {
                $('.main-nav').addClass('opened');
            } else {
                $('.main-nav').removeClass('opened');
            }
            curPos = $(window).scrollTop();
        });

        if ($('body').hasClass('full-width-header')) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 50) {
                    $('.main-header').addClass('hidden');
                } else {
                    $('.main-header').removeClass('hidden');
                }
            });
        }
        ;
    }

    function helperMenu() {

        // פונקציה עבור פיבי (פתיחה, סגירה, מיקום, התנהגות בזמן הגלילה וכו)

        $('.helper-menu .close-btn').click(function (event) {
            var _self = this;
            var pos = $(_self).closest('.helper-menu').offset();
            $(this).closest('.helper-menu').find('.content').animate({'opacity': 0}, 500, function () {
                $(this).closest('.helper-menu').removeClass('active');
                $(this).closest('.content').slideUp(100);
                if ($window.width() >= 1024) {
                    setTimeout(function () {
                        pos = $(_self).closest('.helper-menu').offset();
                        $(_self).closest('.helper-menu').parent().css({'position': 'static'});
                        $(_self).closest('.helper-menu').css({
                            'left': pos.left + 'px',
                            'bottom': ($(window).height() - pos.top) + 'px'
                        });
                    }, 300);
                    setTimeout(function () {
                        $(_self).closest('.helper-menu').addClass('transition-all');
                        $(_self).closest('.helper-menu').css({
                            'left': ($(window).width() * 0.02) + 'px',
                            'bottom': (100 - $window.scrollTop()) + 'px'
                        });
                    }, 330);
                    setTimeout(function () {
                        $(_self).closest('.helper-menu').addClass('fixed');
                    }, 640);
                    $('body').removeClass('no-scroll');
                }
            });
        });

        // if( $window.height() > 835 && $window.width() > 1023 ) {
        //     setTimeout(function () {
        //         $('.helper-menu ul li a').equalizeHeight({
        //             equaltop: false
        //         });
        //     }, 0);
        // } else if ( $window.width() < 1023 ) {
        //     setTimeout(function () {
        //         $('.helper-menu ul li a').equalizeHeight({
        //             equaltop: false
        //         });
        //     }, 0);
        // }

        setTimeout(function () {
            $('.helper-menu ul li a').equalizeHeight({
                equaltop: false
            });
        }, 0);

        $('.helper-menu .help-title').click(function (event) {
            var _self = this;

            if ($window.width() > 1023 && $window.height() <= 835 && $(this).closest('.helper-menu').hasClass('closed-on-start')) {
                $(this).closest('.helper-menu').addClass('active');
                $(this).closest('.helper-menu').find('.content').slideDown(200, function () {
                    $(this).closest('.helper-menu').find('.content').animate({'opacity': 1}, 700, function () {
                        $(this).closest('.helper-menu').removeClass('closed-on-start');
                    });
                });

                setTimeout(function () {
                    $('.helper-menu ul li a').equalizeHeight({
                        equaltop: false
                    });
                }, 0);

            } else if ($(this).closest('.helper-menu').hasClass('active')) {
                $(this).closest('.helper-menu').find('.content').animate({'opacity': 0}, 500, function () {
                    if ($window.width() >= 1024) {
                        setTimeout(function () {
                            pos = $(_self).closest('.helper-menu').offset();
                            $(_self).closest('.helper-menu').parent().css({'position': 'static'});
                            $(_self).closest('.helper-menu').css({
                                'left': pos.left + 'px',
                                'bottom': ($(window).height() - pos.top) + 'px'
                            });
                        }, 300);
                        setTimeout(function () {
                            $(_self).closest('.helper-menu').addClass('transition-all');
                            $(_self).closest('.helper-menu').css({
                                'left': ($(window).width() * 0.02) + 'px',
                                'bottom': (100 - $window.scrollTop()) + 'px'
                            });
                        }, 330);
                        setTimeout(function () {
                            $(_self).closest('.helper-menu').addClass('fixed');
                        }, 640);
                        $(this).closest('.helper-menu').removeClass('active');
                    } else {
                        $(this).closest('.helper-menu').removeClass('active');
                    }
                    ;

                    $(this).closest('.helper-menu').find('.content').slideUp(200);
                    $(this).css('box-shadow', 'none');
                });
            } else {
                $(this).closest('.helper-menu').addClass('active');
                $(this).closest('.helper-menu').find('.content').slideDown(200, function () {
                    $(this).closest('.helper-menu').find('.content').animate({'opacity': 1}, 700);
                });
            }
        });

        var helperClone = $('.helper-menu').clone().addClass('cloned').removeClass('active');
        $('body').append(helperClone);

        function closeCloneMenu() {
            $('body').removeClass('no-scroll');
            if ($(window).width() <= 1023) {
                // var top = -$('body').position().top;
                // $('body').css('top', '-'+$(window).scrollTop()+'px');
                // $(window).scrollTop(top);
            }
            helperClone.find('.content').slideUp(100);
            helperClone.removeClass('active');
        }

        if ($(window).width() <= 1023 || true) {
            $(document).on('click', '.helper-menu.cloned.active', function (e) {
                if (helperClone.index(e.target) != -1) {
                    closeCloneMenu();
                }
            });

            $('.helper-menu.cloned .help-title').click(function (event) {
                if ($(this).closest('.helper-menu').hasClass('active')) {
                    closeCloneMenu();
                } else {
                    $(this).closest('.helper-menu').addClass('active');
                    $(this).siblings('.content').slideDown(100);
                    if ($(window).width() <= 1023) {
                        // var top = $('body').position().top;
                        // $('body').css('top', '-'+$(window).scrollTop()+'px').addClass('no-scroll');
                        // $(window).scrollTop(top);

                        $('body').addClass('no-scroll');
                    }
                }
            });
            $('.helper-menu.cloned .close-btn').click(function (event) {
                closeCloneMenu();
            });
        }
        ;


        $window.scroll(function () {
            var posForAppend = $('.main-banner .helper-menu').offset().top + $('.main-banner .helper-menu').innerHeight();
            if ($window.scrollTop() > posForAppend && !$('.helper-menu.fixed').length) {
                $('.helper-menu.cloned').addClass('opened');
            } else {
                $('.helper-menu.cloned').removeClass('opened');
            }
        });

        if ($window.width() > 1023 && $window.height() <= 835) {
            $(document).ready(function (e) {
                // $('.helper-menu').css('opacity', 0);
                $('.helper-menu .help-title').trigger('click');
                setTimeout(function () {
                    $('.helper-menu').animate({'opacity': 1}, 300);
                }, 1100);
            });
            // $('.main-banner .helper-menu').addClass('closed-on-start').removeClass('active');
        }
        ;
    };

    function scrollToBlock(elem, speed, easing) {

        // גלילה עדינה עבור אלמנט שנבחר (elem)

        $(elem).click(function (event) {
            event.preventDefault();
            var scrollPoint = $($(this).attr('href')).offset().top - $('.header-sticky .header-menu-holder').innerHeight();
            $('body, html').animate({scrollTop: scrollPoint}, speed, easing);
        });
    };

    function fixSizes() {

        // פונקציות עבור יישור גבהים באלמנטים שונים שנמצאים בקושה אחת

        $('.related .related-list .related-item .img-holder').equalizeHeight({
            equaltop: true
        });

        customEqualTop('.news-line ul li');

        if ($window.width() <= 1023 && $('.news-line').length) {

            // יישור של חדשות בתחתית הסליידר
            // (רק עבור מובייל כאשר סקציה זו הופכת לסליידר)

            var equal;
            $('.news-line ul li a').each(function () {
                equal = $(this).closest('li').innerHeight();
                $(this).siblings('.to-equal').innerHeight(equal);
            });
        }
        ;
    };


    $.fn.equalizeHeight = function (options) {

        // פונקציה מתקדמת ליישור גבהים של אלמנטים שונים לפי סלקטור

        var settings = $.extend({
            'maxWindowWidth': false,
            'equaltop': false
        }, options);
        this.css({'height': 'inherit'});
        if (!settings.maxWindowWidth || settings.maxWindowWidth < $(window).width()) {
            var maxHeight = 0;
            var currentTop = false;
            var tempArray = [];
            if (!settings.equaltop) {
                this.each(function (index, el) {
                    maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
                });
                this.css({'height': maxHeight + 'px'});
            }
            else {
                this.each(function (index, el) {
                    if (currentTop === false || Math.abs(currentTop - $(el).position().top) > 5) {
                        $(tempArray).css({'height': maxHeight + 'px'});
                        maxHeight = 0;
                        currentTop = Math.floor($(el).position().top);
                        tempArray = [];
                    }
                    maxHeight = Math.max(maxHeight, $(el).css('box-sizing') == 'border-box' ? $(el).innerHeight() : $(el).height());
                    tempArray.push(el);
                });
                $(tempArray).css({'height': maxHeight + 'px'});
            }
        }
    };

    function boxHeight(elem) {

        // קביעת גובה האלמנט שיהיה קטן יותר ב-30 פיקסל מרוחב האלמנט

        $(elem).innerHeight($(elem).innerWidth() - 30);
    };

    function boxHeightInstrumentsList() {

        // טיפול בגובה האלמנט שמכיל אייקון כדי שיהיה שווה לגובה לצורך מרכוז האייקון (בבלוק ".instruments-list")

        $('.icon-holder').innerHeight($('.icon-holder').innerWidth());
    };

    function boxHeightServives(elem) {

        // קביעת גובה ששווה לרוחב כדי שלאמנט יהפוך לקוביה

        $(elem).innerHeight($(elem).innerWidth() + 2);
    };


    function sliderBgImage() {

        //הגדרת תמונות בסליידר ראשי כרקע בשקופית ויישור
        // וגם שמירה על פרופורציה בגדלים שונים של המסך

        $('.main-slider .bx-viewport li').each(function () {
            if ($('img', this).length) {
                var img = $(this).find('img');
                img.css('display', 'none');
                $(this).css({
                    'background-image': 'url(' + (img.prop('currentSrc') ? img.prop('currentSrc') : img.prop('src')) + ')',
                    'background-position': 'center',
                    'background-size': 'cover',
                    'background-repeat': 'no-repeat'
                });
            }
            ;
        });
    };

    function mobileHeader() {

        // יצירת תפריט עבור מובייל (שינוי פריטי התפריט בהתאם לעיצוב וגודל המסך)

        var menus, mainNav, strongText;
        if ($window.width() <= 1023) {
            $('.main-header').addClass('header-mobile');
            if (!$('.mobile-drop').length) {
                $('.main-header .header-menu-holder').after('<div class="mobile-drop" />');
                menus = $('.main-header .search + ul').detach().addClass('top-drop');
                menus.addClass('top-drop');
                $('.mobile-drop').append(menus);
                mainNav = $('.main-header .main-nav').detach();
                $('.mobile-drop').append(mainNav);
                $('.main-header .header-menu-holder .search').after($('.header-top .lang-switcher'));
                $('.top-drop a strong').each(function () {
                    $(this).closest('span').css('display', 'none').siblings('strong.mobile').text($(this).text());
                });
            }
        } else {
            $('.main-header').removeClass('header-mobile');
            $('body').removeClass('mob-menu-active');
            if ($('.mobile-drop').length) {
                $('.top-drop a strong').each(function () {
                    $(this).closest('span').css('display', 'inline').siblings('strong.mobile').text($(this).text());
                });
                menus = $('.main-header .mobile-drop .top-drop').detach().removeClass('top-drop');
                mainNav = $('.main-header .mobile-drop .main-nav').detach();
                $('.main-header .header-menu-holder').append(menus);
                $('.main-header .main-header-content').append(mainNav);
                $('.header-top').prepend($('.header-menu-holder .lang-switcher'));
                $('.mobile-drop').remove();
            }
        }
        ;
    };

    function mobileMenu() {

        // פתיחת תפריט מובייל בלחיצה על אייקון

        $('.mob-menu-opener').click(function (event) {
            $('.header-mobile').toggleClass('opened');
            var top = -$('body').position().top;
            $('body').css('top', '-' + $(window).scrollTop() + 'px').toggleClass('mob-menu-active');
            $(window).scrollTop(top);
            return false;
        });

        $window.scroll(function () {
            if ($window.scrollTop() > 150) {
                $('.header-mobile .header-top.first_platinum_page').css('display', 'none');
            } else {
                $('.header-mobile .header-top.first_platinum_page').css('display', 'block');
            }
        });
    };


    function mobileMenuHeight() {

        // קביעת גובה של תפריט נפתח במובייל

        $('.mobile-drop').innerHeight($window.height() - ($('.mobile-main-header-content .header-menu-holder').innerHeight() + $('.header-mobile .header-top').innerHeight()) + 50);
    }

    function mobSubmenus() {

        // פתיחה וסגירה של תת תפריט במידה וקיים

        $('.main-nav > ul > li').each(function () {
            if ($('.sub-item', this).length && $window.width() <= 1023) {
                $(this).addClass('has-submenu');
            }
            ;
        });

        $('.main-nav .has-submenu > a').click(function (event) {
            if ($window.width() <= 1023) {
                event.preventDefault();
                $(this).closest('li').toggleClass('opened-sub');
                $(this).siblings('.sub-item').slideToggle();
            }
        });
    };

    function footerMobSubmenus() {

        // פתיחה וסגירה של תפריטים בפוטר במובייל

        $('.menu-item > h3').click(function (event) {
            if ($window.width() <= 1023) {
                event.preventDefault();
                $(this).toggleClass('sub-opened').siblings('ul').slideToggle().toggleClass('opened-sub');
            }
        });
    };


    function animatedMenuBorder() {

        // אנימציה של קו מעל לכפתורים של סוג עמוד: פרטי, עסקי או פלטינה

        var timer;
        var leftPos, currentWidth;
        var startPos = $('.active-item').position().left + parseFloat($('.active-item').css('margin-left'));
        var startWidth = $('.active-item').innerWidth();

        $('.menu-top-border').css({'left': startPos, 'width': startWidth});
        setTimeout(function () {

            // הגדרת פרמטרים ראשוניים עבור הפס, מיקום ורוחב

            startPos = $('.active-item').position().left + parseFloat($('.active-item').css('margin-left'));
            startWidth = $('.active-item').innerWidth();

            $('.menu-top-border').css({'left': startPos, 'width': startWidth});
        }, 10);

        $('.header-top .nav-sections li').mouseenter(function () {

            // שינוי מיקום של הפס מעל לכפתור בהתאם למיקום סמן העכבר

            leftPos = $(this).position().left + parseFloat($(this).css('margin-left'));
            currentWidth = $(this).innerWidth();
            setTimeout(function () {

                $('.menu-top-border').stop().animate({'left': leftPos, 'width': currentWidth}, 220);
            }, 10);

            clearTimeout(timer);
        });

        $('.header-top .nav-sections li').mouseleave(function () {

            returnPosition();

        });

        $window.resize(function () {
            returnPosition();
        });

        $(window).load(function () {
            returnPosition();
        });

        function returnPosition() {

            // החזרה של הפס למיקום מעל לכתפור אקטיבי
            startPos = $('.active-item').position().left + parseFloat($('.active-item').css('margin-left'));
            startWidth = $('.active-item').innerWidth();
            timer = setTimeout(function () {
                $('.menu-top-border').animate({'left': startPos, 'width': startWidth}, 250);
            }, 50);
        };
    };

    function newsLineSlider() {

        // הפיכת סקציה של חדשות בתחתית ההירו לסליידר

        $('.news-line').css('direction', 'ltr');
        var newsSlider = $('.news-line ul').bxSlider({
            controls: true,
            nextText: '',
            prevText: '',
            pager: false,
            responsive: true,
            autoStart: false,
            onSliderResize: function () {
                if ($window.width() >= 1024) {
                    this.destroySlider();
                    $('.news-line').css('direction', 'rtl');
                }
            },
        });

        $(window).scroll(function () {

            // תנועה של ידיעה אחת ועצירה בסליידר חדשות במובייל

            if ($('.news-line').length && $(window).scrollTop() > ($('.news-line').offset().top - $window.height() / 1.8) && !$('.news-line').hasClass('demonstrated')) {
                newsSlider.goToNextSlide();
                $('.news-line').addClass('demonstrated');
            }
            ;
        });
    };

    function customEqualTop(elementsToEqual) {

        // פונקציה פשוטה של יישור גבהים של אלמנטים  הנמצאים באותה שורה לפי סלקטור

        var collectionElementsToEqual = $(elementsToEqual);
        var arrLength = collectionElementsToEqual.length;

        for (var i = 0; i < arrLength - 1; i++) {
            for (var j = 1; j < arrLength; j++) {
                if (collectionElementsToEqual[i].offsetTop == collectionElementsToEqual[j].offsetTop) {
                    if ($(collectionElementsToEqual[i]).innerHeight() < $(collectionElementsToEqual[j]).innerHeight()) {
                        $(collectionElementsToEqual[i]).css('height', $(collectionElementsToEqual[j]).innerHeight());
                    } else {
                        $(collectionElementsToEqual[j]).css('height', $(collectionElementsToEqual[i]).innerHeight());
                    }
                }
            }
        }
    };

    function instrumentsHorizontalScroll() {

        // קביעת גלילה אופקית עבור בלוק ".instruments" (לרזולוציה מתחת ל-768)

        var widthSumm = 0;
        if (!$('.instruments .wrapper').length && $window.width() <= 768) {
            $('.instruments .instruments-list').wrap("<div class='wrapper'></div>");
            $('.instruments .wrapper').before("<div class='border-line'></div>").after("<div class='border-line'></div>");
        }
        ;

        if ($window.width() <= 768) {
            // חישוב רוחב של רשימה (חיבור רחבים של כל הפריטים ברשימה)
            $('.instruments .instruments-list li').each(function () {
                widthSumm += $(this).innerWidth();
            });
            $('.instruments .instruments-list').innerWidth(widthSumm);
        }
        ;
    };

    function servicesListLinksDelay() {

        // השהיה של 2 שניות בבלוק .services-item והעברה לקישור לאחר השהיה זו
        // (בגרסת מובייל בלבד)

        var link;
        if ($window.width() < 1023) {
            $('.services-item a').click(function (event) {
                link = $(this).attr('href');
                event.preventDefault();
                setTimeout(function () {
                    $(location).attr('href', link);
                }, 2000);
            });
        }
    }


    // Login form validation (pass)
    function passValidate() {
        var passMessage = $('.pass-requirement');
        if ( /^[aA-zZ0-9-]+$/.test( $('.password.form-input').val() ) || $('.password.form-input').val() == 0 ) {
            passMessage.css('display', 'none');
            $('.form-input.password').css('border-bottom-color', '#7c8fbd');
            console.log('true');
            return true;
        } else {
            passMessage.css('display', 'block');
            console.log('false');
            $('.form-input.password').css('border-bottom-color', '#ff4c4c');
            return false;
        }

        if( $('.password.form-input').val().length > 7) {
            return false;
        }
    }


    // Login form validation (username)
    function loginValidate() {
        var loginMessage = $('.login-requirement');
        if ( /^[aA-zZ0-9-]+$/.test( $('.username.form-input').val() ) || $('.username.form-input').val() == 0 ) {
            loginMessage.css('display', 'none');
            $('.form-input.username').css('border-bottom-color', '#7c8fbd');
            console.log('true');
            return true;
        } else {
            loginMessage.css('display', 'block');
            console.log('false');
            $('.form-input.username').css('border-bottom-color', '#ff4c4c');
            return false;
        }
    }


    //functions start
})(jQuery);