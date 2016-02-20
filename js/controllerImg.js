
var JSConfigApp = angular.module('JSConfigApp', ['textAngular']).controller('JSConfigAppCtrl', ['$scope', '$sce', function ($scope, $sce) {
	
		$scope.promos = {
			global : {
				launchDate : "",
				headerText : "",
				subHeaderText : "",
				promos : [{
					bannerContent : {
						imgOrHTML : "img",
						img : {
							contentParameters: {
								link : false,
								linkUrl : ""
							},
							images : {
								path: "",
								dataUri: ""
							}
						},
						HTML : {
							useLocal: false,						
							localHTML: '<div class=main><h1 style="text-align: center;">Headline</h1>\
<h4 style="text-align: center;">Subheader</h4>\
<p style="text-align: center;">Some optional info</p>\
<p style="text-align: center;">\
<a href="/category.html" target="">Link 1</a>&nbsp;\
<a href="/cat.html">Link 2</a>\
</p></div>',
              backgroundColor : "#FFFFFF",
							path : ""
						}
					},
					tapContent : {
						displayType : "generic",
						legalOverride : "",
						genericCodeId : "",
						genericCode : ""
					}
				}]
			}
		}
	
	
	$scope.toggleHTML = function() {
		 $scope.customHTML = $scope.customHTML === false ? true: false;
	}
	
	$scope.toggleImg = function() {
		 $scope.customImg = $scope.customImg === false ? true: false;
	}
	
	$scope.delete = function ( idx ) {
		$scope.promos.global.promos.splice(idx, 1);
		growth = 268 * $scope.promos.global.promos.length;
		jQuery(".offerspotlight-drawer-slider-items").css('width', growth+"px");
	};
	
	$scope.addItem = function () {
		$scope.promos.global.promos.push({
			bannerContent : {
				imgOrHTML : "img",
				img : {
					contentParameters: {
						link : false,
						linkUrl : ""
					},
					images : {
						path: "",
						dataUri: ""
					}
				},
				HTML : {
					useLocal: false,
					localHTML: '<div class=main><h1 style="text-align: center;">Headline</h1>\
<h4 style="text-align: center;">Subheader</h4>\
<p style="text-align: center;">Some optional info</p>\
<p style="text-align: center;">\
<a href="/category.html">Link 1</a>&nbsp;\
<a href="/cat.html">Link 2</a>\
</p></div>',
          backgroundColor : "#FFFFFF",
					path : ""
				}
			},
			tapContent : {
				displayType : "generic",
				legalOverride : "",
				genericCodeId : "",
				genericCode : ""
			}
		});
		growth = 268 * $scope.promos.global.promos.length;
		jQuery(".offerspotlight-drawer-slider-items").css('width', growth+"px");
	};
	

	$scope.stripClone = function(obj) {
	  if (null == obj || "object" != typeof obj) return obj;
	  var copy = obj.constructor();
	  for (var attr in obj) {
		if (obj.hasOwnProperty(attr) && attr != '$$hashKey') {
		  var obj_attr = obj[attr];
		  if (typeof obj_attr == "object"){
			copy[attr] = this.stripClone(obj_attr); 
		  } else if (typeof obj_attr == "array"){
			copy[attr] =[];
			for(var i =0; i<obj_attr.length; i++){
			  copy[attr].push(this.stripClone(obj_attr));
			}
		  }else{
			copy[attr] = obj_attr;
		  }
		}
	  }
	  return copy;
	};
	
	$scope.cleanUrl = function(index) {
		 return $sce.trustAsResourceUrl("https://secure.www.brol.wip.gidapps.com/buy/promo_legal_details.do?promoId=" + $scope.promos.global.promos[index].tapContent.genericCodeId);
	}
	

	$scope.myEncodeJson = function(obj){
	  	newObj = this.stripClone(obj);
	    return JSON.stringify(newObj);
	};	
	
	
	jQuery("#the-file-input").change(function() {
		
		$scope.renderJSON(this.files[0]);
	});
	
	$scope.renderJSON = function(file) {
	  var fr = new FileReader();
	  fr.onload = function(e) {
		var newArr = JSON.parse(e.target.result);
		$scope.$apply( $scope.promos = newArr );
		growth = $scope.promos.global.promos.length * 268;
		jQuery(".offerspotlight-drawer-slider-items").css('width', growth+"px");
		jQuery('.redeem').on( 'click', function() {
				jQuery( this ).toggleClass( 'applied' );
				jQuery(this).toggleText('Applied At Bag' , 'Redeem Now')
				return false;
		});
	  }
	  fr.readAsText(file);
	}
	
	$scope.pageNumber = 0;
    $scope.setPageNumber = function(index) {       
        $scope.pageNumber = index;
    }

    $scope.erasePic = function(index) {       
       $scope.promos.global.promos[index].bannerContent.img.images.dataUri = "";
    }

	jQuery(document).on('change','#the-img-input' , function(){ 	
		$scope.renderURI(this, function( dataUri ) {
			$scope.$apply( $scope.promos.global.promos[$scope.pageNumber].bannerContent.img.images.dataUri = dataUri);
		});
	});	
	
	jQuery().on('change','.bg-color-pick:eq("'+$scope.pageNumber+'")' , function(){ 
	  console.log("We chose the picker!");	
      jQuery('.ta-text:eq("'+$scope.pageNumber+'")').css('background-color',$scope.promos.global.promos[$scope.pageNumber].bannerContent.HTML.backgroundColor)
	});	
	
	
	
	
	$scope.attachRedeem = function () {
		jQuery('.redeem').on( 'click', function() {
				jQuery( this ).toggleClass( 'applied' );
				jQuery(this).toggleText('Applied At Bag' , 'Redeem Now')
				return false;
		});
	}		
	
	$scope.renderURI = function (input, callback) {	
		
		var image = new Image();
		image.onload = function () {
			var canvas = document.createElement('canvas');
			canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
			canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size	
			canvas.getContext('2d').drawImage(this, 0, 0);
			$scope.imgError = "";
			if ( canvas.width != 331 && canvas.height != 183 ) {
				$scope.imgError = 'Your image is '+canvas.width+' pixels wide by '+canvas.height+' pixels high. Recommended dimensions are 331 pixels wide by 183 pixels high. Your image may be distorted.';
			}

			callback(canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg);base64,/, ''));

		};
		
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				image.src = e.target.result;
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	window.onbeforeunload = function() {
		localStorage.setItem('promoObject', JSON.stringify($scope.promos));
	}		
}]);




JSConfigApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data|blob):/);
}]);


