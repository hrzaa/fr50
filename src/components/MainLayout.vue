<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">UAS</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isAuth">
              <a class="nav-link" href="#" v-on:click="handleLogout()"
                >Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data: function () {
    return {
      isAuth: false,
    };
  },
  updated: function () {
    this.checkUser();
  },
  created: function () {
    this.checkUser();
  },
  methods: {
    handleLogout() {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("user");
      this.$router.push("/");
    },
    checkUser() {
      let user = window.sessionStorage.getItem("user");
      this.isAdmin = user !== null && true;
    },
  },
};
</script>
