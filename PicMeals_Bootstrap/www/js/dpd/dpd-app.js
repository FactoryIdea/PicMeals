$(document).ready(function () {
//function onDeviceReady() {    
    //if (intel.xdk.device.platform=="iOS") document.body.style.marginTop = "20px";

    
    dpd.setBaseUrl("http://dpd.info-maker.com");    
    //localStorage.removeItem("username");
    //localStorage.removeItem("password");
    //activate_page("#mainpage");
    //if ((localStorage.username !== undefined)&&(localStorage.password !== undefined))
    
    initialize();
     
    function initialize()
    {
        //alert("initialize");
        dpd('users').get('me', function(result, error) {
          //alert(result.id);
          if (result.id!==undefined) {
                activate_page("#page_List");
                _UserRefID = result.id;
                _UserAccountType = result.accountType;
                _UserImgProfile = result.img;
                _UserLang = result.lang;
                _UserCurrency = result.currency;
                if (result.displayUser !== null)
                    _UserDisplayName = result.displayUser;
                else
                    _UserDisplayName = result.username; 
                $('#txt_UserDisplayName').val(_UserDisplayName); 
                if (result.mobile !== null) $('#txt_mobilenumber').val(result.mobile);
                if (result.socialAccount !== null) _Network = result.socialAccount;
                SetMenuAccount();
                GetMealsList();
              } else activate_page("#mainpage");
        });  
        GetDataSettings();
    }
    
    // START - USER MANAGEMENT  
    
    $(document).on("click", "#btnFBLogin", function(evt)
    {   
        socialConnect('facebook','email,read_friendlists,friends,publish');
    });  
     
    $(document).on("click", "#btnGLogin", function(evt)
    {     
        socialConnect('google','email,friends');    
    });
    
    $(document).on("click", "#btnInstagramLogin", function(evt)
    {     
        socialConnect('instagram','email,friends,followers,following');    
    });
    
    $(document).on("click", "#btnTwitterLogin", function(evt)
    {     
        socialConnect('twitter','email,friends,followers,following,publish');    
    });
    
    function CheckUser() {
        dpd('users').get('me', function(result, error) {
          // Do something
          if (result.id!==undefined) {
            _UserRefID = result.id;
            _UserAccountType = result.accountType;
            _UserImgProfile = result.img;
            _UserLang = result.lang;
            _UserCurrency = result.currency;
            if (result.displayUser !== null)
                _UserDisplayName = result.displayUser;
            else
                _UserDisplayName = result.username; 
            $('#txt_UserDisplayName').val(_UserDisplayName); 
            if (result.mobile !== null) $('#txt_mobilenumber').val(result.mobile);
            if (result.socialAccount !== null) _Network = result.socialAccount;
            SetMenuAccount();
          }
        });
    }
    
    function socialConnect(net, scopenet)
    {
        hello(net).login({ scope: scopenet }).then(function () {
                LoginHello(net);
            }, function (e) {
                alert("Signin error: " + e.error.message);
            });
            function LoginHello() {
                hello(net).api('/me').then(function (r) {
                    // Inject it into the container
                    //alert(JSON.stringify(r));
                    //alert(r.email);
                    socialLogin(net, r);                      
                });
        }
    }
    
    function socialLogin(net, r)
    {
        if (r.email!==null || r.email!== undefined)
        {
            dpd('users').get('?username=' + r.email , function(result, error) {
                if (result) {
                    
                  if (JSON.stringify(result)!=="[]") { 
                      _isFirstTime = false;
                      login(r.email, r.id + "_picmeals103!");
                  } else 
                  {
                    _isFirstTime = true;
                    var obj = new Object();
                    obj.username = r.email;
                    obj.password = r.id + "_picmeals103!";
                    obj.accountType = "U";
                    obj.email = r.email;
                    obj.img = r.thumbnail;
                    obj.displayUser = r.name;
                    obj.profile = r;
                    obj.socialAccountId = r.id;
                    obj.socialAccount = net;
                    if (localStorage.latitude!==undefined)
                    {
                        var objLoc = new Object();
                        objLoc.lat = localStorage.latitude;
                        objLoc.lon = localStorage.longitude;
                        obj.loc = objLoc; 
                    }
                    signup(obj);
                }
              }
              if (error) {
                alert(JSON.stringify(error));
                activate_page("#mainpage");
              } 
            });   
        } else activate_page("#page_register");
    }

    $("#btn_login").click(function () {
        //alert('login');
        login($('#txt_email_login').val().trim(), $('#txt_password_login').val().trim());

    });

    function login(username, password)
    {
        //alert(username + " , " + password);
        $('#pageLoader').modal('show');
        dpd.users.login({
          username: username,
          password: password
        }, function(user, error) {
              if (!user.length) 
              {
                _UserRefID = user.username;
                localStorage.username = user.uid;
                localStorage.token = user.id;
                localStorage.password = password;
                CheckUser();
                GetMealsList();
                if (_isFirstTime)
                  {
                    activate_page("#page_settings");
                  }
                else
                  {
                    activate_page("#page_List");
                  }
                $('#pageLoader').modal('hide');
              }  
            else        
              if (error) {
                // Alert if there's an error
                $('#pageLoader').modal('hide');
                showError(error);
              }
        });  
    }

    $("#btn_signup").click(function () {
        //alert('signup');
        var obj = new Object();
        obj.username = $('#txt_email_signup').val().trim();
        obj.password = $('#txt_password_signup').val().trim();
        obj.accountType = "U";
        obj.email = $('#txt_email_signup').val().trim();
        if (localStorage.latitude!==undefined)
        {
            var objLoc = new Object();
            objLoc.lat = localStorage.latitude;
            objLoc.lon = localStorage.longitude;
            obj.loc = objLoc; 
        }        
        signup(obj);
    });
    

    function signup(o)
    {
        //alert(JSON.stringify(o));
        $('#pageLoader').modal('show');
        dpd('users').post(o, function(data, err) {
              if (err) {
                  //alert(JSON.stringify(err));
                  console.log("comment: ", err);
                  $('#pageLoader').modal('hide');
              } 
               if (data) {
                  //alert(JSON.stringify(data));
                  _isFirstTime = true;
                  _Network = o.socialAccount;
                  //alert(_Network);   
                  console.log("comment: ", data);
                  //alert(o.socialAccountId);
                   _UserRefID = data.id;
                   if (o.socialAccountId!==undefined)
                   {
                       //alert("social");
                       login(o.email, o.socialAccountId + "_picmeals103!");    
                   }
                   else
                   {
                        login($('#txt_email_signup').val().trim(), $('#txt_password_signup').val().trim());
                   }
                       
                  $('#pageLoader').modal('hide');
              } 
          });     
    }

    function SetMenuAccount()
    {
        if (_UserCurrency==="") _UserCurrency = "EUR";
        $("#selAccountType").val(_UserAccountType);
        $("#selCurrency").val(_UserCurrency);
        if (_UserAccountType==="R")
        {
            $('#menuMyRestaurant').css('display','block');
            $('.onlyRestaurant').css('display','block');
        }
        else
        {
            $('#menuMyRestaurant').css('display','none');
            $('.onlyRestaurant').css('display','none');
        }
    }
    
    $("#btnSaveAccount").click(function () {
        //alert("_isFirstTime :" + _isFirstTime);
        var obj = new Object();
        obj.id = _UserRefID;
        
        obj.mobile = $('#txt_mobilenumber').val();
        //alert(JSON.stringify(obj));
        obj.displayUser = $('#txt_UserDisplayName').val().trim();
        //alert(JSON.stringify(obj));
        obj.lang = _UserLang;
        //alert(JSON.stringify(obj));
        //obj.password = $('#txt_password_signup').val().trim();
        obj.accountType = $('#selAccountType').val().trim();
        //alert(JSON.stringify(obj));
        
        
        if (localStorage.latitude!==undefined)
        {
            var objLoc = new Object();
            objLoc.lat = localStorage.latitude;
            objLoc.lon = localStorage.longitude;
            obj.loc = objLoc; 
        }   
        if (obj.accountType==="R") 
        {
            obj.hasMenu = 1;
            obj.currency = $('#selCurrency').val().trim();
        }
        else
            obj.hasMenu = 0;
        //alert(JSON.stringify(obj));
        console.log(JSON.stringify(obj));
        //obj.email = $('#txt_email_signup').val().trim(); 
        $('#pageLoader').modal('show');
        //dpd.users.put(obj.id, obj);
        dpd('users').put(obj, function(data, err) {
            //alert(JSON.stringify(data));
            //alert(JSON.stringify(err));
              if (err) {
                  console.log("comment: ", err);
                  $('#pageLoader').modal('hide');
              } 
               if (data) {
                  console.log("comment: ", data);
                  _UserAccountType = data.accountType; 
                  _UserCurrency = data.currency;
                  SetMenuAccount();
                  $('#pageLoader').modal('hide');
                   if (_isFirstTime)
                   { 
                       getContact();
                       //getFriends(_Network);
                   }
              } 
          });  
    });

    $("#btn_logout").click(function () {
        dpd.users.logout(function(result, error) {
          // Do something
          if (result) {
              console.log(result);
              activate_page("#mainpage");
              localStorage.removeItem("username");
              localStorage.removeItem("password"); 
              deleteCookies();
          }
        });        
    });
    
    // END - USER MANAGEMENT 


    // START - FRIEND LIST
    
    $("#menuInviteFriends").click(function () {
        //getFriends(_Network);
        getContact();
    });

    $("#btn_inviteFriends").click(function () {
        //getFriends(_Network);
        getContact();
    });
    /*
    $("#btnFBFriends").click(function () {
        getFriends('facebook');
    });
    */
    $("#btnGPFriends").click(function () {
        getFriends('google');
    });
    
    $("#btnInstaFriends").click(function () {
        getFriends('instagram');
    });
    
    function getFriends(network) {
        //alert(network);
        activate_page("#page_FriendList");
        $('#listFriends').empty();
        var btn_more = document.getElementById('btn_moreFriends');
        btn_more.style.display = 'none';
        
        var path = 'me/friends';
        switch (network)
        {
            case 'facebook':
                path = 'me/taggable_friends';
                break;
            case 'google':
                path = 'me/friends';
                break;   
            case 'twitter':
                path = 'me/friends';
                break;
            case 'instagram':
                path = 'me/friends';
                break;   
            default:
                path = 'me/friends';
                break;                
        }
        // login
        hello.login( network, {scope:'friends'}, function(auth){
            if(!auth||auth.error){
                console.log("Signin aborted");
                return;
            }
           
            $('#pageLoader').modal('show');
            // Get the friends
            // using path, me/friends or me/contacts
            
            hello(network).api( path , {limit:10}, function responseHandler(r){
                //alert(JSON.stringify(r));
                var obj = new Object();
                obj.user = _UserRefID;
                obj.network = network;
                obj.response = r;
                dpd('hellojs').post(obj, function(data, err) {});
                
                for(var i=0;i<r.data.length;i++){
                    var o = r.data[i];   
                    var im;
                    if (network=='facebook') 
                        im = o.picture.data.url;
                    else
                        im = o.thumbnail
                    $('#listFriends').append("<a class='list-group-item allow-badge widget lnksocial' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='social_" + network + "#" + o.id + "'><div class='row'><div class='col-xs-3 col-sm-3 col-lg-2 pad5 text-left'><img class='det_imguser img-circle user-circle-xs' src='" +im + "'/></div><div class='col-xs-9 col-sm-9 col-lg-10 pad5'><h4 class='list-group-item-heading'><span class='red'>" + o.name + "</span></h4></div></div></a>");              
                };
                btn_more.onclick = function(){
                    // Make another request and handle is in the same way
                    hello( network ).api( r.paging.next, {limit:10}, responseHandler );
                };
               // btn_more.innerHTML = "Next from "+network;
                btn_more.style.display = 'block';
            });
            $('#pageLoader').modal('hide');
        });
    }    
    
    function getContact()
    {
        //alert("getContact");
        activate_page("#page_FriendList");
        $('#listFriends').empty();
        var btn_more = document.getElementById('btn_moreFriends');
        btn_more.style.display = 'none';
        // find all contacts with 'Bob' in any name field
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = ["displayName", "emails", "phoneNumbers"];//["displayName", "emails", "phoneNumbers", "photos"];//
        navigator.contacts.find(fields, onContactSuccess, onContactError, options);
        $('#pageLoader').modal('show');
    }
    
    function onContactSuccess(contacts) {
        /*
        var obj = new Object();
        obj.user = _UserRefID;
        obj.network = 'contacts';
        obj.response = JSON.parse(contacts);
        dpd('hellojs').post(obj,function(data, err){});
        */
        for (var i = 0; i < contacts.length; i++) {
            if(contacts[i].emails && contacts[i].emails.length) {
                if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
                    var sEmail="",sPhones="",sImg="images/profile_300.jpg";
                    if(contacts[i].emails && contacts[i].emails.length) {sEmail = contacts[i].emails[0].value;}
                    //if(contacts[i].phoneNumbers && contacts[i].phoneNumbers.length) {sPhones = contacts[i].phoneNumbers[0].value;}
                    if(contacts[i].photos && contacts[i].photos.length) {sImg = contacts[i].photos[0].value;}
                    $('#listFriends').append("<a class='list-group-item allow-badge widget lnksocial' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='social_email#" + sEmail + "'><div class='row'><div class='col-xs-3 col-sm-3 col-lg-2 pad5 text-left'><img class='det_imguser img-circle user-circle-xs' src='" + sImg + "'/></div><div class='col-xs-9 col-sm-9 col-lg-10 pad5'><h4 class='list-group-item-heading'><span class='red'>" + contacts[i].displayName + "</span></h4></div></div></a>");  
                }
            }
        }  
        $('#pageLoader').modal('hide');      
    };

    function onContactError(contactError) {
        //alert('onError!');
        $('#pageLoader').modal('hide');
    };

    
    
    $(document).on("click", ".lnksocial", function(evt)
    {
        var ref = $(this).attr('id').replace("social_","");
        var arr = ref.split("#");            
        SendMessage(arr[0],arr[1]);
    });
    

    
    // END - FRIEND LIST

    // START MENU

    $(document).on("click", ".btnAddtoMenu", function(evt)
    {
        var sMenuID = $(this).attr('id').replace("addToMenu_","");
        _MenuID = sMenuID;
        //alert(_MenuID);
        $('#popupPhoto').modal('show');
    });
    
    $(document).on("click", "#menuMyRestaurant", function(evt)
    {
        loadMenu(_UserRefID,'listCategory',"#page_myRestaurant");
        activate_page("#page_myRestaurant"); 
    });
    
    $(document).on("click", ".btnRemoveFromMenu", function(evt)
    {
        var result = confirm("Want to remove from your Menu?");
        if (result) {
            var ref = $(this).attr('id').replace("removeFromMenu_","");
            var arr = ref.split("@");            
            RemoveDishFromMenu(arr[0],arr[1]);
        }
    });
    
    $(".createCategory").click(function () { _MenuID=""; $("#txt_category").val("");
    $('#popupCategory').modal('show'); });
    $(".editCategory").click(function () { 
        var idDet = $(this).attr('id');
        var sMenuID = $('#menu_' + id + ' span').html();
        _MenuID=sMenuID;
        var sCategory = $('#menu_' + id + ' span h2').html();
        $("#txt_category").val(sCategory); $('#popupCategory').modal('show');
    });
    
    $(document).on("click", "#btnShowMenu", function(evt)
    {   //alert(_PublisherRefID);
        loadMenu(_PublisherRefID,'listMenu','#page_user');
        $('#listUserPosts').hide();
        $('#listFollowers').hide();
        $('#listFollowing').hide();
        $('#listMenu').show();
    }); 
    
    $("#btnSaveCategory").click(function () { 
        if ($("#txt_category").val()=="") return;  
        $('#pageLoader').modal('show');
        var o = new Object();
        o.user = _UserRefID;
        o.category = $('#txt_category').val().replace("'", "''").trim();
        dpd('menu').post(o, function(data, err) {
          if (err) {
              console.log("menu: ", err);
              $('#pageLoader').modal('hide');
          } 
           if (data) {
              console.log("menu: ", data);
              $('#txt_category').val('');
              $('#popupCategory').modal('hide');
              loadMenu(_UserRefID,'listCategory',"");
              $('#pageLoader').modal('hide');
          } 
      });
    });
    
    function loadMenu(userMenu,listName, PrevPage)
    {
        _PrevPage = PrevPage;
        $('#pageLoader').modal('show');
        var html = "";
        dpd('menu').get('?include=full&user=' + userMenu, function(data, err) {
              if (err) {
                $('#pageLoader').modal('hide');
                return showError(err);
              }
              if (data.length) {
                $('#'+ listName).empty();
                var sMenuDish = "";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].menuList !== undefined)
                    {
                        var jarrDish = data[i].menuList;
                        for (var k = 0; k < jarrDish.length; k++) 
                        {
                            var sEditDish = "";
                            if (listName==='listCategory') sEditDish = "<p class='d-margins' style='text-align:right;'><button class='btn button-lg btn-default d-margins noborder btnRemoveFromMenu' id='removeFromMenu_" + data[i].id + "@" + jarrDish[k].id + "'><i class='glyphicon glyphicon-trash'/></button>&nbsp;&nbsp;&nbsp;<button class='btn button-lg btn-default d-margins noborder btnEditDish' id='editDish_" + jarrDish[k].id + "'><i class='glyphicon glyphicon-pencil'/></button>&nbsp;&nbsp;&nbsp;<button class='btn button-lg btn-default d-margins noborder btnStatsDish' id='statsDish_" + jarrDish[k].id + "'><i class='glyphicon glyphicon-signal'/></button></p>";
                            
                            
                            var sPrice = "";
                            if (jarrDish[k].price!=null||jarrDish[k].price!=undefined)
                                sPrice = "<div class='bottom-price'>" + jarrDish[k].price + " " + jarrDish[k].currency + "</div>";                            
                            var sBottom ="<div class='row'><div class='col-md-6 col-sd-6 col-xs-6'><div class='bottom-likes'><span class='glyphicon glyphicon-heart-empty'></span>&nbsp;(" + jarrDish[k].likes + ")&nbsp;&nbsp;<span class='glyphicon glyphicon-comment'></span>&nbsp;(" + jarrDish[k].comments + ")</div></div><div class='col-md-6 col-sd-6 col-xs-6'>" + sPrice + "</div></div>";  
                            
                            sMenuDish = "<div class='item' id='menu_" + jarrDish[k].id + "'><div class='box-pr'><img src='http:" + jarrDish[k].img + "' class='detMenu' id='detMenu_" + jarrDish[k].user + "@" + jarrDish[k].id + "'/><div class='desc'><span class='title'>" + jarrDish[k].title + "</span>" + sEditDish + "</div><div class='ingr'>" + jarrDish[k].ingredients + "</div>" + sBottom + "</div></div>" + sMenuDish;
                            //
                        }
                    }              
                    var sAddDish = "";
                    var sListClass = " class='panelMenu'"; 
                    if (listName==='listCategory')
                    {
                        sAddDish = "<button class='btn button-lg btn-default d-margins noborder btnAddtoMenu' id='addToMenu_" + data[i].id + "');\"><i class='glyphicon glyphicon-plus-sign'></i>&nbsp;Add Dish to category</button>";
                        sListClass = "";
                    }
                    
                    $('#'+ listName).append("<div class='panel panel-default'><div class='panel-heading'>" +
                    "<a data-toggle='collapse' data-parent='#accordion' href='#collapse" + i.toString() + "'><h4 class='panel-title'>" + data[i].category + "</h4></a></div><div id='collapse" + i.toString() + "' class='panel-collapse collapse in'>" + 
                                              "<div" + sListClass + ">" + sMenuDish + "</div><p>" + sAddDish + "</p></div></div>");
                    
                    $('#'+ listName).append();
			      }
                  $('#pageLoader').modal('hide');
              }
              else
              {
                  if (listName!=='listCategory')
                        $('#'+ listName).append("<a class='list-group-item allow-badge widget' data-uib='twitter%20bootstrap/list_item' data-ver='1'><h4 class='list-group-item-heading'><b>The Owner didn't upload the menu yet</b></h4><p class='list-group-item-text'>It will be available soon...</p></a>");
              }
            if (data) $('#pageLoader').modal('hide');
            });        
        console.log("completed");    
    }

    function AddDishToMenu(dishId)
    {
        dpd('menu').put(_MenuID, {menu : {$push: dishId}}, function(data, err) {
              if (err) {
                  console.log("comment: ", err);
                  $('#pageLoader').modal('hide');
              } 
               if (data) {
                  console.log("comment: ", data);
                  $('#pageLoader').modal('hide');
              } 
          }); 
    }
    
    function RemoveDishFromMenu(menuID, dishId)
    {
        //alert("Menu:" + menuID + ", Dish:" + dishId);
        dpd('menu').put(menuID, {menu : {$pull: dishId}}, function(data, err) {
              if (err) {
                  console.log("comment: ", err);
                  $('#pageLoader').modal('hide');
              } 
               if (data) {
                   $('#menu_' + dishId).css('display', 'none');
                  console.log("comment: ", data);
                  $('#pageLoader').modal('hide');
              } 
          }); 
    }
    
    // END MENU
    
    //$(window).scroll(checkScroll);
    
    $("#btn_ReloadList").click(function () { _SkipPage = 0; GetMealsList(); });
    $("#btn_NextPage").click(function () { _SkipPage = _SkipPage + _itemPerPage; GetMealsList(); });

    
    //Start List
    function GetMealsList() {
        if (_SkipPage === 0) {
            $('#listGallery').empty();
        }
        $('#pageLoader').modal('show');
        var html = "";
        dpd('meals').get('?include=user&public=1&$limit=' + _itemPerPage + '&$skip=' + _SkipPage, function(data, err) {
              if (err) {
                $('#pageLoader').modal('hide');
                return showError(err);
              }

              if (data.length) {
                $.each(data, function (i, item) {
                      var imgLoc = item.img;
                      //var imgLoc = item.img.replace("_300","_700");
			          $('#listGallery').append("<div class='item'><div class='box'><img src='http:" + imgLoc + "' class='det' id='" + item.user + "@" + item.id + "'/><p>" + item.title + "<br/><span class='badge'>" + item.likes + "</span> Yummies</p></div></div>");
			      });
                  $('#pageLoader').modal('hide');
                  $("#btn_NextPage").css('display','block');
              }
            });        
        console.log("completed");
    }
    
                    /* button  #lnkuser */
    $(document).on("click", ".lnkuser", function(evt)
    {
        var id = $(this).attr('id');
        //alert(id);
        _PublisherRefID = id;
        $('#btnFollow').css('display','block');
        var profileImg = $("#" + id + " div div img").prop('src');
        var profileDisplay = $("#" + id + " div div h4 span").text();
        $(".det_follow").attr('src', profileImg);
        $('.det_follow').text(profileDisplay);
        _SkipUserPage = 0;
        showUser();
    });
    
    

    //Start TAKE PICTURE

    $("#btnGallery").click(function () { $('#popupPhoto').modal('hide'); TakePhotoFromGallery(); });
    $("#btnCamera").click(function () { $('#popupPhoto').modal('hide'); TakePhoto(); });

    //$("#btn_Camera").click(function () { TakePhoto(); });
    function TakePhoto() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 95,
            destinationType: Camera.DestinationType.FILE_URI, //DATA_URL, // // //
            sourceType: Camera.PictureSourceType.CAMERA,
            //sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 700,
            targetHeight: 700                                                  
        });
    }

    function TakePhotoFromGallery() {
        // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 95, //50
            destinationType: Camera.DestinationType.FILE_URI, //DATA_URL, // // //
            //sourceType : Camera.PictureSourceType.CAMERA,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            allowEdit: true,
            correctOrientation: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 700,
            targetHeight: 700 
        });
    }

    function onPhotoDataSuccess(imageData) {
        _PlaceID = "";
        $('#AddDish-PlaceName').text('');
        $('#AddDish-PlaceLat').text('');
        $('#AddDish-PlaceLong').text('');
        $('#AddDish-PlaceLong').text('');
        $('#btnRemovePlace').css('display', 'none');
        activate_page("#page_addMeal");
        // Uncomment to view the base64 encoded image data
        // console.log(imageData);
        //alert(imageData);
        // Get image handle
        var smallImage = document.getElementById('largeImage');
        //smallImage.src = "data:image/jpeg;base64," + imageData;
        smallImage.src = imageData;
        //alert(imageData);
        RepaintCanvas();
        //uploadPhoto("text", "asasas");
    }

    function onFail(message) {
        //showMeals();
        activate_page("#page_List");
    }

    $("#btn_addMessagePicture").click(function () {

        var textMessage = document.getElementById("textMessage");
        _PicTextMessage = textMessage.value;
        RepaintCanvas();
    });


    function RepaintCanvas() {
        var largeImage = document.getElementById('largeImage');
        var c = document.getElementById('myCanvas');
        var cxt = c.getContext('2d');
        var img = new Image();
        img.src = largeImage.src;
        
        //alert(img);
        img.onload = function () {
            // Add Image Background
            var x = img.width;
            var y = img.height;
            var x1 = 0;
            var y1 = 0;
            var scale = 0;
            //alert(img.width + 'x' + img.height);
            if (x > y) {
                scale = y / _sizeImg;
                y1 = 0;
                x1 = -Math.floor((x / scale - _sizeImg) / 2);
                y2 = _sizeImg;
                x2 = Math.floor(x / scale);
            }
            else {
                scale = x / _sizeImg;
                x1 = 0;
                y1 = -Math.floor((y / scale - _sizeImg) / 2);
                x2 = _sizeImg;
                y2 = Math.floor(y / scale);
            }
            cxt.drawImage(img, x1, y1, x2, y2); //cxt.drawImage(imgIcon,420,355,60, 60);
            //alert("x1="+ x1 + ", y1=" + y1 +", x2=" + x2 +", y2=" + y2);
            // Add Date
            
            
            var today = new Date();
            var curr_date = today.getDate();
            var curr_month = today.getMonth();
            curr_month = '0' + curr_month + 1;
            curr_month = curr_month.substring(0, 2);
            var curr_year = today.getFullYear();
            var date_text = curr_date + '/' + curr_month + '/' + curr_year;
            var hour_text = today.getHours();
            var minutes_text = '0' + today.getMinutes();
            minutes_text = minutes_text.substring(0, 2);
            var time_text = hour_text + ':' + minutes_text;
            cxt.font = "22px Arial";
            cxt.fillStyle = 'rgba(0,0,0,0.6)';
            cxt.fillText(date_text, 31, 41);
            cxt.fillStyle = 'rgba(255,255,255,0.9)';
            cxt.fillText(date_text, 30, 40);
            // Time
            cxt.font = "15px Arial";
            cxt.fillStyle = 'rgba(0,0,0,0.6)';
            cxt.fillText(time_text, 31, 61);
            cxt.fillStyle = 'rgba(255,255,255,0.9)';
            cxt.fillText(time_text, 30, 60);
            // Logo
            var imgLogo = document.getElementById("logoapp");
            cxt.drawImage(imgLogo, 404, 6, 90, 90);
            cxt.fillStyle = 'rgba(255,255,255,0.3)';
            cxt.fillRect(404, 100, 90, 13);
            // Free on AppStore
            cxt.font = "10px Arial";
            cxt.fillStyle = 'rgba(0,0,0,0.6)';
            cxt.fillText("FREE on AppStore", 408, 110);
            cxt.fillStyle = 'rgba(255,255,255,0.9)';
            cxt.fillText("FREE on AppStore", 407, 109);

            // Rectangle I am here
            //cxt.fillStyle = 'rgba(0,0,0,0.7)';
            //cxt.fillRect(0,305,110,35);
            //cxt.font = "18px Arial";
            //cxt.fillStyle = 'rgba(255,255,255,0.9)';
            //cxt.fillText("I AM HERE",10,329);
            // Rectangle Big
            //cxt.fillStyle = 'rgba(0,0,0,0.2)';
            //cxt.fillRect(0,350,500,120);
            // Draw dashed line
            //cxt.beginPath();
            //cxt.strokeStyle = 'rgba(255,255,255,0.5)';
            //cxt.setLineDash([2]);
            //cxt.moveTo(10,420);
            //cxt.lineTo(490,420);
            //cxt.stroke();

            // City Name
            
            cxt.font = "50px HELVETICA";
            cxt.fillStyle = 'rgba(255,255,255,0.9)';
            cxt.fillText(_PicTextPlace, 20, 400);
            // Message
            if (_PicTextMessage !== "") {
                cxt.font = "30px Arial";
                cxt.fillStyle = 'rgba(255,255,255,0.8)';
                cxt.fillText(_PicTextMessage, 20, 455);
            }
            

        };
        /*
        var btnSavePhoto = document.getElementById("btnSavePicGallery");
        btnSavePhoto.style.display = "block";
        var btnSavePhoto = document.getElementById('btnSavePhoto');
        btnSavePhoto.style.display = 'block';
        */
        //img.src = largeImage.src;
        //alert( img.src);


        //$('#textMessage').focus();
    }


    $("#btnSave").click(function () {
        if ($('#textMessage').val().length === 0) {
            //alert("Add image and meal name!");
            showMessage("Add Dish name!");
            return false;
        }        
        SavePhoto(); 
    });
    
    function ClearPicScreen()
    {
        $('#textMessage').val("");
        $('#textIngredients').val("");
        $('#textRecipe').val("");
        document.getElementById("largeImage").src = "";
        var c = document.getElementById('myCanvas');
        var cxt = c.getContext('2d');
        cxt.clearRect(0, 0, canvas.width, canvas.height);    
    }

    // Share Picture
    //
    function sharePicture() {

        //convert canvas data to an image data url
        var c = document.getElementById('myCanvas');
        var imgDataUrl = c.toDataURL();
        //alert(imgDataUrl);
        //share the image via phonegap plugin
        window.plugins.socialsharing.share(
                                       'PicMeals',
                                       'Download from AppStore',
                                       imgDataUrl,
                                       'http://www.picmeals.com', //'https://itunes.apple.com/us/app/geepics/id596146502?mt=8',
                                       function () {
                                           //success callback
                                       },
                                       function (err) {
                                           //error callback
                                           console.error('error in share', err)
                                       }
                                       );
    } 
  
  
