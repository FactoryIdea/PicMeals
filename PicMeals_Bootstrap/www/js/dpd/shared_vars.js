
var _PublisherRefID = "";
var _PlaceID = "";
var _PicTextMessage = "";
var _PicTextPlace = "";
var _sizeImg = 500;
var _itemPerPage = 5;
var _SkipPage = 0;
var _SkipUserPage = 0;
var _GPSEnabled = "";
var _CountryCode = "";
var _PrevPage = "";
var _isFirstTime = false;
var _Network = "";

var _UserLang = "en";
var _UserRefID = "1";
var _UserDisplayName = "";
var _UserAccountType = "U";
var _UserImgProfile = "U";
var _UserCurrency = "EUR";

var _MenuID = "";

var _object = new Object();


//Start Return Date
function ReturnDate() {
    var today = new Date();
    var curr_date = today.getDate();
    curr_date = '0' + curr_date;
    curr_date = curr_date.substring(curr_date.length - 2);
    var curr_month = today.getMonth();
    curr_month = curr_month + 1;
    curr_month = '0' + curr_month;
    curr_month = curr_month.substring(curr_month.length - 2);
    var curr_year = today.getFullYear();
    //var date_text = curr_date + '/'+ curr_month + '/'+ curr_year;
    var date_text = curr_year + '' + curr_month + '' + curr_date;
    var hour_text = '0' + today.getHours();
    hour_text = hour_text.substring(hour_text.length - 2);
    var minutes_text = '0' + today.getMinutes();
    minutes_text = minutes_text.substring(minutes_text.length - 2);
    var seconds_text = '0' + today.getSeconds();
    seconds_text = seconds_text.substring(seconds_text.length - 2);

    //var time_text = hour_text + ':' + minutes_text;
    var time_text = hour_text + '' + minutes_text + '' + seconds_text;

    //alert(parseInt(date_text + "" + time_text,10));
    return parseInt(date_text + "" + time_text, 10);
}
//Start Return Date

// Start Format Date

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    return date.getDate() + " " + monthNames[date.getMonth() + 1] + " " + date.getFullYear(); // + "  " + strTime;
}

// End FormatDate

//Start Calculate distance
function calcCrowRounded(lat1, lon1, lat2, lon2) {
    return calcCrow(lat1, lon1, lat2, lon2).toFixed(2);
}

function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
//End Calculate distance

// Sort Json Results
function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function CreateUrl(input)
{
return input.toLowerCase().trim()
    .replace('    ', ' ')
    .replace('   ', ' ')
    .replace('  ', ' ')
    .replace(/[\r]/g, 'r')
    .replace(/[\b]/g, 'b')
    .replace(/[\f]/g, 'f')
    .replace(/[\n]/g, 'n')
    .replace(/\\/g, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace('--', '-');
}

function gup( name, url ) {
  if (!url) url = location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

function ChangeFontSize(objDiv) {
        var len_fit = 25; // According to your question, 10 letters cat fit in.
        var un = $('#' + objDiv);
        un.css("font-size",23); 
        //var width = un.offsetWidth;
        // Get the lenght of user name.
        var len_user_name = un.html().length;
        if(len_fit < len_user_name ){

            // Calculate the new font size.
            var size_now = parseInt(un.css("font-size"));
            var size_new = size_now * len_fit/len_user_name;
            // Set the new font size to the user name.
            un.css("font-size",size_new); 
        }
}

function deleteCookies() {
   var allcookies = document.cookie.split(";");

   for (var i = 0; i < allcookies.length; i++) {
        var cookie = allcookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}