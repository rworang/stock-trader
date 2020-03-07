<template>
  <v-card-title>
    <slot name="name" />
    <slot name="abbr" />
  </v-card-title>
</template>

<script>
export default {
  name: "CardTitle"
};
</script>
