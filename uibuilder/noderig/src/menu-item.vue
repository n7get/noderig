<template>
    <b-card class="pb-2" no-body border-variant="secondary">
        <b-card-header class="px-2 d-flex justify-content-between align-items-left">
            <div @click="toggleDisplayMode">{{ showDisplayMode() }}</div>
            <div @click="toggleShowMenuItems" text-variant="white" bg-variant="secondary">
                Menu Items
            </div>
            <div v-show="!edit_mode" @click="edit">Edit</div>
            <div v-show="edit_mode" @click="done">Done</div>
        </b-card-header>
        <div v-show="show_menu_items" flush>
            <div class="px-2 d-flex justify-content-between align-items-left bg-secondary text-light">
                <div>no Description</div>
                <div v-show="!edit_mode">Value</div>
                <div v-show="edit_mode">
                    <span>Fav</span>&nbsp;<span>Saved</span>
                </div>
            </div>
            <div class="list-area">
                <div class="px-2 d-flex justify-content-between align-items-left"
                    v-for="(mi, no) in menu_items"
                    :key="no"
                    v-if="showMenuItem(mi)">

                    <div><span :class="{pad: no < 10}">{{ no }}</span>&nbsp;{{ mi.desc }}<span v-if="mi.changed">*</span></div>
                    <div v-show="!edit_mode">{{ mi.value }}</div>
                    <div v-show="edit_mode">
                        <span @click="toggleFav(no)">
                            <span v-show="mi.fav">
                                <b-icon-check-square></b-icon-square>
                            </span>
                            <span v-show="!mi.fav">
                                <b-icon-square></b-icon-square>
                            </span>
                        </span>
                        <span class="pl-3 pr-2" @click="togglesaved(no)">
                            <span v-show="mi.saved">
                                <b-icon-check-square></b-icon-square>
                            </span>
                            <span v-show="!mi.saved">
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
            show_menu_items: true,
            display_mode: 'fav',
            edit_mode: false,
            show_changed_only: false,
            menu_items: this.$noderig.menu_items,
        };
    },
    methods: {
        toggleDisplayMode: function() {
            switch(this.display_mode) {
            case 'all':     this.display_mode = 'saved'; break;
            case 'changed': this.display_mode = 'fav'; break;
            case 'fav':     this.display_mode = 'all'; break;
            case 'saved':   this.display_mode = 'changed'; break;
            }
        },
        showDisplayMode: function() {
            switch(this.display_mode) {
            case 'all':     return 'All';
            case 'changed': return 'Changed';
            case 'fav':     return 'Fav';
            case 'saved':   return 'Saved';
            }
            return 'Unknown';
        },
        showMenuItem: function(mi) {
            switch(this.display_mode) {
            case 'all':     return true;
            case 'changed': return mi.changed;
            case 'fav':     return mi.fav;
            case 'saved':   return mi.saved;
            }
            return false;
        },
        edit: function() {
            this.edit_mode = true;
        },
        done: function() {
            this.edit_mode = false;
        },
        toggleFav: function(no) {
            uibuilder.send({topic: 'menu_item', event: 'toggle_fav', value: no});
        },
        togglesaved: function(no) {
            uibuilder.send({topic: 'menu_item', event: 'toggle_saved', value: no});
        },
        toggleShowMenuItems: function() {
            this.show_menu_items = !this.show_menu_items;
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
                    var MenuValueConverter = this.$noderig.MenuValueConverter;

                    self.menu_items[p.no].value = MenuValueConverter.toUi(p.no, p.value);
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
    .list-area {
        overflow: auto;
        max-height: 20em;
        min-height: 5em;
    }
    .pad {
        padding-left: .5em;
    }
</style>
