<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['name'],
  provide() {
    return {
      pageName: this.name
    }
  }
}
</script>
