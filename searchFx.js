 // function for buttons to search recipies
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
         $('#textToSearch').append("<input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz nazwę'/>");
         
         $("#whatToSearch").keyup(function () {
             $('#catalog').text('');
             let searchText = $("#whatToSearch").val();
             let p =0;
             while(p<recipies.length)
             {
                 let str = recipies[p].name;
                 let nbr = searchText.length;
                 let result = str.substring(0,nbr);
 
                 let lowResult= result.toLowerCase();
                 let lowSearchText = searchText.toLowerCase();
 
                 if(lowResult==lowSearchText)
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
         $('#textToSearch').append("<input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz kategorię'/>");
      
         $("#whatToSearch").keyup(function () {
             $('#catalog').text('');
             let searchText = $("#whatToSearch").val();
             let p =0;
             while(p<recipies.length)
             {
                 let str = recipies[p].type;
                 let nbr = searchText.length;
                 let result = str.substring(0,nbr);
                 let lowResult= result.toLowerCase();
                 let lowSearchText = searchText.toLowerCase();
 
                 if(lowResult==lowSearchText)
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
         $("#textToSearch").append("<div id='findedIngred'></div><input id='whatToSearch' type='text' name='searchRecipe' placeholder='Wpisz składnik'/><button id='btnAddSearchIng'>Kolejny składnika</button>");
         
         var arr =[];
 
         $("#btnAddSearchIng").click(function(){    
            let add = $("#whatToSearch").val();
            arr.push(add);
            $("#whatToSearch").val('');
            $("#findedIngred").html(arr+",");
         });
 
         $("#whatToSearch").keyup(function () {
             $('#catalog').html('');
             let searchText = $("#whatToSearch").val();
             let p =0;
             while(p<recipies.length)
             {
                 let g =0;
                 while(g<recipies[p].ingredients.length)
                 {
                     let lowsearchText= searchText.toLowerCase();
                     let str = recipies[p].ingredients[g];
                     let lowstr = str.toLowerCase();
                     let result = lowstr.includes(lowsearchText);  
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
                     if(result==true && k==true)
                     {
                         cardCreate(recipies[p].id, recipies[p].type, recipies[p].name, recipies[p].ingredients, recipies[p].description);
                         g = arr.lengt;
                     }
                     else{
                         g++;
                     }
                 }
                 p++;
             }
         });
     });
 });
 