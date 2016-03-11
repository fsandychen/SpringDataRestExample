Feature: Task Manager index
    As a user of Task Manager
    I could do some actions
	
	@E2E
	Scenario: 頁面是否存在
    	Given I go to home
    	Then Title must exist
	
	@E2E
	Scenario: 資料顯示正確
    	Given I go to home
    	Then must have "5" record