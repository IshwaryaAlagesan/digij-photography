Feature: Contact Section
  As a potential client
  I want to contact DigiJ Photography
  So that I can book a session or ask questions

  Background:
    Given I am on the homepage
    And I scroll to the "contact" section

  Scenario: Contact section displays heading
    Then the contact section should display "Book a Session"

  Scenario: Contact details show correct address
    Then the contact details should show "Swindon, UK"

  Scenario: Contact details show correct email
    Then the contact details should show "gopilaxman@gmail.com"

  Scenario: Contact details show correct phone
    Then the contact details should show "+447448401362"

  Scenario: Contact details show business hours
    Then the contact details should show "Mon–Sat: 9am – 7pm"

  Scenario: Contact form has all required fields
    Then the contact form should have a "Your Name" input
    And the contact form should have a "Your Email" input
    And the contact form should have a package dropdown
    And the contact form should have a "Preferred Date" input
    And the contact form should have a message textarea

  Scenario: Contact form dropdown has correct pricing options
    Then the package dropdown should have option "Basic Session – £99"
    And the package dropdown should have option "Premium Session – £199"
    And the package dropdown should have option "Full Day Coverage – £399"

  Scenario: Contact form dropdown has service options
    Then the package dropdown should have option "Wedding Photoshoot"
    And the package dropdown should have option "Baby Photo Shoot"
    And the package dropdown should have option "Birthday Photo Shoot"

  Scenario: Contact form has submit button
    Then I should see a button "Send Enquiry"

  Scenario: Contact form submission shows success
    When I fill in the contact form with valid details
    And I submit the contact form
    Then the submit button should show "Message Sent!"
