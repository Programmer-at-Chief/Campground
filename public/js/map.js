Radar.initialize(map_token)

const map = Radar.ui.map({
  container : document.getElementById('map'),
  style: 'radar-default-v1',
  center: [long,lat],
  zoom: 14,      
});

const marker = Radar.ui.marker({  
  color: '#000257',
  width: 40,
  height: 80,
  popup: {    text: 'My popup.',  }}).setLngLat([long, lat]).addTo(map);

map.on('load', () => {
  Radar.ui.marker({
    popup: {
      html: `<div style="text-align: center;">
<h3>${title}</h3>
<img width="100" src=${img} ></img></div>`,
    },
  })
    .setLngLat([long, lat]).addTo(map);})
