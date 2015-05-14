function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}

jQuery(document).ready(function($) {

    var shortUrl;

    // submit handler
    $('.shorten-form .form').submit(function(event) {
        event.preventDefault();

        var $longUrl = $('input[name="longurl"]');
        $longUrl.removeClass('is-error');
        $(this).find('.form--error-text').addClass('is-hidden');

        var $method = $('select[name="method"]');

        if($longUrl.val().length > 0 && isUrl($longUrl.val())) {
            var longUrl = $longUrl.val();
            var method = $method.val();

            $('.shorten-form--response').removeClass('is-hidden');
            $('.shorten-form--response--url').val('Creating link ...');
            $.ajax({
                url: 'result.php',
                type: 'POST',
                dataType: 'json',
                data: {long_url: longUrl, method: method}
            })
            .done(function(response) {
                if(method === 'bitly' && response.status_code == 200 && response.status_txt === 'OK') {
                    $longUrl.attr('placeholder', $longUrl.val()).val('');
                    $('.shorten-form--response--url').val(response.data.url).select().focus();
                    shortUrl = response.data.url;
                }
                else if(method === 'google' && typeof response.id !== undefined) {
                    $('.shorten-form--response--url').val(response.id).select().focus();
                    shortUrl = response.id;
                }
                else {
                    $('.shorten-form--response--url').val('Sorry, invalid URL!');
                }
            })
            .fail(function() {
                $('.shorten-form--response--url').val('Sorry, operation failed!');
            });

        }
        else {
            $longUrl.addClass('is-error');
            $(this).find('.form--error-text').removeClass('is-hidden');
        }
    });


    // select all text for URL
    $('.shorten-form--response--url').on('focus, mouseup', function(event) {
        $(this).select().focus();
    }).keyup(function(event) {
        event.preventDefault();
        $('.shorten-form--response--url').val(shortUrl);
    });

});
