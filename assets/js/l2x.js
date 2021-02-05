     function createPUTRequest(connToken, jsonObj, dbName, relName) {
            var putRequest = "{\n"
                    + "\"token\" : \""
                    + connToken
                    + "\","
                    + "\"dbName\": \""
                    + dbName
                    + "\",\n" + "\"cmd\" : \"PUT\",\n"
                    + "\"rel\" : \""
                    + relName + "\","
                    + "\"jsonStr\": \n"
                    + jsonObj
                    + "\n"
                    + "}";
            return putRequest;
        }
        function executeCommand(reqString, dbBaseUrl, apiEndPointUrl) {
            
            var url = dbBaseUrl + apiEndPointUrl;
            var jsonObj;
            $.post(url, reqString, function (result) {
                jsonObj = JSON.parse(result);
            }).fail(function (result) {
                var dataJsonObj = result.responseText;
                jsonObj = JSON.parse(dataJsonObj);
            });
            return jsonObj;
        }
        function resetForm() {
$("#name").val("")
$("#phone").val("");
$("#email").val("");
$("#msg").val("");
$("#name").focus();
}


        function validateAndGetFormData() {
            
            var name = document.getElementById("name").value;
            var phone = document.getElementById("phone").value;
          
            var email = document.getElementById("email").value;
            var msg = document.getElementById("msg").value;
            
            var jsonStrObj = {
                CandidateName: name,
                Mobile: phone,
                Email: email,
                Message: msg,
              
            };
            return JSON.stringify(jsonStrObj);
        }

          function registerCandidate() {

            var jsonStr = validateAndGetFormData();
            if (jsonStr === "") {
                return;
            }
            var putReqStr = createPUTRequest("90935515|-31948800453178663|90931496",
                    jsonStr, "Data", "MessageNewgdfg");
           
            jQuery.ajaxSetup({async: false});
            var resultObj = executeCommand(putReqStr,
                    "http://api.login2explore.com:5577", "/api/irl");
            jQuery.ajaxSetup({async: true});
            alert(resultObj.message + " Status :- " + resultObj.status );
            resetForm();  

        }
