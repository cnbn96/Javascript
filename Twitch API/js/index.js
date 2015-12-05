var app = angular.module('twitchApi',[]);
app.controller('control',function($scope,$http){
  //Create filter var
  $scope.allUsers = [];
  $scope.onlineUsers = [];
  $scope.offlineUsers = [];
  
  
  //Create streamer varibles
  var streamers = ["freecodecamp", "GeoffStorbeck", "imaqtpie", "habathcx","notmichaelmcdonald","RobotCaleb","medrybw","comster404","brunofin","fragbitelive","joe_at_underflow","noobs2ninjas","mdwasp","tsm_dyrus","xenocomagain"];
  var clientId = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
  var url = 'https://api.twitch.tv/kraken/';
 
  
  //Get info streamer
  streamers.forEach(function(stream){
    
    //temporary obj
    var obj = {};
    
    $.getJSON(url+'streams/'+stream+clientId).success(function(data){
      //Create line stream
      var streaming = (data.stream===null)?false:true;
      if(streaming){
        obj.status = 'green fa fa-check';
        var streamTitle = data.stream.channel.status;
        if(streamTitle.length>36){
          streamTitle = streamTitle.substring(0,33);
        }
        obj.streamTitle = streamTitle;
      }else{
        obj.status = "red fa fa-exclamation";
        data.streamTitle = '';
      }
      obj.username = stream;
      
      //get user name and logo
      $.getJSON(url+'users/'+stream+clientId).success(function(data){
        obj.name = data.display_name;
        obj.logo = data.logo;
      
      
      //return obj
      $scope.allUsers.push(obj);
      if(streaming){
        $scope.onlineUsers.push(obj);
      }else{
        $scope.offlineUsers.push(obj);
      }
      $scope.profile = $scope.allUsers;
      $scope.$apply();
      });
    });  
  });
  
  $('#menu li').on('click', function() {
   
    if ($(this).data('display') === 'allUsers') {
      $scope.profile = $scope.allUsers;
    } else if ($(this).data('display') === 'onlineUsers') {
      $scope.profile = $scope.onlineUsers;
    } else {
      $scope.profile = $scope.offlineUsers;
    }
    $scope.$apply();
    
    // Change arrow
    $('#menu li').removeClass('activeMenu');
    $(this).addClass('activeMenu');
  })
});