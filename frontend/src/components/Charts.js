import { Chart } from "react-google-charts";

export default function Charts(props){
    
    return(
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
                title: 'Results',
                chartArea: { width: '50%' },
                hAxis: {
                title: '',
                minValue: 0,
                maxValue: 100
                },
                vAxis: {
                },
            }}
        />
    );
}