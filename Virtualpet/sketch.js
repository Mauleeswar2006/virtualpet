var dog,sadDog,happyDog, database;
var foodS;        
var foodStock;   
var btnAddFood;   
var foodObj;
var database;
var feedTime; 
var feedS; 
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj = new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock); 
  
  feedTime=database.ref('FeedTime');
  feedTime.on("value", readTime);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  btnAddFood=createButton("Add Food");
  btnAddFood.position(800,95);
  btnAddFood.mousePressed(FN_addFoods);

  
  btnFeedDog=createButton("Feed dog");
  btnFeedDog.position(700,95);
  btnFeedDog.mousePressed(FN_feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();

  fill(0);
  stroke("white");
  textSize(25);
  if(foodObj.lastFed>=12){
    text("Last Fed : " + (foodObj.lastFed-12) + "PM",40,40);
  }else if(foodObj.lastFed==0){
    text("Last Fed : 12 AM " ,40,40);
  }else{
    text("Last Fed :  " + foodObj.lastFed + "AM",40,40);
  }
 

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readTime(data){
  feedS=data.val();
  foodObj.setFedTime(feedS);
}

function FN_feedDog(){
  dog.addImage(happyDog);

  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0 ){
    foodObj.updateFoodStock(0);

  }else{
    foodObj.updateFoodStock(food_stock_val - 1);
   database.ref('/').update({
      Food: foodObj.getFoodStock()
    })
  }
  //write code here to update food stock and last fed time
  foodObj.setFedTime(hour())
  database.ref('/').update({
    FeedTime:foodObj.lastFed
  })
  //text("Last Feed 6", 350, 30)

}
//function to add food in stock
function FN_addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
/*
function showError() {
  console.log("Error in reading Database");
}
*/