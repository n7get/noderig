noderig
=======

Ham Radio ('rig') automation program for a Yaesu FT-991A.

### About

From the 'CAT Operation Reference Manual':

The CAT (Computer Aided Transceiver) System in the FT-991A transceiver provides control of frequency, VFO, memory, and other settings such as dual-channel memories and diversity reception using an external personal computer. This allows **multiple control operations to be fully automated** with single mouse clicks, or keystroke operations on the computer keyboard.

That in a nutshell is the purpose of this software.  It's not a remote control application, there are already high quality applications such as HRD, flrig, Win4Yaesu, et al.  This software all about freeing the operator from having to think about changing rig settings/menu items when switching between operating modes.  e.g. switching from voice SSB to picking up an email via 2M packet to sending an email via VARA HF to FM voice on a repeater.  One of the primary design goals is to have NodeRig working along side of Winlink Express to provide an effecient emergency communications platform.  **The bottom line is the purpose of NodeRig is to automate the radio and allow the operator to focus on getting the messages to where they are going.**

Right now NodeRig is *mostly* ‘read only’, i.e. you will need to use the rig to configure the settings/menu items and then save the settings you want to control on the app (Op Modes).  The plan is to eventually make it a complete control app so that the buttons and knobs on the rig are manual backups.  

NodeRig is also tested on a regular basis with Fldigi and WSJT-X.

### Features (totally incomplete)

* Automaticly switches Op Modes based on any rig setting.  So it's been frequency and maybe mode == 'C4FM'.
* Shuts down rig if high SWR is detected
* Can declutter the UI by only showing the rig and menu settings of interest.
* Can show what changes to the rig's settings have been made since the last Op Mode was loaded.
* Unlimited memory channels.
