
//add and remove table row
var activity_number = 1;

function addRow()
{
    ++activity_number;
    var html_template = '<tr onchange="getPercent(this)" >\
                    <td>Activity ' + activity_number + '</td>\
                    <td>A' + activity_number + '</td>\
                    <td class="input_td">\
                        <input type="number" id="weight'+activity_number + '" min="0" />\
                    </td>\
                    <td onchange="getPercent(' + activity_number + ')" class="input_td">\
                        <input class="random" id="score'+activity_number + '" type="number" min="0" /> /\
                        <input type="number" id="total'+activity_number + '" min="0" />\
                    </td>\
                    <td>\
                        <p id="percent' + activity_number + '"></p>\
                    </td>\
                </tr>';

    var table_body = document.getElementById("table_body");
    var newCourse = document.createElement("tr");
    newCourse.innerHTML = html_template;
    table_body.append(newCourse);
}

addRow();
addRow();

//removeRow() will not remove first row.
function removeRow()
{
    if (activity_number != 1)
    {
        document.getElementById("table_body").lastChild.remove();
        --activity_number;
    }
    else
    {
        window.alert("You need to have at least one activity.");
    }
}

// calculations

//getMean() and getWeight() will not work if all values are not given or if total is 0
function getMean()
{

    //get all values from "Grade"
    var score_arr = [];
    var total_arr = [];
    for (let i = 0; i < activity_number; i++)
    {
        var get_score = document.getElementById('score'+(i+1)).value;
        var get_total = document.getElementById('total'+(i+1)).value;

        if (get_score == "" || get_total == "")
        {
            var index = i;
            ++index;
            alert("Please input all values for Activity " + index + " or delete empty activities");
            break;
        }

        if (get_total == 0)
        {
            var index = i;
            ++index;
            alert("Total for Activity " + index + " cannot be 0");
            break;
        }
        
        score_arr[i] = get_score;
        total_arr[i] = get_total;
    }

    var mean = 0.0;
    for (let i = 0; i < activity_number; i++)
    {
        mean += score_arr[i] / total_arr[i];
    }

    document.getElementById("result").innerHTML = " Mean is " + (mean/activity_number).toFixed(3);
}

function getWeight()
{
    var score_arr = [];
    var total_arr = [];
    var weight_arr = [];
    for (let i = 0; i < activity_number; i++)
    {
        var get_score = document.getElementById('score'+(i+1)).value;
        var get_total = document.getElementById('total'+(i+1)).value;
        var get_weight = document.getElementById('weight'+(i+1)).value;

        if (get_weight == "" || get_score == "" || get_total == "")
        {
            var index = i;
            ++index;
            alert("Please input all values for Activity " + index + " or delete empty activities");
            break;
        }

        if (get_total == 0)
        {
            var index = i;
            ++index;
            alert("Total for Activity " + index + " cannot be 0");
            break;
        }

        score_arr[i] = get_score;
        total_arr[i] = get_total;
        weight_arr[i] = get_weight;
    }

    var weight = 0.0;
    var total_weight = 0.0;
    for (let i = 0; i < activity_number; i++)
    {
        weight += ((score_arr[i] / total_arr[i])*weight_arr[i]);
        total_weight += parseInt(weight_arr[i]);
    }
    document.getElementById("result").innerHTML = " Weight is " + (weight/total_weight).toFixed(3);
}

//getPercent() will only update if both score and total are given
function getPercent(x)
{
    var score = document.getElementById("score"+x).value;
    var total = document.getElementById("total"+x).value;

    if (score == "" || total == "")
    {
        document.getElementById("percent"+x).innerHTML = "";
        return;
    }
    var percentage = score*100 / total;
    document.getElementById("percent"+x).innerHTML = (percentage).toFixed(3) + "%";
}