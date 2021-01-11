<template>
    <div>
        <template v-for="(ci, no) in this.$noderig.config_items">
            <config-item
	        v-show="showConfigItem(no)"
                :key="no"
                :no="no"
	        :desc="ci.desc"
            ></config-item>
        </template>
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
            values: {},
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
            }
        });
    }
}
</script>

