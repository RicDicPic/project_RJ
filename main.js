import "./style.css";
import leaflet from "leaflet";
import * as turf from "@turf/turf";
import bairros from "./bairros.json";
import regioes from "./regioes.json";

const bairrosData = {...bairros };
const regioesData = {...regioes};

const bairroPrincIndex = Math.floor(Math.random() * bairrosData.features.length);

const bairroPrinc = bairrosData.features[bairroPrincIndex];
// Adiciona o novo polígono ao mapa
const newPolygonLayer = leaflet.geoJSON(bairroPrinc, {
    style: function (feature) {
        return { color: feature.properties.color };
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.description);
    },
    interactive: false
});

// Cria um mapa centrado no novo polígono
const setZoom = Math.floor(Math.random() * 5) + 11;
const mymap = leaflet.map("mapid").setView(turf.centroid(bairroPrinc).geometry.coordinates.reverse(), setZoom);

// Remove todos os polígonos existentes do mapa
mymap.eachLayer(function (layer) {
    if (layer instanceof leaflet.GeoJSON && layer !== newPolygonLayer) {
        mymap.removeLayer(layer);
    }
});

// Adiciona o novo polígono ao mapa
newPolygonLayer.addTo(mymap);

const nomesBairros = [
  "Paquetá","Freguesia (Ilha)","Bancários","Galeão","Tauá","Portuguesa","Moneró","Vigário Geral","Cocotá","Jardim América","Jardim Carioca","Pavuna","Cordovil","Jardim Guanabara","Parada de Lucas",
  "Parque Colúmbia","Praia da Bandeira","Penha Circular","Cacuia","Irajá","Anchieta","Acari","Pitangueiras","Costa Barros","Brás de Pina","Penha","Zumbi","Ribeira","Coelho Neto","Guadalupe","Parque Anchieta",
  "Barros Filho","Vista Alegre","Ricardo de Albuquerque","Colégio","Honório Gurgel","Olaria","Vila da Penha","Maré","Vila Militar","Cidade Universitária","Rocha Miranda","Ramos","Realengo","Vila Kosmos","Marechal Hermes",
  "Vicente de Carvalho","Paciência","Engenho da Rainha","Complexo do Alemão","Vaz Lobo","Padre Miguel","Bento Ribeiro","Turiaçú","Bonsucesso","Inhaúma","Tomás Coelho","Santíssimo","Madureira","Osvaldo Cruz","Santa Cruz",
  "Magalhães Bastos","Senador Camará","Cavalcanti","Campo dos Afonsos","Higienópolis","Manguinhos","Engenheiro Leal","Pilares","Del Castilho","Piedade","Cascadura","Vila Valqueire","Maria da Graça","Quintino Bocaiúva",
  "Jardim Sulacap","Campinho","Abolição","Senador Vasconcelos","Cosmos","Jacarezinho","Cachambi","Praça Seca","Benfica","Engenho de Dentro","São Cristóvão","Vasco da Gama","Inhoaíba","Todos os Santos",
  "Jacaré","Encantado","Rocha","Méier","Gamboa","Santo Cristo","Centro","Sampaio","Riachuelo","Saúde","São Francisco Xavier","Engenho Novo","Mangueira","Tanque","Taquara","Água Santa","Lins de Vasconcelos",
  "Freguesia (Jacarepaguá)","Cidade Nova","Praça da Bandeira","Vila Isabel","Maracanã","Glória","Rio Comprido","Santa Teresa","Estácio","Tijuca","Catumbi","Grajaú","Pechincha","Andaraí","Catete",
  "Flamengo","Laranjeiras","Guaratiba","Vargem Grande","Alto da Boa Vista","Cosme Velho","Curicica","Botafogo","Urca","Cidade de Deus","Sepetiba","Anil","Jacarepaguá","Camorim","Humaitá","Gardênia Azul",
  "Jardim Botânico","Vargem Pequena","Copacabana","Leme","Lagoa","Itanhangá","Gávea","Barra da Tijuca","Leblon","Ipanema","São Conrado","Rocinha","Pedra de Guaratiba","Recreio dos Bandeirantes","Vidigal",
  "Joá","Barra de Guaratiba","Grumari","Caju","Deodoro","Lapa","Campo Grande","Bangu","Gericinó","Jabour","Vila Kennedy","Ilha de Guaratiba"
]

document.addEventListener("DOMContentLoaded", function() {
  new Awesomplete(document.querySelector("#bairro-input"), {
      list: nomesBairros
  });
});

const input = document.getElementById('bairro-input');

// Suponha que o botão de enviar tenha o ID 'enviar-btn'
const button = document.getElementById('enviar-btn');
input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        button.click();
    }
});

// Variável para armazenar o texto digitado
let textoDigitado = '';

// Ouvinte de evento de clique para o botão de enviar
button.addEventListener('click', function() {
  // Armazena o texto digitado pelo usuário
  textoDigitado = input.value;
  
  // Percorre a lista de features para buscar a feature com o nome correspondente ao texto digitado
  bairrosData.features.forEach(function(feature) {
    // Compara o nome da feature com o texto digitado (ignorando diferenças de maiúsculas e minúsculas)
    if (feature.properties.nome.toLowerCase() === textoDigitado.toLowerCase()) {
        const newPolygonLayer = L.geoJSON(feature, {
            style: function (feature) {
                return { color: 'red', fillColor: 'yellow' }; // Defina as cores do polígono conforme necessário
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.nome); // Exibe o nome do bairro no popup
            }
        });
        // Adiciona a nova camada de polígono ao mapa
        newPolygonLayer.addTo(mymap);

        // Calcula a distância entre os centros dos polígonos
        const centroid1 = turf.centroid(bairroPrinc).geometry.coordinates;
        const centroid2 = turf.centroid(feature).geometry.coordinates;
        const distance = turf.distance(centroid1, centroid2, { units: "kilometers" });
        console.log(distance);
      return; // Interrompe o loop forEach após encontrar a feature
    }
  });
});

/*
regioesData.features.forEach(function(feature)){
    if(bairroPrinc)
}
*/