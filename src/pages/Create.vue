<template>
  <MainLayoutVue>
    <div class="container">
      <div class="card">
        <div class="card-header">Tambah Siswa</div>
        <div class="card-body">
          <form v-on:submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Nama</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.nama"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Alamat</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.alamat"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label"
                >Provinsi</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.provinsi"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">kota</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                v-model="form.kota"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <router-link to="/dashboard" type="btn" class="mx-2 btn btn-danger"
              >Kembali</router-link
            >
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
  name: "Create",
  components: {
    MainLayoutVue,
  },
  data: function () {
    return {
      form: {
        nama: "",
        alamat: "",
        kota: "",
        provinsi: "",
        email: "",
      },
    };
  },
  methods: {
    clearForm() {
      this.nama = "";
      this.alamat = "";
      this.kota = "";
      this.provinsi = "";
      this.email = "";
    },
    handleSubmit() {
      const token = window.sessionStorage.getItem("token");

      fetch(`${BASE_API_URL}/siswa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(this.form),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success) {
            Swal.fire({
              title: "Success!",
              text: res.message,
              icon: "success",
              confirmButtonText: "Cool",
            }).then(() => {
              this.$router.push("/dashboard");
            });
          }
        });
      this.clearForm();
    },
  },
};
</script>
