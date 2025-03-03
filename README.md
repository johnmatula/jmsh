# jmsh

![alt text](https://johnmatu.la/ext/smarthome-wide.jpg)

---

## What is this?

These are my light switches! [My website](https://johnmatu.la/smarthome) has an extensive case study and plenty of photos.

The Smarthome project (`jmsh` for short) is my personal home control project that connects to [Home Assistant](https://www.home-assistant.io) to provide easy, direct switches and buttons in my apartment. Its goal is to eschew the clunky, menu-riddled smartphone apps that budget and big-brand devices alike ship with. I wanted something that was useful to me and usable by my friends.

(And yes that _is_ 2011’s [iPhone 4](#iphone4).)


## What’s it built with?


| 🔨 Hardware |     |   |
|------|----|-----|
| hub | Raspberry Pi | Debian computer that locally runs Home Assistant and locally hosts web apps |
| lightbulbs | Zigbee, Tuya | color-changing bulbs to screw into lamps and ceiling sockets |
| outlets | Zigbee, Tuya | wireless on-off switches, like for counter lights |
| button panel | iPhone 4 | touch screens that run custom-built web apps |
| power | USB extension cords, 30-pin USB cables, and USB bricks | typical iPhone charging equipment |
| cord management | cord runs, cord tacks, and temporary adhesive | temporary, safer power access in outlet-less corners |
|  |  |  |
| 🏠 Software |     |   |
| smart device hub | Home Assistant | runs on the Raspberry Pi for blended setups and custom device logic |
| web app hub | Apache | also running on the Raspberry Pi, serving up the custom, local web app pages |
| jailbreak | Pangu 1.3 | enables full control of the iPhone 4 to manipulate brightness automatically, override home button behavior, and use f.lux for warmer screens |
| design software | Sketch | plans out SVG art for buttons, controls, glyphs, on separate layers |
| SVG splitter | svgsplit.com | generates one SVG file per outer group (Sketch layer) to show feedback in a GPU-friendly way |
| development browser | Webkit build 91 (13.1) | allows Web Inspector over USB, specifically with support for the iPhone 4 |


<a name="iphone4"></a>
## I’m sorry — an iPhone 4?

Yep! I’ve accrued an iPhone 4 fleet for the button panels because they are wildly cost effective for what you get:

* high-resolution, multi-touch display that looks good at wide angles
* a dedicated GPU
* a speaker and microphone
* Bluetooth, Wi-Fi, and AirPlay
* a gyroscope and GPS, handy for self-leveling
* permanent jailbreak capability to customize every hardware and software function
* post-jailbreak, built-in f.lux capability to avoid the glowing blue nightlight effect
* a sturdy glass-and-steel housing that is light enough to be safely mounted with renter-friendly adhesive

Most importantly, they have proven that they last. The panel in the kitchen is on its fourteenth year of service: it was my first smartphone in 2011, then went on to be my spare device for wall-based web app experiments in 2015, and is currently living a happy life as the kitchen’s button panel.


### Upsides and downsides
A big upside: its very low cost. The whole thing is portable, so I save on sunk costs as it comes with me to the next rental. It’s a flexible system, so I can safely give low-cost devices a try. Best of all, I can improve on inconvenient switch and outlet placement without violating my lease or hiring help from an electrician.

A big downside: an old tech stack. The iPhone 4 uses a version of WebKit that’s essentially encased in amber: it can use web features from around 2014 and earlier, making for a weird, back-in-the-day coding experience. (Build-time transpilers help ease this pain.)


## Is there a framework?

Nope! Some people stress bake and I guess I stress spaghetti code. My original exploration began with the funky four scene buttons with the happy dude (the foyer panel). When I realized how well that test worked and blended in with the place, it was a sudden month-long blur of coding.

> **Incorporate components.** The consistent grid approach evolved along the way, and there’s some control repetition that would be ripe for cleanup.

> **Eliminate duplicated SCSS.** I excitedly ran wild with ⌘C and ⌘V after early FPS tests passed with 60 flying colors, so I’ll be refactoring class names and target IDs appropriately.

> **Comment the iPhone-specific hacks I had to pull.** I’m not in a framework-building situation presently, but for those curious enough to whack at HTML or use frameworks of their own choice, I’ll leave enough examples of (old, old) patterns that work well for iPhone 4. I’ll pull out examples of the GPU and hardware optimizations that made it all extra smooth, too.



## Links, resources, acknowledgments

* [Fix blank-on-launch web apps](https://stackoverflow.com/questions/7535643/content-disappears-for-fraction-of-a-second-on-offline-web-app-load#11350053)
* [Remove tap delay](FastClick)
* []()

<small>This book is made available strictly for informational purposes. Its contents are provided on an as-is basis without guarantee or warranty. The Smarthome project is not offered for sale, trade, or distribution. This project is not paid for, sponsored, or endorsed by any company. “Apple strongly cautions against installing any software that modifies iOS.” All trademarks, including wordmarks, designs, and logos, mentioned in this book are property of their respectful owners.</small>