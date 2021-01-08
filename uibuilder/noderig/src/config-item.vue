<template>
    <div>
	<span>{{ no }}</span>
	<span>{{ desc }}</span>
	<span>{{ value }}</span>
    </div>
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

