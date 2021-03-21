<template>
  <label>
    {{ label }}
    <input
      class="form-control inputs"
      type="text"
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    >
  </label>
</template>

<script>
export default{
    name: 'InputText',
    props: {name: String, label: String},
    emits: ['update:name']
}
</script>