$(document).on("click", "#det_ShareBtn", function(evt)
    {     
        window.plugins.socialsharing.share(_object.title + " - Shared with PicMeals", null, null, 'http://www.picmeals.com/en/' + _object.urlPage);
    });

    function savePictureToGallery() {
        //alert("save");
        window.canvas2ImagePlugin.saveImageDataToLibrary(
                                                     function (msg) {
                                                         //var btnSavePhoto = document.getElementById("btnSavePicGallery");
                                                         //btnSavePhoto.style.display = "none";
                                                     },
                                                     function (err) {
                                                         console.log(err);
                                                     },
                                                     'myCanvas'
                                                     );
        //uploadPhoto();
    }


    function SavePhoto() {
        var imageURI = document.getElementById("largeImage").src;
        if ((imageURI.length === 0) || ($('#textMessage').val().length === 0)) {
            //alert("Add image and meal name!");
            showMessage("Add image!");
            return false;
        }
        var o = new Object();
        o.user = _UserRefID;
        o.displayUser = _UserDisplayName;
        o.title = $('#textMessage').val().replace("'", "''").trim();
        o.ingredients = $('#textIngredients').val().replace("'", "''").trim();
        o.recipe = $('#textRecipe').val().replace("'", "''").trim();
        o.public = 0;
        o.lat = $('#AddDish-PlaceLat').text();
        o.lng = $('#AddDish-PlaceLong').text();
        o.place = $('#AddDish-PlaceName').text().replace("'", "''");
        if (_PlaceID!==null || _PlaceID!=="") o.placeId = _PlaceID;
        if (_MenuID!==null || _MenuID!=="") 
        {
            o.price = $('#textPrice').val().replace("'", "''").trim();
            o.calories = $('#textCalories').val().replace("'", "''").trim();
            o.currency = _UserCurrency;
        }
        $('#pageLoader').modal('show');
        
        dpd('meals').post(o, function(data, err) {
          if (err) {
              console.log("comment: ", err);
              $('#pageLoader').modal('hide');
          } 
           if (data) {
                console.log("meal: ", data);
                if (_MenuID!==null || _MenuID!=="") AddDishToMenu(data.id);
                var oData = new Object();
                oData.urlPage = "meal-" + CreateUrl(o.title) + "-_" + data.id;
                //oData.img = "//s3.amazonaws.com/pm-meals/" + data.user + "/" + data.id+ "_300.jpg";
                oData.img = "//d1qrajnq9lklxl.cloudfront.net/" + data.user + "/" + data.id+ "_300.jpg";
                oData.public = 1;
                oData.id = data.id;
                dpd('meals').put(oData, function(data, err) {
                    //alert(JSON.stringify(data));
                    //alert(JSON.stringify(err));
                      if (err) {
                          console.log("comment: ", err);
                          $('#pageLoader').modal('hide');
                      } 
                       if (data) {
                          console.log("comment: ", data);
                          $('#pageLoader').modal('hide');
                           uploadPhoto(data.user, data.id);
                      } 
                  });                 
                
                
                $('#pageLoader').modal('hide');               
               
          } 
      });   
    }

    //End TAKE PICTURE


    /////////  UPLOAD IMAGE - START

    function uploadPhoto(userid, mealid) {
        var imageURI = document.getElementById("largeImage").src;
        //alert("imageURI :  " + imageURI);

        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.headers = {
            Connection: "close"
        }
        
        options.chunkedMode = false;
        var params = new Object();
        params.userid = userid;
        params.mealid = mealid;

        options.params = params;
        //var comment = encodeURI(_PicTextMessage+"");
        var ft = new FileTransfer();
        //http://www.picmeals.com/media/juploader.ashx?userid=salvo&mealid=452&public=1
        var remoteURL = "http://www.picmeals.com/media/juploader.ashx?public=1&userid=" + userid + "&mealid=" + mealid;
        //alert(remoteURL);
        $('#pageLoader').modal('show');
        ft.upload(imageURI, encodeURI(remoteURL), win, fail, options);        
    }

    function win(r) {
        //alert("Sent = " + r.bytesSent);
        $('#pageLoader').modal('hide');
        showMessage("Image uploaded!<br/><br/><span class='glyphicon glyphicon-ok-sign' style='color:green;font-size:xx-large;'></span>");
        //savePictureToGallery();
        ClearPicScreen();
        if (_MenuID===null || _MenuID==="")
        {
            sharePicture();
            activate_page("#page_List");
            GetMealsList();
        }
        else
        {   
            activate_page("#page_myRestaurant"); 
            loadMenu(_UserRefID, 'listCategory','#page_myRestaurant');
        }
    }

    function fail(error) {
        $('#pageLoader').modal('hide');
        switch (error.code) {
            case FileTransferError.FILE_NOT_FOUND_ERR:
                alert("Photo file not found");
                break;
            case FileTransferError.INVALID_URL_ERR:
                alert("Bad Photo URL");
                break;
            case FileTransferError.CONNECTION_ERR:
                alert("Connection error");
                break;
        }
        // alert("An error has occurred: Code = " + error.code);
    }

    /////////  UPLOAD IMAGE - END  

}); // END DEVICE REAdy
//}


