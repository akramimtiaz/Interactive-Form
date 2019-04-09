/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

/*
name regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/
email regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
other regex = /^[A-Za-z ]+$/;
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

const validateName = () => {
    const regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/;
    return validateInput($('#name'), regex);
}

const validateEmail = () => {
    //regex obtained from www.regular-expressions.info
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return validateInput($('#mail'), regex);
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
    } else {
        removeClassInvalid($('#design'));

        if(selectedOption === "js puns"){
            $("#color option:lt(3)").show();
            $("#color option:gt(2)").hide();   
        } 
        else if (selectedOption === "heart js"){
            $("#color option:lt(3)").hide();
            $("#color option:gt(2)").show();
        }

        $('#colors-js-puns').show();
    }

}

$('#name').attr('autofocus', true);


$(document).ready(()=>{

    //you could define both regex's as consts here and pass to function
    //$('#name').on('input', validateInput($(this), nameRegex));

    //create a conditonally hidden input field to account for "Other" being selected for "Job Role"
    $('<br>').appendTo($('fieldset')[0]);
    $('<input>')
    .attr({
        id: 'other-title', 
        placeholder: 'Your Job Role'})
    .hide()
    .appendTo($('fieldset')[0]);

    //hide "Color" drop-down until a Design is selected
    $('#colors-js-puns').hide();

    //hide Payment Options until a Payment Method is selected.
    $('fieldset:last > div').hide();
   
    
    $('#name').on('input blur', validateName);
    $('#mail').on('input blur', validateEmail);
    $('#title').on('input focus', validateSelectedJob);
    $('#other-title').on('input blur', validateJobRole);
    $('#design').on('input focus', validateSelectedDesign);



    //$("#color option:gt(2)")
    //$("#color option:lt(2)")
});