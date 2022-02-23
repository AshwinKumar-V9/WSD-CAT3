
//dashboard router
var student = angular.module("student", ['ngRoute'])
student.config(($routeProvider) => {
    $routeProvider
    .when('/', {
        templateUrl: '../routePages/home.html',
        controller: 'homeCtrl'
    })
    .when('/displayStudents', {
        templateUrl: '../routePages/displayStudents.html',
        controller: 'displayCtrl'
    })
    .when('/addStudent', {
        templateUrl: '../routePages/addStudent.html',
        controller: 'addCtrl'
    })
    .when('/searchID', {
        templateUrl: '../routePages/searchID.html',
        controller: 'searchCtrl'
    })
    .when('/MCAstudents', {
        templateUrl: '../routePages/MCAstudents.html',
        controller: 'mcaCtrl'
    })
    .when('/maleAGrade', {
        templateUrl: '../routePages/maleAGrade.html',
        controller: 'maleCtrl'
    })
})

student.controller('studentCtrl', function($scope) {
})

student.controller('displayCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $http.get('http://127.0.0.1:9000/stuinfo')
    .success((response) => {
        $scope.students = response
    })

    $scope.delStudent = function () {
        $http.post('http://127.0.0.1:9000/delStudent', {'id': id})
        .success(() => {
            $location.path = '/'
        })
    }
    $scope.updateStudent = function () {
        $rootScope.studentUpdate = student
        console.log("check")
        $http.get('http://127.0.0.1:9000/stuinfo')
        .success((response) => {
            $location.path = '/'
        })
    }
})
student.controller('mcaCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $scope.course = 'MCA'
    $http.get('http://127.0.0.1:9000/stuinfo')
    .success((response) => {
        $scope.students = response
    })
})
student.controller('maleCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $scope.gender = 'male'
    $scope.grade = 'A'
    $http.get('http://127.0.0.1:9000/maleAG')
    .success((response) => {
        $scope.students = response
    })
})
student.controller('searchCtrl', function($scope, $rootScope) {
    $rootScope.studentUpdate = 0
    $http.get('http://127.0.0.1:9000/stuinfo')
    .success((response) => {
        $scope.students = response
    })
})

