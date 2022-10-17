# zerokey

I have a [Raspberry Pi Zero WH](https://www.raspberrypi.com/products/raspberry-pi-zero-w/) with a [Rama M10-A macropad](https://rama.works/m10-a/) connected to it via USB. When the keys are pressed, it sends a command to my [Hubitat Hub](https://hubitat.com/) which telnets to my Lutron Smart Bridge to turn on and off various devices in my house.

This listens for keypresses on the macropad and sends HTTP calls to the Hubitat Hub.

## installation

Start with a fresh Raspbian image, enable SSH, add your SSH keys to the `pi` account.

Install [node-pi-zero](https://github.com/sdesalas/node-pi-zero)

Install PM2
```
npm install -g pm2
```

Add the following to the end of your ~/.profile file:

```
# Add support for node CLI tools
export PATH=$PATH:/opt/nodejs/bin
```

Start PM2 on reboot:
```
sudo env PATH=$PATH:/opt/nodejs/bin /opt/nodejs/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```

Install dependencies:

```
npm install
```

Enable the Maker API on the Hubitat.

Copy `config/default.json5` to `config/local.json5` and set the host and access token for the Hubitat.

## running

Start the server
```
pm2 start
```

Tail logs
```
pm2 logs 0
```

Survive reboot
```
pm2 save
```