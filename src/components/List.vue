<template>
    <div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <!-- <th scope="col">No</th> -->
                    <th scope="col">Nama</th>
                    <th scope="col">Alamat</th>
                    <th scope="col">Kota</th>
                    <th scope="col">Provinsi</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(siswa,i) in laravelData.data" :key="siswa?.id"> -->
                <tr v-for="(siswa) in laravelData.data" :key="siswa?.id">
                    <!-- <td>{{i++}}</td> -->
                    <!-- <th scope="row">{{ i+1 }}</th> -->
                    <td>{{ siswa?.nama }}</td>
                    <td>{{ siswa?.alamat }}</td>
                    <td>{{ siswa?.kota }}</td>
                    <td>{{ siswa?.provinsi }}</td>
                    <td>{{ siswa?.email }}</td>
                </tr>
            </tbody>
        </table>

        <!-- <ul>
            <li v-for="siswa in laravelData.data" :key="siswa?.id">{{ siswa?.nama }}</li>  
        </ul> -->

        <Bootstrap5Pagination :data="laravelData" @pagination-change-page="getResults" />
    </div>
</template>

<script setup>
import {ref} from 'vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';

const laravelData=ref({});

const getResults = async(page=1) => {
    const response = await fetch(`http://127.0.0.1:8000/api/siswa?page=${page}`);
    
    const result = await response.json();
    laravelData.value = result.data;

    // console.log(response.json());
}

getResults();




</script>