(this["webpackJsonpcalculo-poligonales"]=this["webpackJsonpcalculo-poligonales"]||[]).push([[0],{14:function(e,a,t){},18:function(e,a,t){},19:function(e,a,t){"use strict";t.r(a);var l=t(0),n=t.n(l),r=t(3),o=t.n(r),s=(t(14),t(15),t(4));var c=e=>{let{observacionesCompensadas:a=[]}=e;const[t,r]=Object(l.useState)("blue"),[o,c]=Object(l.useState)(2),[u,i]=Object(l.useState)("red"),[m,d]=Object(l.useState)(10),[p,E]=Object(l.useState)("blue"),[g,h]=Object(l.useState)(!0),[b,v]=Object(l.useState)(!1),N=Math.min(...a.map(e=>parseFloat(e.nuevoEsteAjustado))),y=Math.max(...a.map(e=>parseFloat(e.nuevoEsteAjustado))),F=Math.min(...a.map(e=>parseFloat(e.nuevoNorteAjustado))),x=Math.max(...a.map(e=>parseFloat(e.nuevoNorteAjustado))),C=1.01*(y-N),j=1.01*(x-F),f=Math.min(320/C,550/j),S=(320-(y-N)*f)/2,O=(550-(x-F)*f)/2,A=e=>(e-N)*f+S,k=e=>550-(e-F)*f-O;return n.a.createElement("div",{style:{position:"relative",border:"2px solid black",width:"320px",height:"550px",padding:"10px"}},n.a.createElement("button",{onClick:()=>v(!b),style:{position:"absolute",top:"5px",right:"5px",zIndex:11}},b?"Ocultar Configuraci\xf3n":"Mostrar Configuraci\xf3n"),b&&n.a.createElement("div",{style:{position:"absolute",top:"40px",left:"5px",backgroundColor:"white",padding:"10px",borderRadius:"8px",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",zIndex:10,fontSize:"10px"}},n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Color de la l\xednea:",n.a.createElement("input",{type:"color",value:t,onChange:e=>r(e.target.value),style:{width:"40%",marginTop:"3px"}})),n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Grosor de la l\xednea:",n.a.createElement("input",{type:"number",min:"1",max:"50",value:o,onChange:e=>c(Number(e.target.value)),style:{width:"30%",marginTop:"3px"}})),n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Color del punto:",n.a.createElement("input",{type:"color",value:u,onChange:e=>i(e.target.value),style:{width:"40%",marginTop:"3px"}})),n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Tama\xf1o de la flecha:",n.a.createElement("input",{type:"number",min:"5",max:"40",value:m,onChange:e=>d(Number(e.target.value)),style:{width:"30%",marginTop:"2px"}})),n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Color de la flecha:",n.a.createElement("input",{type:"color",value:p,onChange:e=>E(e.target.value),style:{width:"40%",marginTop:"3px"}})),n.a.createElement("label",{style:{display:"block",marginBottom:"5px"}},"Mostrar flecha:",n.a.createElement("input",{type:"checkbox",checked:g,onChange:e=>h(e.target.checked),style:{marginTop:"3px"}}))),n.a.createElement(s.a,{width:320,height:550,background:"transparent",tool:"auto",detectAutoPan:!1,toolbarProps:{position:"none"}},n.a.createElement("div",{style:{position:"relative",width:"320px",height:"550px"}},n.a.createElement("button",{onClick:()=>v(!b),style:{position:"absolute",top:"-35px",left:"50%",transform:"translateX(-50%)",backgroundColor:"#007bff",color:"white",border:"none",padding:"10px 20px",borderRadius:"8px",cursor:"pointer",zIndex:10}},b?"Ocultar Configuraci\xf3n":"Mostrar Configuraci\xf3n"),n.a.createElement("svg",{width:320,height:550,style:{border:"2px solid black",zIndex:1}},n.a.createElement("defs",null,n.a.createElement("marker",{id:"arrow",markerWidth:m,markerHeight:m,refX:"10",refY:"3",orient:"auto",markerUnits:"strokeWidth"},n.a.createElement("path",{d:"M0,0 L0,6 L9,3 z",fill:p}))),Array.from({length:Math.ceil(3.2)}).map((e,a)=>n.a.createElement("line",{key:"v-grid-"+a,x1:100*a,y1:0,x2:100*a,y2:550,stroke:"#d3d3d3",strokeWidth:"1"})),Array.from({length:Math.ceil(5.5)}).map((e,a)=>n.a.createElement("line",{key:"h-grid-"+a,x1:0,y1:100*a,x2:320,y2:100*a,stroke:"#d3d3d3",strokeWidth:"1"})),a.map((e,a)=>{const t=A(parseFloat(e.nuevoEsteAjustado)),l=k(parseFloat(e.nuevoNorteAjustado));return n.a.createElement("g",{key:a},n.a.createElement("circle",{cx:t,cy:l,r:"6",fill:u,"data-tooltip-id":"tooltip-"+a,"data-tooltip-content":`ID: ${e.id}, Norte: ${e.nuevoNorteAjustado}, Este: ${e.nuevoEsteAjustado}`,style:{cursor:"pointer"}}),n.a.createElement("text",{x:t+5,y:l-5,fontSize:"12",fill:"black"},e.id))}),a.map((e,l)=>{if(l<a.length-1){const r=A(parseFloat(e.nuevoEsteAjustado)),s=k(parseFloat(e.nuevoNorteAjustado)),c=A(parseFloat(a[l+1].nuevoEsteAjustado)),u=k(parseFloat(a[l+1].nuevoNorteAjustado));return n.a.createElement("line",{key:l,x1:r,y1:s,x2:c,y2:u,stroke:t,strokeWidth:o,markerEnd:g?"url(#arrow)":null})}return null}),a.length>2&&n.a.createElement("line",{x1:A(parseFloat(a[a.length-1].nuevoEsteAjustado)),y1:k(parseFloat(a[a.length-1].nuevoNorteAjustado)),x2:A(parseFloat(a[0].nuevoEsteAjustado)),y2:k(parseFloat(a[0].nuevoNorteAjustado)),stroke:t,strokeWidth:o,markerEnd:g?"url(#arrow)":null})))))};var u=e=>{let{agregarObservacion:a}=e;const[t,r]=Object(l.useState)(""),[o,s]=Object(l.useState)(""),[u,i]=Object(l.useState)(""),[m,d]=Object(l.useState)(""),[p,E]=Object(l.useState)(null),[g,h]=Object(l.useState)(null),[b,v]=Object(l.useState)(!1),[N,y]=Object(l.useState)(""),[F,x]=Object(l.useState)(""),[C,j]=Object(l.useState)(""),[f,S]=Object(l.useState)(""),[O,A]=Object(l.useState)(""),[k,M]=Object(l.useState)(""),[$,P]=Object(l.useState)(""),[z,I]=Object(l.useState)(""),[w,D]=Object(l.useState)(null),[V,H]=Object(l.useState)(0),[B,T]=Object(l.useState)(0),[q,W]=Object(l.useState)(0),[L,R]=Object(l.useState)("internos"),[X,G]=Object(l.useState)([]),[U,Y]=Object(l.useState)(!1),[J,K]=Object(l.useState)(0),Q=e=>{if(0===e.length)return K(0),0;const a=(U?e.slice(1):e).reduce((e,a)=>e+parseFloat(a.distanciaVertical)+parseFloat(a.alturaInstrumental)-parseFloat(a.alturaPrisma),0);console.log("\nSumatoria de Distancias Verticales Calculadas: "+a.toFixed(4));const t=a.toFixed(4);return K(t),console.log("Cierre de alturas calculado: "+t),parseFloat(t)},Z=(e,a)=>{const t=e.length;if(0===t)return;let l,n={grados:0,minutos:0,segundos:0},r=0,o=!1;e.forEach(e=>{if(r++,0===r&&U)return;const a={grados:Number(e.gradosH),minutos:Number(e.minutosH),segundos:Number(e.segundosH)};0===r&&U&&!o?(n=a,o=!0):n=_(n,a)}),l="internos"===a?{grados:180*(t-2),minutos:0,segundos:0}:{grados:180*(t+2),minutos:0,segundos:0};const s=ae(l,n);H(l),T(n),W(s)},_=(e,a)=>{let t=Number(e.segundos)+Number(a.segundos),l=Number(e.minutos)+Number(a.minutos),n=Number(e.grados)+Number(a.grados);return t>=60&&(l+=Math.floor(t/60),t%=60),l>=60&&(n+=Math.floor(l/60),l%=60),{grados:n,minutos:l,segundos:t}},ee=(e,a,t)=>e+a/60+t/3600,ae=(e,a)=>{let t,l;ee(e.grados,e.minutos,e.segundos)>=ee(a.grados,a.minutos,a.segundos)?(t=e,l=a):(t=a,l=e);let n=t.segundos-l.segundos,r=t.minutos-l.minutos,o=t.grados-l.grados;return n<0&&(n+=60,r-=1),r<0&&(r+=60,o-=1),{grados:o,minutos:r,segundos:n}},te=(e,a,t)=>parseFloat(e)+parseFloat(a)/60+parseFloat(t)/3600,le=e=>{const a=Math.floor(e),t=60*(e-a),l=Math.floor(t);return`${a}\xb0 ${l}' ${Math.round(60*(t-l))}"`},[ne,re]=Object(l.useState)([]),[oe,se]=Object(l.useState)(""),[ce,ue]=Object(l.useState)(""),[ie,me]=Object(l.useState)(0),[de,pe]=Object(l.useState)(""),Ee=(e,a,t,l)=>{const n=te(e,a,t),r=he(n);return(l*Math.cos(r)).toFixed(4)},ge=(e,a,t,l)=>(parseFloat(e)+parseFloat(t)-parseFloat(l)+parseFloat(a)).toFixed(4),he=e=>e*Math.PI/180,be=(e,a,t,l)=>{const n=parseFloat(e)+parseFloat(t),r=parseFloat(a)+parseFloat(l);return{nuevoNorte:n.toFixed(4),nuevoEste:r.toFixed(4)}},[ve,Ne]=Object(l.useState)(0),[ye,Fe]=Object(l.useState)(0),[xe,Ce]=Object(l.useState)(0),[je,fe]=Object(l.useState)(0),[Se,Oe]=Object(l.useState)(null),Ae=(e,a,t)=>(e/Math.sqrt(Math.pow(a,2)+Math.pow(t,2))).toFixed(4),ke=e=>{let a;return a=e<180?e+180:e-180,a>=360&&(a-=360),a.toFixed(4)},Me=(e,a)=>{let t=parseFloat(e)+parseFloat(a);return t>=360&&(t-=360),t.toFixed(4)},$e=(e,a)=>{const t=xe,l=je,n=J,r=(U?e.slice(1):e).reduce((e,a)=>e+parseFloat(a.distancia),0);return(e=>{let a;U?(a=parseFloat(e[0].alturaCalculada),console.log(`\n*** Brazo Externo: Usando altura de la primera observaci\xf3n como base: ${a} ***`)):(a=parseFloat(e[0].alturaCalculada),console.log(`\n*** Brazo Interno: Usando altura inicial de la primera observaci\xf3n: ${a} ***`)),isNaN(a)&&(console.error("Error: Altura inicial no v\xe1lida."),a=0);return e.map((e,t)=>{if(console.log("\nCalculando altura compensada para la observaci\xf3n "+e.id),0===t&&U)e.alturaCompensada=e.alturaCalculada,console.log("Brazo Externo - Primera observaci\xf3n sin ajuste: "+e.alturaCompensada);else{const t=parseFloat(e.distanciaVerticalCompensada);isNaN(t)?(console.error("Error: La distancia vertical compensada no es v\xe1lida para la observaci\xf3n "+e.id),e.alturaCompensada="NaN"):(a+=t,e.alturaCompensada=a.toFixed(4),console.log(`Altura acumulada y compensada para la observaci\xf3n ${e.id}: ${e.alturaCompensada}`))}return e})})(e.map((e,a)=>{if(0===a)return e;const t=Math.abs(n)*e.distancia/r,l=parseFloat(e.alturaCalculada1);if(console.log(`Distancia Vertical Original para observaci\xf3n ${e.id}: ${l}`),isNaN(l))console.error("Error: distanciaVertical no es un n\xfamero v\xe1lido",e),e.distanciaVerticalCompensada="NaN";else{const a=n<0?l+t:l-t;console.log(`Distancia Vertical Compensada para observaci\xf3n ${e.id}: ${a}`),e.distanciaVerticalCompensada=a.toFixed(4)}return e})).map((e,a)=>{if(0===a&&U)return{...e,proyeccionNorteCompensada:e.proyeccionNorte,proyeccionEsteCompensada:e.proyeccionEste,alturaCompensada:e.alturaCompensada};const n=t*e.distancia/r,o=l*e.distancia/r,s=parseFloat(e.proyeccionNorte)-n,c=parseFloat(e.proyeccionEste)-o;return{...e,proyeccionNorteCompensada:s.toFixed(4),proyeccionEsteCompensada:c.toFixed(4),alturaCompensada:e.alturaCompensada}})};return n.a.createElement("form",{onSubmit:e=>e.preventDefault(),className:"formulario-observacion"},b?n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",{style:{margin:"5px 0"}},"Azimut Inicial: ",le(p)),n.a.createElement("h3",{style:{margin:"5px 0"}},"Distancia Inicial: ",g," metros"),n.a.createElement("h3",{className:"header"},"Ingresar Observaci\xf3n"),n.a.createElement("div",{className:"row-container"},n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"ID Obs"),n.a.createElement("input",{type:"text",placeholder:"ID",value:de,onChange:e=>pe(e.target.value),className:"input-field"})),n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"\xc1ngulo Horizontal"),n.a.createElement("input",{type:"number",placeholder:"Grados",value:N,onChange:e=>y(Number(e.target.value)),className:"input-field"}),n.a.createElement("input",{type:"number",placeholder:"Minutos",value:F,onChange:e=>x(Number(e.target.value)),className:"input-field"}),n.a.createElement("input",{type:"number",placeholder:"Segundos",value:C,onChange:e=>j(Number(e.target.value)),className:"input-field"})),n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"\xc1ngulo Vertical"),n.a.createElement("input",{type:"number",placeholder:"Grados",value:f,onChange:e=>S(Number(e.target.value)),className:"input-field"}),n.a.createElement("input",{type:"number",placeholder:"Minutos",value:O,onChange:e=>A(Number(e.target.value)),className:"input-field"}),n.a.createElement("input",{type:"number",placeholder:"Segundos",value:k,onChange:e=>M(Number(e.target.value)),className:"input-field"})),n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"Distancia (Metros)"),n.a.createElement("input",{type:"number",placeholder:"Distancia (m)",value:$,onChange:e=>P(e.target.value),className:"input-field"})),n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"Altura Instrumental"),n.a.createElement("input",{type:"number",placeholder:"Altura Instrumental (m)",value:oe,onChange:e=>se(e.target.value),className:"input-field"})),n.a.createElement("div",{className:"input-group"},n.a.createElement("h4",{className:"header"},"Altura Prisma"),n.a.createElement("input",{type:"number",placeholder:"Altura Prisma (m)",value:ce,onChange:e=>ue(e.target.value),className:"input-field"}))),n.a.createElement("button",{type:"button",onClick:()=>{if(void 0===N||void 0===F||void 0===C||void 0===f||void 0===O||void 0===k||""===$||isNaN($))return void alert("Por favor, completa todos los campos con valores v\xe1lidos.");const e=te(Number(N),Number(F),Number(C));let a;if(0===ve)a=(()=>{const e=te(N,F,C),a=((e,a)=>{let t=e+a;return t>=360&&(t-=360),t.toFixed(4)})(parseFloat(p),e);return D(a),a})();else{const t=ke(Se);a=Me(t,e)}const l=le(a),{norte:n,este:r}=((e,a)=>{const t=he(e),l=Math.cos(t)*a,n=Math.sin(t)*a;return{norte:l.toFixed(4),este:n.toFixed(4)}})(parseFloat(a),parseFloat($));let s,c;if(0===ve)({nuevoNorte:s,nuevoEste:c}=be(t,o,n,r));else{const{nuevoNorte:e,nuevoEste:a}=ne[ne.length-1];({nuevoNorte:s,nuevoEste:c}=be(e,a,n,r))}const u=Ee(f,O,k,$),i=ge(0===ve?z:ne[ne.length-1].alturaCalculada,u,oe,ce),m={id:de,gradosH:N,minutosH:F,segundosH:C,gradosV:f,minutosV:O,segundosV:k,azimut:l,anguloHorizontal:`${N}\xb0 ${F}' ${C}"`,anguloVertical:`${f}\xb0 ${O}' ${k}"`,distancia:$,distanciaVertical:u,alturaInstrumental:oe,alturaPrisma:ce,proyeccionNorte:n,proyeccionEste:r,nuevoNorte:s,nuevoEste:c,alturaCalculada:i,alturaCalculada1:(parseFloat(oe)+parseFloat(u)-parseFloat(ce)).toFixed(4)};re(e=>{const a=[...e,m];return(e=>{const a=U?e.slice(1):e;Z(a,L),Q(a);const t=a.reduce((e,a)=>e+parseFloat(a.distancia),0),l=a.reduce((e,a)=>e+parseFloat(a.proyeccionNorte),0),n=a.reduce((e,a)=>e+parseFloat(a.proyeccionEste),0);Fe(t),Ce(l),fe(n);const r=Ae(t,l,n);me(r)})(a),Q(a),a}),Fe(e=>e+parseFloat($)),Ce(e=>e+parseFloat(n)),fe(e=>e+parseFloat(r));const d=Ae(ye+parseFloat($),xe+parseFloat(n),je+parseFloat(r));me(d),Oe(parseFloat(a)),Ne(ve+1),pe(""),y(""),x(""),j(""),S(""),A(""),M(""),P(""),se(""),ue("")}},"Agregar Observaci\xf3n"),w&&n.a.createElement("h3",null,"Nuevo Azimut: ",le(w)),ne.length>0&&n.a.createElement(n.a.Fragment,null,n.a.createElement("table",{border:"1",cellPadding:"10",cellSpacing:"1"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{className:"id"},"ID"),n.a.createElement("th",{className:"angulo"},"\xc1ngulo H"),n.a.createElement("th",{className:"angulo"},"\xc1ngulo V"),n.a.createElement("th",{className:"distancia"},"Distancia"),n.a.createElement("th",{className:"angulo"},"Azimut"),n.a.createElement("th",{className:"altura"},"Alt Ins"),n.a.createElement("th",{className:"altura"},"Alt Pri"))),n.a.createElement("tbody",null,ne.map((e,a)=>n.a.createElement("tr",{key:a},n.a.createElement("td",null,e.id),n.a.createElement("td",null,e.anguloHorizontal),n.a.createElement("td",null,e.anguloVertical),n.a.createElement("td",null,e.distancia,"m"),n.a.createElement("td",null,e.azimut),n.a.createElement("td",null,e.alturaInstrumental,"m"),n.a.createElement("td",null,e.alturaPrisma,"m"))))),n.a.createElement("br",null)," ",n.a.createElement("table",{border:"1",cellPadding:"10",cellSpacing:"1"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{className:"id"},"ID")," ",n.a.createElement("th",{className:"proyeccion"},"Proy Norte"),n.a.createElement("th",{className:"proyeccion"},"Proy Este"),n.a.createElement("th",{className:"coordenada"},"Norte"),n.a.createElement("th",{className:"coordenada"},"Este"),n.a.createElement("th",{className:"altura"},"Altura")," ")),n.a.createElement("tbody",null,ne.map((e,a)=>{const t=Ee(e.gradosV,e.minutosV,e.segundosV,e.distancia),l=ge(0===a?z:ne[a-1].alturaCalculada,t,e.alturaInstrumental,e.alturaPrisma);return ne[a].alturaCalculada=l,n.a.createElement("tr",{key:a},n.a.createElement("td",null,e.id)," ",n.a.createElement("td",null,e.proyeccionNorte,"m"),n.a.createElement("td",null,e.proyeccionEste,"m"),n.a.createElement("td",null,e.nuevoNorte),n.a.createElement("td",null,e.nuevoEste),n.a.createElement("td",null,l)," ")}))),n.a.createElement("button",{type:"button",onClick:()=>{if(ne.length>0){const e=ne[ne.length-1];Fe(a=>Math.max(0,a-parseFloat(e.distancia))),Ce(a=>Math.max(0,a-parseFloat(e.proyeccionNorte))),fe(a=>Math.max(0,a-parseFloat(e.proyeccionEste)));const a=ne.slice(0,-1);re(a);const t=Ae(Math.max(0,ye-parseFloat(e.distancia)),Math.max(0,xe-parseFloat(e.proyeccionNorte)),Math.max(0,je-parseFloat(e.proyeccionEste)));if(me(t),Ne(ve-1),a.length>0){const e=a[a.length-1].azimut,t=te(...e.split(/[\xb0'"]/).map(e=>parseFloat(e)));Oe(t)}else Oe(null);Z(a,L)}}},"Borrar \xdaltima Observaci\xf3n"),n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"resumen-angular"},n.a.createElement("h3",null,"Resumen Angular de la Poligonal"),n.a.createElement("p",null,n.a.createElement("strong",null,"Suma Te\xf3rica:")," ",`${V.grados}\xb0 ${V.minutos}' ${V.segundos}"`),n.a.createElement("p",null,n.a.createElement("strong",null,"Suma Real:")," ",`${B.grados}\xb0 ${B.minutos}' ${B.segundos}"`),n.a.createElement("p",null,n.a.createElement("strong",null,"Error Angular:")," ",`${q.grados}\xb0 ${q.minutos}' ${q.segundos}"`)),n.a.createElement("div",{className:"totales"},n.a.createElement("h3",null,"Totales"),n.a.createElement("p",null,n.a.createElement("strong",null,"Total Distancia:")," ",ye.toFixed(4)," m"),n.a.createElement("p",null,n.a.createElement("strong",null,"Total Proyecci\xf3n Norte:")," ",xe.toFixed(4)," m"),n.a.createElement("p",null,n.a.createElement("strong",null,"Total Proyecci\xf3n Este:")," ",je.toFixed(4)," m"),n.a.createElement("p",null,n.a.createElement("strong",null,"Cierre Alturas:")," ",J," m")),n.a.createElement("div",{className:"precision-poligonal"},n.a.createElement("h3",null,"Precisi\xf3n de la Poligonal"),n.a.createElement("p",null,n.a.createElement("strong",null,"Precisi\xf3n:")," ",ie)))),n.a.createElement("button",{type:"button",onClick:()=>{const e=(()=>{if(0===ne.length)return[];const e=(U?ne.slice(1):ne).length,a=ee(q.grados,q.minutos,q.segundos)/e;return ne.map((e,t)=>{if(0===t&&U)return{...e,anguloHorizontalCompensado:e.anguloHorizontal};const[l,n,r]=e.anguloHorizontal.split(/[\xb0'"]/).map(parseFloat),o=ee(l,n,r),s=le(o-a);return{...e,anguloHorizontalCompensado:s}})})(),a=$e(e);G(a)}},"Compensar Poligonal"),n.a.createElement("h3",null,"Observaciones Compensadas"),n.a.createElement("table",{border:"1"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"ID"),n.a.createElement("th",null,"\xc1ngulo H Compensado"),n.a.createElement("th",null,"Proyecci\xf3n N Compensada"),n.a.createElement("th",null,"Proyecci\xf3n E Compensada"))),n.a.createElement("tbody",null,X.map((e,a)=>n.a.createElement("tr",{key:a},n.a.createElement("td",null,e.id),n.a.createElement("td",null,e.anguloHorizontalCompensado),n.a.createElement("td",null,e.proyeccionNorteCompensada,"m"),n.a.createElement("td",null,e.proyeccionEsteCompensada,"m"))))),n.a.createElement("br",null)," ",n.a.createElement("table",{border:"1"},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",null,"ID")," ",n.a.createElement("th",null,"Norte Ajustado"),n.a.createElement("th",null,"Este Ajustado"),n.a.createElement("th",null,"Altura Compensada"))),n.a.createElement("tbody",null,X.map((e,a)=>{const{nuevoNorteAjustado:l,nuevoEsteAjustado:r}=((e,a,t,l)=>{const n=parseFloat(e)+parseFloat(t),r=parseFloat(a)+parseFloat(l);return{nuevoNorteAjustado:n.toFixed(4),nuevoEsteAjustado:r.toFixed(4)}})(0===a?t:X[a-1].nuevoNorteAjustado,0===a?o:X[a-1].nuevoEsteAjustado,e.proyeccionNorteCompensada,e.proyeccionEsteCompensada);return X[a].nuevoNorteAjustado=l,X[a].nuevoEsteAjustado=r,n.a.createElement("tr",{key:a},n.a.createElement("td",null,e.id)," ",n.a.createElement("td",null,l),n.a.createElement("td",null,r),n.a.createElement("td",null,isNaN(parseFloat(e.alturaCompensada))?"-":parseFloat(e.alturaCompensada).toFixed(3)))}))),X.length>0&&n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{className:"app-container"},n.a.createElement(c,{observacionesCompensadas:X})))):n.a.createElement(n.a.Fragment,null," ",n.a.createElement("div",null,n.a.createElement("label",null,"Sentido de la Poligonal: "),n.a.createElement("select",{value:L,onChange:e=>R(e.target.value)},n.a.createElement("option",{value:"internos"},"\xc1ngulos Internos"),n.a.createElement("option",{value:"externos"},"\xc1ngulos Externos"))),n.a.createElement("div",null,n.a.createElement("label",null,"Tipo de Brazo de la Poligonal: "),n.a.createElement("select",{value:U?"externo":"interno",onChange:e=>Y("externo"===e.target.value)},n.a.createElement("option",{value:"interno"},"Brazo Interno")," ",n.a.createElement("option",{value:"externo"},"Brazo Externo")," ")),n.a.createElement("h3",null,"Coordenadas del Punto Inicial (D1)"),n.a.createElement("input",{type:"number",placeholder:"Norte (Y)",value:t,onChange:e=>{const a=e.target.value;/^[0-9]*[.,]?[0-9]*$/.test(a)&&r(a)},required:!0,className:"coordenadas-input"}),n.a.createElement("input",{type:"number",placeholder:"Este (X)",value:o,onChange:e=>{const a=e.target.value;/^[0-9]*[.,]?[0-9]*$/.test(a)&&s(a)},required:!0,className:"coordenadas-input"}),n.a.createElement("input",{type:"number",placeholder:"Altura (m)",value:z,onChange:e=>{const a=e.target.value;/^[0-9]*[.,]?[0-9]*$/.test(a)&&I(a)},required:!0,className:"coordenadas-input"}),n.a.createElement("h3",null,"Coordenadas del Punto Visado (D2)"),n.a.createElement("input",{type:"number",placeholder:"Norte (Y)",value:u,onChange:e=>{const a=e.target.value;/^[0-9]*[.,]?[0-9]*$/.test(a)&&i(a)},required:!0,className:"coordenadas-input"}),n.a.createElement("input",{type:"number",placeholder:"Este (X)",value:m,onChange:e=>{const a=e.target.value;/^[0-9]*[.,]?[0-9]*$/.test(a)&&d(a)},required:!0,className:"coordenadas-input"}),n.a.createElement("button",{type:"button",onClick:()=>{const{azimut:e,distancia:a}=((e,a,t,l)=>{const n=parseFloat(l)-parseFloat(a),r=parseFloat(t)-parseFloat(e);let o=Math.atan2(n,r)*(180/Math.PI);o<0?o+=360:o>=360&&(o-=360);const s=Math.sqrt(n**2+r**2);return{azimut:o.toFixed(4),distancia:s.toFixed(4)}})(t,o,u,m);E(e),h(a),v(!0)}},"Calcular Azimut y Distancia")))};t(18);var i=function(){const[e,a]=Object(l.useState)([]);return n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"C\xe1lculo de Poligonales"),n.a.createElement(u,{agregarObservacion:t=>{a([...e,t])}}))};var m=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,22)).then(a=>{let{getCLS:t,getFID:l,getFCP:n,getLCP:r,getTTFB:o}=a;t(e),l(e),n(e),r(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(i,null))),m()},5:function(e,a,t){e.exports=t(19)}},[[5,1,2]]]);
//# sourceMappingURL=main.a7f98966.chunk.js.map