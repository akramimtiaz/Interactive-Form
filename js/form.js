/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

const dateRegex = /\w{6,9} \d{1,2}(am|pm)-\d{1,2}(am|pm)/g;

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

    //Retrive the selected option from the Job Role Drop-down
    const selectedRole = $('#title').val();

    selectedRole === "select_title" ? addClassInvalid($('#title')) : addClassValid($('#title'));
    //Only show the "Other" Input field if the "Other" option was selected
    selectedRole === "other" ? $('#other-title').show() : $('#other-title').hide();
   
}

const validateSelectedDesign = () => {

    //Retrive the selected option from the Design Drop-down
    const selectedOption = $('#design').val();

    if(selectedOption === "Select Theme"){

        addClassInvalid($('#design'));
        //Hide the "Colors" drop-down if the selected option was "Select Theme"
        $('#colors-js-puns').hide();

    } else {

        addClassValid($('#design'));
        //Hide and Deselect all options within the "Colors" Drop-down
        $('#color option').hide();
        $('#color option').attr('selected', false);

        //Show the appropriate options based on the "Design" choosen.
        if(selectedOption === "js puns"){
            $('#color option[value="cornflowerblue"]').attr('selected', true);
            $('#color option:lt(3)').show();
        } 
        else if (selectedOption === "heart js"){
            $('#color option[value="tomato"]').attr('selected', true);
            $('#color option:gt(2)').show();
        }
        //Show "Colors" Drop-down
        $('#colors-js-puns').show();
    }

}

const updateActivityList = (selectedActivityName, selectedActivityDate, selectedActivityChecked) => {
    //Loop through each Activity checkbox within Activities
    $('.activities input[type="checkbox"]').each(function(index){
        //current checkbox being examined
        const $currentActivity = $(this); 
        //obtain Activity name from label element
        const currentActivityName = $(this).parent().text();

        //Avoid "Main Conference" and the Selected Activity itself 
        if(index !== 0 && currentActivityName !== selectedActivityName){
            //Extract Date and Time of Activity
            const currentActivityDate = currentActivityName.match(dateRegex)[0];
            if(currentActivityDate === selectedActivityDate){
                //If the Selected Activity was checked, Disable the conflicting activity
                if(selectedActivityChecked){
                    $currentActivity.attr('disabled', true);
                    $currentActivity.parent().addClass('strike');
                } else { //If the Selected Activity was unchecked, Re-enable the conflicting activity
                    $currentActivity.attr('disabled', false);
                    $currentActivity.parent().removeClass('strike');
                }

            }
        }
    });
}

const validateSelectedActivity = ($activity) => {

    //If no checkboxes are checked, change the text color of 'Register for Activities'
    $(':checkbox:checked').length === 0 ? addClassInvalid($('.activities legend')) : addClassValid($('.activities legend'));
    //This if statement is here so this function can be called outside of the event listener
    if($activity !== null){
        //Obtain the various information activity
        const activityName = $activity.parent().text();
        const activityCost = parseInt(activityName.slice(activityName.indexOf('$')+1));
        const activityDate = activityName.match(dateRegex) ? activityName.match(dateRegex)[0] : null;

        //Update the Activities list to reflect any clashing events
        updateActivityList(activityName, activityDate, $activity.is(':checked'));

        //Update the total cost of the event
        let currentTotal = parseInt($('#total-cost').text());
        $activity.is(':checked') ? currentTotal += activityCost : currentTotal -= activityCost;
        $('#total-cost').text(currentTotal); 
    }
}

const validatePaymentMethod = () => {
    //Retrive the selected option from the Payment Drop-down
    const paymentMethod = $('#payment').val();
    paymentMethod === "select_method" ? addClassInvalid($('#payment')) :  addClassValid($('#payment'));
    //Hide all options within the Payment section
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
            setTimeout(()=>{location.reload();}, 2500);
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