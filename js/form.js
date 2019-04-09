/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

/*
name regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/
email regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
*/

const validateName = () => {
    const input = $('#name').val();
    const regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/;

    if(regex.test(input) === true){
        if($('#name').hasClass('invalid') === true){
            $('#name').removeClass('invalid');
        } 
    } else {
        if($('#name').hasClass('invalid') === false){
            $('#name').addClass('invalid');
        }
    }
}

const validateEmail = () => {
    const input = $('#mail').val();
    //regex obtained from www.regular-expressions.info
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if(regex.test(input) === true){
        if($('#mail').hasClass('invalid') === true){
            $('#mail').removeClass('invalid');
        } 
    } else {
        if($('#mail').hasClass('invalid') === false){
            $('#mail').addClass('invalid');
        }
    }
}

$('#name').attr('autofocus', true);


$(document).ready(()=>{
    
    $('#name').on('input', validateName);
    $('#mail').on('input', validateEmail);
    

});