# Widget Mobile Fixes

iOS has long contained a web form feature that negatively affects pages with widgets. Here's the problem and our solution:

## Mobile Issues

When multiple forms or inputs are placed throughout a web page, the native iOS "next" or "previous" arrows jump from input to input. On pages with our widget, the arrows "jump" from the final widget field to the next input element no matter where it is on the page. This jarring to our users and takes users who have selected widget fields to an unexpected part of the page, preventing them from submitting the widget.

EduWidget by default disables the `Select by Category` and `Select by Subject` select inputs. This removes the native iOS "next" arrow to the Category and Subjects select inputs. Without the "next" arrow, users lose the ability to move quickly through fields and complete the form easily.

If EduWidget select inputs are enabled, this creates the possibility of empty select fields (mainly `Select by Category` and `Select by Subject`). But by disabling the input fields causes other issues mentioned above.

Manual tab indexes should be avoided: they also create "jumps" that unexpectedly move users throughout fields on the page.

## Mobile Solution

**Isolate forms & orphaned inputs.** This prevents the user from hitting the next button and being displaced to another part of the page. If inputs are in a form tag, you are allowed to jump from child input to child input.

**Enable all EduWidget select inputs.** Allows the user to quickly complete form inputs while keeping the user locked into the form not being displaced on page.

**Disable inputs outside of the current form.** If the `select` input field has no `option`s besides the default "Select a {Field Name}", the user will be moved to the most previous input select that has options. Selecting an option in that previous input should correctly populate the option-less `select`.

**Reset inputs when leaving current form.** The script adjusts tabindex of elements outside the current form, then resets those inputs' tabindex to the default on leaving the form. We'll use `tabindex="-2"` for those elements and not change `tabindex="-1"`: devs can still write forms to skip inputs without interference from this script.
