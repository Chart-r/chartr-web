import { browser, by, element, protractor } from 'protractor';

describe('chartr-web App', () => {
    it('should display welcome message', () => {
        browser.get('/');
        const headerText = element(by.css('.display-4')).getText();
        expect(headerText).toBe('Chartr');
    });

    it('should display login form', () => {
        browser.get('/login');
        const headerText = element(by.css('.full-height-content h1')).getText();
        expect(headerText).toBe('Log In');
    });

    it('should not allow invalid login submissions', () => {
        browser.get('/login');
        let errorMessage;
        const emailInput = element(by.name('email'));
        const passwordInput = element(by.name('password'));

        // both fields empty
        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields.');

        // password field empty
        emailInput.sendKeys('test@user.com');
        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields.');

        // email field empty
        emailInput.clear();
        passwordInput.sendKeys('password');
        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields.');
    });

    it('should redirect to home page on valid login', () => {
        browser.get('/login');
        const EC = protractor.ExpectedConditions;
        const emailInput = element(by.name('email'));
        const passwordInput = element(by.name('password'));

        emailInput.sendKeys('test@user.com');
        passwordInput.sendKeys('testUser123!');

        passwordInput.submit();

        const paragraph = element(by.css('.lead'));

        browser.wait(EC.visibilityOf(paragraph), 5000);

        expect(paragraph.getText()).toContain('Test User');
    });

    it('should display post trip form', () => {
        browser.get('/post');

        const headerText = element(by.css('.display-4')).getText();
        expect(headerText).toBe('Post Trip');
    });

    it('should not allow invalid post trip form submissions', () => {
        let errorMessage;
        browser.get('/post');

        const priceInput = element(by.name('price'));
        priceInput.submit();

        errorMessage = element(by.css('.message.error .desc')).getText();
        expect(errorMessage).toBe('Please complete all fields.');
    });

    it('should log a user out', () => {
        browser.get('/logout');

        const headerText = element(by.css('.display-4')).getText();
        expect(headerText).toBe('Successfully logged out');

        browser.get('/home');

        const paragraphText = element(by.css('.lead')).getText();
        expect(paragraphText).toBe('A new way to travel.');
    });

    it('should require login to view post trip form', () => {
        browser.get('/post');
        const paragraphText = element(by.css('.lead')).getText();
        expect(paragraphText).toBe('A new way to travel.');
    });

    it('should display the sign up form', () => {
        browser.get('/signup');
        const headerText = element(by.css('.display-4')).getText();
        expect(headerText).toBe('Sign Up');
    });

    it('should not allow invalid sign up submissions', () => {
        browser.get('/signup');
        let errorMessage;
        const emailInput = element(by.name('email'));
        const nameInput = element(by.name('name'));
        const phoneInput = element(by.name('phone'));
        const birthdateInput = element(by.name('birthdate'));
        const passwordInput = element(by.name('password'));

        emailInput.sendKeys('test@user.com');
        nameInput.sendKeys('Test User');
        phoneInput.sendKeys('+19999999999');
        birthdateInput.sendKeys('01/01/1996');
        passwordInput.sendKeys('testUser123!');

        // invalid email
        emailInput.clear();
        emailInput.sendKeys('invalid-email');

        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields correctly.');

        // invalid phone
        emailInput.clear();
        phoneInput.clear();
        phoneInput.sendKeys('9999999999');

        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields correctly.');

        // invalid birthdate
        phoneInput.clear();
        phoneInput.sendKeys('+19999999999');
        birthdateInput.clear();
        birthdateInput.sendKeys('1/1/1996');

        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields correctly.');

        // invalid password
        birthdateInput.clear();
        birthdateInput.sendKeys('01/01/1996');
        passwordInput.clear();
        passwordInput.sendKeys('password');

        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields correctly.');

        // empty form
        emailInput.clear();
        nameInput.clear();
        phoneInput.clear();
        birthdateInput.clear();
        passwordInput.clear();

        passwordInput.submit();

        errorMessage = element(by.css('.message.error .desc'));
        expect(errorMessage.getText()).toBe('Please complete all fields correctly.');
    });
});
