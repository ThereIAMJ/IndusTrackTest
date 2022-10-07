Feature: Login page

    Feature Login page will work depending on the user credentials.

    Background:
        Given A web browser is at the azurewebsite login page
    Scenario: Success Login
        When A user enters the username "jorji@ehtest.com", the password "admin", and clicks on the login button
        Then the location should equalthe mapsTab link
    Scenario: Blocked Login
        When A user enters the username "locked_out_user", the password "secret_sauce", and clicks on the login button
        Then The error message "The Username/Password is not correct." is displayed
    Scenario: Incorrect Username Login
        When A user provides incorrect credentials, and clicks on the login button
            | username | password     |
            | wrong_user | admin |
        Then The error message "The Username/Password is not correct." is displayed
    Scenario: Incorrect Password Login
        When A user provides incorrect credentials, and clicks on the login button
            | username      | password     |
            | jorji@ehtest.com | wrong_password |
        Then The error message "The Username/Password is not correct." is displayed