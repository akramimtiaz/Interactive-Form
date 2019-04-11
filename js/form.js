/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

const addClassInvalid = ($element) => {
    $element.removeClass('valid');
    $element.addClass('invalid');
}

const addClassValid = ($element) => {
    $element.addClass('valid');
    $element.removeClass('invalid');
}

/*Adds/Removes Invalid Class from specified Element if it meets regex requirements*/
const validateInput = ($element, regex) => {
    const input = $element.val();
    if(regex.test(input) === true){
        addClassValid($element);
    } else {
        addClassInvalid($element);
    }
}


const validateSelectedJob = () => {

    const selectedRole = $('#title').val();

    selectedRole === "select_title" ? addClassInvalid($('#title')) : addClassValid($('#title'));
    selectedRole === "other" ? $('#other-title').show() : $('#other-title').hide();
   
}

const validateSelectedDesign = () => {

    const selectedOption = $('#design').val();

    if(selectedOption === "Select Theme"){

        addClassInvalid($('#design'));
        $('#colors-js-puns').hide();

    } else {

        addClassValid($('#design'));
        $('#color option').hide();
        $('#color option').attr('selected', false);

        if(selectedOption === "js puns"){
            $('#color option[value="cornflowerblue"]').attr('selected', true);
            $('#color option:lt(3)').show();
        } 
        else if (selectedOption === "heart js"){
            $('#color option[value="tomato"]').attr('selected', true);
            $('#color option:gt(2)').show();
        }

        $('#colors-js-puns').show();
    }

}

const updateActivityList = (selectedActivityName, selectedActivityDate, selectedActivityChecked) => {

    $('.activities input[type="checkbox"]').each(function(index){
        const $currentActivity = $(this);
        const currentActivityName = $(this).parent().text();

        if(index !== 0 && currentActivityName !== selectedActivityName){

            const currentActivityDate = currentActivityName.match(dateRegex)[0];
            if(currentActivityDate === selectedActivityDate){
                
                if(selectedActivityChecked){
                    $currentActivity.attr('disabled', true);
                    $currentActivity.parent().addClass('strike');
                } else {
                    $currentActivity.attr('disabled', false);
                    $currentActivity.parent().removeClass('strike');
                }

            }
        }
    });
}

const validateSelectedActivity = ($activity) => {

    $(':checkbox:checked').length === 0 ? addClassInvalid($('.activities legend')) : addClassValid($('.activities legend'));

    if($activity !== null){
        const activityName = $activity.parent().text();
        const activityCost = parseInt(activityName.slice(activityName.indexOf('$')+1));
        const activityDate = activityName.match(dateRegex) ? activityName.match(dateRegex)[0] : null;

        updateActivityList(activityName, activityDate, $activity.is(':checked'));

        let currentTotal = parseInt($('#total-cost').text());
        $activity.is(':checked') ? currentTotal += activityCost : currentTotal -= activityCost;
        $('#total-cost').text(currentTotal); 
    }
}

const validatePaymentMethod = () => {

    const paymentMethod = $('#payment').val();
    paymentMethod === "select_method" ? addClassInvalid($('#payment')) :  addClassValid($('#payment'));
    $('fieldset:last > div').hide();

    if(paymentMethod === "credit card"){
        $('fieldset:last > div:eq(0)').show();

    } else if (paymentMethod === "paypal"){
        $('fieldset:last > div:eq(1)').show();

    } else if (paymentMethod === "bitcoin"){
        $('fieldset:last > div:eq(2)').show();
    }
}

const validateCreditCard = (field) => {
    const creditCardRegex = /^\d{13,16}$/;
    const zipRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    if(field === "cc-num"){
        validateInput($('#cc-num'), creditCardRegex);
        if($('#cc-num').hasClass('invalid') && $('#cc-num').val() === ""){
            
        }
        
    } else if (field === "zip"){
        return validateInput($('#zip'), zipRegex);
    } else if (field === "cvv"){
        return validateInput($('#cvv'), cvvRegex);
    }
    
}

const dateRegex = /\w{6,9} \d{1,2}(am|pm)-\d{1,2}(am|pm)/g;

$('#name').attr('autofocus', true);


$(document).ready(()=>{

    //email regex obtained from www.regular-expressions.info
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex = /^[A-Za-z]{1}[a-z]* [A-Za-z]{1}[a-z]*$/;
    
    const otherJobRegex = /^[A-Za-z ]+$/;
    const creditCardRegex =  /^\d{13,16}$/;
    const zipRegex = /^\d{5}$/;
    const cvvRegex =  /^\d{3}$/;

    //hide "Other" input field
    $('#other-title').hide();

    //hide "Color" drop-down
    $('#colors-js-puns').hide();

    //Element used to track Total Cost
    $('<span>').attr('id','total-cost')
               .text('0')
               .appendTo($('.activities'));

    //Set Credit-Card as default Payment Option and hide Paypal and Bitcoin Payment options.
    $('#payment').val("credit card");
    $('#credit-card ~ div').hide();

    //Event Listener for Name Input field
    $('#name').on('input blur', ()=>{
        validateInput($('#name'), nameRegex);
    });

    //Event Listener for Email Input field
    $('#mail').on('input blur', (e)=>{
        validateInput($('#mail'), emailRegex);
    });

    //Event Listener for Other Job Input field
    $('#other-title').on('input blur', ()=>{
        validateInput($('#other-title'), otherJobRegex);
    });

    //Event Listener for Job Role Drop-down field
    $('#title').on('input focus', validateSelectedJob);

    //Event Listener for Design Drop-down field
    $('#design').on('input focus', validateSelectedDesign);

    //Event Listener for Payment Method Drop-down field
    $('#payment').on('input focus', validatePaymentMethod);


    //Event Listener for Checkboxes attached to Fieldset
    $('.activities').on('change', (e) => {
        validateSelectedActivity($(e.target));
    });

    //Event Listener for Credit Card Input fields
    $('#credit-card input').on('input blur', (e) => {
        validateCreditCard(e.target.id);
    });

    //Event Listner for when Form is Submitted
    $('form').on('submit', (e) => {
        
        validateInput($('#name'), nameRegex);
        validateInput($('#mail'), emailRegex);
        validateSelectedJob();
        validateSelectedDesign();
        validateSelectedActivity(null);
        validatePaymentMethod();

        if($('#other-title').is(":visible")){
            validateInput($('#other-title'), otherJobRegex);
        }else{
            addClassValid($('#other-title'));
        }

        if($('#payment').val() === "credit card"){
            validateInput($('#cc-num'), creditCardRegex);
            validateInput($('#zip'), zipRegex);
            validateInput($('#cvv'), cvvRegex);
        } else {
            addClassValid($('#credit-card input'));
        }

        if($('.invalid').length === 0){
            e.preventDefault();
            window.scrollTo(0, 0);
            $('<p>').attr('id', 'submit-success')
                    .text('Your form has been successfully submitted!')
                    .appendTo($('.container header'))
                    .delay(2000).slideUp(500)
            setTimeout(function(){
                location.reload();
            }, 2500);
        }else{
            e.preventDefault();
            window.scrollTo(0, 0);
            $('<p>').attr('id', 'submit-failed')
            .text('Please ensure all fields have been filled')
            .appendTo($('.container header'))
            .delay(2000).slideUp(500)
        }
        

    });

});