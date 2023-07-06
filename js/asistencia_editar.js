console.log(location.search) // lee los argumentos pasados a este formulario
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
data() {
return {
id:"",
nombre:"",
correo:"",
url:'http://localhost:5000/asistencia/'+id,
}
},  
methods: {
fetchData(url) {
fetch(url)
.then(response => response.json())
.then(data => {

console.log(data)
this.id= data.id
this.nombre = data.nombre;
this.correo= data.correo
})
.catch(err => {
console.error(err);
this.error=true
})
},
modificar() {
let asistencia = {
nombre:this.nombre,
correo: this.correo,
}
var options = {
body: JSON.stringify(asistencia),
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
redirect: 'follow'
}
fetch(this.url, options)    
.then(function () {
alert("Registro modificado")
window.location.href = "../templates/asistencia.html";
})
.catch(err => {
console.error(err);
alert("Error al Modificar")
})
}
},
created() {
this.fetchData(this.url)
},
}).mount('#app')