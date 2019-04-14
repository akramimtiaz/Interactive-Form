# techdegree-project-3

Aiming for exceeded expectations. This project involved the use of JQuery to enhance an interactive registration form. 

1. Name field - autofocus enabled, cannot be blank and must be in the format of 'First Last' or 'first last' 
                e.g. 'Dave McFarland' or 'dave mcfarland'
2. Email field - cannot be blank and must in a valid email format
3. Job Title field - added default option of 'Select Title', selection cannot be 'Select Title' and if 'Other' is specified the
                     'Other' input field must be filled
4. Other field - cannot be blank, only validated in the event a job title of 'Other' was selected.
4. Shirt Design field - cannot be 'Select Design', 'Color' selection field only shown in the event of a valid selection
5. Color field - color options are determined by the design choosen using the 'Shirt Design' selection field
6. Register for Activities checkboxes - atleast one event must be checked, conflicting activties are unable to be selected.
7. Payment Method fied - cannot be 'Select Payment', following a valid selection, only the information pertaining to the selected
                         payment option is shown.
8. Credit Card fields - cannot blank and must be in the required format, only validated in the event a payment method of credit
                        card is selected.
9. Submit button - if form is filled correctly, successfully submitted message is shown and page is refreshed. If form has not
                   filled correctly, error message is shown and fields that need to be field are indicated. 
