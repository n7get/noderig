<template>
    <b-card no-body border-variant="secondary">
        <b-card-header class="px-2 d-flex justify-content-between align-items-left">
            <div @click="toggleDisplayMode">{{ display_mode }}</div>
            <div text-variant="white" bg-variant="secondary">
                 Settings
            </div>
            <div>All</div>
        </b-card-header>
        <div flush>
        <div class="px-2 d-flex justify-content-between align-items-left bg-secondary text-light">
            <div>Description</div>
            <div>Value</div>
        </div>
        <div class="px-2 d-flex justify-content-between align-items-left"
            v-for="(s, name) in settings"
            :key="name"
            v-if="showConfigSetting(s)">

            <div>{{ s.desc }}<span v-if="s.changed">*</span></div>
            <div>{{ s.value }}</div>
        </div>
    </b-card>
</template>

<script>
module.exports = {
    data: function() {
        return {
            display_mode: 'fav',
            show_changed_only: false,
            settings: this.$noderig.settings,
        };
    },
    methods: {
        toggleDisplayMode: function() {
            if(this.display_mode === 'all') {
                this.display_mode = 'saved';
            }
            else if(this.display_mode === 'saved') {
                this.display_mode = 'fav';
            }
            else {
                this.display_mode = 'all';
            }
        },
        showConfigSetting: function(s) {
            if(this.display_mode === 'all') {
                return (this.show_changed_only && s.changed) || !this.show_changed_only;
            }
            if(this.display_mode === 'fav') {
                return s.fav && ((this.show_changed_only && s.changed) || !this.show_changed_only);
            }
            if(this.display_mode === 'saved') {
                return s.saved && ((this.show_changed_only && s.changed) || !this.show_changed_only);
            }
            return false;
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