function GetDataSettings() {
    if (localStorage.GPSEnabled === null) {
        localStorage.GPSEnabled = true;
    }
    _GPSEnabled = localStorage.GPSEnabled;
    if (localStorage.GPSEnabled === true) {
        $("#btnGPS_Yes").addClass('btnSelected');
    }
    else {
        $("#btnGPS_No").addClass('btnSelected');
    }
}

function showError(error) {
    if (error.message !== null) {
        //alert(JSON.stringify(error.responseJSON));
            $('#lMessageError').text(error.message);
            $('#lTitleError').text('Error');
            $('#popupError').modal('show');
    }
    //alert(JSON.stringify(error));
}

function showMessage(message) {
    if (message !== null) {
        $('#lMessageError').html("<center>" + message + "</center>");
        $('#lTitleError').text('Message');
        $('#popupError').modal('show');
    }
    //alert(JSON.stringify(error));
}


function showDet(userDet, idDet, sImg) {
    //_ID = idDet;
    _PublisherRefID = userDet;
    _object = null;
    //alert($('#det_img').scrollTop());
    //alert($("#page_detail").offset().top);
    $('#pageLoader').modal('show');
    $("#det_img").attr('src', sImg);
    $('#listComments').empty();
    //console.log("log", '?include=user&id=' + idDet)
    dpd('meals').get('?public=1&include=user&id=' + idDet, function(data, err) {
          if (err) {
            $('#pageLoader').modal('hide');
            return showError(err);
          }
          if (data) {
                  _object = data;
                  $('#det_text').text(_object.title);
                  $('#det_ingredients').text(_object.ingredients);
                  $('#det_url').text(_object.urlPage);
                  $('.det_user').text(_object.displayUser);
                  $('#det_likes').text(_object.likes.toString());
                  $('#det_comments').text(_object.comments.toString());
                  $(".det_imguser").attr('src', 'http:' + _object.imgProfile);
                  //alert(data.imgProfile);
                  ChangeFontSize('det_text');
                  loadComments(idDet);
                  activate_page("#page_detail");
                  console.log('likes?user=' + _UserRefID + '&meal=' + idDet);
                  $('#pageLoader').modal('hide');
                  dpd('likes').get('?user=' + _UserRefID + '&meal=' + idDet, function(ilikeit, error) {
                    if (ilikeit) {
                        //alert("i like " + ilikeit[0].id);
                        if (ilikeit) {  
                            if (JSON.stringify(ilikeit)!=="[]") { 
                                $('#det_LikeBtn').removeClass('glyphicon-heart-empty').addClass('glyphicon-heart'); }
                            else { $('#det_LikeBtn').removeClass('glyphicon-heart').addClass('glyphicon-heart-empty'); 
                          }
                        }
                    }
                  }); 
        }});     
}


