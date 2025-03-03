# jmsh

![A photo of me tapping a button panel in the Smarthome (jmsh) system](https://johnmatu.la/ext/smarthome-wide.jpg)


## What is this?

These are my light switches! The project, [Smarthome](https://johnmatu.la/smarthome), has an extensive case study and plenty of photos.

The Smarthome project (`jmsh` for short) is my personal home control project that connects to [Home Assistant](https://www.home-assistant.io) to provide easy, direct switches and buttons in my apartment. Its goal is to eschew the clunky, menu-riddled smartphone apps that budget and big-brand devices alike ship with. I wanted something that was useful to me and usable by my friends.

(And yes that _is_ 2011’s [iPhone 4](#iphone4).)


## What’s it built with?


|  | Component |  Product   |  Remarks  |
|--|------|----|-----|
| 🔨 | Hardware |     |   |
| | hub | Raspberry Pi | Debian computer that locally runs Home Assistant and locally hosts web apps |
| | lightbulbs | Zigbee, Tuya | color-changing bulbs to screw into lamps and ceiling sockets |
| | outlets | Zigbee, Tuya | wireless on-off switches, like for counter lights |
| | button panel | iPhone 4 | touch screens that run custom-built web apps |
| | power | USB extension cords, 30-pin USB cables, and USB bricks | typical iPhone charging equipment |
| | cord management | cord runs, cord tacks, and temporary adhesive | temporary, safer power access in outlet-less corners |
| 🏠 |  Software |     |   |
| | smart device hub | Home Assistant | runs on the Raspberry Pi for blended setups and custom device logic |
| | web app hub | Apache | also running on the Raspberry Pi, serving up the custom, local web app pages |
| | jailbreak | Pangu 1.3 | enables full control of the iPhone 4 to manipulate brightness automatically, override home button behavior, and use f.lux for warmer screens |
| | design software | Sketch | plans out SVG art for buttons, controls, glyphs, on separate layers |
| | SVG splitter | svgsplit.com | generates one SVG file per outer group (Sketch layer) to show feedback in a GPU-friendly way |
| | development browser | Webkit build 91 (13.1) | allows Web Inspector over USB, specifically with support for the iPhone 4 |


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

### Upsides and downsides
> **Good: the hardware lasts and lasts.** The panel in the kitchen is on its fourteenth year of service: it was my first smartphone in 2011, then went on to be my spare device for wall-based web app experiments in 2015, and is currently living a happy life as the kitchen’s button panel.

> **Good: the system’s cost is low and amortizes.** The whole thing is portable, so I save on sunk costs as it comes with me to the next rental. It’s a flexible system, so I can safely give low-cost devices a try. Best of all, I can improve on inconvenient switch and outlet placement without violating my lease or hiring help from an electrician.

> **Bad: the tech stack is basically encased in amber.** The iPhone 4 relies on 2014’s version of WebKit, making for a weird, back-in-the-day coding experience. Build-time transpilers help ease this pain, but it also involves a degree of Stack Overflow sleuthing that takes time.


## Is there a framework?

Nope, at least not yet. Smarthome underwent a quick shift from “will this work?” to “this works so smoothly let’s gooo!” As such, the project is ready for a refactor.

> **Incorporate components.** The gridded button layout evolved along the way, and there’s some repetition present that’s ripe for cleaning up.

> **Eliminate duplicated SCSS.** I excitedly ran wild with ⌘C and ⌘V after early FPS tests passed with 60 flying colors. I’ll be refactoring class names and target IDs to make future ideas easier.

> **Comment the code.** For others and for future-me alike, I want to note the iPhone 4-specific hacks I used, as well as the decisions that let the GPU run as smoothly as it does.



## Links, resources, acknowledgments

* [Fix blank-on-launch web apps](https://stackoverflow.com/questions/7535643/content-disappears-for-fraction-of-a-second-on-offline-web-app-load#11350053)
* [Remove tap delay](https://github.com/ftlabs/fastclick/tree/main)

<sup><sub>This book is made available strictly for informational purposes. Its contents are provided on an as-is basis without guarantee or warranty. The Smarthome project is not offered for sale, trade, or distribution. This project is not paid for, sponsored, or endorsed by any company. “Apple strongly cautions against installing any software that modifies iOS.” All trademarks, including wordmarks, designs, and logos, mentioned in this book are property of their respectful owners.</sub></sup>