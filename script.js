
$("#cancel").click(function(){
    clearVal();
});

$("#addRecipe").click(function(){
    $(".blackWindow").attr("hidden",false);
});
var i=0;

class Recipe{
    constructor(id, name, type, description, text, ingredients){

        this.id = id;
        this.name=name;
        this.type=type;
        this.description=description;
        this.text=text;
        this.ingredients=ingredients;
    }
}

var recipies =[];
var ingreds =[];

$("#btnIngred").click(function(){
    var ingredient = $("#ingredients").val();
    //ingreds.push(ingredient);
    $("#ingredConteiner").append("<div class='ingredient'><p class='ingred'>"+ingredient+"</p>"+"<button class='deleteIngred' type='button'>Usuń</button></div>");    
    
    $(".deleteIngred").click(function(){
        let c =$(this).closest('p').val();
        $(this).closest('.ingredient').remove();
    });
});

$("#saveRecipe").click(function(){
    var id = i;
    var name = $("#name").val();
    var type = $("#type").val();
    var description = $("#desc").val();
    var text = $("#text").val();
    $(".ingred").each(function(){
        ingreds.push($(this).closest('p').html());
    });
    
    var ingredients = ingreds;
    i=i+1;

    var recipe = new Recipe(id, name, type, description, text, ingredients);

    recipies.push(recipe);

   // localStorage.setItem("recipies", JSON.stringify(recipies));
    console.log(recipies);
    ingreds = [];
    clearVal(); 
    $(function(){
        var j=0;
        $("#catalog").append("<div id='recipe"+id+"' class='card'>"+
"<label  class='recipe'>"+
"<input type='checkbox' id='checkedbox' checked=''>"+
"<div class='blank'></div>"+
                        "<div class='cardContent'>"+
                            "<div class='card-header firstContent'>"+type+"</div>"+
                            "<div class='card-header secondContent'>"+name+"</div>"+
                        "</div>"+
                        "<div class='cardContent'>"+
                            "<div class='card-body firstContent'>Składniki:<br>"+ingredients+"</div>"+
                            "<div class='card-body secondContent'>"+description+"</div>"+
                        "</div>"+
                        "</label>"+
                    "</div>")
    
    });
    
});

//function to clear every inputs  in add recipe menu 
const clearVal =() =>{
    $(".blackWindow").attr("hidden",true);
    $("#name").val("");
    $("#type").val("");
    $("#desc").val("");
    $("#text").val("");
    $("#ingredients").val("");
    $(".ingredient").remove();
};


if(recipies.length>0)
{$("#recipe"+id).click(function() {
    alert("aaa");
});}