function loadComments(idDet) {
      dpd('comments').get('?meal=' + idDet, function(data, err) {
          if (data) {
              $.each(data, function (i, item) {
                        $('#listComments').append("<a class='list-group-item allow-badge widget' data-uib='twitter%20bootstrap/list_item' data-ver='1'>" +
                                "<h4 class='list-group-item-heading'>" + item.text + "</h4><p class='list-group-item-text'>" + item.displayUser + "</p></a>");
                    });
          }
        });     
}

function addComment() {
    //alert(idDet);
    var sComment = $('#txt_AddComment').val();
    if (sComment.length === 0) return;
    $('#pageLoader').modal('show');
    //$('#listComments').empty();
    var o = new Object();
    //o.UserID = _UserRefID;
    o.meal = _object.id; //_ID;
    o.visible = 0;
    o.text = sComment.replace("'", "''");
    o.user = _UserRefID;
    
    dpd('comments').post(o, function(data, err) {
          if (err) {
              console.log("comment: ", err);
              $('#pageLoader').modal('hide');
          } 
           if (data) {
              console.log("comment: ", data);
              $('#txt_AddComment').val('');
              $('#popupAddComment').modal('hide');
              loadComments(_object.id);
              $('#pageLoader').modal('hide');
          } 
      });   
}


