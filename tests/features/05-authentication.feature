Feature: User Authentication
  As a website visitor
  I want to register and login
  So that I can access my account

  Background:
    Given I am on the homepage

  Scenario: Login button is visible for guests
    Then I should see the Login button in the navbar

  Scenario: Clicking Login opens the login modal
    When I click the Login button
    Then the login modal should be visible
    And the modal should display "Welcome Back"

  Scenario: Login modal has email and password fields
    When I click the Login button
    Then the login modal should have an email input
    And the login modal should have a password input

  Scenario: Login modal has Sign In button
    When I click the Login button
    Then I should see a button "Sign In"

  Scenario: Can switch to registration form
    When I click the Login button
    And I click "Register" link in the modal
    Then I should see the registration form
    And the modal should display "Create Account"

  Scenario: Registration form has required fields
    When I click the Login button
    And I click "Register" link in the modal
    Then the registration form should have a name input
    And the registration form should have an email input
    And the registration form should have a password input

  Scenario: User can register a new account
    When I click the Login button
    And I click "Register" link in the modal
    And I register with name "Test User" email "test@example.com" and password "password123"
    Then I should be logged in as "Test"

  Scenario: Login with invalid credentials shows error
    When I click the Login button
    And I login with email "wrong@example.com" and password "wrongpass"
    Then I should see login error "Invalid email or password"

  Scenario: User can login after registration
    Given I register a user with name "Jane Doe" email "jane@test.com" and password "pass123"
    When I click the Login button
    And I login with email "jane@test.com" and password "pass123"
    Then I should be logged in as "Jane"

  Scenario: User can logout
    Given I register a user with name "Test User" email "logout@test.com" and password "pass123"
    When I click the Login button
    And I login with email "logout@test.com" and password "pass123"
    And I click the Logout button
    Then I should see the Login button in the navbar

  Scenario: Login modal closes on Escape key
    When I click the Login button
    And I press the Escape key
    Then the login modal should not be visible

  Scenario: Login modal closes when clicking outside
    When I click the Login button
    And I click outside the modal
    Then the login modal should not be visible
