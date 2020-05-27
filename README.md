# ThinkNimble Models for Client-Side Apps

## Installation

To install, you must be a member of the ThinkNimble NPM organization. If you are not, please contact William <william@thinknimble.com> to invite you to the organization.

Once invited, you should be able to get the private token associated with your account. The following steps describe

### Configure NPM to Use Your Private Token

Once you get your private token from NPM's website, create an alias in your `.bashrc` or `.bash_profile`:

```bash
export NPM_PRIVATE_TOKEN="{your_private_token}"
```

Then in your project, you can create a `.npmrc` configuration file with the following content:

```
//registry.npmjs.org/:_authToken=${NPM_PRIVATE_TOKEN}
```

This will read the alias you created from your shell environment. To reload your shell, either restart your terminal or run `source ~/.bashrc` or `source ~/.bash_profile`

### Install the tn-models Package

With your private token configured, you can now install this package as you would any other NPM package.

```bash
npm install @thinknimble/tn-models
```
