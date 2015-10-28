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
        title: $('input[name="toDoBlah"]').val()
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
        toDoData.splice(toDoId, 1); ///// NEEDS TO ONLY REMOVE THE SELECTED ID ///
        $('.navBar').html(toDoData.length + ' items to do');
      });

      //////// AND A STRIKETHROUGH-FUNCTION ?!?!?!? ///////
      $('.toDo').on('click', function(event){
        $(this).addClass('complete'); ///// TOGGLE CLASS DOES NOT WORK ////

        ////// clear all ///////
        if($('h3').hasClass('complete')){
          $('.clearFinished').on('click', function(){
            console.log('blue');
            $('.complete').parent('li').remove();
            toDoData.splice(toDoId, 1);
          });
        };
      });
      $('.clearFinished').html('Clear Finished');

      $('h3').on('click', function(event){
        console.log('red');

      });



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



  //////////// EDITING TODOS ///////////////

  $('li').on('click', function(event){
    event.preventDefault();
    $('h3')
  })
},



  loadTemplate: function(el, data, tmpl){
    var template = _.template(templates[tmpl]);
    var html = template(data);
    $(el).append(html);
  }
}
