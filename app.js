$(document).ready(function(){
  page.init();
});

var page = {


  init: function(){
    page.styling();
    page.events();
  },

  styling: function(){
    _.each(toDoData, function(currVal, idx, arr){
      page.loadTemplate('.toDoList', currVal, 'toDoTemplate')
    });

  },

  events: function(){


    ////////// APPEND NEWTODO ///////
    $('form').on('submit', function(event){
      event.preventDefault();
      var newToDo = {
        title: $('input').val()
      };
      toDoData.push(newToDo);
      var toDoId = toDoData.indexOf(newToDo);
      newToDo.id = toDoId;
      page.loadTemplate($('.toDoList'), newToDo, 'toDoTemplate');
      $('input').val('');

      ///// LISTS LENGTHOF ARRAY ///
      $('.navBar').html(toDoData.length + ' items to do');

      ////////// DELETE BUTTON WITHIN A SUBMIT BUTTON???? WTF!?! /////
      $('.toDoList').on('click', '.delete', function(event){
        $(this).closest('article').remove();
        console.log(toDoId);
        toDoData.splice(toDoId, 1); ///// NEEDS TO ONLY REMOVE THE SELECTED ID ///
        $('.navBar').html(toDoData.length + ' items to do');
      });

      //////// AND A STRIKETHROUGH-FUNCTION ?!?!?!? ///////
      $('.toDo').on('click', function(event){
        $(this).addClass('complete'); ///// TOGGLE CLASS DOES NOT WORK ////


      ////////////JSHARIPE HELPED WITH SLACK.TIP //////////////
      $('.toDo').bind('dblclick', function(){
        $(this).attr('contentEditable', true)
      })
      $('.toDo').bind('blur', function(){
        $(this).attr('contentEditable', false)
      })

        ////// clear all ///////
        if($('h3').hasClass('complete')){
          $('.clearFinished').on('click', function(){
            $('.complete').parent('li').remove();
            toDoData.splice(toDoId, 1);
          });
        };
      });
      $('.clearFinished').html('Clear Finished');



  });
////////////////////////////// SHOW BUTTONS ///////////////////////////
  ///// show all //////
  $('.showAll').on('click', function(event){
    event.preventDefault();
    $('.toDo').parent('li').removeClass('hidden');
  });
  ////// show active /////
  $('.showActive').on('click', function(event){
    event.preventDefault();
    $('.toDo').parent('li').removeClass('hidden');
    $('.complete').parent('li').addClass('hidden');
  });
  ///// show completed /////
  $('.showCompleted').on('click', function(event){
    event.preventDefault();
    $('.toDo').parent('li').addClass('hidden');
    $('.complete').parent('li').removeClass('hidden');
  });

},



  loadTemplate: function(el, data, tmpl){
    var template = _.template(templates[tmpl]);
    var html = template(data);
    $(el).append(html);
  }
}






//
// $('body').on('keypress', 'input', function(event){
//   if(event.charCode===13){
//     var editToDo = {
//       title: $('input[value]').val()
//     };
//     toDoData.push(editToDo);
//
//     console.log('enter')
//   };
// });
// $('body').on('dblclick', '.toDo', function(){
//   currVal = $(this).text();
//   $(this).replaceWith("<input type = 'text' value='" + currVal + "'>");
//
// });
