

//Table of Contents
//-----------------------------------------------------------------------------------------------------------
//Starting function
//Main Class
//function to create recipe
//function to open window with recipe
//General Buttons
//function to creating cards
//function to clear every inputs  in add recipe menu 
//-----------------------------------------------------------------------------------------------------------

//Starting function
$(document).ready(function(){
    var rec = localStorage.getItem('recipies'); 
    if(rec==null)
    {
        i=1;
    }
    if(rec!=null)
    {
        recipies = JSON.parse(rec);
        let temp = recipies.length-1;
        i = recipies[temp].id+1;
        let everyRecipe =0;
        while(everyRecipe<recipies.length)
        {
            cardCreate(recipies[everyRecipe].id, recipies[everyRecipe].type, recipies[everyRecipe].name, recipies[everyRecipe].ingredients, recipies[everyRecipe].description);
            everyRecipe++;
        }
    }
});


//--------------------------------------------------------------------------------------
//Main Class
var i;

class Recipe{
    constructor(id, name, type, link, description, text, ingredients){

        this.id = id;
        this.name=name;
        this.type=type;
        this.link=link;
        this.description=description;
        this.text=text;
        this.ingredients=ingredients;
    }
}

var recipies =[];
var ingreds =[];


//-----------------------------------------------------------------------------------------------
//function to create recipe

$("#btnIngred").click(function(){
    var ingredient = $("#ingredients").val();
    
    $("#ingredConteiner").append("<div class='ingredient col-sm-6'><p class='ingred'>"+ingredient+"</p>"+"<button class='deleteIngred' type='button'>Delete</button></div>");    
    $("#ingredients").val("");
    $(".deleteIngred").click(function(){
        $(this).closest('.ingredient').remove();
    });
});

$("#saveRecipe").click(function(){

    var id = i;
    var name = $("#name").val();
    var type = $("#type").val();
    var link = $("#recipeLink").val();
    var description = $("#desc").val();
    var text = $("#text").val();

    if(link!=0)
    {
        let tempLink = link.substring(0, 8);
        let checkTempLink = "https://";
        if(tempLink!=checkTempLink)
        {
            link = checkTempLink.concat(link);
        }
    }

    if(name==0 && type==0)
    {
        $("#name").attr("placeholder", "You didn't enter a name");
        $("#name").css({"color" : "rgb(255,0,0)"});
        $("#type").attr("placeholder", "You didn't enter a category");
        $("#type").css({"color" : "rgb(255,0,0)"});
        $(".addWindow").scrollTop(0);
    }
    else if(name==0)
    {
        $("#name").attr("placeholder", "Nie podałeś nazwy");
        $("#name").css({"color" : "rgb(255,0,0)"});
        $(".addWindow").scrollTop(0);
    }
    else if(type==0)
    {
        $("#type").attr("placeholder", "Nie podałeś nazwy");
        $("#type").css({"color" : "rgb(255,0,0)"});
        $(".addWindow").scrollTop(0);
    }
    else{
    $(".ingred").each(function(){
        ingreds.push($(this).closest('p').html());
    });
    
    var ingredients = ingreds;
    i=i+1;
    
    var recipe = new Recipe(id, name, type, link, description, text, ingredients);
    recipies.push(recipe);
    

    localStorage.setItem("recipies", JSON.stringify(recipies));
    ingreds = [];
    clearVal(); 
    cardCreate(id, type, name, ingredients, description);
    }
});

//-----------------------------------------------------------------------------------------------
//function to open window with recipe

