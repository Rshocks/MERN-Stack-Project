/// <reference types="Cypress" />
import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

Given("A user goes to the Sign Up card", () => {
    cy.visit("/");
    cy.get('span.MuiButton-startIcon').first().click();

    cy.get('button.MuiButton-root.MuiButton-text')
    .click();
});

When("A user is missing a field", () => {
    cy.get('input[name="firstName"]')
    .type('Cypress');

    cy.get('input[name="lastName"]')
    .type('Test');

    cy.get('input[type="email"]')
    .type('cypresstest@email.com')

    cy.get('input[name="confirmPassword"]')
    .type('12345')

    cy.get('button.MuiButton-containedPrimary').eq(0).click();
});

Then("A warning message should appear", () => {
    cy.get('input[name="password"]').should('have.value', '');
    
    cy.wait(3000);
    // try imporve this then part as it relies on visual seeing the text appear
});

// If passwords don't match user cannot sign up
When("A user enters all details but their passwords do not match", () => {
    cy.get('input[name="firstName"]')
    .type('Cypress');

    cy.get('input[name="lastName"]')
    .type('Test');

    cy.get('input[type="email"]')
    .type('cypresstest@email.com')

    cy.get('input[name="password"]')
    .type('12345')

    cy.get('input[name="confirmPassword"]')
    .type('123456')
});

Then("The user cannot sign up", () => {
    cy.get('button.MuiButton-containedPrimary').eq(0).click();

    // website works as url changes when user has completed signing up
    cy.url().should('not.eq', 'https://echoatu.com/posts')

    //This assert that the users name doesn't appear in the navbar
    cy.get('h6.MuiTypography-root.jss5.MuiTypography-h6').should('not.exist')

    //And this asserts that the users avatar doesn't appear in navbar
    cy.get('.jss7').should('not.exist')

    // More assertions that the forms has loaded in 
    cy.get('input[name="title"]').should('not.exist');
    cy.get('input[name="message"]').should('not.exist');
    cy.get('input[name="tags"]').should('not.exist');
});

// If user clicks the eye they can see their password
When("A user types in their password", () => {
    cy.get('input[name="password"]')
    .type('12345')
});

Then("The user click the eye button they should be able to see their password", () => {
    cy.get('button.MuiButtonBase-root.MuiIconButton-root').click()

    cy.get('input[name="password"]')
    .should('have.value', '12345');
});

// If user signs up accordingly they will be logged in
When("A user types all inputs with no mistakes", () => {
    cy.get('input[name="firstName"]')
    .type('Cypress');

    cy.get('input[name="lastName"]')
    .type('Test');

    cy.get('input[type="email"]')
    .type('cypresstest@email.com')

    cy.get('input[name="password"]')
    .type('12345')

    cy.get('input[name="confirmPassword"]')
    .type('12345')

    cy.get('button.MuiButton-containedPrimary').eq(0).click();
});

Then("The user should be signed into the application", () => {

    // website works as url changes when user has completed signing up
    cy.url().should('eq', 'https://echoatu.com/posts');

    //This asserts that the users name appears in the navbar
    cy.get('h6.MuiTypography-root.jss5.MuiTypography-h6').should('exist')

    //And this asserts that the users avatar appears in navbar
    cy.get('.jss7').should('exist')

    // More assertions that the forms has loaded in 
    cy.get('input[name="title"]').should('be.visible');
    cy.get('input[name="message"]').should('be.visible');
    cy.get('input[name="tags"]').should('be.visible');
});

// If user types in a email address that is already taken they should be unable to sign up
When("A user types all inputs but the email it already taken", () => {
    cy.get('input[name="firstName"]')
    .type('Cypress');

    cy.get('input[name="lastName"]')
    .type('Test');

    cy.get('input[type="email"]')
    .type('cypresstest@email.com')

    cy.get('input[name="password"]')
    .type('12345')

    cy.get('input[name="confirmPassword"]')
    .type('12345')
});

// incorrect password
Given("A user goes to the Sign In card", () => {
    cy.visit("/");
    cy.get('span.MuiButton-startIcon').first().click();
});

When("Enters all details but password is not correct", () => {
    cy.get('input[type="email"]')
    .type('CyAuto1@email.com')

    //incorrect password 12345 is actual password
    cy.get('input[name="password"]')
    .type('123456')
});

// incorrect email
When("Enters all details but email is not correct", () => {
    //incorrect email CyAuto1 actual email
    cy.get('input[type="email"]')
    .type('CyAuto@email.com')

    cy.get('input[name="password"]')
    .type('12345')
});

// warning pop up on sign in card
When("A user is missing a field in the sign in form", () => {
    cy.get('input[type="email"]')
    .type('CyAuto1@email.com')

    cy.get('button.MuiButton-containedPrimary').eq(0).click();
});

// sign user in
When("A user inputs all the correct fields", () => {
    cy.get('input[type="email"]')
    .type('CyAuto1@email.com')

    cy.get('input[name="password"]')
    .type('12345')

    cy.get('button.MuiButton-containedPrimary').eq(0).click();
});
