//Enable the initial function for the main page.
window.onload = function() {
    init();
}

//Global defines
var students = [];
var rules = [];
var records = [];

/* 
    Class: Student
    Members: DisplayName, Name
*/
class Student{
    constructor(displayName, name) {
        this.DisplayName = displayName;
        this.Name = name;
    }
}

/*
    Class: Rule
    Members: RuleId, Description, Value
    Functions: toFormattedString()
*/
class Rule{
    constructor(ruleId, description, value) {
        this.RuleId = ruleId;
        this.Description = description;
        this.Value = value;
    }

    /*
        Function: toFormattedString()
        Usage: toFormattedString()
        Description: Outputs a string formatted like "[RuleId]|[Description]".
    */
    toFormattedString() {
        let returnString = new String();
        returnString = returnString.concat(this.RuleId.toString(), "|", this.Description);
        return returnString;
    }
}

/*
    Class: Record
    Members: RecordDate, RecordPeriod, RecordWeek, TargetStudent, Rule, Description. Value
    Functions: toOutputString()
*/
class Record{
    constructor(recordDate, recordPeriod, recordWeek, targetStudent, rule, description, customValue = 0) {
        this.RecordDate = recordDate;
        this.RecordPeriod = recordPeriod;
        this.RecordWeek = recordWeek;
        this.TargetStudent = targetStudent;
        this.Rule = rule;
        this.Description = description;
        if(customValue != 0) {
            this.Value = customValue;
        } else {
            this.Value = rule.Value;
        }
    }

