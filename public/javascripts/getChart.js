/**
 * Created by Alejandro on 9/24/2015.
 */

function getDates(dateRange){
    var curDate = moment().subtract(dateRange,'day');
    var datesObj={};
    for(var i=1;i<=dateRange;i++){
        datesObj[curDate.add(1,'day').format('YYYY-MM-DD')]=0;
    }

    console.log('objeto-dates',datesObj);
    return datesObj;
}

function createChartInfo(data,period){
    var char = {
        chart:{type:''},
        title:{text:''},
        xAxis:{categories:[]},
        yAxis:{title:{text:''}, tickInterval:1},
        series:[{name:'',data:[]}]
    };

    switch (period){
        case 0:
            var prop = moment().format("YYYY-MM-DD");
            var dates={};
            dates[prop] = 0;
            char.title.text = 'Resumes Uploaded Today'
            char.chart.type = 'column';
            break;
        case 7:
            //get array of dates
            var dates = getDates(period);
            char.title.text = 'Resumes Uploaded Last Week'
            char.chart.type = 'line';
            break;
        case 30:
            //get array of dates
            var dates = getDates(period);
            char.title.text = 'Resumes Uploaded Last Month'
            char.chart.type = 'line';
            break;

    }
    console.log('dates************',dates);

    //Map how many resumes uploaded per day
    data.forEach(function(resObj){
        var propDate = resObj.creationDate.substring(0,10);
        if(propDate in dates){
            dates[propDate] += 1;
        }
    });
    //fill common chart fields

    char.xAxis.categories = Object.keys(dates);
    char.yAxis.title.text = 'Number of Resumes';
    char.series[0].name = 'Uploads';
    //getting values for data
    for (prop in dates){
        char.series[0].data.push(dates[prop]);
    }
    console.log(char);
    return char;
}