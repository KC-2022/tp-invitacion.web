    const { createApp } = Vue
    createApp({
    data() {
    return {
    asistencia:[],
    //url:'http://localhost:5000/productos',
    // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
    url:'https://karlaconty.pythonanywhere.com/asistencia', // si ya lo subieron a pythonanywhere
    error:false,
    cargando:true,
    /*atributos para el guardar los valores del formulario */
    id:0,
    nombre:"",
    correo:"",
    }
    },  
    methods: {
    fetchData(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
    this.asistencia = data;
    this.cargando=false
    })
    .catch(err => {
    console.error(err);
    this.error=true
    })
    },
    eliminar(asistencia) {
    const url = this.url+'/' + asistencia;
    var options = {
    method: 'DELETE',
    }
    fetch(url, options)
    .then(res => res.text()) // or res.json()
    .then(res => {
    location.reload();
    })
    },
    grabar(){
    let asistencia = {
    nombre:this.nombre,
    correo: this.correo,
    }
    var options = {
    body:JSON.stringify(asistencia),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow'
    }
    fetch(this.url, options)
    .then(function () {
    alert("Registro grabado")
    window.location.href = "./index.html";
    })
    .catch(err => {
    console.error(err);
    alert("Error al Grabarr")
    })
    }
    },
    created() {
    this.fetchData(this.url)
    },
    }).mount('#app')