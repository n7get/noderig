<template>
    <b-row>
	<div class="col-1">{{ no }}</div>
	<div class="col-7">{{ desc }}</div>
	<div class="col-3">{{ value }}</div>
    </b-row>
</template>

<script>
module.exports = {
    props: {
        no: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        value: {
            type: String
        },
    },
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
    }
}
</script>

