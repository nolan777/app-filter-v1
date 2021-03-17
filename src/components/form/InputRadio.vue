<template>
    <label>
        {{label}}
        <input type="checkbox" @input="$emit('update:option', [$event.target.value])" :value="option" :name="name">
    </label>
    
</template>

<script>
export default{
    name: 'InputRadio',
    props: {option: Array, label: String, name: String},
    emits: ['update:option']
}
</script>