$(document).on('click', '.openRecipe', function() {
    // e.preventDefault();
    var recipeId = $(this).attr("recipe-id"); 
    let u=0; 
    let search =0;
    while(search < recipeId)
    {
        search =  recipies[u].id;
        u++;
    }

    if(search == recipeId) 
    {
        var j=u-1;
        $("#recipeInformation").attr("hidden",false);
        $("#nameOfRecipe").text(recipies[j].name);
        $("#typeOfRecipe").text(recipies[j].type);
        $("#linkToRecipe").attr("href", recipies[j].link);
        $("#linkToRecipe").attr("title", recipies[j].link);
        $('.ingredient').remove();
        let k=0;
        while(k<recipies[j].ingredients.length)
        {
            $("#ingrediantsOfRecipe").append("<div class='ingredient' ingrediant='"+k+"'>- "+recipies[j].ingredients[k]+"<div>");
            k++;
        }
        $("#textOfRecipe").text(recipies[j].text);
    } 
    $(".addWindow").scrollTop(0);

    $("#editRecipe").click(function(e){
        e.preventDefault();
        $(".blackWindow").attr("hidden",true);
        $("#recipeAdding").attr("hidden",false);
        $("#saveRecipe").attr("hidden", true);
        $("#saveEdit").attr("hidden", false);
        $("#name").val(recipies[j].name);
        $("#type").val(recipies[j].type);
        $("#recipeLink").val(recipies[j].link);
        $("#desc").val(recipies[j].description);
        $("#text").val(recipies[j].text);
        $('.ingredient').remove();
        $(".addWindow").scrollTop(0);
        let l=0;
        while(l<recipies[j].ingredients.length)
        {
            $("#ingredConteiner").append("<div id='"+l+"' class='ingredient col-sm-6'><p class='ingred'>"+recipies[j].ingredients[l]+"</p>"+"<button class='deleteIngred' type='button'>Delete</button></div>");      
            l++;
        }
        $(".deleteIngred").click(function(){
            $(this).closest('.ingredient').remove();
        }); 

        $('#saveEdit').unbind('click').click(function(){
            recipies[j].name = $("#name").val();
            recipies[j].type = $("#type").val();
            recipies[j].link = $("#recipeLink").val();
            recipies[j].description = $("#desc").val();
            recipies[j].text = $("#text").val();

            $(".ingred").each(function(){
                ingreds.push($(this).closest('p').html());
            });
            recipies[j].ingredients = ingreds;
            ingreds = [];
    
            $("#name"+recipeId+"").html(recipies[j].name);
            $("#type"+recipeId+"").html(recipies[j].type);
            $("#description"+recipeId+"").html(recipies[j].description);
            $("#ingredients"+recipeId+"").html("Ingredients:<br>"+recipies[j].ingredients);
            clearVal(); 
            localStorage.setItem("recipies", JSON.stringify(recipies));
        });
    });
    $('#deleteRecipe').unbind('click').click(function(){
        idDelete = "#"+recipeId+"";
        $(idDelete).remove();
        recipies.splice(j, 1);   
        $("#recipeInformation").attr("hidden",true);
        localStorage.setItem("recipies", JSON.stringify(recipies));
    });
 });

//-----------------------------------------------------------------------------------------------
//General Buttons
$("#brand").click(function(){
    location.reload();
});

$(".cancel").click(function(){
    clearVal();
});

$("#btnInfo").click(function(){
    $(".blank").attr("hidden",false);
});

$(".blank").click(function(){
    $(".blank").attr("hidden",true);
});
$(".blankDelete").click(function(){
    $(".blankDelete").attr("hidden",true);
});

$("#addRecipe").click(function(){
    $("#recipeAdding").attr("hidden",false);
    $("#saveRecipe").attr("hidden", false);
    $("#saveEdit").attr("hidden", true);
    $(".addWindow").scrollTop(0);
});
$("#DeleteRecipes").click(function(){
    $(".blankDelete").attr("hidden",false);
    $("#clearLocalStorage").attr("hidden",false);
    $("#btnDeleteAll").click(function(){
        localStorage.removeItem("recipies");
        location.reload();
    });
}); 


//-----------------------------------------------------------------------------------------------
//function to creating cards
const cardCreate = (id, type, name, ingredients, description) =>{
    $("#catalog").append(
        "<a href='#' id='"+id+"'  class='card openRecipe' recipe-id='"+id+"'>"+
        "<div class='cardContent'>"+
            "<div id='type"+id+"' class='card-header firstContent addCategory '>"+type+"</div>"+
            "<div id='name"+id+"' class='card-header secondContent cardTitle'>"+name+"</div>"+
        "</div>"+
            "<div class=' cardContent'>"+
                "<div id='ingredients"+id+"' class='card-body firstContent addIngrid'>Ingredients:<br>"+ingredients+"</div>"+
                "<div id='description"+id+"' class='card-body secondContent addDescription'>"+description+"</div>"+
            "</div>"+    
    "</a>");

};
//-----------------------------------------------------------------------------------------------
//function to clear every inputs  in add recipe menu 
const clearVal =() =>{
    $(".blackWindow").attr("hidden",true);
    $("#name").val("");
    $("#type").val("");
    $("#recipeLink").val("");
    $("#desc").val("");
    $("#text").val("");
    $("#ingredients").val("");
    $(".ingredient").remove();

    $("#name").attr("placeholder", "Enter name");
    $("#type").attr("placeholder", "Enter category");
    $("#name").css({"color" : "#525252"});
    $("#type").css({"color" : "#525252"});
    
};


