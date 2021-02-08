<template>
    <b-card class="pb-2" no-body border-variant="secondary">
        <b-card-header class="px-2 d-flex justify-content-between align-items-left">
            <div @click="toggleDisplayMode">{{ show_display_mode() }}</div>
            <div @click="toggleShowSettings" text-variant="white" bg-variant="secondary">
                 Settings
            </div>
            <div v-show="!edit_mode" @click="edit">Edit</div>
            <div v-show="edit_mode" @click="done">Done</div>
        </b-card-header>
        <div v-show="show_settings" flush>
            <div class="px-2 d-flex justify-content-between align-items-left bg-secondary text-light">
                <div>Description</div>
                <div v-show="!edit_mode">Value</div>
                <div v-show="edit_mode">
                    <span>Fav</span>&nbsp;<span>Saved</span>
                </div>
            </div>
            <div class="list-area">
                <div class="px-2 d-flex justify-content-between align-items-left"
                    v-for="(s, name) in settings"
                    :key="name"
                    v-if="showConfigSetting(s)">

                    <div>{{ s.desc }}<span v-if="s.changed">*</span></div>
                    <div v-show="!edit_mode">{{ s.value }}</div>
                    <div v-show="edit_mode">
                        <span @click="toggleFav(name)">
                            <span v-show="s.fav">
                                <b-icon-check-square></b-icon-square>
                            </span>
                        <span v-show="!s.fav">
                                <b-icon-square></b-icon-square>
                            </span>
                        </span>
                        <span class="pl-3 pr-2" @click="togglesaved(name)">
                            <span v-show="s.saved">
                                <b-icon-check-square></b-icon-square>
                            </span>
                            <span v-show="!s.saved">
                                <b-icon-square></b-icon-square>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
module.exports = {
    data: function() {
        return {
            show_settings: true,
            display_mode: 'fav',
            edit_mode: false,
            show_changed_only: false,
            settings: this.$noderig.settings,
        };
    },
    methods: {
        toggleShowSettings: function() {
            this.show_settings = !this.show_settings;
        },
        toggleDisplayMode: function() {
            switch(this.display_mode) {
            case 'all':     this.display_mode = 'saved'; break;
            case 'changed': this.display_mode = 'fav'; break;
            case 'fav':     this.display_mode = 'all'; break;
            case 'saved':   this.display_mode = 'changed'; break;
            }
        },
        show_display_mode: function() {
            switch(this.display_mode) {
            case 'all':     return 'All';
            case 'changed': return 'Changed';
            case 'fav':     return 'Fav';
            case 'saved':   return 'Saved';
            }
            return 'Unknown';
        },
        showConfigSetting: function(s) {
            switch(this.display_mode) {
            case 'all':     return true;
            case 'changed': return s.changed;
            case 'fav':     return s.fav;
            case 'saved':   return s.saved;
            }
            return false;
        },
        edit: function() {
            this.edit_mode = true;
        },
        done: function() {
            this.edit_mode = false;
        },
        toggleFav: function(name) {
            uibuilder.send({topic: 'settings', event: 'toggle_fav', value: name});
        },
        togglesaved: function(name) {
            uibuilder.send({topic: 'settings', event: 'toggle_saved', value: name});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(self.settings.hasOwnProperty(p.name)) {
                if(p.hasOwnProperty('changed')) {
                    self.settings[p.name].changed = p.changed;
                }
                if(p.hasOwnProperty('fav')) {
                    self.settings[p.name].fav = p.fav;
                }
                if(p.hasOwnProperty('saved')) {
                    self.settings[p.name].saved = p.saved;
                }
                if(p.hasOwnProperty('value')) {
                    self.settings[p.name].value = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
    .list-area {
        overflow: auto;
        max-height: 20em;
        min-height: 5em;
    }
</style>
