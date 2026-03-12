Feature: Homepage and Navigation
  As a visitor to DigiJ Photography website
  I want to see the homepage with branding and navigation
  So that I can explore the photography services

  Background:
    Given I am on the homepage

  Scenario: Page title displays correctly
    Then the page title should be "DigiJ Photography"

  Scenario: Navbar displays brand name
    Then the navbar should display "DigiJ Photography"

  Scenario: Navbar has correct navigation links
    Then the navbar should have the following links:
      | link       |
      | Home       |
      | Services   |
      | Pricing    |
      | Contact    |

  Scenario: Hero section displays welcome message
    Then the hero section should contain "Welcome to"
    And the hero section should contain "DigiJ Photography"

  Scenario: Hero section shows photography description
    Then the hero section should contain "Capturing moments that last forever"

  Scenario: Hero has call-to-action buttons
    Then I should see a button "Our Services"
    And I should see a button "Book a Session"

  Scenario: Floating cards display photography services
    Then I should see floating card "Wedding Photo Shoot"
    And I should see floating card "Baby Photo Shoot"
    And I should see floating card "Birthday Photo Shoot"

  Scenario: Stats bar displays key metrics
    Then the stats bar should display "Sessions Captured"
    And the stats bar should display "Happy Clients"
    And the stats bar should display "Years Experience"
    And the stats bar should display "Awards Won"

  Scenario: Footer displays brand and copyright
    Then the footer should contain "DigiJ Photography"
    And the footer should contain "2026"

  Scenario: Footer has quick links
    Then the footer should have link "Home"
    And the footer should have link "Services"
    And the footer should have link "Pricing"
    And the footer should have link "Contact"

  Scenario: Smooth scroll navigation works
    When I click the "Services" nav link
    Then the "features" section should be in view
