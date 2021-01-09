$(function(){
    // $('.sign-in_button').on('click', function(e){
    //     e.preventDefault();
    //     $('.window-popup-container.sign-container').addClass('active');
    // });

    $('.btn-login').on('click', function(e){
        e.preventDefault();
        $('.sign-container .sign-head a').removeClass('active');
        $('.sign-container .sign-head a[data-sign="in"]').addClass('active');
        $('.sign-container').addClass('active');
        $('.body-block').removeClass('active');
        $('.body-block[data-sign="in"]').addClass('active');
        // $('.window-popup-container.sign-container').addClass('active');

    });

    $('.doc_list li').on('click', function(){
       $(this).siblings('li').removeClass('active');
       $(this).addClass('active');
       let name = $(this).data('name');
        $('.doc_inner .doc_item').removeClass('active');
       $('.doc_inner .doc_item[data-name='+name+']').addClass('active');
    });

    $('.btn-register').on('click', function(e){
        e.preventDefault();
        $('.sign-container .sign-head a').removeClass('active');
        $('.sign-container .sign-head a[data-sign="up"]').addClass('active');
        $('.sign-container').addClass('active');
        $('.body-block').removeClass('active');
        $('.body-block[data-sign="up"]').addClass('active');
        // $('.window-popup-container.sign-container').addClass('active');

    });
    $('.bot a.forgot').on('click', function(e){
        e.preventDefault();
        $('.window-popup-container').removeClass('active');
        $('.window-popup-container.forgot-container').addClass('active');
    });
    $('.form-input-not').on('change', function(e){
        if(e.target.value.length > 0){
            $(this).next('label').addClass('active');
        } else{
            $(this).next('label').removeClass('active');
        }
    });


    $('i.close').on('click', function(e){
        e.preventDefault();
        $('.window-popup-container').removeClass('active');
    });

    $(document).on('keydown', function(e) {
        if (e.keyCode == 27)
            $('.window-popup-container').removeClass('active');
    });

    var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var mail = $('#email');

    var passwordField = $('#Password2');
    passwordField.blur(function(){
        if(passwordField.val().length >= 6){
            $('.register-btn').attr('disabled', false);
            $(this).siblings('span.valid').text('');

        } else{
            $('.register-btn').attr('disabled', true);
            $(this).siblings('span.valid').text($(this).data('length'));

        }
    });

    function checkEmail(field){
        field.blur(function(){
            if(field.val() != ''){
                if(field.val().search(pattern) == 0){
                    $(this).siblings('span.valid').text('');
                    $(this).closest('form').find('button').attr('disabled', false);
                    field.removeClass('error').addClass('ok');
                }else{
                    $(this).siblings('span.valid').text($(this).data('format'));
                    $(this).closest('form').find('button').attr('disabled', true);
                    field.addClass('ok');
                }
            }else{
                $(this).siblings('span.valid').text($(this).data('empty'));
                field.addClass('error');
                $(this).closest('form').find('button').attr('disabled', true);
            }
        });
    }

    checkEmail($('#email'));
    checkEmail($('#email2'));


    $('.sign-head a').on('click', function(e){
        e.preventDefault();
        $(this).closest('ul').find('a').removeClass('active');
        $(this).addClass('active');
        var act = $(this).data('sign');
        $('.body-block').removeClass('active');
        $('.body-block[data-sign="'+ act +'"]').addClass('active');
    });

    $(document).on("click","nav ul a", function (event) {
        event.preventDefault();

        var id  = $(this).attr('href'),

            top = $(id).offset().top;

        $('body,html').animate({scrollTop: top}, 1500);
    });


    $(document).on('submit', '#resetPasswordForm', function(e) {
        e.preventDefault();
        var form_data = $('#resetPasswordForm').serializeArray();
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: '/ru/reset-password/',
            type: 'POST',
            data: {
                token: token,
                form_data: form_data,
            },
            success: function(res) {
                console.log(res);
                if (res.success) {
                    $('.window-popup-container.thank-popup-container .h4').css('display', 'none');
                    // show success msg  => res.message
                    $('.window-popup-container.thank-popup-container .h4.suc').css('display', 'block');
                    $('.window-popup-container.thank-popup-container').addClass('active');
                    res.message.map(function(el, i){
                        $('.window-popup-container.thank-popup-container .sign-body.res_message').append('<p>'+el+'</p>');
                    })
                } else {


                    $('.window-popup-container.reset_container form .errors').html('');

                    // show error msg => res.message
                    res.message.map(function(el, i){
                        $('.window-popup-container.reset_container form .errors').append('<p>'+el+'</p>');

                    })
                    $('.loader_wrap').removeClass('active');
                }
            }
        });
    });

    $(document).on('submit', '#sendemailform', function(e) {
        e.preventDefault();
        var form_data = $('#sendemailform').serializeArray();
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: '/ru/reset-password/email',
            type: 'POST',
            data: {
                email: form_data,
            },
            success: function(res) {
                console.log(res);
                // $('.window-popup-container').removeClass('active');
                // $('.window-popup-container.thank-popup-container').addClass('active');
                // $('.window-popup-container.thank-popup-container .h4').css('display', 'none');
                $('.window-popup-container').removeClass('active');
                $('.window-popup-container.checkEmail-container').addClass('active');
                $('.window-popup-container.checkEmail-container .sign-body p').text(res.message);

                if (res.success) {
                    $('.window-popup-container.checkEmail-container .sign-body p').text(res.message);
                    // show success msg  => res.message
                    // $('.window-popup-container.thank-popup-container .h4.suc').css('display', 'block');
                    // res.message.map(function(el, i){
                    //     $('.window-popup-container.thank-popup-container .sign-body.res_message').append('<p>'+el+'</p>');
                    // })
                } else {

                    // show error msg => res.message
                    // $('.window-popup-container.thank-popup-container .h4.rej').css('display', 'block');
                    // res.message.map(function(el, i){
                    //     $('.window-popup-container.thank-popup-container .sign-body.res_message').append('<p>'+el+'</p>');
                    // })

                }
            }
        });
    });

    $(document).on('submit', '#login', function(e) {
        e.preventDefault();
        $('.loader_wrap').addClass('active');
        var email = $('#email').val();
        var pass = $('#pass').val();

        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: '/ru/login/',
            type: 'POST',
            data: {
                email: email,
                pass: pass,
            },
            success: function(res) {
                $('.window-popup-container form .errors').html('');
                console.log(res);
                if (res.success) {
                    location.href = res.autologin;
                    $('.loader_wrap').removeClass('active');
                } else {
                    $('.loader_wrap').removeClass('active');
                    $('.window-popup-container .body-block.active form .errors').append('<p>'+res.message+'</p>')
                    // show error msg => res.message
                }
            }
        });
    });

    $(document).on('submit', '#registration', function(e) {
        e.preventDefault();
        $('.loader_wrap').addClass('active');
        var data = $('#registration').serializeArray();
        var inputCode = $('.iti__selected-dial-code').text();
        data[2].value = inputCode + data[2].value;
        var countryName = $('.iti__selected-flag').attr('title').split(':')[0].replace(/\([^()]*\)/g, '');
        $.ajax({
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: '/ru/reg/',
            type: 'POST',
            data: {
                data: data,
                country: countryName,
            },
            success: function(res) {
                $('.window-popup-container form .errors').html('');
                console.log(res);
                if (res.success) {
                    location.href = res.autologin;
                    // $('.loader_wrap').removeClass('active');
                } else {
                    $('.window-popup-container .body-block.active form .errors').append('<p>'+res.message+'</p>');
                    $('.loader_wrap').removeClass('active');
                    // show error msg => res.message
                }
            }
        });
    });


});