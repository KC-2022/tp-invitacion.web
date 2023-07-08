const { createApp } = Vue;
createApp({
  data() {
    return {
      asistencia: [],
      url: 'https://karlaconty.pythonanywhere.com/asistencia',
      error: false,
      cargando: true,
      id: 0,
      nombre: "",
      correo: "",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.asistencia = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(asistencia) {
      const url = this.url + '/' + asistencia;
      var options = {
        method: 'DELETE',
      };
      fetch(url, options)
        .then(res => res.text())
        .then(res => {
          location.reload();
        });
    },
    enviarFormulario() {
      if (!this.validarFormulario()) {
        alert("Completa todos los campos");
        return;
      }

      let asistencia = {
        nombre: this.nombre,
        correo: this.correo,
      };
      var options = {
        body: JSON.stringify(asistencia),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };
      fetch(this.url, options)
        .then(() => {
          alert("Registro grabado");
          window.location.href = "./index.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
    validarFormulario() {
      return this.nombre.trim() !== "" && this.correo.trim() !== "";
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount('#app');