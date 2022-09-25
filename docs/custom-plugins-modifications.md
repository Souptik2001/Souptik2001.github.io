### Custom plugins modifications

---

These are all the custom modifications made to third-party plugins, for adding custom features or fixing something not possible through hooks provided by the plugin. Special care is to be taken while updating the plugins. The same custom changes are to be carried over to the new version of the plugin till those features are not made available natively by the plugins.

---

#### MailPoet

---

- The `getPermalink` function of the file `mailpoet/lib/WP/Functions.php` is modified to add a `filter` to modify the permalink to be displayed.