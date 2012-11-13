//global variables
// var count = 0;
base_card_background_image = "url('img/tactile_noise.gif')";
var points = 0;
var clicks = 0;
var rotation_mode = false;

var current_open_card1 = null;
var current_open_card2 = null;

var turn_end = false;

var card_bases = new Array();
var cards = new Array();

var done_cards;






function flip_rotation_mode()
{
  if (rotation_mode == true)
  {
    rotation_mode = false
    $("#rotation_mode").text("Rotation  on")
    $("#wrapper").css("-moz-transform", "rotate(0deg)");
    $("#wrapper").css("-webkit-transform", "rotate(0deg)");
  }else{
    rotation_mode = true
    $("#rotation_mode").text("Rotation off");
  }
}

function set_card_bases()
{
  function card_base_object(index){
    this.file_url =  "url('img/cards/"+index+".png')";
  }

  for(i=1; i<=12;i++)
  {
    card_bases[i] = new card_base_object(i);
  }
}

function set_cards()
{
  function card_Object(state, base_position_state)
  {
    this.state = state;
    this.base_position_state = null;
  };


  // initialize the cards
  for(i=1; i<=24;i++)
  {
    var card = new card_Object("closed");
    cards[i] = card;
  };
}

function place_cards()
{
// var placed_count = 0;
for(r=0; r<2;r++){
  for(i=1;i<card_bases.length;i++)
  {
    var placed = false
      while(placed == false)
      {
        var random_position = Math.floor((Math.random()*24)+1);
        if(cards[random_position].base_position_state == null)
        {
          cards[random_position].base_position_state = card_bases[i];
          // console.log("at card " + random_position + " has been placed: " + card_bases[i].file_url);
          placed = true;
        }
      }
    }
  };
};

function reset_backgrounds()
{
  // to view the backgrounds directly
    for(i=1;i<cards.length;i++)
    {
      var place = $("#" + i);
      place[0].style.backgroundImage= base_card_background_image;
    }
}

function new_round()
{
  points = 0;
  $("#points").text("Number of points: " + points);
  clicks = 0;
  $("#clicks").text("Number of presses: "+ clicks);

  current_open_card1 = null;
  current_open_card2 = null;

  turn_end = false;

  card_bases = new Array();
  cards = new Array();

  set_card_bases();
  set_cards();

  place_cards();

  reset_backgrounds();

  done_cards = cards.length;
}

new_round();

$(".card").click(function()
  {
    click_card(this);
    addClick();
  }
);

//functions
function addClick()
{
  clicks++;
  $("#clicks").text("Number of presses: "+ clicks);
};

function addPoint()
{
  points++;
  $("#points").text(" Number of points: " + points);
};

// to view the backgrounds directly
function view_cards(){
  for(i=1;i<cards.length;i++)
  {
    var place = $("#" + i);
    place[0].style.backgroundImage= cards[i].base_position_state.file_url;
  }
};

// view_cards();
function click_card(card)
{
  if(rotation_mode)
  {
    $("#wrapper").css(
      "-webkit-transform", "rotate("+clicks+"deg)"
      );

    $("#wrapper").css(
      "-moz-transform", "rotate("+clicks +"deg)"
      );
  }

  console.log("Card has been pressed" + card.id);
    if (cards[card.id].state == "closed")
  {
    if(current_open_card2 != null)
    {
      close_previous_cards();
    };
    open_card(card);
  }
}

function open_card(card)
{
  var position = card.id;
  console.log("this card is closed");
  card.style.backgroundImage = cards[position].base_position_state.file_url;
  cards[position].state = "open";

  if(current_open_card1 == null)
  {
    current_open_card1 = cards[position];
  }
  else
  {
    current_open_card2 = cards[position];
    check_pair(cards[position]);
  }
}

function check_pair()
{
  console.log(current_open_card1);
  console.log(current_open_card2);

  if (current_open_card2.base_position_state == current_open_card1.base_position_state)
  {
    addPoint();
    console.log("cards are the same, bravo!");
    $("#message").text("Nice job!");

    done_cards--;
    done_cards--;

    current_open_card1.state = "done";
    current_open_card1 = null;

    current_open_card2.state = "done";
    current_open_card2 = null;
console.log("done cards are: " + done_cards);

    if(done_cards == 1)
    {
      console.log("Round has ended");
      end_round();
    }
  }
  else
  {
    console.log("cards are not the same");
    $("#message").text("Sorry, that's not it.");
  }
};


function close_previous_cards()
{
  close_card(current_open_card2);
  current_open_card2 = null;
  close_card(current_open_card1);
  current_open_card1 = null;
};

function close_card(card)
{
  card.state = "closed";
  var position_of_card = $.inArray(card, cards);
  $("#"+position_of_card)[0].style.backgroundImage = base_card_background_image;
};

function end_round()
{
  console.log("Round has ended");
  $("#message").text("Round has ended with: " + clicks + " presses." );
};

$("body").keydown( function(event)
{
var message = "";
  console.log("Key has beendown!");

    switch(event.which){
      case 40:
        message = "Going Down?";
        break;

      case 38:
        message = "Going Up?"
        break;

      case 37:
        message = "Going Left?"
        break;

      case 39:
        message = "Going Right?"
        break;

      default:
        message = "Hmm something has been pressed, but what?!"
        break;
    }
$("#message").text(message);
});




var c = document.getElementById("footer_canvas");
var ctx=c.getContext("2d");
var pos = 0;

function draw_on_canvas()
{
    if(pos <= 500 )
    {
    pos += 50;
    ctx.beginPath();
    ctx.arc(pos ,50,40,0,2*Math.PI);
    ctx.stroke();
  }
}
