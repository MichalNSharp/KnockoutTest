viewModel = {
    lookupCollection: ko.observableArray()
};


$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/Home/GetIndex",
    }).done(function (data) {
        $(data).each(function (index, element) {
            var mappedItem =
            {
                Id: ko.observable(element.Id),
                Key: ko.observable(element.Key),
                Value: ko.observable(element.Value),
                Mode: ko.observable("display")
            };
            viewModel.lookupCollection.push(mappedItem);
        });
        ko.applyBindings(viewModel);
    }).error(function (ex) {
        alert("Error");
    });
});


$(document).on("click", ".kout-cancel", null, function (ev) {
    var current = ko.dataFor(this);
    current.Mode("display");
    current.Key(before.Key);
    current.Value(before.Value);
});

var before = { Id: "", Key: "", Value: "" };

$(document).on("click", ".kout-edit", null, function (ev) {
    var current = ko.dataFor(this);
    current.Mode("edit");

    before.Id = current.Id();
    before.Key = current.Key();
    before.Value = current.Value();

});


$(document).on("click", ".kout-save", null, function (ev) {
    var current = ko.dataFor(this);
    current.Mode("display");
    saveData(current);
});


$(document).on("click", ".kout-delete", null, function (ev) {
    var current = ko.dataFor(this);
    removeData(current);
   
});



$(document).on("click", "#create", null, function (ev) {
    var current = {
        Id: ko.observable(0),
        Key: ko.observable(),
        Value: ko.observable(),
        Mode: ko.observable("edit")
    };
    viewModel.lookupCollection.push(current);
});


function saveData(currentData) {
    var postUrl = "";
    var submitData = {
        Id: currentData.Id(),
        Key: currentData.Key(),
        Value: currentData.Value()
    };
    if (currentData.Id() && currentData.Id() > 0) {
        postUrl = "/Home/Edit";
    }
    else {
        postUrl = "/Home/Create";
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: postUrl,
        data: JSON.stringify(submitData)
    }).done(function (id) {
        currentData.Id(id);
    }).error(function (ex) {
        alert("ERROR Saving");
    });
}

function removeData(currentData) {
    var submitData = {
        Id: currentData.Id(),
        Key: currentData.Key(),
        Value: currentData.Value()
    };
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/Home/Remove",
        data: JSON.stringify(submitData)
    }).done(function (id) {
        viewModel.lookupCollection.remove(currentData);
    }).error(function (ex) {
        alert("error");
    });
}
