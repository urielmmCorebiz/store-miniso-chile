// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

function appendTerms() {
    var $htmlBtn = '<p class="acept-terms"><label class="checkbox acept-terms-label" for="opt-in-acept-terms"><input type="checkbox" id="opt-in-acept-terms"><span class="acept-terms-text">Acepto <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a>.</span></label></p><p class="acept-terms"><label class="checkbox acept-terms-label" for="opt-in-acept-privacy"><input type="checkbox" id="opt-in-acept-privacy"><span class="acept-terms-text">Acepto el <a href="/aviso-de-privacidad" target="_blank">Aviso de Privacidad</a>.</span></label></p>';

    if ($('#client-profile-data form .acept-terms #opt-in-acept-terms').length == 0) {
        $('#client-profile-data .accordion-group.client-profile-data .box-client-info').append($htmlBtn);

        $('#go-to-payment,#go-to-shipping').click(function (event) {
            if ($('#client-profile-data form .acept-terms #opt-in-acept-terms:checked').length == 0 || $('#client-profile-data form .acept-terms #opt-in-acept-privacy:checked').length == 0) {
                $('.acept-terms-text').addClass('required-alert');
                return false;
            } else {
                $('.acept-terms-text').removeClass('required-alert');
                return true;
            }
        });
    }
}

function hashController() {
    var url = window.location.href;

    appendTerms()
    termsCond()

    if (url.includes("/cart")) {
        $(".item-cart").addClass("active");
        $(".item-shipping").removeClass("active");
        $(".item-payment").removeClass("active");
    } else if (url.includes("/payment")) {
        $(".item-cart").removeClass("active");
        $(".item-shipping").removeClass("active");
        $(".item-payment").addClass("active");
    } else if (url.includes("/shipping") || url.includes("/profile")) {
        $(".item-cart").removeClass("active");
        $(".item-payment").removeClass("active");
        $(".item-shipping").addClass("active");
    }
}

var timeout = 1000;

window.onhashchange = function () {
    hashController();

    setTimeout(() => {
        hashController();
    }, timeout);
};

window.onload = function () {
    hashController();

    setTimeout(() => {
        hashController();
    }, timeout);
};

$(document).ready(function () {
    appendTerms()
    termsCond()
})

function termsCond() {
    const $htmlBtn = '<p class="terms-cond">Al dar click en Comprar ahora acepto <a href="/terminos-y-condiciones" target="_blank">Términos y Condiciones</a> y <a href="/aviso-de-privacidad" target="_blank">Aviso de Privacidad</a>';

    if ($('.payment-confirmation-wrap').length == 1 && $('.terms-cond').length < 1) {
        $('.payment-confirmation-wrap').append($htmlBtn);
    }
}
      
function limitText(field, maxChar){
    var ref = $(field),
        val = ref.val();
    if ( val.length >= maxChar ){
        ref.val(function() {
            //console.log(val.substr(0, maxChar))
            return val.substr(0, maxChar);
        });
    }
}

$(function(){
    $(document).find('#ship-street').attr('maxlength',27);
    $(document).on('keyup','#ship-street', function(e) {
        limitText(this, 27);
    });
  
    $(document).find('#ship-number').attr('maxlength',5);
    $(document).on('keyup','#ship-number', function(e) {
        limitText(this, 5);
    });
    
    $(document).find('#ship-complement').attr('maxlength',10);
    $(document).on('keyup','#ship-complement', function(e) {
        limitText(this, 10);
    });
});