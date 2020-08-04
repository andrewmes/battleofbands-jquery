function onPageLoad() {
    // wire up all event handlers
    $("#registerBtn").click(onCreateBtnClicked);
    $("#cancelBtn").click(onCancelBtnClicked);
    $("#newBtn").click(onNewBtnClicked);

    //populate the table
    var items = modelGetAllBands();
    for (var i = 0; i < items.length; i++) {
        addTableItem(items[i]);
    }

    //resets input form
    clearInputForm();
}

function onCreateBtnClicked() {
    if (!validateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var newBand = modelCreateBand(
        form.bandNameEdit.value,
        form.leadSingerEdit.value,
        form.genreSelect.value,
        form.stateSelect.value,
        parseInt(form.yearsEdit.value),
        form.yesRadio.checked,
        parseInt(form.phoneNumberEdit.value),
        form.canText.value
        );

        addTableItem(newBand);

    clearInputForm();
}

function onNewBtnClicked() {
    //this might need to be fixed but as far as i can see, it works
    $("#formTitle").text("Create New Band");

    $("#bandEditArea").css("display", "block");
    $("#bandListArea").css("display", "none");
    $("#registerBtn").css("display", "block");
    $("#updateBtn").css("display", "none");
}

function onCancelBtnClicked() {
    clearInputForm();
}

function onEditButtonClicked(id) {
    $("#formTitle").text("Edit Band");

    var band = modelGetBand(id);
    if(!band)
    {
        alert("Unable to find Band ID: " + id);
    }

    //maybe here?
    $("#bandEditArea").css("display", "block");
    $("#bandListArea").css("display", "none");
    $("#registerBtn").css("display", "none");
    $("#updateBtn")
        .css("display", "block")
        .off("click")
        .click(function () { onUpdateBtnClicked(band.id) });

    var form = document.forms["editForm"];
    form.bandNameEdit.value = band.bandName;
    form.leadSingerEdit.value = band.leadSinger;

    for (var genre in form.genreSelect.options) {
        var option = form.genreSelect.options[genre];
        if (option.value === band.genre)
        {
            option.selected = true;
        }
    }

    for (var homeState in form.stateSelect.options) {
        var option = form.stateSelect.options[homeState];
        if (option.value === band.homeState) {
            option.selected = true;
        }
    }

    form.yearsEdit.value = band.yearsAsABand;

    if(band.yesRadio)
    {
        form.spotifyBtn[0].checked = true;
    }
    else {
        form.spotifyBtn[1].checked = true;
    }

    form.phoneNumberEdit.value = band.phoneNumber;
    form.canText.checked = band.canText;
}

function onUpdateBtnClicked(id) {
    if (!validateControls()) {
        return;
    }

    var form = document.forms["editForm"];
    var band = modelUpdateBand(
        id,
        form.bandNameEdit.value,
        form.leadSingerEdit.value,
        form.genreSelect.value,
        form.stateSelect.value,
        parseInt(form.yearsEdit.value),
        form.yesRadio.checked,
        parseInt(form.phoneNumberEdit.value),
        form.canText.checked);
    if(!band)
    {
        alert("unable to update Band ID=" + id);
        return;
    }

    //maybe here
    var tr = $("#row"+id).children();
    tr.eq(0).text(band.genre);
    tr.eq(1).text(band.bandName);
    tr.eq(2).text(band.homeState);
    
    clearInputForm();
}

function onDeleteBtnClicked(id) {
    var band = modelGetBand(id);
    if (!band) {
        alert("unable to find Band ID=" + id);
        return;
    }

    if(!confirm("Are you sure you want to delete " +
        band.bandName + "?")) {
        return;
    }

    modelDeleteBand(id);

    //maybe here
    $("#row"+id).remove();
}

function addTableItem(band) {

    //not here
    var table = $("#bandTable").get(0);

    var row = table.insertRow(table.rows.length);
    row.id = 'row' + band.id;

    var cell = row.insertCell(0);
    cell.innerText = band.genre;

    cell = row.insertCell(1);
    cell.innerText = band.bandName;

    cell = row.insertCell(2);
    cell.innerText = band.homeState;

    //not here
    cell = row.insertCell(3);
    cell.innerHTML = "<button type='button' id='editBtn" + band.id + "'>Edit</button>";

    cell = row.insertCell(4);
    cell.innerHTML = "<button type='button' id='deleteBtn" + band.id + "'>Delete</button>";

    $("#editBtn" + band.id).click(function () { onEditButtonClicked(band.id)});
    $("#deleteBtn" + band.id).click(function () { onDeleteBtnClicked(band.id)});
}

function validateControls() {
    var form = document.forms["editForm"];
    var isValidated = true;

    if (form.bandNameEdit.value == "") {
        $("#bandNameError").text("*Band name is required.");
        isValidated = false;
    }
    else {
        $("#bandNameError").text("");
    }
    if (form.leadSingerEdit.value === "") {
        $("#leadSingerError").text("*Lead Singer is required.");
        isValidated = false;
    }
    else {
        $("#leadSingerError").text("");
    }

    if (form.genreSelect.selectedIndex === -1) {
        $("#genreError").text("*Genre is required.");
        isValidated = false;
    }
    else {
        $("#genreError").text("");
    }

    if (form.stateSelect.selectedIndex === -1) {
        $("#stateError").text("*State is required.");
        isValidated = false;
    }
    else {
        $("#stateError").text("");
    }

    if (form.yearsEdit.value === "") {
        $("#yearsError").text("*Years as a band is required");
        isValidated = false;
    }
    else if (isNaN(parseInt(form.yearsEdit.value))) {
        $("#yearsError").text("*Must input a number.");
        isValidated = false;
    }
    else {
        $("#yearsError").text("");
    }

    if (!form.yesRadio.checked && !form.noRadio.checked) {
        $("#spotifyError").text("*Answer in this field is required.");
        isValidated = false;
    }
    else {
        $("#spotifyError").text("");
    }

    if (form.phoneNumberEdit.value === "") {
        $("#phoneNumberError").text("*Phone number is required.");
        isValidated = false;
    }
    else if (isNaN(parseInt(form.phoneNumberEdit.value))) {
        $("#phoneNumberError").text("*Must be a number.");
        isValidated = false;
    }
    else if (form.phoneNumberEdit.value.length !== 10) {
        $("#phoneNumberError").text("*Phone number must be 10 digits long.");
        isValidated = false;
    }
    else {
        $("#phoneNumberError").text("");
    }

    return isValidated;
}

function clearInputForm() {
    //hide the form, show the contact list
    $("#bandEditArea").css("display", "none");
    $("#bandListArea").css("display", "block");

    //Clear out all the contols on the form.
    var form = document.forms["editForm"];

    form.bandNameEdit.value = "";
    $("#bandNameError").text("");

    form.leadSingerEdit.value = "";
    $("#leadSingerError").text("");

    form.genreSelect.selectedIndex = -1;
    $("#genreError").text("");

    form.stateSelect.selectedIndex = -1;
    $("#stateError").text("");

    form.yearsEdit.value = "";
    $("#yearsError").text("");

    form.yesRadio.checked = false;
    form.noRadio.checked = false;
    $("#spotifyError").text("");

    form.phoneNumberEdit.value = "";
    $("#phoneNumberError").text("");

    form.canText.checked = false;
}