<template>
  <label>
    {{ label }}
    <input
      type="checkbox"
      :value="option"
      :name="name"
      @input="$emit('update:option', [$event.target.value])"
    >
  </label>
</template>

<script>
export default{
    name: 'InputRadio',
    props: {option: Array, label: String, name: String},
    emits: ['update:option']
}
</script>