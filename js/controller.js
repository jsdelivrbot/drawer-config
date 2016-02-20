var JSConfigApp = angular.module('JSConfigApp', []);

JSConfigApp.controller('JSConfigAppCtrl', function ($scope) {
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
							link : true,
							linkUrl : ""
						},
						images : {
							path: ""
						}
					},
					HTML : {
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
	};
	
	$scope.addItem = function () {
		$scope.promos.global.promos.push({
				bannerContent : {
					imgOrHTML : "img",
					img : {
						contentParameters: {
							link : "",
							linkUrl : ""
						},
						images : {
							path: ""
						}
					},
					HTML : {
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
	  }
	  fr.readAsText(file);
	}
		
});

JSConfigApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|data|blob):/);
}]);