function likePost() {
      dpd('likes').post({meal : _object.id ,user: _UserRefID}, function(data, err) {
          if (err) {
              console.log("like: ", err);
          } 
           if (data) {
              console.log("like: ", data);
              if (data.id!==undefined)
                $('#det_LikeBtn').addClass('glyphicon-heart').removeClass('glyphicon-heart-empty');
              else
                $('#det_LikeBtn').removeClass('glyphicon-heart').addClass('glyphicon-heart-empty');
               
              console.log("likes?meal=" + _object.id);
              dpd('likes').get('?meal=' + _object.id, function(ilikeit, error) {
                    if (ilikeit!==null) {
                        //console.log("ilikeit not null ", ilikeit.length);
                        $('#det_likes').text(ilikeit.length);
                    } else $('#det_likes').text("0");
              });                
               
          } 
      });
}

$("#btn_NextUserPage").click(function () { _SkipUserPage = _SkipUserPage + _itemPerPage; showUser(); });

function showUser() {
    var sCollection;;
    var sQuery;
    if (_SkipUserPage === 0) {
        //$('#page_user').scrollTop(0);
        $('#listUserPosts .list-group').empty();
        sCollection = "users";
        sQuery = '?include=meals&id=' + _PublisherRefID;
        $('#listUserPosts').show();
        $('#listFollowers').hide();
        $('#listFollowers').empty();
        $('#listFollowing').empty(); 
        $('#listMenu').hide();
        $('#listMenu').empty();
        $('#listUserPosts .load').show();
    }    
    else
    {
        sCollection = "meals";
        sQuery = '?public=1&user=' + _PublisherRefID + '&$limit=' + _itemPerPage + '&$skip=' + _SkipUserPage;
    }
    //alert(idDet);
    //_PublisherRefID;
    //$('#listUserPosts').append('<div>Loading List...</div>');
    $('#pageLoader').modal('show');
    var html = ""; //"<ul>";    
    //dpd('users').get('?include=meals&id=' + _PublisherRefID + '&$limit=' + _itemPerPage + '&$skip=' + _SkiUserPage,
    dpd(sCollection).get(sQuery,
    function(data, error) {
      //alert(JSON.stringify(data));
      //alert(JSON.stringify(error));
      if (error) {
          //console.log("error ", error);
          $('#listUserPosts .list-group').empty();
          $('#pageLoader').modal('hide');
          $('#listUserPosts .list-group').append('<li class="widget" data-uib="app_framework/listitem" data-ver="1"><a>There was an error loading the feed</a></li>');
          $('#listUserPosts .list-group').append('<li class="widget" data-uib="app_framework/listitem" data-ver="1"><a>' + error.toString() + '</a></li>');          
          return showError(error);
      }
      if (data) {
        console.log(data);
        if (_SkipUserPage === 0) {  
            if (data.hasMenu===1) 
                $("#btnShowMenu").css("display","block");
            else
                $("#btnShowMenu").css("display","none");
            if (data.meals.length) data = data.meals; 
        }
        if (data.length) {
            if (data.length<10) $('#listUserPosts .load').hide();
            $.each(data, function (i, item) {
                  $('#listUserPosts .list-group').append("<div class='item'><div class='box'><img src='http:" + item.img + "' class='detPost' id='detPost_" + item.user + "@" + item.id + "'/><p>" + item.title + "<br/><span class='badge'>" + item.likes + "</span> Yummies</p></div></div>");
            });  
        }
        else
        {
            $('#listUserPosts .load').hide();
            if (_PublisherRefID=== _UserRefID)
            {
                $('#listUserPosts .list-group').append("<div class='list-group-item allow-badge widget' data-uib='twitter%20bootstrap/list_item' data-ver='1'><h4 class='list-group-item-heading'><b>Hey, you haven't posted any dish yet!!</b></h4><p class='list-group-item-text'>Click below to start</p></div><div class='row d-margins'><br/><div class='content-area vertical-col d-margins'><button class='btn widget onlyBorder btn-lg btn-default btnAddMeal' data-uib='twitter%20bootstrap/button'><i class='glyphicon glyphicon-camera button-icon-left' data-position='left'></i>Upload Your Dish Now</button></div></div>"); 
            }
            else
            {
                $('#listUserPosts .list-group').append("<div class='list-group-item allow-badge widget' data-uib='twitter%20bootstrap/list_item' data-ver='1'><h4 class='list-group-item-heading'><b>There are no posts yet from this user</b></h4><p class='list-group-item-text'>Check again later...</p></div>");
            }
        }
          
        if (_SkipUserPage === 0) {    
        // Open Following
        dpd('followers').get('?include=following&user=' + _PublisherRefID, function(dt, er) {
            if (dt.length) {
                  $('#totFollowing').text(dt.length);
                  var bFollowing = false;
                  for (var i = 0; i < dt.length; i++) {
                      $('#listFollowing').append("<a class='list-group-item allow-badge widget lnkuser' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='" + dt[i].id + "'><div class='row'><div class='col-xs-3 col-sm-3 col-lg-2 pad5 text-left'><img class='det_imguser img-circle user-circle-xs' src='" + dt[i].imgProfile + "'/></div><div class='col-xs-9 col-sm-9 col-lg-10 pad5'><h4 class='list-group-item-heading'><span class='red'>" + dt[i].displayUser + "</span></h4><p>member since " + formatDate(dateUser) + "</p></div></div></a>");
                      if (dt[i].id == _UserRefID) {
                          bFollowing = true;
                      }
                  }
                  if (bFollowing) {
                      $('#lbFollow').text("Following");
                      $('#icoFollow').removeClass("glyphicon-plus-sign").addClass("glyphicon-ok");
                  }
                  else {
                      $('#lbFollow').text("Follow");
                      $('#icoFollow').addClass("glyphicon-plus-sign").removeClass("glyphicon-ok");
                  }                    
            }
        });

        // Open Followers
        dpd('followers').get('?include=followers&userFollowing=' + _PublisherRefID, function(dt, er) {
            if (dt.length) {
                $('#totFollowers').text(dt.length);
                for (var i = 0; i < dt.length; i++) {
                    $('#listFollowers').append("<a class='list-group-item allow-badge widget lnkuser' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='" + dt[i].id + "'><div class='row'><div class='col-xs-3 col-sm-3 col-lg-2 pad5 text-left'><img class='det_imguser img-circle user-circle-xs' src='" + dt[i].imgProfile + "'/></div><div class='col-xs-9 col-sm-9 col-lg-10 pad5'><h4 class='list-group-item-heading'><span class='red'>" + dt[i].displayUser + "</span></h4><p>member since " + "</p></div></div></a>");
                }
            }
          }); 
        }
        $('#pageLoader').modal('hide');
    }
    });  
    console.log("completed");
}

