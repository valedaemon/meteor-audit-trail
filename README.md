Audit Trail for Meteor
==================

This package provides a way to create audit trails within an application. Page loads are automatically logged in a collection called audits. 

Custom actions can also be logged by calling 

`at.createLog("Your message here");`

If this is called from the client side, then the URL, user, template, and timestamp will be automatically captured along with the message.

This package is in development at the moment.
