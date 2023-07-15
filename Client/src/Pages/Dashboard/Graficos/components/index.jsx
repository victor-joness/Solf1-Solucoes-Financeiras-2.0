import ApexCharts from 'apexcharts';

export const BasicArea = (props) => {
	const options = {
		chart: {
			type: 'area',
            zoom: {
            	enabled: false
           	},
            foreColor: '#FFFFFF',
		},
		dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: `${props.title} Mensal`,
            align: 'left'
        },
        subtitle: {
            text: `Média R$ ${props.media} | Mediana R$ ${props.media/2}`,
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const data = series[seriesIndex][dataPointIndex];

                const variancia = data/2;
                const desvioPadrao = data+1;
                const intervaloConfianca = data-2;

                let listDatas = [];

                listDatas.push({nome: "Variância", valor: variancia});
                listDatas.push({nome: "Desvio Padrão", valor: desvioPadrao});
                listDatas.push({nome: "Intervalo de Confiança", valor: intervaloConfianca});

                const additionalList = listDatas.map(item => `<li>${item.nome}: ${item.valor}</li>`).join('');

                return `
                  <div>
                    <strong>Valor do Dia: ${data}</strong>
                    <ul>${additionalList}</ul>
                  </div>
                `;
            }
        }
	}	

	const series = [{
		name: "Resultado",
		data: [{ x: '05/02/2023', y: 54 }, { x: '05/05/2023', y: 500 }, { x: '05/15/2023', y: 80 }, { x: '05/20/2023', y: 10 }, { x: '05/30/2023', y: 26 }]
	}]

	return(
		<div>
			<ApexCharts 
				options={options}
				series={series}
				type="area"
                height={215}
			/>
		</div>
	)
}

export const BasicColumn = () => {
	const options = {
		chart: {
            type: 'bar',
            foreColor: '#FFFFFF'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
		},
		dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Alimentação', 'Roupas'],
        },
        yaxis: {
            title: {
                text: 'Despesas por Categorias'
            }
       	},
       	fill: {
            opacity: 1
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const data = series[seriesIndex][dataPointIndex];

                const proporcao = data*2;
                const distribuicaoBinomial = data*3+1;
                const distribuicaoNormalPadrao = data*9-10;

                return `
                  <div>
                    <strong>Valor Total: ${data}</strong>
                    <ul>
                        <li>Proporção: ${proporcao}</li>
                        <li>Distribuição Binomial: ${distribuicaoBinomial}</li>
                        <li>Distribuição Normal Padrão: ${distribuicaoNormalPadrao}</li>
                    </ul>
                  </div>
                `;
            }
        }
    }

    const series = [{
        name: 'Pix',
        data: [44, 55]
    }, {
       	name: 'Boleto',
        data: [76, 85]
    }, {
        name: 'Cartão',
        data: [35, 41]
    }]

	return(
		<div>
			<ApexCharts 
				options={options}
				series={series}
				type="bar"
			/>
		</div>
	)
}

export const SimplePie = () => {
	const options = {
		chart: {
            type: 'pie',
            foreColor: '#FFFFFF'
        },
        labels: ['Alimentação', 'Roupas'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
	}

	const series = [78, 80]

	return(
		<div>
			<ApexCharts 
				options={options}
				series={series}
				type="pie"
			/>
		</div>
	)
} 

export const StackedColumn = () => {
	const options = {
		chart: {
          	type: 'bar',
          	stacked: true,
          	toolbar: {
            	show: true
          	},
          	zoom: {
            	enabled: true
        	},
            foreColor: '#FFFFFF'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: '13px',
                  fontWeight: 900,
                  color: 'white'
                }
              }
            }
          }
        },
        xaxis: {
          type: 'datetime',
          categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT']
        },
        legend: {
          position: 'right',
          offsetY: 40
        },
        fill: {
          opacity: 1
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                const data = series[seriesIndex][dataPointIndex];

                const limiteCartaoCredito = dataPointIndex;
                const faturasCartao = [10, 20];
                const valorAtual = 0;

                for(let fatura in faturasCartao){
                    console.log(fatura);
                } 

                return `
                  <div>
                    <strong>Valor Total: ${data}</strong>
                  </div>
                `;
            }
        }
	}

	const series = [{
          name: 'Samuel',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'Victor',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'Lucas',
          data: [11, 17, 15, 15, 21, 14]
    }]

	return(
		<div>
			<ApexCharts 
				options={options}
				series={series}
				type="bar"
			/>
		</div>
	)
}