/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

const dateRegex = /\w{6,9} \d{1,2}(am|pm)-\d{1,2}(am|pm)/g;

/*
name regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/
email regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
other regex = /^[A-Za-z ]+$/;
Time regex = /\d{1,2}(am|pm)-\d{1,2}(am|pm)/g;
            // $('.activities input[type="checkbox"]')[1].parentNode.textContent.match(/\d{1,2}(am|pm)-\d{1,2}(am|pm)/g)[0];

Cost regex = /\$\d{1,}/g;
or obtain price
console.log(str.slice(str.indexOf('$')+1));
*/

const addClassInvalid = ($element) => {
    if($element.hasClass('invalid') === false) $element.addClass('invalid');
}

const removeClassInvalid = ($element) => {
    if($element.hasClass('invalid') === true) $element.removeClass('invalid');
}

const validateInput = ($element, regex) => {
    const input = $element.val();
    if(regex.test(input) === true){
        removeClassInvalid($element);
        return true;
    } else {
        addClassInvalid($element);
        return false;
    }
}


const validateSelectedJob = () => {
    if($('#title').val() === "select_title"){
        addClassInvalid( $('#title') );
        $('#other-title').hide();
        return false;
    } else {
        removeClassInvalid( $('#title') );
        if($('#title').val() === "other"){
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
        return true;
    }
}

const validateJobRole = () => {
    const regex = /^[A-Za-z ]+$/;
    if($('#other-title').is(":visible") === true){
        return validateInput($('#other-title'), regex);
    } else { //other-title was not selected, therefore input is N/A
        return true;
    }
}

const validateSelectedDesign = () => {

    const selectedOption = $('#design').val();

    if(selectedOption === "Select Theme"){

        addClassInvalid($('#design'));
        $('#colors-js-puns').hide();
        return false;

    } else {

        removeClassInvalid($('#design'));
        $('#color option').hide();
        $('#color option').attr('selected', false);

        if(selectedOption === "js puns"){
            $('#color option:eq(0)').attr('selected', true);
            $('#color option:lt(3)').show();
        } 
        else if (selectedOption === "heart js"){
            $('#color option:eq(3)').attr('selected', true);
            $('#color option:gt(2)').show();
        }

        $('#colors-js-puns').show();
        return true;
    }

}

const updateActivityList = (selectedActivity, selectedDate, activitySelected) => {

    $('.activities input[type="checkbox"]').each(function(index){
        const currentActivity = $(this).parent().text();

        if(index !== 0 && currentActivity !== selectedActivity){
            const currentActivityDate = currentActivity.match(dateRegex)[0];
           
            if(currentActivityDate === selectedDate){
                
                if(activitySelected){
                    $(this).attr('disabled', true);
                    $(this).parent().addClass('strike');
                } else {
                    $(this).attr('disabled', false);
                    $(this).parent().removeClass('strike');
                }

            }
        }
    });
}

const validateSelectedActivity = (activity) => {

    $(':checkbox:checked').length > 0 ? removeClassInvalid($('.activities legend')) : addClassInvalid($('.activities legend'));

    const activityName = activity.parentNode.textContent;
    const activityCost = parseInt(activityName.slice(activityName.indexOf('$')+1));
    const activityDate = activityName.match(dateRegex) ? activityName.match(dateRegex)[0] : null;

    let   currentTotal = parseInt($('#total-cost').text().slice(1));
    activity.checked ? currentTotal += activityCost : currentTotal -= activityCost;
    $('#total-cost').text('$'+currentTotal);

    updateActivityList(activityName, activityDate, activity.checked);
}

const validatePaymentMethod = () => {

    const paymentMethod = $('#payment').val();
    $('fieldset:last > div').hide();

    if(paymentMethod === "credit card"){
        removeClassInvalid($('#payment'));
        $('fieldset:last > div:eq(0)').show();


    } else if (paymentMethod === "paypal"){
        removeClassInvalid($('#payment'));
        $('fieldset:last > div:eq(1)').show();


    } else if (paymentMethod === "bitcoin"){
        removeClassInvalid($('#payment'));
        $('fieldset:last > div:eq(2)').show();

    } else { //paymentMethod === "select_method"
        addClassInvalid($('#payment'));
        $('fieldset:last > div').hide();
        return false;
    }
}

const valCCInfo = (field) => {
    const cardRegex = /^\d{13,16}$/;
    const zipRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    if($('#credit-card').is(":visible") === true){
        if(field === "cc-num"){
            return validateInput($('#cc-num'), cardRegex);
        } else if (field === "zip"){
            return validateInput($('#zip'), zipRegex);
        } else if (field === "cvv"){
            return validateInput($('#cvv'), cvvRegex);
        }
    } else {
        return true;
    }
}


$('#name').attr('autofocus', true);


$(document).ready(()=>{

    let formValid;

    //email regex obtained from www.regular-expressions.info
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const nameRegex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/;
    
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
            .text('$0')
            .appendTo($('.activities'));

    //Set Credit-Card as default Payment Option and hide Paypal and Bitcoin Payment options.
    $('#payment').val("credit card");
    $('#credit-card ~ div').hide();


   
    //Event Listener for Name Input field
    $('#name').on('input blur', ()=>{
        validateInput($('#name'), nameRegex);
    });

    //Event Listener for Email Input field
    $('#mail').on('input blur', ()=>{
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
        validateSelectedActivity(e.target);
    });

    //Event Listener for Credit Card Input fields attached to Div
    $('#credit-card').on('input', (e) => {
        valCCInfo(e.target.id);
    });

    //Event Listner for when Form is Submitted
    $('form').on('submit', (e) => {
        
        formValid = validateInput($('#name'), nameRegex);
        formValid = validateInput($('#mail'), emailRegex);
        formValid = validateSelectedJob();
        if($('#other-title').is(":visible")){
            formValid = validateInput($('#other-title'), otherJobRegex);
        }
        

        if($(':checkbox:checked').length === 0){
            $('.activities legend').addClass('invalid');
            formValid = false;
        }

        formValid = validateSelectedDesign();
        
        

        console.log(formValid);
        
        if(!formValid){
            e.preventDefault();
        } else {
            e.preventDefault();
            alert('Ahlan wa Sahlan bik - Ey!');
        }

    });

});