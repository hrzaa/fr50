<template>
   <MainLayoutVue>
        <div class="container">
            <div class="card">
                <div class="card-header">
                    Login
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="" class="form-label">Name</label>
                            <input type="text" class="form-control" id="" aria-describedby="emailHelp" v-model="name">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"  >
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    
    </MainLayoutVue>
</template>

<script>
import MainLayoutVue from '../components/MainLayout.vue';
export default {
    name:'Login',
    components:{
        MainLayoutVue
    },
    data: function() {
        return {
            name:"",
            email:"",
            password:"",
            
        }
    },
    methods:{
        clearForm(){
            this.name=""
            this.email=""
            this.password=""
        },

        handleSubmit(){
            try {
                const response = fetch(`http://127.0.0.1:8000/api/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        name:this.name, 
                        email:this.email, 
                        password:this.password
                    }),
                    
                })
                    .then(response => response.json())
                    .then(json => console.log(json));
                // const result = response.json();
                // console.log(result);
            } catch (error) {
                console.log(error);
            }
            this.clearForm();
        }
    }
    

}
</script>

