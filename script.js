
$(".cancel").click(function(){
    clearVal();
});

$("#addRecipe").click(function(){
    $("#recipeAdding").attr("hidden",false);
    $("#saveRecipe").attr("hidden", false);
    $("#saveEdit").attr("hidden", true);
});

var i=1;

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

$("#btnIngred").click(function(){
    var ingredient = $("#ingredients").val();
    
    $("#ingredConteiner").append("<div class='ingredient'><p class='ingred'>"+ingredient+"</p>"+"<button class='deleteIngred' type='button'>Usuń</button></div>");    
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
    $(".ingred").each(function(){
        ingreds.push($(this).closest('p').html());
    });
    
    var ingredients = ingreds;
    i=i+1;

    var recipe = new Recipe(id, name, type, link, description, text, ingredients);

    recipies.push(recipe);

   // localStorage.setItem("recipies", JSON.stringify(recipies));
    console.log(recipies);
    ingreds = [];
    clearVal(); 
    cardCreate(id, type, name, ingredients, description);
});

//function to open window with saved recipe
$(document).on('click', '.openRecipe', function(e){
    e.preventDefault();
    var recipeId = $(this).attr("recipe-id"); 
    var u=0; 
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
        $('.ingredient').remove();
        let k=0;
        while(k<recipies[j].ingredients.length)
        {
            $("#ingrediantsOfRecipe").append("<div class='ingredient' ingrediant='"+k+"'>- "+recipies[j].ingredients[k]+"<div>");
            k++;
        }
        $("#textOfRecipe").text(recipies[j].text);
    } 
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

        let l=0;
        while(l<recipies[j].ingredients.length)
        {
            $("#ingredConteiner").append("<div id='"+l+"' class='ingredient'><p class='ingred'>"+recipies[j].ingredients[l]+"</p>"+"<button class='deleteIngred' type='button'>Usuń</button></div>"); 
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
            $("#ingredients"+recipeId+"").html("Składniki:<br>"+recipies[j].ingredients);
            clearVal(); 
            console.log(recipies);
        });
    });
    $('#deleteRecipe').unbind('click').click(function(){
        console.log(recipies);
        console.log(j);
        idDelete = "#"+recipeId+"";
        $(idDelete).remove();
        recipies.splice(j, 1);   
        console.log(recipies);
        $("#recipeInformation").attr("hidden",true);
    });
 });


 // function for button to search recipe
var menuSearch;
$('#btnSearchRecipe').click(function(){
        $("#btnSearchIngredients").prop('disabled', false)
        $("#btnSearchType").prop('disabled', false)
        $("#btnSearchName").prop('disabled', false)
    if(menuSearch==null || menuSearch==false)
    {
        $("#searchMenu").attr("hidden",false);
        menuSearch =true;
    }
    else
    {
        $("#searchMenu").attr("hidden",true);
        $('#textToSearch').text('');
        menuSearch =false;
    }
    $('#btnSearchName').unbind('click').click(function(){
        $("#textToSearch").html("");
        $("#btnSearchIngredients").prop('disabled', false);
        $("#btnSearchType").prop('disabled', false);
        $("#btnSearchName").prop('disabled', true);
        $('#textToSearch').append("<input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz poszukiwaną nazwę'/>");
        
        $("#whatToSearch").keyup(function () {
            $('#catalog').text('');
            let searchText = $("#whatToSearch").val();
            console.log(searchText)
            let p =0;
            while(p<recipies.length)
            {
                let str = recipies[p].name;
                let nbr = searchText.length;
                let result = str.substring(0,nbr);
                if(result==searchText)
                {
                    cardCreate(recipies[p].id, recipies[p].type, recipies[p].name, recipies[p].ingredients, recipies[p].description);
                }
                p++;
            }
        });
    });
    $('#btnSearchType').unbind('click').click(function(){
        $("#textToSearch").html("");
        $("#btnSearchIngredients").prop('disabled', false);
        $("#btnSearchType").prop('disabled', true);
        $("#btnSearchName").prop('disabled', false);
        $('#textToSearch').append("<input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz poszukiwany typ'/>");
     
        $("#whatToSearch").keyup(function () {
            $('#catalog').text('');
            let searchText = $("#whatToSearch").val();
            console.log(searchText)
            let p =0;
            while(p<recipies.length)
            {
                let str = recipies[p].type;
                let nbr = searchText.length;
                let result = str.substring(0,nbr);
                if(result==searchText)
                {
                    cardCreate(recipies[p].id, recipies[p].type, recipies[p].name, recipies[p].ingredients, recipies[p].description);
                }
                p++;
            }
        });
    });

    $('#btnSearchIngredients').unbind('click').click(function(){

        $("#textToSearch").html("");
        $("#btnSearchIngredients").prop('disabled', true);
        $("#btnSearchType").prop('disabled', false);
        $("#btnSearchName").prop('disabled', false);
        $("#textToSearch").append("<div id='findedIngred'></div><input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz poszukiwany składnik'/><button id='btnAddSearchIng'>Szukaj kolejnego składnika</button>");
        
        var arr =[];

        $("#btnAddSearchIng").click(function(){
            
           let add = $("#whatToSearch").val();
           arr.push(add);
           $("#whatToSearch").val('');
           $("#findedIngred").html(arr+",");
           console.log(arr)
        });

        $("#whatToSearch").keyup(function () {
            $('#catalog').text('');
            let searchText = $("#whatToSearch").val();
            console.log(searchText)
            let p =0;
            while(p<recipies.length)
            {
                let g =0;
                while(g<recipies[p].ingredients.length)
                {
                    let str = recipies[p].ingredients[g];
                    let result = str.includes(searchText);  
                    let dl = recipies[p].ingredients.toString();
                    let k = false;
                    let w = 0;
                    while( w < arr.length)
                    {
                        let ingTry = dl.includes(arr[w]);
                        if(ingTry == true)
                        {
                            k=true;
                            w++;
                        }
                        else
                        {
                            k =false;
                            w= arr.length;
                        }   
                    }
                    if(arr.length ==0)
                    {
                        k=true;
                    }
                    console.log(k)
                    console.log(result)
                    if(result==true && k==true)
                    {
                        
                        
                        cardCreate(recipies[p].id, recipies[p].type, recipies[p].name, recipies[p].ingredients, recipies[p].description);
                    }
                    g++;
                }
                p++;
            }
        });
    });
});


//function to creating cards
const cardCreate = (id, type, name, ingredients, description) =>{
    $("#catalog").append(
        "<div id='"+id+"'  class='card openRecipe "+id+"' recipe-id='"+id+"'>"+
        "<div class='cardContent'>"+
            "<div id='type"+id+"' class='card-header firstContent'>"+type+"</div>"+
            "<div id='name"+id+"' class='card-header secondContent'>"+name+"</div>"+
        "</div>"+
        "<div class='cardContent'>"+
            "<div id='ingredients"+id+"' class='card-body firstContent'>Składniki:<br>"+ingredients+"</div>"+
            "<div id='description"+id+"' class='card-body secondContent'>"+description+"</div>"+
        "</div>"+
    "</div>");

};

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
};


