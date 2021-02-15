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

* Shuts down rig if high SWR is detected
* Can show what changes to the rig's settings have been made since the last Op Mode was loaded.
* Automaticly switches Op Modes based on frequency.
* Unlimited memory channels.

### Notes for Docs

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
* Added generic widget for level type settings, s-level.  Changed power level to use new UI widget.  Added widgets for mic gain, squelclh level amd monitor level.  Level controls can also toggle the overstate of the setting.
* Generic widget for level type of menu items.  This allows menu items to be presented to the UI in the same way as power level or mic gain.  The menu item implemented is 73 - DATA OUT LEVEL.
* Import and export for Op Modes and Mem Chans.

### Install
Node-red Palettes to install:
	node-red-node-serialport
	node-red-contrib-uibuilder

Npm packages to install under ~/.node-red
vue
bootstrap-vue
@popperjs/core
ajv

uibuilder packages to install:

Changes to settings.js:
--- settings.js-orig    2021-01-18 08:35:16.417432800 -0800
+++ settings.js 2021-02-10 18:15:27.264486600 -0800
@@ -238,6 +238,8 @@
         // os:require('os'),
         // jfive:require("johnny-five"),
         // j5board:require("johnny-five").Board({repl:false})
+       _: require('lodash'),
+       Ajv: require('ajv').default,
     },
     // `global.keys()` returns a list of all properties set in global context.
     // This allows them to be displayed in the Context Sidebar within the editor.
@@ -254,11 +256,10 @@
     // provided here will enable file-based context that flushes to disk every 30 seconds.
     // Refer to the documentation for further options: https://nodered.org/docs/api/context/
     //
-    //contextStorage: {
-    //    default: {
-    //        module:"localfilesystem"
-    //    },
-    //},
+    contextStorage: {
+        persist: { module:"localfilesystem" },
+       default: { module: "memory" },
+    },

     // The following property can be used to order the categories in the editor
     // palette. If a node's category is not in the list, the category will get
@@ -290,7 +291,7 @@
     editorTheme: {
         projects: {
             // To enable the Projects feature, set this value to true
-            enabled: false
+            enabled: true
         }
     }
 }