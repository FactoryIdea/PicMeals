(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    //alert("register_event_handlers");
    
     /* button  .uib_w_7 */
    $(document).on("click", ".uib_w_7", function(evt)
    {
         activate_page("#mainpage"); 
    });
    
        /* button  .uib_w_8 */
    $(document).on("click", ".uib_w_8", function(evt)
    {
         activate_page("#mainpage"); 
    });
     
             /* button  .uib_w_8 */
    $(document).on("click", ".invite_back", function(evt)
    {
        $('#listFriends').empty();
        if (_isFirstTime)
            activate_page("#page_settings");
        else
            activate_page("#page_List");
            
    });
    
        /* listitem  Login */
    $(document).on("click", "#btLogin", function(evt)
    {
         activate_page("#page_login"); 
    });
    
        /* listitem  Register */
    $(document).on("click", "#btRegister", function(evt)
    {
         activate_page("#page_register"); 
    });
    
        /* button  #btnLogin */
    $(document).on("click", "#btnLogin", function(evt)
    {
         activate_page("#page_List"); 
    });
    
        /* button  #btnCreateAccount */
    $(document).on("click", "#btnCreateAccount", function(evt)
    {
         activate_page("#page_List"); 
    });
     
       /* button  #btnLogin */
    $(document).on("click", "#btnHome", function(evt)
    {
         activate_page("#page_List"); 
    });
    
        /* button  #btnSettings_Back */
    $(document).on("click", "#btnSettings_Back", function(evt)
    {
         activate_page("#page_List"); 
    });
    
        /* button  #btnSettings */
    $(document).on("click", "#btnSettings", function(evt)
    {
         activate_page("#page_settings"); 
    });
    
        /* button  #btnSettings_Back1 */
    $(document).on("click", "#btnSettings_Back1", function(evt)
    {
         activate_page("#page_List"); 
    });
    
       /* open details page */
    $(document).on("click", ".det", function(evt)
    {
        //alert('det');
        _PrevPage = "#page_List";
        var idDet = $(this).attr('id');
        if (idDet === "lempty") return false;
        var res = idDet.split("@");
        var sImg = $(this).attr("src");
        showDet(res[0],res[1],sImg);
    });    
     
    $(document).on("click", ".detMenu", function(evt)
    {
        //alert('menu');
        var idDet = $(this).attr('id').replace('detMenu_','');
        var res = idDet.split("@");
        var sImg = $(this).attr("src");
        showDet(res[0],res[1],sImg);
    });     
     
    $(document).on("click", ".detPost", function(evt)
    {
        //alert('det');
        //_PrevPage = "#page_user";
         var idDet = $(this).attr('id').replace('detPost_','');
        var res = idDet.split("@");
        var sImg = $(this).attr("src");
        showDet(res[0],res[1],sImg);
    }); 

     
     /* button  #btnMyRestaurant_Back */
    $(document).on("click", "#btnMyRestaurant_Back", function(evt)
    {
        activate_page("#page_List"); 
    });     
     
    $(document).on("click", "#menuSettings", function(evt)
    {
        //$("#bs-navbar-0").addClass("collapse");
        activate_page("#page_settings"); 
    });
        /* button  #btn_login */
    
    
        /* button  #btn_signup */
    $(document).on("click", "#btn_signup", function(evt)
    {
         //activate_page("#page_List"); 
    });
    
        /* button  #btnAddMeal_Back */
    $(document).on("click", "#btnAddMeal_Back", function(evt)
    {
        if (_MenuID=="")
            activate_page("#page_List"); 
        else
            activate_page("#page_myRestaurant"); 
    });
    
    
        /* button  #btnGPS_Yes */
    $(document).on("click", "#btnGPS_Yes", function(evt)
    {
        /* your code goes here */ 
		localStorage.GPSEnabled  = true;
		$("#btnGPS_Yes").addClass('btnSelected');
		$("#btnGPS_No").removeClass('btnSelected');
		_GPSEnabled = localStorage.GPSEnabled;
		//alert(_GPSEnabled);
    });
	 
		/* button  #btnGPS_No */
    $(document).on("click", "#btnGPS_No", function(evt)
    {
        /* your code goes here */ 
		localStorage.GPSEnabled  = false;
		$("#btnGPS_No").addClass('btnSelected');
		$("#btnGPS_Yes").removeClass('btnSelected');
		_GPSEnabled = localStorage.GPSEnabled;
		//alert(_GPSEnabled);
    });
    
        /* button  #btnDetail_Back */
    $(document).on("click", "#btnDetail_Back", function(evt)
    {
        //alert(_PrevPage);
        if (_PrevPage==="#page_detail") _PrevPage="";
        if (_PrevPage==="")
            activate_page("#page_List");  
        else 
            activate_page(_PrevPage);
        //_PrevPage="";
    });
     
        /* button  #det_LikeBtn */
    $(document).on("click", "#det_LikeBtn", function(evt)
    {
        likePost();
        // activate_page("#page_List"); 
    });  
     
        /* button  #btnAddComment */
    $(document).on("click", "#btnAddComment", function(evt)
    {
        addComment();
        // activate_page("#page_List"); 
    });       
     
         /* button  #btnAddMeal */
   
    $(document).on("click", ".btnAddMeal", function(evt)
    {     
        _MenuID="";
        $('#popupPhoto').modal('show');
    });
      
     /* button  .seeuser */
    $(document).on("click", ".seeuser", function(evt)
    {
        _PrevPage = "#page_detail";
        _SkipUserPage = 0;
        showUser();
        activate_page("#page_user"); 
    });  
     
    $("#menuMyProfile").click(function () {
        _PrevPage = "#page_user";
        _PublisherRefID = _UserRefID;
        activate_page("#page_user"); 
        $('#btnFollow').css('display','none');
        $('.det_follow').text(_UserDisplayName);
        ChangeFontSize('divUser');
        var profileImg = "http:"+ _UserImgProfile;
        $(".det_follow").attr('src', profileImg);
        _SkipUserPage = 0;
        showUser();        
    });     
     
    /* button  #btnUser_Back */
    $(document).on("click", "#btnUser_Back", function(evt)
    {
        activate_page("#page_List");
        /*
        if (_PrevPage == "")
        {
            activate_page("#page_List"); 
        }
        else
        {
            activate_page("#page_detail");    
        }*/
    }); 
     
        /* button  #btnUser_Back */
    $(document).on("click", "#btnFollow", function(evt)
    {
        followUser(); 
    }); 
     
        /* button  #btnPosts */
    $(document).on("click", "#btnPosts", function(evt)
    {
        $('#listUserPosts').show();
        $('#listFollowers').hide();
        $('#listFollowing').hide();
        $('#listMenu').hide();
        //$('#btnPosts').removeClass('btn-default').addClass('btn-danger');
        //$('#btnFollowers').removeClass('btn-danger').addClass('btn-default');
    }); 
     
         /* button  #btnFollowers */
    $(document).on("click", "#btnFollowers", function(evt)
    {
        $('#listUserPosts').hide();
        $('#listFollowers').show();
        $('#listFollowing').hide();
        $('#listMenu').hide();
        //$('#btnPosts').addClass('btn-default').removeClass('btn-danger');
        //$('#btnFollowers').addClass('btn-danger').removeClass('btn-default');        
    }); 
     
         /* button  #btnFollowing */
    $(document).on("click", "#btnFollowing", function(evt)
    {
        $('#listUserPosts').hide();
        $('#listFollowers').hide();
        $('#listFollowing').show();
        $('#listMenu').hide();
        //$('#btnPosts').addClass('btn-default').removeClass('btn-danger');
        //$('#btnFollowers').addClass('btn-danger').removeClass('btn-default');        
    });     
     
     
    $(document).on("click", "#btnCheckin", function(evt)
    {
        activate_page("#page_checkin"); 
        //alert("Lat: " + _latitude);
        //$('#btnPosts').addClass('btn-default').removeClass('btn-danger');
        //$('#btnFollowers').addClass('btn-danger').removeClass('btn-default');        
    });     
     
    /* button  #btnUser_Back */
    $(document).on("click", "#btnCheckin_Back", function(evt)
    {
        activate_page("#page_addMeal");     
        _PlaceID = "";
        $('#AddDish-PlaceName').text('');
        $('#AddDish-PlaceLat').text('');
        $('#AddDish-PlaceLong').text('');
        $('#btnRemovePlace').css('display','none');    
    });      
     
     
     
                /* button  .item-place */
    $(document).on("click", ".item-place", function(evt)
    {
        var id = $(this).attr('id');
        _PlaceID = id;
        //alert(id);
        var sPlaceTitle = $('#' + id + ' .title').html();
        var sPlaceLat = $('#' + id + ' .place-lat').html();
        var sPlaceLong = $('#' + id + ' .place-long').html();
        //alert(sPlaceTitle + " " + sPlaceLat + " " + sPlaceLong);
        $('#AddDish-PlaceName').text(sPlaceTitle);
        $('#AddDish-PlaceLat').text(sPlaceLat);
        $('#AddDish-PlaceLong').text(sPlaceLong);
        $('#btnRemovePlace').css('display','block');
        activate_page("#page_addMeal"); 
        //_SkipUserPage = 0;
        //showUser();
    });   
     
     /* button  #btnRemovePlace */
    $(document).on("click", "#btnRemovePlace", function(evt)
    {     
        $('#AddDish-PlaceName').text('');
        $('#AddDish-PlaceLat').text('');
        $('#AddDish-PlaceLong').text('');
        $('#btnRemovePlace').css('display','none');        
    });   
     
    /*
     $("body").click(function(event) {
        // only do this if navigation is visible, otherwise you see jump in navigation while collapse() is called 
         if ($(".navbar-collapse").is(":visible") && $(".navbar-toggle").is(":visible") ) {
            $('.navbar-collapse').collapse('toggle');
        }
  });*/
     

   var  body = document.querySelector('.upage');
   body.ontouchstart = function () {}
     
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
