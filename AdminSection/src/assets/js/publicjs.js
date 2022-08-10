/*Dropdown Menu*/
class surching {
    collectselectvalue;
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

    searchFormTable(fieldid, listid, rowno, name) {
        var input = document.getElementById(fieldid).value.toLowerCase();

        if (input != null) {
            var table = document.getElementById(listid);
            var tbody = table.getElementsByTagName("tbody")[0];

            //Mathmatical Variable
            var totalAmount = 0; let quantaty = 0; let sirialitemno = 0;

            var tr = tbody.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                var cells = tr[i].getElementsByTagName("td");
                if (cells[rowno].innerText.toLowerCase().indexOf(input) < 0) {
                    tr[i].style.display = "none";
                    tr[i].setAttribute('style', 'display:none');
                } else {
                    if (name == 'employeeacc') {
                        totalAmount += parseInt(cells[4].innerText);
                    } else if (name == 'purchasesproduct') {
                        totalAmount += parseInt(cells[8].innerText);
                        quantaty += parseInt(cells[6].innerText);
                        sirialitemno += 1;
                    } else if (name == 'salesproduct') {
                        totalAmount += parseInt(cells[12].innerText);
                        quantaty += parseInt(cells[11].innerText);
                        sirialitemno += 1;
                    } else if (name == 'investing') {
                        totalAmount += parseInt(cells[3].innerText);
                    } else if (name == 'catrgorytable') {
                        sirialitemno += 1;
                    } else if (name == 'loanSurch') {
                        totalAmount += parseInt(cells[3].innerText);
                        quantaty += parseInt(cells[4].innerText);
                        sirialitemno += parseInt(cells[5].innerText);
                    }

                    tr[i].style.display = "";
                    tr[i].setAttribute('style', 'display:');
                }
            }
            if (name == 'employeeacc') {
                document.getElementById('totalTableResult').innerHTML = totalAmount;
            } else if (name == 'purchasesproduct') {
                document.getElementById('totalamount').innerHTML = totalAmount;
                document.getElementById('totalquentaty').innerHTML = quantaty;
                document.getElementById('totalitem').innerHTML = sirialitemno;
            } else if (name == 'salesproduct') {
                document.getElementById('total_amount').innerHTML = totalAmount;
                document.getElementById('total_profit').innerHTML = quantaty;
                document.getElementById('total_index').innerHTML = sirialitemno;
            } else if (name == 'investing') {
                document.getElementById('showtotalinvest').innerHTML = totalAmount;
            } else if (name == 'catrgorytable') {
                document.getElementById('showtotalcategoryindex').innerHTML = sirialitemno;
            } else if (name == 'loanSurch') {
                document.getElementById('loanamount').innerHTML = totalAmount;
                document.getElementById('paidamount').innerHTML = quantaty;
                document.getElementById('dueamount').innerHTML = sirialitemno;
            }

        } else {
            console.warn('input is null')
        }
    }

    serrchFormDropDown(value, surch) {
        var input = document.getElementById(value).value.toLowerCase();
        var output = document.getElementById(surch).getElementsByTagName("li");
        if (input != null) {
            for (var i = 0; i < output.length; i++) {
                if (output[i].innerText.toLowerCase().indexOf(input) < 0) {
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

    searchStockTable(fieldid, listid, rowno) {
        var input = document.getElementById(fieldid).value.toLowerCase();

        if (input != null) {
            var table = document.getElementById(listid);
            var tbody = table.getElementsByTagName("tbody")[0];
            var tr = tbody.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                var cells = tr[i].getElementsByTagName("td");
                if (rowno == 2) {
                    if (cells[rowno].innerText.toLowerCase().indexOf(input) < 0) {
                        tr[i].style.display = "none";
                        tr[i].setAttribute('style', 'display:none');
                    } else {
                        tr[i].style.display = "";
                        tr[i].setAttribute('style', 'display:');
                    }
                } else if (rowno == 5) {
                    if (parseInt(cells[5].innerText) > parseInt(input)) {
                        tr[i].style.display = "none";
                        tr[i].setAttribute('style', 'display:none');
                    } else {
                        tr[i].style.display = "";
                        tr[i].setAttribute('style', 'display:');
                    }
                }

            }
        }
    }

    sortTable(tablename, n) {
       
        var table,tbody, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

        table = document.getElementById(tablename);

        tbody = table.getElementsByTagName("tbody")[0];

        switching = true;
        dir = "asc";

        while (switching) {
            
            switching = false;
            rows = tbody.getElementsByTagName("tr");
           
            for (i = 0; i < rows.length-1; i++) {
                //console.warn(rows.length)

                shouldSwitch = false;

                x = rows[i].getElementsByTagName("td")[n];
                y = rows[i + 1].getElementsByTagName("td")[n];

                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {

                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;

                switchcount++;
            } else {

                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }


}
surching = new surching();
