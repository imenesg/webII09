<template>
    <div>
        <form @submit.prevent="deletUser">
            <input type="email" v-model="emailInput">
            {{ emailInput }}
            <button type="submit">Deletar Usuario</button>
            <p>{{ msg }}</p>
        </form>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
            emailInput:''
           
        }
    },
    methods: {
        async deletUser(){
            const data = {
                    email: this.emailInput,
                }
            fetch(`http://localhost:3000/api/deleteUser/${data.email}`, {
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                })
                    .then(async (res) => {
                        this.msg = res.text();
                    })

                    .catch(async (error) => {
                        this.message = error.message;
                    })
        }
    },
}
</script>