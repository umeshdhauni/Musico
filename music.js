var musicApp = angular.module('musicApp', ['ngAudio']);

musicApp.controller("musicController",['$scope','ngAudio',function($scope,ngAudio){
    ngAudio.setUnlock( false );
    $scope.p_albumart;
    $scope.count=0;
    $scope.co=0;
    $scope.p_name;
    $scope.p_singer;
    $scope.p_link;
    $scope.p_thumbup;
    $scope.p_thumbdown;
    $scope.thumbsup=[];
    $scope.thumbsdown=[];
    $scope.songs=[{
    	albumart:"image/follow.jpg",
    	singer:"Jr. Ntr",
    	name:"I wanna follow",
    	link:"audio/follow.mp3",
    	thumbup:false,
    	thumbdown:false
    },
    {	
    	albumart:"image/baarish.jpg",
    	singer:"Ash king",
    	name:"Baarish - Half Girlfriend",
    	link:"audio/Baarish.mp3",
    	thumbup:false,
    	thumbdown:false
    },
    {	
    	albumart:"image/humsafar.png",
    	singer:"Akhil Sachdeva",
    	name:"Sun mere Humsafar",
    	link:"audio/Humsafar.mp3",
    	thumbup:false,
    	thumbdown:false
    }];
    $scope.playSound=function(link,index){
    	if($scope.count>0){
    		$scope.audio.stop();
    	}
    	$scope.audio = ngAudio.load(link);
    	$scope.audio.play();
		var player=angular.element(document.querySelector("#player"));
		player.removeClass('fa-play-circle').addClass('fa-pause-circle');
    	$scope.p_albumart=$scope.songs[index].albumart;
    	$scope.p_name=$scope.songs[index].name;
    	$scope.p_singer=$scope.songs[index].singer;
    	$scope.p_link=$scope.songs[index].link;
    	$scope.p_thumbup=$scope.songs[index].thumbup;
    	$scope.p_thumbdown=$scope.songs[index].thumbdown;
		var myEu=angular.element(document.querySelector("#mainplayer"));
		myEu.show();
		var mplayer=angular.element(document.querySelector(".mainview"));
    	mplayer.hide();
		$scope.count++;
    }
    $scope.toggleSong=function(){
		var player=angular.element(document.querySelector("#player"));
    	if(player.hasClass('fa-play-circle')){
    		player.removeClass('fa-play-circle').addClass('fa-pause-circle');
    		$scope.audio.play();
    	} else {
    		player.removeClass('fa-pause-circle').addClass('fa-play-circle');
    		$scope.audio.pause();
    	}
    }
    $scope.nextSong=function(){
    	$scope.audio.stop();
    	for(var i=0;i<$scope.songs.length;i++){
    		if($scope.songs[i].link==$scope.p_link){
    			$scope.p_link=$scope.songs[i+1].link;
    			$scope.p_albumart=$scope.songs[i+1].albumart;
    			$scope.p_name=$scope.songs[i+1].name;
    			$scope.p_singer=$scope.songs[i+1].singer;
    			$scope.p_thumbup=$scope.songs[i+1].thumbup;
    			$scope.p_thumbdown=$scope.songs[i+1].thumbdown;
    		break;
    		}
    	}
    	$scope.audio = ngAudio.load($scope.p_link);
    	$scope.audio.play();
    	var player=angular.element(document.querySelector("#player"));
		player.removeClass('fa-play-circle').addClass('fa-pause-circle');
    }
    $scope.previousSong=function(){
    	$scope.audio.stop();
    	for(var i=0;i<$scope.songs.length;i++){
    		if($scope.songs[i].link==$scope.p_link){
    			$scope.p_link=$scope.songs[i-1].link;
    			$scope.p_albumart=$scope.songs[i-1].albumart;
    			$scope.p_name=$scope.songs[i-1].name;
    			$scope.p_singer=$scope.songs[i-1].singer;
    			$scope.p_thumbup=$scope.songs[i-1].thumbup;
    			$scope.p_thumbdown=$scope.songs[i-1].thumbdown;
    		break;
    		}
    	}
    	$scope.audio = ngAudio.load($scope.p_link);
    	$scope.audio.play();
    	var player=angular.element(document.querySelector("#player"));
		player.removeClass('fa-play-circle').addClass('fa-pause-circle');

    }
    $scope.thumbsUp=function(){
    		angular.forEach($scope.songs,function(song){
    			if(song.link==$scope.p_link){
    				if($scope.p_thumbup==false){
    					song.thumbup=true;
    					$scope.p_thumbup=true;
    					song.thumbdown=false;
    					$scope.p_thumbdown=false;
    				}
    				else{
    					song.thumbup=false;
    					$scope.p_thumbup=false;
    				}
    			}
    		});
    }
    $scope.thumbsDown=function(){
    	angular.forEach($scope.songs,function(song){
			if(song.link==$scope.p_link){
				if($scope.p_thumbdown==false){
					song.thumbdown=true;
					$scope.p_thumbdown=true;
					song.thumbup=false;
					$scope.p_thumbup=false;

				}
				else{
					song.thumbdown=false;
					$scope.p_thumbdown=false;
				}
			}
    	});
    }
    $scope.menuToggle=function(){
    	var menu=angular.element(document.querySelector(".menu-bar"));
    	menu.addClass("menu-shift");
    	var togglebutton=angular.element(document.querySelector("#togglebutton"));
    	if(togglebutton.hasClass('fa-list')){
    		togglebutton.removeClass('fa-list').addClass('fa-remove');
    		togglebutton.addClass("indexup");

    	} else {
    		togglebutton.removeClass('fa-remove').addClass('fa-list');
    		menu.removeClass("menu-shift");
    	}
	}
	$scope.viewItem=function(id){
		var menu=angular.element(document.querySelector(".menu-bar"));
    	menu.removeClass("menu-shift");
    	var togglebutton=angular.element(document.querySelector("#togglebutton"));
    	togglebutton.removeClass('fa-remove').addClass('fa-list');
		var item=angular.element(document.querySelector(".menu-bar"));
		var viewitem=angular.element(document.querySelector("#viewitem"));
		viewitem.children("*").hide();
		viewitem.children(id).show('slow');
		var myEu=angular.element(document.querySelector("#mainplayer"));
		myEu.hide();

	}
	$scope.mplaySong=function(link,index){
		var player=angular.element(document.querySelector("#song-"+index));
		$scope.playerStop=function(){
		if($scope.co>0){
    		$scope.audio.stop();
    		var x = jQuery('.mplayer')
    		x.each(function(val){
    			x.removeClass('fa-pause-circle').addClass('fa-play-circle');
    		});
    	}
    	}
    	if(player.hasClass('fa-play-circle')){
    		$scope.playerStop();
    		player.removeClass('fa-play-circle').addClass('fa-pause-circle');
    		$scope.audio=ngAudio.load(link);
    		$scope.audio.play();
    	} else {
    		$scope.playerStop();
    		player.removeClass('fa-pause-circle').addClass('fa-play-circle');
    		$scope.audio.pause();
    	}
    	$scope.co++;
	}
}]);