    /*
        Function: toOutputString()
        Usage: toOutputString()
        Description: Output a string in the given format.
    */
    toOutputString() {
        var outputString = new String();
        var recordDateObj = new Date(this.RecordDate);
        var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]; 
        outputString = outputString.concat(this.RecordDate, ",");
        outputString = outputString.concat(this.RecordPeriod, ",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(this.RecordWeek, ",");
        outputString = outputString.concat(weekday[recordDateObj.getDay()], ",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(this.TargetStudent.Name, ",");
        outputString = outputString.concat(this.Description, ",");
        outputString = outputString.concat(this.Rule.RuleId, ",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(",");
        outputString = outputString.concat(",");
        if(this.Value != this.Rule.Value) {
            outputString = outputString.concat(this.Value);
        } else {
            outputString = outputString.concat(",");
        }
        return outputString;
    }
}

function completeEdit() {
    var editModal = document.getElementById("editModal");  
    var editModalIdInput = document.getElementById("editModalIdInput");
    var editModalRecordDatePicker = document.getElementById("editModalRecordDatePicker");
    var editModalPeriodSelect = document.getElementById("editModalPeriodSelect");
    var editModalWeekSelect = document.getElementById("editModalWeekSelect");
    var editModalStudentSelect = document.getElementById("editModalStudentSelect");
    var editModalRulesDropdownSelect = document.getElementById("editModalRulesDropdownSelect");
    var editModalDescriptionEdit = document.getElementById("editModalDescriptionEdit");
    var editModalPointEdit = document.getElementById("editModalPointEdit");

    var id = editModalIdInput.value;
    records[id].RecordDate = editModalRecordDatePicker.value;
    records[id].RecordPeriod = editModalPeriodSelect.value;
    records[id].RecordWeek = editModalWeekSelect.value;
    for(i=0;i<students.length;i++) {
        if(students[i].Name == editModalStudentSelect.value) {
            records[id].TargetStudent = students[i];
        }
    }
    for(i=0;i<rules.length;i++) {
        if(rules[i].RuleId == editModalRulesDropdownSelect.value) {
            records[id].Rule = rules[i];
        }
    }
    records[id].Description = editModalDescriptionEdit.value;
    records[id].Value = editModalPointEdit.value;
    refreshRecords();
    editModal.style.display = "none";
}

function showEditForm(id) {
    var editModal = document.getElementById("editModal");  
    var editModalIdInput = document.getElementById("editModalIdInput");
    var editModalRecordDatePicker = document.getElementById("editModalRecordDatePicker");
    var editModalPeriodSelect = document.getElementById("editModalPeriodSelect");
    var editModalWeekSelect = document.getElementById("editModalWeekSelect");
    var editModalStudentSelect = document.getElementById("editModalStudentSelect");
    var editModalRulesDropdownSelect = document.getElementById("editModalRulesDropdownSelect");
    var editModalDescriptionEdit = document.getElementById("editModalDescriptionEdit");
    var editModalPointEdit = document.getElementById("editModalPointEdit");

    editModalIdInput.value = id;
    editModalRecordDatePicker.value = records[id].RecordDate;
    editModalPeriodSelect.value = records[id].RecordPeriod;
    editModalWeekSelect.value = records[id].RecordWeek;
    editModalStudentSelect.value = records[id].TargetStudent.Name;
    editModalRulesDropdownSelect.value = records[id].Rule.RuleId;
    editModalDescriptionEdit.value = records[id].Description;
    editModalPointEdit.value = records[id].Value;

    editModal.style.display = "block";  
}

function changeRecord(element) {
    console.log(element.id);
    showEditForm(element.id);
}

function deleteRecord(element) {
    records.splice(element.id, 1);
    refreshRecords();
}

function refreshRecords() {
    var table = document.getElementById("recordTable");
    while(table.rows.length > 1) {
        table.deleteRow(1);
    }
    for(i=0;i<records.length;i++) {
        var newRow = table.insertRow();
        var dateCell = newRow.insertCell();
        var periodCell = newRow.insertCell();
        var weekCell = newRow.insertCell();
        var studentCell = newRow.insertCell();
        var ruleCell = newRow.insertCell();
        var descriptionCell = newRow.insertCell();
        var pointCell = newRow.insertCell();
        var functionCell = newRow.insertCell();

        dateCell.innerHTML = records[i].RecordDate;
        periodCell.innerHTML = records[i].RecordPeriod;
        weekCell.innerHTML = records[i].RecordWeek;
        studentCell.innerHTML = records[i].TargetStudent.Name;
        ruleCell.innerHTML = records[i].Rule.RuleId;
        descriptionCell.innerHTML = records[i].Description;
        pointCell.innerHTML = records[i].Value;
        functionCell.innerHTML = String().concat('<img class="edit-button" src="assets/img/edit_icon.svg" alt="修改" onclick="changeRecord(this)" id="', i.toString(), '">', '<img class="delete-button" src="assets/img/delete_icon.svg" alt="删除" onclick="deleteRecord(this)" id="', i.toString(), '">');

        document.getElementById('recordContainer').appendChild(table);
    }
}

function validateInput() {
    return true;
}

function addRecords() { 

    if(!validateInput()) {
        return;
    }

    var recordDate = document.getElementById("recordDatePicker").value;
    var period = document.getElementById("periodSelect").value;
    var week = document.getElementById("weekSelect").value;
    var ruleId = document.getElementById("rulesDropdownSelect").value;
    var rule = rules[ruleId - 1];
    var description = document.getElementById("descriptionEdit").value;

    for(var i=0;i<students.length;i++) {
        var studentCheckbox = document.getElementById("checkbox_" + i.toString());
        if(studentCheckbox.checked) {
            records.push(new Record(recordDate, period, week, students[i], rule, description));
        }
    }

    refreshRecords();
    
    document.getElementById("recordDatePicker").value = '';
    document.getElementById("periodSelect").value = document.getElementById("periodSelect").options[0].value;
    document.getElementById("weekSelect").value = document.getElementById("weekSelect").options[0].value;
    for(i=0;i<students.length;i++) {
        document.getElementById("checkbox_" + i.toString()).checked = false;
    }
    document.getElementById("rulesDropdownSelect").value = 1;
    document.getElementById("descriptionEdit").value = '';
}

function generateCSV() {
    var csvData = new String();
    for(i=0;i<records.length;i++) {
        csvData = csvData.concat(records[i].toOutputString(), "\n");
    }
    var blob = new Blob([csvData], {type: "text/csv;charset=utf-8;"});
    var url = URL.createObjectURL(blob);
    window.open(url);
}

function openConfigModal() {  
    var configModal = document.getElementById("configModal");  
    configModal.style.display = "block";  
}

function loadStudents() {
    var studentsCheckboxContainer = document.getElementById("studentsCheckboxContainer");
    for(i=0;i<students.length;i++) {
        var studentCheckbox = document.createElement("input");
        studentCheckbox.type = "checkbox";
        studentCheckbox.value = i;
        studentCheckbox.id = "checkbox_" + i.toString();

        var label = document.createElement("label");  
        label.htmlFor = "checkbox_" + i.toString();  
        label.appendChild(document.createTextNode(students[i].DisplayName));

        var br = document.createElement("br");

        studentsCheckboxContainer.appendChild(studentCheckbox);
        studentsCheckboxContainer.appendChild(label);
        studentsCheckboxContainer.appendChild(br);
    }
    var editModalStudentSelect = document.getElementById("editModalStudentSelect");
    for(i=0;i<students.length;i++) {
        var option = document.createElement("option");
        option.text = students[i].DisplayName;
        option.value = students[i].Name;
        editModalStudentSelect.add(option);
    }
}

function loadRules() {
    var rulesSelect = document.getElementById("rulesDropdownSelect");
    for(i=0;i<rules.length;i++) {
        var option = document.createElement("option");
        option.text = rules[i].RuleId.toString() + "丨" + rules[i].Description;
        option.value = rules[i].RuleId.toString();
        rulesSelect.add(option);
    }
    var editFormRulesDropdownSelect = document.getElementById("editModalRulesDropdownSelect");
    for(i=0;i<rules.length;i++) {
        var option = document.createElement("option");
        option.text = rules[i].RuleId.toString() + "丨" + rules[i].Description;
        option.value = rules[i].RuleId.toString();
        editFormRulesDropdownSelect.add(option);
    }
}

function completeConfig() {
    var studentsFileInput = document.getElementById("studentsFileInput");  
    var rulesFileInput = document.getElementById("rulesFileInput");  

    var studentsFile = studentsFileInput.files[0];
    var studentsFileReader = new FileReader();  

    studentsFileReader.onload = function(e) {  
        var contents = e.target.result;  
        try { 
            students = JSON.parse(contents);  
            loadStudents();
        } catch (error) {  
            console.error("无法解析JSON文件", error);  
        }  
    };  

    studentsFileReader.onerror = function(e) {  
        console.error("读取文件出错", e);  
    };  
    studentsFileReader.readAsText(studentsFile);

    var rulesFile = rulesFileInput.files[0];
    var rulesFileReader = new FileReader();  

    rulesFileReader.onload = function(e) {  
        var contents = e.target.result;  
        try { 
            rules = JSON.parse(contents);  
            loadRules();
        } catch (error) {  
            console.error("无法解析JSON文件", error);  
        }  
    };  

    rulesFileReader.onerror = function(e) {  
        console.error("读取文件出错", e);  
    };  
    rulesFileReader.readAsText(rulesFile);

    var configModal = document.getElementById("configModal");  
    configModal.style.display = "none";  
}

function init() {
    openConfigModal();
}