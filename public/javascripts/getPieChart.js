/**
 * Created by Alejandro on 9/25/2015.
 */
// Build the chart

function getPieChart(data){

    var dynamicData={};
    var arrData = [];

    data.forEach(function(resume){
        var skillSet = resume.skills;
        var skillsKeys = Object.keys(skillSet);
        console.log('skilkeys',skillsKeys);
        skillsKeys.forEach(function(skill){
            if(!dynamicData[skill.toLowerCase()])
                dynamicData[skill.toLowerCase()]=1;
            else{
                dynamicData[skill.toLowerCase()]+=1
            }
        })
    });
    console.log('dynamicdata ********',dynamicData);
    for (prop in dynamicData){
        arrData.push({'name':prop,'y':dynamicData[prop]})
    }
    console.log('arrdata ********',arrData);

    var pieObj = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Skill shares on uploaded Resumes'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
            }
        },
        series: [{
            name: "Skills",
            colorByPoint: true,
            data: arrData
        }]

    }

    return pieObj;
}

