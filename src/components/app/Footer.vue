<template>
  <v-footer absolute dark>
    <v-row>
      <v-col class="white--text text-center">
        {{ $appName + " &copy; " + $date().format("YYYY") }}
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  name: "Footer",

  computed: {},

  data: () => ({}),

  methods: {}
};
</script>
