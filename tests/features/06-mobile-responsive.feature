Feature: Mobile Responsiveness
  As a mobile user
  I want the website to display properly on small screens
  So that I can browse comfortably on my phone

  Scenario: Hamburger menu is visible on mobile
    Given I am on the homepage with a mobile viewport
    Then the hamburger menu button should be visible
    And the desktop nav links should be hidden

  Scenario: Mobile menu opens when hamburger is clicked
    Given I am on the homepage with a mobile viewport
    When I click the hamburger menu
    Then the mobile menu drawer should be open
    And the mobile menu should have link "Home"
    And the mobile menu should have link "Services"
    And the mobile menu should have link "Pricing"
    And the mobile menu should have link "Contact"

  Scenario: Mobile menu closes when close button is clicked
    Given I am on the homepage with a mobile viewport
    When I click the hamburger menu
    And I click the mobile menu close button
    Then the mobile menu drawer should be closed

  Scenario: Mobile menu has Login button for guests
    Given I am on the homepage with a mobile viewport
    When I click the hamburger menu
    Then the mobile menu should have a "Login / Register" button

  Scenario: Hero section stacks vertically on mobile
    Given I am on the homepage with a mobile viewport
    Then the hero section should be displayed

  Scenario: Pricing cards stack on mobile
    Given I am on the homepage with a mobile viewport
    And I scroll to the "pricing" section
    Then the pricing cards should be stacked vertically

  Scenario: Contact form is full-width on mobile
    Given I am on the homepage with a mobile viewport
    And I scroll to the "contact" section
    Then the contact form should be visible

  Scenario: Service cards stack on small phones
    Given I am on the homepage with a small phone viewport
    And I scroll to the "features" section
    Then the service cards should be in a single column
