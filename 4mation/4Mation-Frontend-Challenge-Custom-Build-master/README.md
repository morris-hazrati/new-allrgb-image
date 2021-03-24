# 4Mation-Frontend-Challenge-Custom-Build
Hi,

This is the complete deliverable for the 4Mation Frontend Challenge.

The version presented here has been done with custom CSS styling.

View the demo of this app from:
http://www.nadoork.com/4Mation/index.html
or
http://www-student.it.uts.edu.au/~knadoor/4Mation/index.html

Thanks,
Krishna

# TECHNICAL NOTES:
When clicking on an image to view its EXIF data, if the loading GIF image does not disappear this would be due to the owner of the image does not want to share that info.

The JSON response would be in this case:
{"stat":"fail","code":2,"message":"Permission denied"}

This can be confirmed by accessing the JavaScript console and opening the JSON response link found after the "EXIF request URL is" string.

EDIT:
Newer version of script has improved error checking and I've added meaningful error messages.
