'use strict';

angular.module('newTestForm').controller('newTestFormController', ['$scope','$log', '$state', '$location', 'todoService', '$timeout',
    function($scope, $log, $state, $location, todoService, $timeout){

        //action labels
        $scope.buttonActionLbl = "";
        $scope.labelActionLbl = "12345";
        $scope.textBoxActionLbl = "";
        $scope.checkBoxActionLbl = "";
        $scope.radioButtonActionLbl = "";
        $scope.comboBoxActionLbl = "";
        $scope.alertActionLbl = "";
        $scope.imgActionLbl = "";
        $scope.fileUploadActionLbl = "";

        $scope.checkBoxChecked = false;
        $scope.radioButtonChecked = false;
        $scope.cmbBoxOptions = ["option1", "option 2", "option 3"];
        $scope.selectedOption = null;
        $scope.currentUrl = $location.absUrl().split('?')[0];
        $scope.title = document.title;
        $scope.mouseCoords = {X: 0, Y: 0};
        $scope.mouseClickCoords = {X: 0,Y: 0}
        $scope.draggableButton = {label: "Drag me"};

        $scope.chosenDate = null;
        $scope.imageSrc = "not loaded";
        $scope.dragStart={
            x:0,y:0
        };
        $scope.dragOffset ={
            x:0, y:0
        };

        $scope.components = {
            button: "button",
            label: "label",
            textBox: "textBox",
            checkBox: "checkBox",
            radioButton: "radioButton",
            comboBox: "comboBox",
            image: "image"
        };

        $scope.actions = {
            clicked: "clicked",
            dblClicked: "Double clicked",
            rightClicked: "Right Clicked",
            focusLost: "Focus Lost",
            mouseEntered: "Mouse Entered",
            checked: "Checked",
            unchecked: "Unchecked"
        };

        $scope.selectOptions = [
            {label: "option 1"},
            {label: "option 2"},
            {label: "option 3"}
        ];

        $scope.draggableLists = {
            A:[
                {
                    label: "item 1"
                },
                {
                    label: "item 2"
                },
                {
                    label: "item 3"
                }
            ],
            B:[
                {
                    label: "item 4"
                },
                {
                    label: "item 5"
                },
                {
                    label: "item 6"
                }
            ]
        };




        //General Actions
        $scope.onClick = function(component){

           updateActionLabel(component, $scope.actions.clicked);
        };

        $scope.onDblClick = function(component){

            updateActionLabel(component, $scope.actions.dblClicked);
        };

        $scope.onRightClick = function(component){

            updateActionLabel(component, $scope.actions.rightClicked);
        };

        $scope.onMouseEnter = function(component){

            updateActionLabel(component, $scope.actions.mouseEntered);
        };

        $scope.onFocusLost = function(component){

            updateActionLabel(component, $scope.actions.focusLost);
        };

        //Checkbox actions
        $scope.onCheckBoxChanged = function(){
            var checked = $scope.checkBoxChecked ? $scope.actions.checked : $scope.actions.unchecked;
            updateActionLabel($scope.components.checkBox, checked);
        };

        //Radio button actions
        $scope.onRadioButtonChanged = function(){
            updateActionLabel($scope.components.radioButton, $scope.actions.checked);
        };

        function updateActionLabel(component, value){
            switch(component){
                case $scope.components.button:
                    $scope.buttonActionLbl = value;
                    break;
                case $scope.components.label:
                    $scope.labelActionLbl = value;
                    break;
                case $scope.components.textBox:
                    $scope.textBoxActionLbl = value;
                    break;
                case $scope.components.checkBox:
                    $scope.checkBoxActionLbl = value;
                    break;
                case $scope.components.radioButton:
                    $scope.radioButtonActionLbl = value;
                    break;
                case $scope.components.comboBox:
                    $scope.comboBoxActionLbl = value;
                    break;
                case $scope.components.image:
                    $scope.imageActionLbl = value;
                    break;
                default: break;
            }
        }

        function getImgSrc(){
           setTimeout(function(){
               $scope.$apply(function(){
                   $scope.imgSrc = document.getElementById('imgId').src;
               });
            },0);
        }

        getImgSrc();

        //browser actions
        $scope.invokeAlert = function(){

            $scope.alertActionLbl = "Alert invoked";
            var res = confirm("Alert");

            $scope.alertActionLbl = res ? "Alert accepted" : "Alert dismissed";

        };

        $scope.onMouseDown = function($event){
            $scope.mouseClickCoords.X = $event.x;
            $scope.mouseClickCoords.Y = $event.y;
        };

        $scope.captureMouseCoordinates = function($event){
          $scope.mouseCoords.X = $event.x;
          $scope.mouseCoords.Y = $event.y;
        };

        //Combo-box action
        $scope.$watch('option', function (value) {
           if(value){
               $scope.comboBoxActionLbl = value.label;
           }
        });

        $scope.ajax = function (option){
            todoService.ajax().then(function (result) {

            });
            if(option === 'alert'){
                $timeout(function () {
                    alert("ajax alert");
                }, 2000);
            }


        };
        $scope.activeAjax = 0;
        (function(xhr) {
            xhr.active = 0;
            var pt = xhr.prototype;
            var _send = pt.send;
            pt.send = function() {
                xhr.active++;
                $scope.activeAjax ++;
                this.addEventListener('readystatechange', function(e) {
                    if ( this.readyState == 4 ) {

                        xhr.active--;
                        $scope.activeAjax --;
                    }
                });
                _send.apply(this, arguments);
            }
        })(XMLHttpRequest);


        function onFileSelected(){
            setTimeout(function(){
                var input = document.getElementById('fileId');
                $scope.fileUploadActionLbl = 'onchange Initialized';
                input.onchange = function(e){
                    var pathParts = e.target.value.split('\\');
                    $scope.fileUploadActionLbl = pathParts[pathParts.length-1];
                }
            },0)
        }
        onFileSelected();

        //draggable components action
        $scope.onDragStart = function(item){

            var draggableItems = getDraggableItems();

            var found = false;
            var idx = 0;

            while(!found){

                found = draggableItems[idx].innerText === item.label;
                idx++;
            }

             var coords = draggableItems[--idx].getBoundingClientRect();

             $scope.dragStart.x = coords.x;
             $scope.dragStart.y = coords.y;

        };

        function getDraggableItems(){

            var draggableLists = document.getElementsByClassName('draggable-list');
            var draggableItems = [];

            for(var i=0; i<draggableLists.length; i++){
                var arr = Array.from(draggableLists[i].children);
                draggableItems.splice.apply(draggableItems, [0,0].concat(arr));
            }

            return draggableItems;
        }

        $scope.onDragEnd = function(idx,item,listName){

            $scope.draggableLists[listName].splice(idx, 1);


            var draggableItems = getDraggableItems();

            var found = false;
            var i = 0;

            while(!found){
                found = draggableItems[i].innerText === item.label;
                i++;
            }

            var coords = draggableItems[--i].getBoundingClientRect();

            $scope.dragOffset.x = coords.x - $scope.dragStart.x;
            $scope.dragOffset.y = coords.y - $scope.dragStart.y;
        };

        $scope.sendMail = function () {
            var data = JSON.stringify({
                "personalizations": [
                    {
                        "to": [
                            {
                                "email": "dalit@testcraft.io"
                            }
                        ],
                        "subject": "Hello, World!"
                    }
                ],
                "from": {
                    "email": "dalitrozin@gmail.com"
                },
                "subject": "Hello, World!",
                "content": [
                    {
                        "type": "text/html",
                        "value": "<html><p>Hello, world!</p></html>"
                    }
                ]
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    console.log(this.responseText);
                }
            });

            xhr.open("POST", "https://api.sendgrid.com/v3/mail/send");
            xhr.setRequestHeader("authorization", "Bearer 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");
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");


            xhr.send(data);
        }

    }
]);