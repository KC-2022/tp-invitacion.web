function descargarExcel() {
  // Clonar la tabla de asistencias
  var tabla = document.getElementById('tabla-asistencias');
  var tablaClonada = tabla.cloneNode(true);

  // Eliminar la columna "Acciones" de la tabla clonada
  var columnasAcciones = tablaClonada.querySelectorAll('[data-column="acciones"]');
  columnasAcciones.forEach(function (columna) {
    columna.remove();
  });

  // Crear un nuevo libro de Excel
  var workbook = XLSX.utils.book_new();

  // Crear una hoja de cálculo y agregar los datos de la tabla clonada
  var worksheet = XLSX.utils.table_to_sheet(tablaClonada);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Asistencias');

  // Guardar el archivo Excel
  var fecha = new Date().toLocaleDateString().replace(/\//g, '-');
  var nombreArchivo = 'listado-asistencias-' + fecha + '.xlsx';
  XLSX.writeFile(workbook, nombreArchivo);
}



