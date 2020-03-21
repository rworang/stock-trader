<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login {{ $auth.check() }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                v-model="email"
                label="Email"
                name="email"
                type="email"
                id="email"
              />

              <v-text-field
                prepend-icon="lock"
                v-model="password"
                label="Password"
                name="password"
                type="password"
                id="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="submit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: null,
    password: null
  }),
  beforeDestroy() {
    this.$store.commit("SET_ERRORS", null);
    this.$store.dispatch("setLoading", false);
    this.$store.commit("SET_SUCCESS_MESSAGE", null);
  },
  methods: {
    submit() {
      this.$store.commit("SET_ERRORS", null);
      this.$store.commit("SET_SUCCESS_MESSAGE", null);

      this.$store.dispatch("setLoading", true);
      this.$auth.login({
        method: "post",
        authType: "bearer",
        url: "auth/login",
        data: { email: this.email, password: this.password },
        rememberMe: true,
        fetchUser: false,
        success: response => {
          this.$auth.token(null, response.data.token);
          this.$auth.user(response.data.data);
          this.$store.commit("SET_ERRORS", null);
          this.$store.dispatch("setLoading", false);
          this.$router.push({
            name: "stocks"
          });
        },
        error: errors => {
          this.$store.dispatch("setLoading", false);
          this.$store.commit("SET_ERRORS", errors.response.data);
        }
      });
    }
  }
};
</script>
