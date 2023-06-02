<template>
    <div>
        <h1>Alteração de Usúaraio</h1>
        <form @submit.prevent="updateUser">
            <div>
                <label>Email da conta que sera alterada: </label>
                <input type="email" v-model="email"/>
            </div>
            <br>
            <br>
            <br>
            <div>
                <label>Novo Nome: </label>
                <input type="text" v-model="name"/>
            </div>
            <div>
                <label>Novo Email: </label>
                <input type="email" v-model="novoEmail"/>
            </div>
            <button type="submit">Alterar</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
    export default {
        name: 'RegisterUser',
        data() {
            return {
                novoEmail:'',
                name: '',
                email: '',
                password: '',
                message: '',
            }
        },
        methods: {
            updateUser(){
                const data = {
                    novoEmail: this.novoEmail,
                    name: this.name,
                    email: this.email,
                }
                console.log(data);
                fetch(`http://localhost:3000/api/updateUser/${data.email}`, {
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