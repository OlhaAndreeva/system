$(document).ready(function () {
  $("#search").click(function (event) {
    var days = ($("#day").val());
    var lessons = ($("#lesson").val());
    $("tr").remove();
    $.getJSON('https://shedules.herokuapp.com/api/rooms/'+"?day=" + days +"&lesson=" + lessons, function (scheds) {   
        $('#schedule thead').append("<tr><td>День тижня</td><td>Номер пари</td><td>Аудиторія</td><td>Кількість місць</td></tr>");
        $('#schedule tbody').append('<tr><td rowspan="' + length + '">' + days + '</td><td rowspan="' + length + '">' + lessons + '</td></tr>');
        scheds.forEach(function(value) {
          $('#schedule tbody').append('' +
          '<tr>' +
          '<td>' + value.number + '</td>' +
          '<td>' + value.count + '</td>' +
          '</tr>');
      })
    });
  });
});


