<template>
    <label>
        {{label}}
        <input class="form-control inputs" @input="$emit('update:name', $event.target.value)" type="text" :value="name">
    </label>
    
</template>

<script>
export default{
    name: 'InputText',
    props: {name: String, label: String},
    emits: ['update:name']
}
</script>