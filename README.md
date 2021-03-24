# new-allrgb-image

The project is to create an image consisted of unique colors. Using React
![image](https://user-images.githubusercontent.com/69976446/112238102-1af34400-8c98-11eb-8cbd-06ed958803d5.png)

## Sort Red/Green/Blue:
sort the colors array based on the Red/Green/Blue ingredients and render the corresponding image.
## Shuffle Colors (my favorite one):
shuffle the colors array by using Fisher-Yates algorithm so that the image will be completely random. You can shuffle as many times as you want.
## Decrease Colors:
based on the test instructions, the initial number of colors is 32768, but by this button you can decrease this number. When the number of colors reaches 2 colors, the button will be disabled.
## Shrink/Enlarge:
the initial rendered image size is 1024px X 512px. By Shrink button you can make the image smaller by 50% until the width reaches 64px and then the button will be disabled. Enlarge button does the opposite and double the size, and initially is disabled, and when the image size reaches 1024px it becomes disabled again.
## Reset: Initially disabled. By changing the colors numbers or image sizes it becomes active. By pressing reset, all colors and image sized turn back to defaults. 
Also, the total number of colors and image size are rendered dynamically in the green badges.
