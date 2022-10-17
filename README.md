# totalpartysolutions

[![video of kid playing soundboard](https://i.ytimg.com/vi/LTqFutAWEPM/maxresdefault.jpg)](https://www.youtube.com/watch?v=LTqFutAWEPM)

This is a keyboard controlled soundboard for kids to play with that I made when my daughter had a runny nose and had to stay home from school. It can run on your Mac or a Raspberry PI with a speaker and external keyboard attached. It's surprisingly difficult to find a portable speaker that accepts an AUX input nowadays, but [here](https://smile.amazon.com/dp/B01MTB55WH?psc=1&ref=ppx_yo2ov_dt_b_product_details) is the one that I'm using. If you don't want to build this, a [Blipblox](https://blipblox.com/) seems like a good commercial alternative.

Almost every key on the keyboard corresponds to a different sound effect that my daughter and I curated. The SPACEBAR and ENTER keys both correspond to different fart sounds. F1-F12 are loops, 1-9 and 0 are various synth hits. There's a wide range of sound effects, including the AOL "You've got mail!" sound and the ICQ "uh-oh" sound. For better or for worse, one of the effects is the iOS notification sound.

Sound effects were acquired from all over the Internet, but some sources were:

[Expert Software's 5000 Sound Effects CD](https://archive.org/details/5000-snds)

[My Instants](https://www.myinstants.com/en/best_of_all_time/us/)

[wavparty - Tron F. Kennedy "Me & Julio" sample pack](https://wavparty.com/downloads/tron-f-kennedy-me-and-julio-sample-pack/)

[BigSoundBank.com](https://bigsoundbank.com/)

and recordings that I recorded using the Voice Memos iOS app of my daughter and edited and exported as WAV files with Audacity.

The name is based on a [now-defunct soundboard](https://web.archive.org/web/20110207202541/http://totalpartysolutions.com/) ([source](https://github.com/standardpixel/totalpartysolutions.com)) that [Eric](http://standardpixel.com/) used at the Flickr office to finish our jokes.

## Basic setup (OS X)

Clone the repo somewhere:
```
git clone git@github.com:bertrandom/totalpartysolutions.git
cd totalpartysolutions
```

Install the dependencies:
```
npm install
```

## Usage

Run:
```
node app
```

and hit keys on your keyboard to trigger the soundboard.

If you'd like to quit, hit Ctrl-C.

If your kid is mashing on the keyboard, they may accidentally hit Ctrl-C. To counteract this, run `./loop.sh` instead, which will automatically restart the soundboard when it exits. Then you'll have to hit Ctrl-C twice in quick succession to quit, instead.

Modifier keys (e.g. shift, ctrl, meta) don't trigger sound effects.

If you're using a Mac, by default the F1-F12 keys won't work without holding down the Fn key. You can make them work by going to System Preferences, Keyboard, and checking "Use F1, F2, etc. keys as function keys", or if you use Karabiner-Elements, you can follow [these instructions](https://superuser.com/questions/49209/how-to-use-function-keys-as-standard-key-in-one-app-only/1305567#1305567) to have them always work in your terminal.

## Configuration

The soundboard only works with .wav files, that are put in the `data` directory (and it's subdirectories).

If you need to convert an mp3 to wav, you can run:
```
ffmpeg -i sound_name.mp3 sound_name.wav
```

In the `config` directory, you'll find a file called `default.json5`. Copy this to `local.json5` and change it to point to the sound files you want in your `data` directory. You can just specify the overrides in this file, and they'll layer on top of the default sounds. The `.wav` extension is automatically appended, so you don't need to add it.

## Raspberry Pi Setup

Use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) to put Raspberry Pi OS Lite on your PI. Before clicking Write, click the Settings icon and enable SSH, set your wifi password, and set your locale settings and keyboard layout.

Boot up your PI and SSH into it.

Update the OS:
```
sudo apt update
sudo apt upgrade
```

Install node:
```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install nodejs
```

Install git:
```
sudo apt install git
```

Install totalpartysolutions:
```
git clone https://github.com/bertrandom/totalpartysolutions.git
cd totalpartysolutions
npm install
```

Always start totalpartysolutions on startup:
```
cat bashrc_append.txt >> ~/.bashrc
sudo raspi-config
```

Select:
1 System Options -> S5 Boot / Auto Login -> B2 Console Autologin - Text console, automatically logged in as 'pi' user

and then choose "Finish"

When prompted if you'd like to reboot, choose Yes.
