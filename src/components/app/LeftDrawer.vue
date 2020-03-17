<template>
  <v-navigation-drawer
    class="grey darken-4"
    :mini-variant="mini"
    permanent
    fixed
    dark
    app
  >
    <!--## START: drawerItems loop -->
    <v-list
      class="flex-column py-0"
      height="100%"
      transition="slide-x-transition"
    >
      <div v-for="item in drawerItems" :key="item.id">
        <!--##- check item type 'title', enables menu toggling on item click -->
        <template v-if="item.type === 'title'">
          <v-fade-transition>
            <v-list-item @click.stop="mini = !mini" dense>
              <v-list-item-action>
                <v-scale-transition>
                  <v-icon v-if="mini">{{ item.icon }}</v-icon>
                  <v-icon v-else>mdi-close</v-icon>
                </v-scale-transition>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ item.value }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-fade-transition>
        </template>
        <!--##- check item type 'link', drawerItem needs to have 'to' property can be empty -->
        <template v-if="item.type === 'link'">
          <v-fade-transition>
            <v-list-item link :to="item.to" :title="item.value">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.value }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-fade-transition>
        </template>
      </div>
    </v-list>
    <!--## END: drawerItems loop -->

    <!--## START: main drawer append (clear cache & theme toggle) -->
    <template slot="append">
      <v-list class="py-0">
        <!--### START: clear local storage link, opens dialog for confirmation -->
        <v-dialog v-model="dialog" persistent max-width="420">
          <template v-slot:activator="{ on }">
            <v-fade-transition>
              <v-list-item link v-on="on" title="Clear local storage">
                <v-list-item-action>
                  <v-icon>mdi-alert-circle</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Clear local storage</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-fade-transition>
          </template>
          <v-card>
            <v-card-title class="headline pb-2"
              >Clear local storage?</v-card-title
            >
            <v-card-text class="py-2">
              Clearing local storage will result in deletion of all saved state
              data, this includes
              <strong>portfolio</strong> data.<br /><br />
              Pressing "Clear storage" will reload the page.</v-card-text
            >
            <v-card-actions class="pt-2">
              <v-spacer></v-spacer>
              <v-btn text @click.stop="dialog = false">Cancel</v-btn>
              <v-btn color="red darken-4" text @click="clearStorage"
                >Clear storage</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--### END: clear local storage link, opens dialog for confirmation -->

        <!--### START: rapport panel toggler -->
        <v-fade-transition>
          <v-list-item
            @click.stop="rapport = !rapport"
            title="Toggle rapport panel"
          >
            <v-list-item-action>
              <v-icon :color="rapport ? 'primary' : ''">
                mdi-clipboard-text
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Toggle rapport panel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-fade-transition>
        <!--### END: rapport panel toggler -->

        <!--### START: theme toggler -->
        <v-fade-transition>
          <v-list-item
            @click.stop="$vuetify.theme.isDark = !$vuetify.theme.isDark"
            title="Toggle theme"
          >
            <v-list-item-action>
              <v-icon :color="vuetifyTheme ? 'primary' : ''">
                mdi-brightness-4
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Toggle theme</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-fade-transition>
        <!--### END: theme toggler -->
      </v-list>
    </template>
    <!--## END: main drawer append (clear cache & theme toggle) -->
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "LeftDrawer",

  computed: {
    rapport: {
      get() {
        return this.$store.getters.rapport;
      },
      set() {
        this.$store.dispatch("toggleRapport");
      }
    },
    mini: {
      get() {
        return this.$store.getters.mini;
      },
      set() {
        this.$store.dispatch("toggleMini");
      }
    },
    drawerItems() {
      return this.$store.getters.drawerItems;
    },
    vuetifyTheme() {
      return this.$vuetify.theme.isDark;
    }
  },

  watch: {
    vuetifyTheme() {
      this.$store.dispatch("toggleTheme", this.$vuetify.theme.isDark);
    }
  },

  data: () => ({
    dialog: false
  }),

  methods: {
    clearStorage() {
      window.localStorage.removeItem("vuex");
      this.dialog = false;
      setTimeout(() => {
        location.reload();
      }, 250);
    }
  }
};
</script>
