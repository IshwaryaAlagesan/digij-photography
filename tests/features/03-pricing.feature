Feature: Pricing Section
  As a potential client
  I want to see pricing packages
  So that I can choose a package that fits my budget

  Background:
    Given I am on the homepage
    And I scroll to the "pricing" section

  Scenario: Pricing section header is displayed
    Then the section header should display "Photography Packages"

  Scenario: Three pricing cards are displayed
    Then there should be 3 pricing cards displayed

  Scenario: Basic Session package displays correct price
    Then the "Basic Session" package should show price "99"
    And the "Basic Session" package should show currency "£"

  Scenario: Premium Session package displays correct price
    Then the "Premium Session" package should show price "199"
    And the "Premium Session" package should show currency "£"

  Scenario: Full Day Coverage package displays correct price
    Then the "Full Day Coverage" package should show price "399"
    And the "Full Day Coverage" package should show currency "£"

  Scenario: Premium Session is marked as Most Popular
    Then the "Premium Session" package should have a "Most Popular" tag

  Scenario: Basic Session has correct features
    Then the "Basic Session" package should list feature "1-hour photo session"
    And the "Basic Session" package should list feature "20 edited digital photos"

  Scenario: Premium Session has correct features
    Then the "Premium Session" package should list feature "3-hour photo session"
    And the "Premium Session" package should list feature "1 printed photo album"

  Scenario: Full Day Coverage has correct features
    Then the "Full Day Coverage" package should list feature "Full-day (8 hours) session"
    And the "Full Day Coverage" package should list feature "Highlight video reel"

  Scenario: Each pricing card has a Book Now button
    Then each pricing card should have a "Book Now" button

  Scenario: Pricing note with contact link is displayed
    Then I should see text "Not sure which package is right for you?"
