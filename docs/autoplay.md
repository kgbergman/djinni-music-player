# Google Chrome
**Mac**
Open the terminal and execute the following command to open Chrome: 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required
After running that command a Google chrome window pops up.
Sadly, the above setting will not “stick”. The moment Chrome is closed and reopened, it will revert back to the “selective autoplay” so you should do these steps every time you open Chrome. 

**Windows**
Right-click on the Chrome desktop icon >> Properties >> Append chrome.exe --autoplay-policy=no-user-gesture-required to the end of the Target field >> Apply and OK. 
That’s it, starting Chrome with this shortcut won't require the user to play media manually.

# Microsoft Edge
edge://settings/content/mediaAutoplay