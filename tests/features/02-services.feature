Feature: Photography Services Section
  As a potential client
  I want to see the photography services offered
  So that I can choose the right service for my needs

  Background:
    Given I am on the homepage
    And I scroll to the "features" section

  Scenario: Services section header is displayed
    Then the section header should display "Our Photography Services"
    And the section header should display "Professional photography for every precious moment"

  Scenario: Wedding Photoshoot service is listed
    Then I should see a service card with title "Wedding Photoshoot"
    And the service card "Wedding Photoshoot" should have a description

  Scenario: Birthday Photo Shoot service is listed
    Then I should see a service card with title "Birthday Photo Shoot"
    And the service card "Birthday Photo Shoot" should have a description

  Scenario: Baby Photo Shoot service is listed
    Then I should see a service card with title "Baby Photo Shoot"
    And the service card "Baby Photo Shoot" should have a description

  Scenario: Digital Prints & Albums service is listed
    Then I should see a service card with title "Digital Prints & Albums"

  Scenario: Family Portraits service is listed
    Then I should see a service card with title "Family Portraits"

  Scenario: Event Photography service is listed
    Then I should see a service card with title "Event Photography"

  Scenario: There are exactly 6 service cards
    Then there should be 6 service cards displayed

  Scenario: Service cards have hover effect
    When I hover over the first service card
    Then the first service card should have a transform style
