# Google Chrome

### Windows
1. Right-click on the Chrome desktop icon and click Properties

![Chrome Icon](https://raw.githubusercontent.com/kgbergman/music-player/main/docs/chrome_icon.png)

2. Append `--autoplay-policy=no-user-gesture-required` to the target field

![Chrome Properties](https://raw.githubusercontent.com/kgbergman/music-player/main/docs/chrome_properties.png)

3. Apply and OK. 

Starting Chrome **with this shortcut** will allow you to hear audio played by the GM.

### Mac & Linux
1. Open the terminal and execute the following command to open Chrome: 
`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --autoplay-policy=no-user-gesture-required`
2. After running that command a Google chrome window pops up, and you should be able to hear audio played by the GM.

Sadly, the above setting will not “stick”. The moment Chrome is closed and reopened, it will revert back, so you would need to do these steps every time you open Chrome. 




# Microsoft Edge
1. Enter `edge://settings/content/mediaAutoplay` in to the search bar and hit enter

![Edge Autoplay](https://raw.githubusercontent.com/kgbergman/music-player/main/docs/edge_autoplay.png)


2. Click "Add" next to Allow and enter `https://www.owlbear.rodeo`

![Edge Add Owlbear](https://raw.githubusercontent.com/kgbergman/music-player/main/docs/edge_add_owlbear.png)

3. Click "Add" again, and refresh the page.