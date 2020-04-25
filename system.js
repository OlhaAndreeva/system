$(document).ready(function () {
    $.getJSON('https://shedules.herokuapp.com/api/rooms/', function (rooms) {
        rooms.forEach(function(value) {
            $('#room').append($("<option></option>", {'value': value.id, 'text': value.number}));
        })
    });
});


$(document).ready(function () {
    const days = ['Понеділок', 'Вівторок', 'Середа', 'Четверг', 'П\'ятниця'];
  
    $.getJSON('https://shedules.herokuapp.com/api/schedules/', function (data) {
      let sortData = [];
      let newData = [];
  
      for (let i = 0; i < days.length; i++) {
        $.each(data, function (key, val) {
          if (val.day_of_week === days[i]) {
            sortData.push(val);
          }
        });
      }
      sortData.sort(compareLesson)
  
      for (let i = 0; i < days.length; i++) {
        let dayLength = 0;
        let tempData = [];
        $.each(sortData, function (key, val) {
          if (val.day_of_week === days[i]) {
            dayLength++;
            tempData.push({ lesson: val.lesson, group_id: val.group_id, room_id: val.room_id });
          }
        });
  
        let t = [];
        for (let j = 1; j <= 5; j++) {
          let lessonLength = 0;
          let newTempData = [];
          $.each(tempData, function (key, val) {
            if (val.lesson === j) {
              lessonLength++;
              newTempData.push({ group_id: val.group_id, room_id: val.room_id });
            }
          });
          if (lessonLength === 0) {
            break;
          }
          t.push({ lesson: j, lessonLength, data: newTempData })
        }
        newData.push({ day: days[i], dayLength, data: t })
      }
  
      $.each(newData, function (key, val) {
        $('#schedule tbody').append('' +
          '<tr>' +
          '<td rowspan="' + val.dayLength + '">' + val.day + '</td>' +
          '<td rowspan="' + val.data[0].lessonLength + '">' + val.data[0].lesson + '</td>' +
          '<td>' + val.data[0].data[0].room_id + '</td>' +
          '<td>' + val.data[0].data[0].group_id + '</td>' +
          '</tr>');
  
        $.each(val.data, function (ke, va) {
          if (ke === 0) {
            return;
          }
          if (va.lessonLength > 1 && va.lesson !== 1) {
            $('#schedule tbody').append('' +
              '<tr>' +
              '<td rowspan="' + va.lessonLength + '">' + va.lesson + '</td>' +
              '<td>' + va.data[0].room_id + '</td>' +
              '<td>' + va.data[0].group_id + '</td>' +
              '</tr>');
  
            $.each(va.data, function (k, v) {
              if (k === 0) {
                return;
              }
              $('#schedule tbody').append('' +
                '<tr>' +
                '<td>' + v.room_id + '</td>' +
                '<td>' + v.group_id + '</td>' +
                '</tr>');
            });
          } else {
            $('#schedule tbody').append('' +
              '<tr>' +
              '<td rowspan="' + va.lessonLength + '">' + va.lesson + '</td>' +
              '<td>' + va.data[0].room_id + '</td>' +
              '<td>' + va.data[0].group_id + '</td>' +
              '</tr>');
          }
        });
      });
    });
  });

  function compareLesson(a, b) {
    if (a['day_of_week'] === b['day_of_week']) {
      if (a['lesson'] > b['lesson']) return 1;
      if (b['lesson'] > a['lesson']) return -1;
    }
  
    return 0;
  }



      $(document).ready(function () {
        $("#search").click(function (event) {
            var days = ($("#day").val());
            var lessons = ($("#lesson").val());
            var rooms = ($("#room").val());
            $("tr").remove();
            $.getJSON('https://shedules.herokuapp.com/api/schedules/'+"?day_of_week=" + days +"&lesson=" + lessons +"&room_id=" + rooms , function (scheds) {
                scheds.forEach(function(value) {           
                        $('#schedule').append('<tr><td>'+value.day_of_week+'</td><td>'+value.lesson+'</td><td>'+value.room_id+'</td><td>'+value.group_id+'</td></tr>');               
                })
            });
        });
    });
