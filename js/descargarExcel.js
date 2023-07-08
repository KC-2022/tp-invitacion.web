function descargarExcel() {
  // Obtener los datos de la tabla de asistencias
  var data = [];
  var tabla = document.getElementById('tabla-asistencias');
  var filas = tabla.querySelectorAll('tbody tr');

  // Obtener los encabezados de columna
  var encabezados = [];
  var encabezadosTabla = tabla.querySelectorAll('thead th');
  encabezadosTabla.forEach(function (encabezado) {
    encabezados.push(encabezado.innerText);
  });
  data.push(encabezados);

  // Recorrer las filas de la tabla y obtener los datos de cada celda
  filas.forEach(function (fila) {
    var rowData = [];
    var celdas = fila.querySelectorAll('td');

    celdas.forEach(function (celda) {
      rowData.push(celda.innerText);
    });

    data.push(rowData);
  });

  // Crear un libro de Excel
  var workbook = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(data);

  // Agregar la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Asistencias');

  // Guardar el archivo Excel
  var fecha = new Date().toLocaleDateString().replace(/\//g, '-');
  var nombreArchivo = 'listado-asistencias-' + fecha + '.xlsx';
  XLSX.writeFile(workbook, nombreArchivo);
}







