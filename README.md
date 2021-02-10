noderig
=======

Ham Radio ('rig') automation program.

### About

From the 'CAT Operation Reference Manual':

The CAT (Computer Aided Transceiver) System in the FT-991A transceiver provides control of frequency, VFO, memory, and other settings such as dual-channel memories and diversity reception using an external personal computer. This allows **multiple control operations to be fully automated** with single mouse clicks, or keystroke operations on the computer keyboard.

That in a nutshell is the purpose of this software.  It's not a remote control application, there are already high quality applications such as HRD, flrig, Win4Yaesu, et al.  This software all about freeing the operator from having to think about changing rig settings/menu items when switching between operating modes.  e.g. switching from voice SSB to picking up an email via 2M packet to sending an email via VARA HF to FM voice on a repeater.  One of my primary design goals is to have NodeRig working along side of Winlink Express to provide an effecient emergency communications platform.  **The bottom line is the purpose of NodeRig is to automate the radio and allow the operator to focus on getting the messages to where they are going.**

Right now NodeRig is *mostly* ‘read only’, i.e. you will need to use the rig to configure the settings/menu items and then save the settings you want to control on the app (Op Modes).  I plan on eventually making it a complete control app so that the buttons and knobs on the rig are manual backups.  

I'm also testing on a regular basis with Fldigi and WSJT-X.

### Features

* Shuts down rig if high SWR is detected
* Can show what changes to the rig's settings have been made since the last Op Mode was loaded.
* Automaticly switches Op Modes based on frequency.
* Unlimited memory channels.

### Ideas for Docs

* Double click on Op Mode button to switch to primary Op Mode.
* Triggers are evaluated based on the Op Mode order value.
* The man indecator on the status line disables triggers when lit.
* Triggers and primary dont have effected until saved.
* Settings & Menu items have 4 views - fav, all, saved and changed.
* Count up and down timers during transmit.
* High SWR check, disabled while ATU auto tune.
* All the indecators on the status bar are active.
* Double click on tuner status to auto tune.
* Noderig does not use the memory hannels built into the hardware, it's to flakey and buggy.  If somebody understands hoe to get it to work contact me and we can talk about it.
* Single click on frequency to enter the freuency directly and double click to show memory channel list.
* frequencies can be entered as MHz - 14.070, KHz - 14070 or Hz - 14070000.
* Added generic widget for level type settings, s-level.  Changed power level to use new UI widget.  Added widgets for mic gain, squelclh level amd monitor level.
* Generic widget for level type of menu items.  This allows menu items to be presented to the UI in the same way as power level or mic gain.  The menu item implemented is 73 - DATA OUT LEVEL.

### Install
Node-red Palettes to install:
	node-red-node-serialport
	node-red-contrib-flowcontrol
	node-red-contrib-uibuilder

Npm packages to install under ~/.node-red
vue
bootstrap-vue
@popperjs/core

uibuilder packages to install:
