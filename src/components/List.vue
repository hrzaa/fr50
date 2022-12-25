<template>
  <div class="mt-4">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">Nama</th>
          <th scope="col">Alamat</th>
          <th scope="col">Kota</th>
          <th scope="col">Provinsi</th>
          <th scope="col">Email</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="siswa in laravelData.data" :key="siswa?.id">
          <td>{{ siswa?.nama }}</td>
          <td>{{ siswa?.alamat }}</td>
          <td>{{ siswa?.kota }}</td>
          <td>{{ siswa?.provinsi }}</td>
          <td>{{ siswa?.email }}</td>
          <td>
            <div v-if="isAdmin">
              <button
                class="btn mx-2 my-2 btn-danger btn-sm"
                v-on:click="deleteSiswa(siswa.id)"
              >
                Hapus
              </button>
              <router-link
                class="btn mx-2 my-2 btn-primary btn-sm"
                :to="{ name: 'Edit', params: { id: siswa.id } }"
                >Edit
              </router-link>
            </div>
            <div v-else>-</div>
          </td>
        </tr>
      </tbody>
    </table>
    <Bootstrap5Pagination
      :data="laravelData"
      @pagination-change-page="getResults"
    />
  </div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import Swal from "sweetalert2";
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const token = window.sessionStorage.getItem("token");

const props = defineProps({
  isAdmin: false,
});

// const { show } = toRefs(props);
// const isShowing = ref(true);
const laravelData = ref({});

// watch(show, () => {
//   isShowing.value = false;

//   setTimeout(() => {
//     isShowing.value = true;
//   }, 500);
// });
const getResults = async (page = 1) => {
  const response = await fetch(`${BASE_API_URL}/siswa?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + token,
    },
  });
  const result = await response.json();
  laravelData.value = result.data;
};

const deleteSiswa = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(`${BASE_API_URL}/siswa/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: "Bearer " + token,
          },
        });
        const result = await response.json();
        if (result.success) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
            () => {
              getResults();
            }
          );
        } else {
          Swal.fire("Deleted!", result.message, "error").then(() => {
            getResults();
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Deleted!", "Failed to send red request.", "error").then(
          () => {
            getResults();
          }
        );
      }
    }
  });
};
getResults();
</script>
