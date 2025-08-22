//const dns = require('dns').promises;
// import dns from "dns";
import dns from 'node:dns/promises';

export default class EmailValidator {
  /**
   * @param {string} email - The email to validate.
   * @param {string} [freeEmailFilePath] - Path to a .conf file with free email domains.
   * @param {string} [disposableEmailFilePath] - Path to a .conf file with disposable domains.
   */
  constructor(email) {
    this.email = email;
    this.username = '';
    this.domain = '';
    this.mxRecords = [];
    this.isSyntaxValid = false;
    this.hasValidDomain = false;
    this.isDisposableDomain = false;
    this.isFreeEmailProvider = false;
    this.isGibberishEmail = false;
    this.isRoleBasedEmail = false;
    this.isValidEmail = false;

    //console.log(email);


    // var freeEmailFilePath = './free_domains.conf';
    // var disposableEmailFilePath = './disposable_domains.conf';

    const freeEmailList = ['gmail.com', 'yahoo.com', 'outlook.com'];
    const disposableEmailList = ['mailinator.com', 'tempmail.com', '10minutemail.com'];

    this.freeEmailList = freeEmailList;
    this.disposableEmailList = disposableEmailList;

    // Load domain lists from provided configuration files (if available)
    // this.freeEmailList = freeEmailFilePath && fs.existsSync(freeEmailFilePath)
    //   ? fs.readFileSync(freeEmailFilePath, 'utf-8')
    //     .split('\n')
    //     .map(line => line.trim().toLowerCase())
    //     .filter(Boolean)
    //   : [];
    // this.disposableEmailList = disposableEmailFilePath && fs.existsSync(disposableEmailFilePath)
    //   ? fs.readFileSync(disposableEmailFilePath, 'utf-8')
    //     .split('\n')
    //     .map(line => line.trim().toLowerCase())
    //     .filter(Boolean)
    //   : [];

    // Initialize: parse email parts and validate syntax.
    this.init();
  }

  init() {
    // Split the email into username and domain parts.



    if (this.email == undefined) return;

    const parts = this.email.split('@');
    if (parts.length === 2) {
      this.username = parts[0];
      this.domain = parts[1].toLowerCase();
    }
    // Immediately check the syntax.
    this.isSyntaxValid = this.validateSyntax();

    console.log(this.email);
  }

  /**
   * Validates the email syntax using a simple regular expression.
   * @returns {boolean}
   */
  validateSyntax() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  async getMxRecords() {

    var domain = this.domain
    console.log(domain);

    try {
      const mxRecords = await dns.resolveMx(domain);
      console.log('MX Records:', mxRecords);
      return mxRecords;
    } catch (error) {
      console.error('Error retrieving MX records:', error);
      return [];
    }
  }


  /**
   * Looks up MX records for the domain.
   * Sets `mxRecords` and `hasValidDomain`.
   * @returns {Promise<boolean>}
   */
  async validateDomain() {
    if (!this.domain) return false;
    try {
      const records = await dns.resolveMx(this.domain);
      this.mxRecords = records;
      this.hasValidDomain = Array.isArray(records) && records.length > 0;
    } catch (error) {
      this.hasValidDomain = false;
    }
    return this.hasValidDomain;
  }

  /**
   * Checks if the email domain is in the disposable domain list.
   * @returns {boolean}
   */
  checkDisposableDomain() {
    if (this.disposableEmailList.length > 0) {
      this.isDisposableDomain = this.disposableEmailList.includes(this.domain);
    } else {
      this.isDisposableDomain = false;
    }
    return this.isDisposableDomain;
  }

  /**
   * Checks if the email domain is in the free email provider list.
   * @returns {boolean}
   */
  checkFreeEmailProvider() {
    if (this.freeEmailList.length > 0) {
      this.isFreeEmailProvider = this.freeEmailList.includes(this.domain);
    } else {
      this.isFreeEmailProvider = false;
    }
    return this.isFreeEmailProvider;
  }

  /**
   * A basic heuristic to determine if the username is gibberish.
   * Here, for example, we flag it if it’s very short or lacks vowels.
   * @returns {boolean}
   */
  checkGibberish() {
    const vowels = /[aeiou]/i;
    if (this.username.length < 3) {
      this.isGibberishEmail = true;
    } else if (!vowels.test(this.username)) {
      this.isGibberishEmail = true;
    } else {
      this.isGibberishEmail = false;
    }
    return this.isGibberishEmail;
  }

