How does google forms to firebase work?
- useful article: https://medium.com/firebase-developers/sheets-to-firebase-33132e31935b

1. Create Google form
2. Link the responses from a form to an excel sheet
3. Attach a google script to that excel sheet that syncs it with firebase (realtime db)

Links (LOI):
- Form: https://docs.google.com/forms/d/1pt00pm8Ek_OcgrgXhqwqWMNOBbsQhFmFGsWfdTzLkKw/edit#responses
- Excel: https://docs.google.com/spreadsheets/d/1qvqKTZAUJqQ14QFeD9srxEmP8bFFdWIo3iW_nbiTRWk/edit#gid=1002586690
- File Saves: https://drive.google.com/drive/u/1/folders/0B6VZ3Hfcjd5xfjhIX1RNTlBOV3RJaEhnVzZmcUdnYWd4UTZZNEFoZTVIM1d0VWdaMThkMnc
- Script: https://script.google.com/d/1Pqq_X129D6jdE6gSoCrY0lhg-uWTW4fDhFS92Skfl8XzYzkv4SQQJEpg/edit?uiv=2&mid=ACjPJvFgO81zPGwy4OUlMgbSKi917e9v8T1mcdQ5NQBTHstQmyUG1htvK4aUBQpyRZnkksnp2ZyBUZhc1_prLC-PbS2PgSPGlIu9zD871m4-MKLitvUUgWGhkH5HCAr515RRws8w9vSEWBFH_RvQI_bqrmh-htCrrXSxX_p2rFMrz1AHthJDKBv2Q7pM1Q&splash=yes
- Firebase: https://console.firebase.google.com/u/0/project/decision-io/database/decision-io/data

#ToDo
Links (FULL):
- Form:
- Excel:
- File Saves:
- Script:
- Firebase: https://console.firebase.google.com/u/0/project/decision-io/database/decision-io/data


Notes:
- The questions on the form act as keys (so you can't use "$ # [ ] / or .")
- The form can be embedded into a website if it doesn't have file uploads
- Files are currently stored in saved file and it is currently a manual process to put them into firebase storage
- We can migrate from firebase to mongo (just import to mongo as tsv). It won't be synced realtime