function followUser() 
{
    var obj = new Object();
    obj.user = _UserRefID;
    obj.userFollowing = _PublisherRefID;
    dpd('followers').post(obj, 
          function(data, error) {   
            if (data) {
                if (data.message)
                {
                    $('#lbFollow').text("Follow");
                    $('#icoFollow').addClass("glyphicon-plus-sign").removeClass("glyphicon-ok");
                } else
                {
                    $('#lbFollow').text("Following");
                    $('#icoFollow').removeClass("glyphicon-plus-sign").addClass("glyphicon-ok");
                }
              }
    });     
}


    function SendMessage(network, userid)
    {
        var obj = new Object();
        obj.user = _UserRefID;
        obj.method = network;
        obj.invited = userid;
        dpd('invites').post(obj,function(data, err) {});
        
        //alert(network + "," + userid);
        //var c = document.getElementById('logoapp');
        //var imgDataUrl = c.toDataURL();
        //alert(imgDataUrl);
        //share the image via phonegap plugin
        if (network==="facebook")
        {
            window.plugins.socialsharing.shareViaFacebook(
               'Share pics of your dishes with PicMeals',
               null,
               'http://www.picmeals.com/en/download-mobile-app', 
               successSendFriend, 
               failureSendFriend 
            );
        }
        else if (network==="email")
        {
            window.plugins.socialsharing.shareViaEmail(
              'Check it out this Mobile App http://www.picmeals.com/en/download-mobile-app, Share pics of your dishes with PicMeals', 
              'Free Download PicMeals Mobile App',
              [userid], // TO: must be null or an array
              null, // CC: must be null or an array
              null, // BCC: must be null or an array
              ['http://www.picmeals.com/images/icon120.png'], // FILES: can be null, a string, or an array
              successSendFriend, 
              failureSendFriend 
            );
        }
        else if (network==="sms")
        {
            intel.xdk.device.sendSMS("Check it out this Mobile App http://www.picmeals.com/en/download-mobile-app",userid);
        }        
    
    }
        
    function successSendFriend() { 
        /*
            dpd.users.put({id: _UserRefID, foodcoins: {$inc: 1}},
            function(data, err) { if (data) showMessage("You have just earned 1 Yum Coin!");}
            );*/
    }

    function failureSendFriend(err) {alert('error in share', err)}


    function SaveUserLocation()
    {
        //alert("SaveUserLocation");
        var obj = new Object();
        obj.id = _UserRefID;
        if (localStorage.latitude!==undefined)
        {
            var objLoc = new Object();
            objLoc.lat = localStorage.latitude;
            objLoc.lon = localStorage.longitude;
            obj.loc = objLoc; 
        }  
        dpd('users').put(obj, function(data, err) {});
    }