  /**
   * Checks if the username is a common role-based account.
   * @returns {boolean}
   */
  checkRoleBased() {
    const roleBasedUsernames = [
      'admin',
      'administrator',
      'root',
      'sysadmin',
      'webmaster',
      'postmaster',
      'hostmaster',
      'server',
      'dns',
      'api',
      'cloud',
      'network',
      'tech',
      'technology',
      'support',
      'monitoring',
      'security',
      'firewall',
      'malware',
      'hacker',
      'privacy',
      'abuse',
      'spam',

      // Customer Support & Helpdesk
      'support',
      'help',
      'helpdesk',
      'servicedesk',
      'troubleshooting',
      'fix',
      'techsupport',
      'solutions',
      'customerservice',
      'clientcare',
      'repair',
      'maintenance',
      'case',
      'ticket',
      'resolution',
      'response',
      'feedback',

      // Sales & Marketing
      'sales',
      'marketing',
      'advertising',
      'media',
      'press',
      'branding',
      'publicrelations',
      'sponsorship',
      'promotions',
      'affiliates',
      'influencers',
      'campaigns',
      'outreach',
      'referrals',
      'discounts',
      'coupons',
      'deals',
      'offers',
      'leads',
      'b2b',
      'b2c',
      'wholesale',
      'partner',
      'partnerships',
      'reseller',
      'business',
      'growth',
      'marketplace',

      // Finance, Accounting & Billing
      'billing',
      'payments',
      'invoice',
      'invoices',
      'accounting',
      'finance',
      'receipts',
      'refund',
      'payroll',
      'tax',
      'money',
      'salary',
      'purchases',
      'subscriptions',

      // HR, Jobs & Recruitment
      'hr',
      'humanresources',
      'careers',
      'jobs',
      'recruitment',
      'recruiter',
      'hiring',
      'intern',
      'talent',
      'apply',
      'hireme',
      'training',
      'learning',
      'onboarding',

      // Legal & Compliance
      'legal',
      'compliance',
      'gdpr',
      'privacy',
      'terms',
      'conditions',
      'policies',
      'security',
      'dataprotection',
      'dmca',
      'copyright',
      'dispute',
      'violations',

      // Leadership & Executive Teams
      'ceo',
      'founder',
      'president',
      'coo',
      'cfo',
      'cmo',
      'cio',
      'cto',
      'vp',
      'vicepresident',
      'managingdirector',
      'director',
      'leader',
      'teamlead',
      'board',
      'boardmembers',
      'executives',
      'chairman',
      'owner',
      'management',

      // General Contact & Miscellaneous
      'contact',
      'info',
      'hello',
      'hi',
      'welcome',
      'mail',
      'office',
      'team',
      'staff',
      'group',
      'everyone',
      'newsletter',
      'subscribe',
      'unsubscribe',
      'notifications',
      'alerts',
      'announcements',
      'test',
      'noreply',
      'nobody',
      'anonymous',
      'robot',
      'no-reply',
      'testaccount',
      'supportteam',
      'services',
      'enquiries',
      'queries',
      'query',
      'general',
      'generalinfo'
    ];



    this.isRoleBasedEmail = roleBasedUsernames.includes(this.username.toLowerCase());
    return this.isRoleBasedEmail;
  }

  /**
   * Runs all validations.
   * Combines syntax, domain (MX record) check, and other heuristic validations.
   * @returns {Promise<boolean>} - True if the email passes the basic validity checks.
   */
  async validate() {
    // Syntax check
    this.isSyntaxValid = this.validateSyntax();

    // Additional heuristic checks
    this.checkGibberish();
    this.checkRoleBased();

    // Check against provided lists
    this.checkDisposableDomain();
    this.checkFreeEmailProvider();


    // Domain check (MX records)
    await this.validateDomain();
    await this.getMxRecords();




    // Define overall email validity.
    // Here, we simply require that the email is syntactically correct and that the domain has MX records.
    this.isValidEmail = this.isSyntaxValid && this.hasValidDomain;

    return this.isValidEmail;
  }
}

// Example usage:
// (Assuming you have "free_domains.conf" and "disposable_domains.conf" files in your project directory)
/*
(async () => {
  const email = "info@example.com";
  const validator = new EmailValidator(email, './free_domains.conf', './disposable_domains.conf');
  const isValid = await validator.validate();
  console.log({
    email: validator.email,
    username: validator.username,
    domain: validator.domain,
    mxRecords: validator.mxRecords,
    isSyntaxValid: validator.isSyntaxValid,
    hasValidDomain: validator.hasValidDomain,
    isDisposableDomain: validator.isDisposableDomain,
    isFreeEmailProvider: validator.isFreeEmailProvider,
    isGibberishEmail: validator.isGibberishEmail,
    isRoleBasedEmail: validator.isRoleBasedEmail,
    isValidEmail: validator.isValidEmail,
  });
})();
*/

//module.exports = EmailValidator;
