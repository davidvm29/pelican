
  document.addEventListener('DOMContentLoaded', function () {
  //var calendarLinks = JSON.parse('{{ calendar_links|tojson }}'.replace(/&quot;/g, '"'));
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth() + 1; // JavaScript cuenta los meses desde 0
  

  // Función para actualizar el calendario y marcar el día actual
  function updateCalendar(year, month) {
    createCalendar(year, month);
    markCurrentDay();
  }

  // Función para crear el calendario y mostrar los enlaces de noticias
  function createCalendar(year, month) {
    let d = new Date(year, month - 1, 1);
    let table = '<tr>';

    // Ajustar el encabezado del mes actual
    document.getElementById('currentMonth').textContent = monthName(month) + ' ' + year;

    // Espacios para los días hasta el primer día del mes
    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    while (d.getMonth() == month - 1) {
      let day = d.getDate();
      let dateStr = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + day).slice(-2)}`;
      let cellText = day; // Texto predeterminado para la celda

      if (calendarLinks[dateStr]) {
        // Generar enlaces para las noticias si existen en calendarLinks
        cellText = `<a href="#" class="news-link" data-date="${dateStr}">${day}</a>`;
      }

      table += `<td class="calendarDate">${cellText}</td>`;

      if (getDay(d) % 7 == 6) { // Si es el último día de la semana, empezar una nueva fila
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    // Rellenar los espacios restantes de la semana, si los hay
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    table += '</tr>';
    document.getElementById('calendarBody').innerHTML = table;
    
    document.querySelectorAll('.news-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const date = this.getAttribute('data-date');
    
        // Aquí asumimos que `calendarLinks[date]` ahora incluye objetos con toda la información necesaria.
        // Ejemplo de objeto dentro de `calendarLinks[date]`: [{url: "...", title: "...", date: "...", location: "..."}]
    
        // Guardar los enlaces de noticias y toda la información relacionada para la fecha clicada en `sessionStorage`
        sessionStorage.setItem('newsForDate', JSON.stringify(calendarLinks[date]));
        console.log(JSON.stringify(calendarLinks[date]))
        // Redirigir a la nueva página
        if (idioma == 'es') {
            window.location.href = SITEURL + '/noticiasFiltradas.html';
        } else {
            window.location.href = SITEURL +'/en/noticiasFiltradas-en.html';
        }
      });
    });
    
  
  }

  // Función para marcar el día actual
  function markCurrentDay() {
    const today = new Date();
    if (today.getFullYear() === currentYear && today.getMonth() + 1 === currentMonth) {
      const currentDay = today.getDate();
      const days = document.querySelectorAll('#calendarBody td');
      days.forEach(day => {
        if (day.textContent == currentDay) {
          day.classList.add('current-day');
        }
      });
    }
  }

  // Función para obtener el día de la semana ajustado (haciendo que el lunes sea 0)
  function getDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7; // Convertir domingo a 7
    return day - 1;
  }

  // Función para obtener el nombre del mes
  function monthName(month) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[month - 1];
  }

  // Función para ir al mes anterior
  document.getElementById('prevMonthLink').addEventListener('click', function (event) {
    event.preventDefault();
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    updateCalendar(currentYear, currentMonth);
  });

  // Función para ir al siguiente mes
  document.getElementById('nextMonthLink').addEventListener('click', function (event) {
    event.preventDefault();
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    updateCalendar(currentYear, currentMonth);
  });

  // Inicializar el calendario con el mes actual
  updateCalendar(currentYear, currentMonth);
});
