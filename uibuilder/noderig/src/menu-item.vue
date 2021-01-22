<template>
    <b-card no-body border-variant="secondary">
        <b-card-header class="px-2 d-flex justify-content-between align-items-left">
            <div @click="toggleDisplayMode">{{ display_mode }}</div>
            <div text-variant="white" bg-variant="secondary">
                Menu Items
            </div>
            <div>All</div>
        </b-card-header>
        <div>
            <div class="px-2 d-flex justify-content-between align-items-left bg-secondary text-light">
                <div>no Description</div>
                <div>Value</div>
            </div>
            <div class="px-2 d-flex justify-content-between align-items-left"
                v-for="(ci, no) in menu_items"
                :key="no"
                v-if="showMenuItem(ci)">

                <div><span :class="{pad: no < 10}">{{ no }}</span>&nbsp;{{ ci.desc }}<span v-if="ci.changed">*</span></div>
                <div>{{ ci.value }}</div>
            </div>
        </div>
    </b-card>
</template>

<script>
module.exports = {
    data: function() {
        return {
            display_mode: 'fav',
            show_changed_only: false,
            menu_items: this.$noderig.menu_items,
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
        showMenuItem: function(ci) {
            if(this.display_mode === 'all') {
                return (this.show_changed_only && ci.changed) || !this.show_changed_only;
            }
            if(this.display_mode === 'fav') {
                return ci.fav && ((this.show_changed_only && ci.changed) || !this.show_changed_only);
            }
            if(this.display_mode === 'saved') {
                return ci.saved && ((this.show_changed_only && ci.changed) || !this.show_changed_only);
            }
            return false;
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'menu_item') {
                if(p.hasOwnProperty('changed')) {
                    self.menu_items[p.no].changed = p.changed;
                }
                if(p.hasOwnProperty('fav')) {
                    self.menu_items[p.no].fav = p.fav;
                }
                if(p.hasOwnProperty('saved')) {
                    self.menu_items[p.no].saved = p.saved;
                }
                if(p.hasOwnProperty('value')) {
                    self.menu_items[p.no].value = p.value;
                }
            }

            if(p.name === 'config') {
                console.log('config: ' + config);
            }
        });
    }
}
</script>
<style scoped>
    .pad {
        padding-left: .5em;
    }
</style>
