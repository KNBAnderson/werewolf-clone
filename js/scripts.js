$(function(){

  var newGame = new Game();
  $('form').submit(function(e) {
   e.preventDefault();
   for (let i = 1; i <= 4; i++) {
     var name = $('input#name' + i).val();
     var player = new Player(name);
     //assign role?
   }

   var size = $('input:radio[name=size]:checked').val();
   var sauce = $('input:radio[name=sauce]:checked').val();
   var cheese = $('input:radio[name=cheese]:checked').val();
   var toppings = []; $('input:checkbox[name=topping]:checked').each(function(){
     toppings.push($(this).val());
  });
});
