# NowPlaying

NowPlaying is an audiovisualizer for Spotify.

## What it does

<a href="http://www.youtube.com/watch?feature=player_embedded&v=yOU-b0THmAc
" target="_blank"><img src="http://img.youtube.com/vi/yOU-b0THmAc/0.jpg" 
alt="Link" width="240" height="180" border="10" /></a>

(Mouse middle click to open the video in new tab)

NowPlaying can be used as an background which lives with your music.

## How it works

### Technologies used

* React.js
* Three.js
* Spotify API https://developer.spotify.com/documentation/web-api/

### Login

Logging into NowPlaying happens through Spotify.

[![Link](https://i.imgur.com/Cq9V9CE.jpgF)](https://i.imgur.com/Cq9V9CE.jpg)

### Currently playing song

NowPlaying requests users currently playing song from spotify API.
If user is not listening to anything the default screen will play.
NowPlaying requests users currently playing song once the last song has ended, every 30 seconds, when user presses synchronize button or when user goes fullscreen (because this causes Three.js to rerender the canvas again with old song position).
Once having the songID of currently playing song three more requestss are made: audio features, audio analysis and currently playing song (again to reduce latency).

Audio features and analysis are used to figure you the songs loudness, energy, segments, sections, etc.
This data is used to animate the flickering light and wave.
The effects and their aggressiveness are based on the songs energy variable given by Spotify giving calm songs slower effects and energetic songs faster. 

The user has to press "Synchronize" after changing the song before it has ended as NowPlaying wont poll currently playing song (to not make too many API calls).

Spotify API requests are made with the users own API key instead of NowPlayings. This means that I do not need to worry about running out of API calls.

Documentation for Spotify API tracks: https://developer.spotify.com/documentation/web-api/reference/tracks/

### Header

You can synchronize to fetch the currently playing song again, go fullscreen or logout.

The header has smooth onHover effect.

[![Link](https://s2.gifyu.com/images/ezgif.com-gif-maker-44f61063b3a727b08.gif)](https://s2.gifyu.com/images/ezgif.com-gif-maker-44f61063b3a727b08.gif)

## TODO

* Fix monitor refreshrate affecting canvas framerate (cap to 60fps)
* Fix error on logout
* Better error handling
* Create notification snackbar

I am planning on deploying this once it is finished.