function RequestPlacesData() {
    //var sUrl = 'http://www.picmeals.com/Json/Places.aspx?kapi=IMNG02&category=10&search=&lat=53.35872203826385&lng=-6.278686520937526&rad=10&callback=RequestPlacesData_Success';
    var sUrl = 'http://www.picmeals.com/Json/Places.aspx?kapi=IMNG02&category=10&search=&lat=' + localStorage.latitude + '&lng=' + localStorage.longitude + '&rad=10&callback=RequestPlacesData_Success';
    console.log('url: ' + sUrl);
    //alert(sUrl);
    $.ajax({
        type: 'GET',
        url: sUrl,
        async: false,
        jsonpCallback: 'RequestPlacesData_Success',
        contentType: "application/json",
        dataType: 'jsonp',
        crossDomain: true
        /*
        data: JSON.stringify({
        kapi:'IMNG02',
        category:'',
        search:'',
        lat: 53.277096, //parseFloat(lat), //lat.toString(),	// String(lat),
        lng: -6.414857, //parseFloat(lat), //lon.toString(), //  String(lon),
        rad: 10,
        callback:'RequestPlacesData_Success'
        })*/
    });
}

function RequestPlacesData_Success(data) {
    $('#listPlaces').empty();
    console.log(data);

    if (data.geonames == null) {
        return;
    }
    var OpenFlag = "";

    if (data.geonames.length > 0) {
        var jObj = sortByKey(data.geonames, 'Dist');
        //console.log('response is : ' + JSON.stringify(jObj));
        $('#listPlaces').append("<a class='list-group-item allow-badge widget item-place' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='home'><div class='row'><div class='col-xs-2 col-sm-2 col-lg-2 pad5 text-left'></div><div class='col-xs-8 col-sm-9 col-lg-9 pad5'><h4 class='list-group-item-heading'><span class='red title'>My Home</span></h4><p></p><p></p><span class='place-lat'>" + localStorage.latitude + "</span><span class='place-long'>" + localStorage.longitude + "</span></div><div class='col-xs-2 col-sm-1 col-lg-1 pad5 text-left'><span class='glyphicon glyphicon-time' style='color:green;'></span></p></div></div></a><p></p>");
        for (var i = 0; i < jObj.length; i++) {
            OpenFlag = "";
            if (jObj[i].Open != null) {
                if (jObj[i].Open == "true") OpenFlag = "<span class='glyphicon glyphicon-time' style='color:green;'></span>";
                if (jObj[i].Open == "false") OpenFlag = "<span class='glyphicon glyphicon-time' style='color:red;'></span>";
            }
            $('#listPlaces').append("<a class='list-group-item allow-badge widget item-place' data-uib='twitter%20bootstrap/list_item' data-ver='1' id='" + jObj[i].Gid + "'><div class='row'><div class='col-xs-2 col-sm-2 col-lg-2 pad5 text-left'><img class='img-circle places-circle-xs' src='" + jObj[i].Icon + "'/></div><div class='col-xs-8 col-sm-9 col-lg-9 pad5'><h4 class='list-group-item-heading'><span class='red title'>" + jObj[i].Title + "</span></h4><p>" + jObj[i].Address + "</p><p>" + jObj[i].Dist + " Km</p><span class='place-lat'>" + jObj[i].Lat + "</span><span class='place-long'>" + jObj[i].Lng + "</span></div><div class='col-xs-2 col-sm-1 col-lg-1 pad5 text-left'>" + OpenFlag + "</div></div></a>");

        }
    }
}