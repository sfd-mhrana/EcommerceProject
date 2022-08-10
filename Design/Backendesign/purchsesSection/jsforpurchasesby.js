class surching {

    searchSelect(fieldid, listid) {
        var input = document.getElementById(fieldid).value.toLowerCase();
        var output = document.getElementById(listid).options;
        if (input != null) {
            for (var i = 0; i < output.length; i++) {
                if (output[i].text.toLowerCase().indexOf(input) < 0) {
                    output[i].style.display = "none";
                    output[i].setAttribute('style', 'display:none');
 
                } else {
                    output[i].style.display = "";
                    output[i].setAttribute('style', 'display:');
                }
            }
        } else {
            console.warn('not value fount')
            var node = document.createElement("OPTION");
            var textnode = document.createTextNode("No Data Found");
            node.appendChild(textnode);
            document.getElementById(listid).appendChild(node)
        }
    }

    searchFormTable(fieldid, listid) {
        var input = document.getElementById(fieldid).value.toLowerCase();

        if (input != null) {
            var table = document.getElementById(listid);
            var tbody = table.getElementsByTagName("tbody")[0];
            var tr = tbody.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {

                var cells = tr[i].getElementsByTagName("td");
                if (cells[5].innerText.toLowerCase().indexOf(input) < 0) {
                    tr[i].style.display = "none";
                    tr[i].setAttribute('style', 'display:none');
                } else {
                    tr[i].style.display = "";
                    tr[i].setAttribute('style', 'display:');
                }
            }
        } else {
            console.warn('input is null')
        }
    }

}
surching = new surching();