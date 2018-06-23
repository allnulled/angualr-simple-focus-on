/**
 * # angularJS module - simple-focus-on
 *
 * AngularJS directive and service to simplify the focus event with AngularJS framework.
 * 
 * ## 1. Installation
 * 
 * #### 1.1. Download the module:
 * 
 * ~$ `npm install --save angular-simple-focus-on`
 * 
 * #### 1.2. Import the module from your HTML:
 * 
 * ```html
 * <script src="node_modules/angular-simple-focus-on/src/module.simple-focus-on.js"></script>
 * ```
 * 
 * ## 2. Usage
 * 
 * #### 2.1. Import the module from your AngularJS app:
 * 
 * ```js
 * var app = angular.module("YourApplication", ["SimpleFocusOn"]);
 * ```
 * 
 * #### 2.2. Import the service from your AngularJS controller:
 * 
 * ```js
 * app.controller("YourController", ["SimpleFocusOnService", function(SimpleFocusOnService) {
 *   this.focus = SimpleFocusOnService.focus;
 * }]);
 * ```
 * 
 * #### 2.3. Assign a `simple-focus-on-id` (string) attribute to the tag that you want to receive the focus:
 * 
 * ```html
 * <input simple-focus-on-id="'some unique id'" type="text" />
 * ```
 * 
 * #### 2.4. Call the `SimpleFocusOnService.focus('some unique id')` method somewhere. For example, in a `ng-click` event:
 * 
 * ```html
 * <button ng-click="YourController.focus('some unique id');" type="button">Focus on some input</button>
 * ```
 * 
 * And that is all. When you click to this button, the event will automatically put the focus on the input event.
 * 
 * ## 3. API Reference
 * 
 * 
 * 
 * #### 3.1. The `SimpleFocusOn` AngularJS module.
 * 
 * The `SimpleFocusOn` is the AngularJS module that contains all the API of this module. You will need to import it from your AngularJS application to use it.
 * 
 * Import it from your app like:
 * 
 * ```js
 * var app = angular.module("YourApp", ["SimpleFocusOn"]);
 * ```
 * 
 */
angular
  .module("SimpleFocusOn", [])
  /**
   *
   * #### 3.2. The `simpleFocusOnId` attribute directive
   * 
   * **Example:** 
   * 
   * ```html
   * <tag simple-focus-on-id="'identifier'"></tag>
   * ```
   *
   * **Description:**
   *
   * The `simple-focus-on-id` HTML attribute can assign to an element a unique SimpleFocusOn identifier.
   * 
   * This is the way that the module has to know to which element the event `SimpleFocusOnService.focus(~)` must trigger the `$element.focus()` event.
   * 
   * This HTML attribute is attached to the directive scope through `"="`, which means that you can pass variables, strings, method calls, or even concatenate them.
   * 
   * To pass a literal string, you need to put the quotes. 
   * 
   * For example, to concatenate a literal with a dynamic index (of an `ng-repeat` loop, for example), we could write:
   * 
   * ```html
   * <textarea simple-focus-on-id="'id-number-' + yourIndex"></textarea>
   * ```
   * 
   */
  .directive("simpleFocusOnId", [
    function() {
      return {
        restrict: "A",
        scope: {
          simpleFocusOnId: "="
        },
        link: function($scope, $element, $attributes, $controller) {
        	$scope.$on("SimpleFocusOnEvent", function($event, id) {
        		if((""+id) == $scope.simpleFocusOnId) {
        			$element[0].focus()
        		}
        	});
        }
      };
    }
  ])
  /**
   *
   * #### 3.3. The `SimpleFocusOnService` service
   *
   * **Example:**
   * 
   * ```js
   * app.controller("YourController", ["SimpleFocusOnService", function(SimpleFocusOnService) {
   *   this.focus = SimpleFocusOnService.focus;
   *   SimpleFocusOnService.focus("Unique ID");
   * }])
   * ```
   * 
   * **Description:**
   * 
   * The line `this.focus = SimpleFocusOnService.focus` is for making the `focus` method of the service available from your HTML 
   * through the controller `YourController`,but this is totally optional.
   * 
   * The line `SimpleFocusOnService.focus("Unique ID")` triggers the `focus` for the element that has assigned `<* simple-focus-on-id="'Unique ID'"></*>`.
   * 
   */
  .service("SimpleFocusOnService", [
  	"$rootScope",
  	function($rootScope) {
  		this.focus = function(id) {
  			$rootScope.$broadcast("SimpleFocusOnEvent", id);
  		};
  	}
  ]);

/**
 *
 * ## 4. Tests
 *
 * There are no tests for this small utility. However, if you open `/test/index.html` from your browser, you should be able to see a very
 * simple example of the module working.
 * 
 * ## 5. Conclusion
 * 
 * This is a very simple tool, but can be very useful. Use it freely.
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */