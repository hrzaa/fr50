<template>
  <MainLayout>
    <router-link v-if="isAdmin" to="/create" class="btn btn-primary"
      >Tambah Data Siswa</router-link
    >
    <List :isAdmin="isAdmin" />
  </MainLayout>
</template>

<script>
import List from "../components/List.vue";
import MainLayout from "../components/MainLayout.vue";
export default {
  name: "Dashboard",
  components: {
    List,
    MainLayout,
  },
  data: function () {
    return {
      isAdmin: false,
      name: "",
      email: "",
      password: "",
    };
  },
  updated() {
    this.checkUser();
  },
  mounted: function () {
    this.checkUser();
  },
  methods: {
    checkUser() {
      let user = JSON.parse(window.sessionStorage.getItem("user"));
      this.isAdmin = user?.level == "admin";
    },
  },
};
</script>
