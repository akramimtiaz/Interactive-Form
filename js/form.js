/**********************************************************************************
 Team Treehouse - FS JS Techdegree - Project 3 - Interactive Form with Validation
***********************************************************************************/

/*
name regex = /^[A-Za-z]{1}[a-z]+ [A-Za-z]{1}[a-z]+$/
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

$('#name').attr('autofocus', true);


$(document).ready(()=>{
    
    $('#name').on('input', validateName);

});