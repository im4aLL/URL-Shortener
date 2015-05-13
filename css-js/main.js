function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(s);
}

jQuery(document).ready(function($) {

    $('.shorten-form .form').submit(function(event) {
        event.preventDefault();

        var $longUrl = $('input[name="longurl"]');
        $longUrl.removeClass('is-error');
        $(this).find('.form--error-text').addClass('is-hidden');

        if($longUrl.val().length > 0 && isUrl($longUrl.val())) {
            var longUrl = $longUrl.val();

            $('.shorten-form--response').removeClass('is-hidden');
            $('.shorten-form--response--url').val('Creating link ...');
            $.ajax({
                url: 'result.php',
                type: 'POST',
                dataType: 'json',
                data: {long_url: longUrl}
            })
            .done(function(response) {
                if(response.status_code == 200 && response.status_txt === 'OK') {
                    $longUrl.attr('placeholder', $longUrl.val()).val('');
                    $('.shorten-form--response--url').val(response.data.url).select().focus();
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

});
