<template>
  <MainLayoutVue>
    <div class="container">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form v-on:submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Email address</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label"
                >Password</label
              >
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                v-model="password"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </MainLayoutVue>
</template>

<script>
import MainLayoutVue from "../components/MainLayout.vue";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import Swal from "sweetalert2";
export default {
  name: "Login",
  components: {
    MainLayoutVue,
  },
  data: function () {
    return {
      isAdmin: false,
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    clearForm() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
    handleSubmit() {
      fetch(`${BASE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            window.sessionStorage.setItem("token", res.token);
            window.sessionStorage.setItem("user", JSON.stringify(res.user));
            Swal.fire({
              title: "Success!",
              text: "Login berhasil",
              icon: "success",
            }).then(() => {
              this.$router.push("/dashboard");
            });
          } else {
            Swal.fire({
              title: "Failed!",
              text: res.message || res.error,
              icon: "error",
            });
          }
        });
      this.clearForm();
    },
  },
};
</script>
