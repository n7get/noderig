<template>
    <div>
            <b-row
                v-for="(ci, no) in config_items"
                :key="no"
		v-show="showConfigItem(no)"
            >
	        <div class="col-1">{{ no }}</div>
	        <div class="col-7">{{ ci.desc }}</div>
	        <div class="col-3">{{ ci.value }}</div>
            </b-row>
    </div>
</template>

<script>
module.exports = {
    components: {
	'config-item': httpVueLoader('config-item.vue'),
    },
    props: [
        'items',
    ],
    data() {
        return {
            config_items: this.$noderig.config_items,
        };
    },
    methods: {
	showConfigItem: function(item_number) {
            if(this.items.length > 0) {
		return this.items.find( e => e === item_number );
            }
            else {
                return true;
            }
        },
        sendClick: function() {
            uibuilder.send({topic: 'CONFIG_EVENT', payload: 'click'});
        },
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('config')) {
                self.config_items[msg.config.no].value = msg.config.value;
            }
        });
    }
}
</script>

