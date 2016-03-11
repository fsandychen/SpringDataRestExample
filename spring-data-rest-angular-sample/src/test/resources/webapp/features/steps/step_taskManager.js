var taskManager = function() {
	var Given = When = Then = this.defineStep;
	this.setDefaultTimeout(200 * 1000);
	
	/*------------------------ Given ------------------------*/
	Given(/I go to home/, function(callback) {
		browser.get('http://139.196.197.135:32769/spring-data-rest-angular/home');
		callback();
	});

    /*------------------------ Then -------------------------*/
    Then(/Title must exist/, function(callback) {
		expect(browser.getTitle()).to.eventually.equal('AngularJS Task Manager').and.notify(callback);
		//callback();
    });
	Then(/must have "(\d+)" record/, function(amount, callback) {
		var request = Number(amount);
		element.all(by.repeater('task in tasks')).then(function(items) {
			expect(items).to.have.length(request);
			callback();
		});
    });
};

module.exports = taskManager;