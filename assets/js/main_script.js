/* ----------------------------------------------------------------------------------------
 * Author        : web_bean
 * Template Name : ANAS - Personal Portfolio Html5 Template
 * File          : ANAS main JS file
 * Version       : 1.0
 * ---------------------------------------------------------------------------------------- */





/* INDEX
----------------------------------------------------------------------------------------

01. Preloader js

02. change Menu background on scroll js 

03. Navigation js

04. Smooth scroll to anchor

05. Portfolio js

06. Magnific Popup js

07. Testimonial js

09. Ajax Contact Form js

11. Mailchimp js

-------------------------------------------------------------------------------------- */





(function($) {
    'use strict';


    /*-------------------------------------------------------------------------*
     *                  01. Preloader js                                       *
     *-------------------------------------------------------------------------*/
    $(window).on('load', function() {

        $('#preloader').delay(300).fadeOut('slow', function() {
            $(this).remove();
        });

    }); // $(window).on end



    $(document).ready(function() {



        /*-------------------------------------------------------------------------*
         *             02. change Menu background on scroll js                     *
         *-------------------------------------------------------------------------*/
        $(window).on('scroll', function() {
            var menu_area = $('.menu-area');
            if ($(window).scrollTop() > 200) {
                menu_area.addClass('sticky-menu');
            } else {
                menu_area.removeClass('sticky-menu');
            }
        }); // $(window).on('scroll' end




        /*-------------------------------------------------------------------------*
         *                   03. Navigation js                                     *
         *-------------------------------------------------------------------------*/
        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });

        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });



        /*-------------------------------------------------------------------------*
         *                   04. Smooth scroll to anchor                           *
         *-------------------------------------------------------------------------*/
        $('a.smooth_scroll').on("click", function(e) {
            e.preventDefault();
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
        });



        /*-------------------------------------------------------------------------*
         *                  05. Portfolio js                                       *
         *-------------------------------------------------------------------------*/
        var element = $(".typejs");

        $(function() {
            element.typed({
                strings: ["自媒体人", "创业者", "摄影师", "程序员", "设计师", "业余相声演员"],
                typeSpeed: 150,
                loop: true,
            });
        });


        /*-------------------------------------------------------------------------*
         *                  05. Portfolio js                                       *
         *-------------------------------------------------------------------------*/
        $('.portfolio').mixItUp();



        /*-------------------------------------------------------------------------*
         *                  06. Magnific Popup js                                  *
         *-------------------------------------------------------------------------*/
        $('.work-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function(element) {
                    return element.find('img');
                }
            }

        });

        $('.qr-popup').magnificPopup({
            type: 'image',
            image: {
                markup: '<div class="mfp-figure">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mfp-img qrpop"></div>' +
                    '<div class="mfp-bottom-bar">' +
                    '<div class="mfp-title"></div>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</div>',
                cursor: 'mfp-zoom-out-cur',
                verticalFit: true,
            },
            mainClass: 'qrpop',
            gallery: {
                enabled: false
            },
        });



        /*-------------------------------------------------------------------------*
         *                  07. Testimonial js                                     *
         *-------------------------------------------------------------------------*/
        $(".testimonial-list").owlCarousel({
            lazyLoad: false,
            pagination: false,
            navigation: false,
            items: 1,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsMobile: [479, 1],
            autoPlay: true
        });





        /*-------------------------------------------------------------------------*
         *                  10. Ajax Contact Form js                               *
         *-------------------------------------------------------------------------*/
        // Get the form.
        var form = $('#ajax-contact');

        // Get the messages div.
        var formMessages = $('#form-messages');

        // Set up an event listener for the contact form.
        $(form).on('submit', function(e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: formData
                })
                .done(function(response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $('#name').val('');
                    $('#email').val('');
                    $('#message').val('');

                })
                .fail(function(data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');

                    // Set the message text.
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('Oops! An error occured and your message could not be sent.');
                    }
                });

        });



        /*-------------------------------------------------------------------------*
         *                   12. MailChimp js                                    *
         *-------------------------------------------------------------------------*/
        $('#mc-form').ajaxChimp({
            language: 'en',
            callback: mailChimpResponse,

            // ADD YOUR MAILCHIMP URL BELOW HERE!
            url: 'http://web_bean.us14.list-manage.com/subscribe/post?u=e5d45c203261b0686dad32537&amp;id=d061f39c51'

        });

        function mailChimpResponse(resp) {
            if (resp.result === 'success') {
                $('.mailchimp-success').html('' + resp.msg).fadeIn(900);
                $('.mailchimp-error').fadeOut(400);

            } else if (resp.result === 'error') {
                $('.mailchimp-error').html('' + resp.msg).fadeIn(900);
            }
        }


        // Home Page Slider Settings
        $('#carousel-example-generic').carousel({
            interval: 6000,
            cycle: true
        });

        function sendNote() {
            var xmlhttp;
            if (window.XMLHttpRequest) {
                // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
                xmlhttp = new XMLHttpRequest();
            } else {
                // IE6, IE5 浏览器执行代码
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("form-messages").innerHTML = "发送成功！我会尽快回复";
                }
            }
            xmlhttp.open("GET", "https://dm.aliyuncs.com?AccessKeyId=testid&AccountName=notice@mailbot.xutianyi.xin&Action=SingleSendMail&AddressType=1&Format=JSON&HtmlBody=4&RegionId=cn-hangzhou&ReplyToAddress=true&SignatureMethod=HMAC-SHA1&SignatureNonce=c1b2c332-4cfb-4a0f-b8cc-ebe622aa0a5c&SignatureVersion=1.0&Subject=3&TagName=2&Timestamp=2016-10-20T06:27:56Z&ToAddress=tieni.xu@qq.com&Version=2015-11-23", true);
            xmlhttp.send();
        }


    }); // $(document).ready end

})(jQuery);