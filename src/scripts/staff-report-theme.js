/* Chart presentation only: preserve every measurement, scale and calculation. */
if(window.Chart){
 Chart.register({id:'staffReportTheme',beforeInit(chart){
  if(document.body.dataset.audience!=='staff')return;
  const options=chart.config.options||(chart.config.options={});
  const font={family:'Pretendard, sans-serif'};
  const legend=options.plugins?.legend;
  if(legend){legend.labels=legend.labels||{};legend.labels.color='#52677b';legend.labels.font={...legend.labels.font,...font};}
  for(const scale of Object.values(options.scales||{})){
   scale.ticks={...scale.ticks,color:'#61778f',font:{...scale.ticks?.font,...font}};
   scale.grid={...scale.grid,color:'#e3edf7'};
   if(scale.pointLabels)scale.pointLabels={...scale.pointLabels,color:'#52677b',font:{...scale.pointLabels.font,...font}};
  }
  if(chart.config.type==='radar')for(const data of chart.config.data.datasets){data.borderColor='#287ce5';data.backgroundColor='rgba(40,124,229,0.12)';data.pointBackgroundColor='#287ce5';}
  if(chart.canvas.id==='rp-height-chart'||chart.canvas.id==='rp-weight-chart')for(const data of chart.config.data.datasets){
   if(data.type==='scatter'){data.backgroundColor='#ff8647';data.borderColor='#ff8647';}
   else data.borderColor=data.label==='50th'?'#287ce5':data.label==='25th'||data.label==='75th'?'#82b5ee':'#c5dcf6';
  }
 }});
}
