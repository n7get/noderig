noderig
=======

Ham Radio ('rig') automation program.

### About

From the 'CAT Operation Reference Manual':

The CAT (Computer Aided Transceiver) System in the FT-991A transceiver provides control of frequency, VFO, memory, and other settings such as dual- channel memories and diversity reception using an external personal computer. This allows **multiple control operations to be fully automated** with single mouse clicks, or keystroke operations on the computer keyboard.

That in a nutshell is the purpose of this software.  It's not a remote control application, there are already high quality applications such as HRD, flrig, Win4Yaesu, et al.  This software for the operator who is working to provide emergency communications (Emcomm).  The purpose o this software is to automate the radio to aid the operator in getting the messages to where they are going.

### Features

* Shuts down rig if high SWR is detected
* Can show what changes to the rig's settings have been made since the last Op Mode was loaded.
* Automaticly switches Op Modes based on frequency.
* 

### Ideas for Docs

* Double click on Op Mode button to switch to primary Op Mode.
* Triggers are evaluated based on the Op Mode order value.
* The man indecator on the status line disables triggers when lit.
* Triggers and primary dont have effected until saved.
* Settings & Menu items have 4 views - fav, all, saved and changed.
* Count up and down timers during transmit.
* High SWR check, disabled while ATU auto tune.

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
