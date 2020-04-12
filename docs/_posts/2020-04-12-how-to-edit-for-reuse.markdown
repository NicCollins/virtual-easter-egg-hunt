---
layout: post
title:  "How to Edit for Reuse"
date:   2020-04-12 12:22:58 -0400
categories: how-to
---
During the creation of this project I used a set of panorama pictures that differed from the ones used in the final result. This meant I needed to make sure that the images as well as the locations of the eggs could be easily found and updated as I traded out the pictures. This design decision also means that this project can be easily modified to replace the existing panoramas with your own.

In order to make your own egg hunt you will need the following:
* 2 Panoramas with a width of 14440px or less
* Somewhere to edit the HTML file, I use [VS Code][vs-link]
* A Web Browser, I use [Firefox][firefox-link]
* Some patience for locating eggs

## Step 1

The first step is to get a copy of the Virtual Easter Egg Hunt code so that you can edit it with your own images. The code itself can be found via the [Virtual Easter Egg Hunt][egg-hunt-gh] GitHub page. From there you have the option to download the code as a [zip file][egg-hunt-zip], Or you can clone down the code using the following git command.

{% highlight console %}
git clone https://github.com/NicCollins/virtual-easter-egg-hunt.git
{% endhighlight %}

Once you have the code on your local computer you can confirm it is working by right clicking on the index.html file and opening it with your web browser. If everything is in the right place you will be presented with the same egg hunt as is currently hosted [here][egg-hunt-link].

## Step 2

The next step is to replace the two panorama pictures. To start that process you will need to determine the crop dimensions of the image. Thankfully PhotoSphere Viewer provides a tool for determining the cop size [here][psv-crop-link]. This tool also will show you if the image will display properly as well. The data you need from this are full width, cropped width, cropped height, cropped x, and cropped y. All of these can be seen on the cropping playground.

![Cropped Example]({{ '/assets/images/crop.png' | relative_url }})

Now that you have the images and their crop values you will need to place them in the images folder. Once in the folder you will need to update some code in index.html to get your images to display. The first step in getting your images displayed is to open the index.html and scroll to line 124 where you will need to update the file name like below.

{% highlight javascript %}
var locations = {
        courtyard: {
            panorama: 'images/{your file name}.jpg',
            eggs: [
                [-0.12587820712970976, 5.510338553759633, 0, 0],
{% endhighlight %}

There is a similar line to be updated at line 171 with the name of your other image.

The final place to update is to set the crop values at the point where the viewer is created. This is done to prevent the image from being distorted when displayed. The code to be updated can be found starting at line 409. The relevant section can be seen below and should be updated to match the values from the cropping playground.

{% highlight javascript %}
pano_data: {
            full_width: 14440,
            full_height: 7220,
            cropped_width: 14440,
            cropped_height: 2946,
            cropped_x: 0,
            cropped_y: 2137
          },
{% endhighlight %}

## Step 3

Now comes the most time consuming part of the whole proccess, locating the eggs. This is made somewhat easier in the fact that the code will print anywhere you double click in the panorama. To start your search you will want to clear out the current list of eggs and bunny. The setting for the egg locations can be found sarting at line 126. You will end up with that section looking like the snipit below.

{% highlight javascript %}
var locations = {
      courtyard: {
          panorama: 'images/{your file name}.jpg',
          eggs: []
      },
      picnic: {
          panorama: 'images/{your second file name}.jpg',
          eggs: []
      }
  };
{% endhighlight %}

Now the hunt begins. You will need to open the index.html file in your browser. Once you are past the instructions and the first panorama has loaded right click on the page below the panorama. In the list there should be an option to inspce element like shown.

![Inspect Element]({{ '/assets/images/inspect.png' | relative_url }})

This will open the developer console at the bottom of the browser. To see the coordinates as you double click on object click on the console tab like shown.

![Console Tab]({{ '/assets/images/console.png' | relative_url }})

Now that the console is open you can look for the eggs in your image. When you locate one double click as close to center of the egg as possible. Each time you double click you will see the coordinated printed to the console.

![Console Tab]({{ '/assets/images/coordinates.png' | relative_url }})

Once you have located and double clicked on all the egss you wish to be findable you will need to copy the coordinates out to a text file. These coordinates will need to be formatted so that the code knows where to find the eggs, if it is a prize egg, and a final value that lets the code know if an egg has been found yet or not. Each of those pieces is repesented by the array seen in the following snipit.

{% highlight javascript %}
//[Latitude, Longitude, Prize, Found]
[-0.12587820712970976, 5.510338553759633, 0, 0]
{% endhighlight %}

After taking all the coordinates and forming them into the above arrays you'll generate a list to replace the list that was cleared at the beginning of this step.

Once that is done you can repeat the steps to find and add the eggs for your second image.

## Finish

Now that you have found and added all of the eggs in your images you can now have your own virtual Easter egg hunt in the images you provided.

## Advanced Option

If you are looking for a more in depth guide for building up a virtual Easter egg hunt from scratch keep an eye here for when more in depth and advanced tutorials have been posted.

[egg-hunt-gh]: https://github.com/NicCollins/virtual-easter-egg-hunt
[egg-hunt-zip]: https://github.com/NicCollins/virtual-easter-egg-hunt/archive/master.zip
[egg-hunt-link]: http://mt-tabor-baptist-church-egghunt.s3-website-us-east-1.amazonaws.com/
[vs-link]: https://code.visualstudio.com/
[firefox-link]: https://www.mozilla.org/en-US/firefox/
[psv-crop-link]: https://photo-sphere-viewer.js.org/crop.html