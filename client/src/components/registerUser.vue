<template>
    <div>
        <h1>Cadastro de Usúaraio</h1>
        <form @submit.prevent="registerUser">
            <div>
                <label>Nome: </label>
                <input type="text" v-model="name"/>
            </div>
            <div>
                <label>Email: </label>
                <input type="email" v-model="email"/>
            </div>
            <div>
                <label>Senha: </label>
                <input type="password" v-model="password"/>
            </div>
            <button type="submit">Registrar</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        name: 'RegisterUser',
        data() {
            return {
                name: '',
                email: '',
                password: '',
                message: '',
            }
        },
        methods: {
            registerUser(){
                const data = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                console.log(data);
                fetch('http://localhost:3000/api/registerUser', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                    .then(async (res) => {
                        this.message = await res.text();
                    })

                    .catch(async (error) => {
                        this.message = error.message;
                    })
            }  
        },
    }
</script>