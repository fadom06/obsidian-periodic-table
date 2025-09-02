const { Plugin } = require("obsidian");

module.exports = class PeriodicTableWidget extends Plugin {
  async onload() {
    console.log("Periodic Table Widget loaded ✅");

    this.registerMarkdownCodeBlockProcessor("periodic-table", (source, el) => {
      el.innerHTML = `
        <style>
        rect {
            rx: 5;
            ry: 5;
            transition: filter 0.2s ease; stroke-width: 0.2s ease
        }
        
        /* colors */
        .alkaline_metals rect { fill: #ff6b6b; }
        .alkaline_earth_metals rect { fill: #ffb347; }
        .lanthanoids rect { fill: #ff66cc; }
        .actinoids rect { fill: #ef476f; }
        .transitional_metals rect { fill: #4dabf7; }
        .post_transitional_metals rect { fill: #6a5acd; }
        .metalloids rect { fill: #20c997; }
        .reactive_nonmetals rect { fill: #f9e900; }
        .noble-gases rect { fill: #600178; }
        .unknown rect { fill: #5f6c80; }
        
        /* animations */
        rect:hover {
            filter: brightness(1.2); 
            stroke: #ff6b6b;
            stroke-width: 4;
            stroke-opacity: 0.1;
            filter: drop-shadow(0 0 6px rgba(255, 107, 107, 0.4));
            cursor: pointer;
        }
        
        /* Don't change, breaks links */
        svg text {
            pointer-events: none;
        }
        
        </style>
        <svg viewBox="3 3 673 358" version="1.1" xmlns="http://www.w3.org/2000/svg" overflow="visible">
        <g xmlns="http://www.w3.org/2000/svg" stroke="#000" id="g260">
            <g class="alkaline_metals" id="Alkaline Metals"> 
            <a href="obsidian://open?file=003. Lithium.md"><rect x="40" y="75" width="30" height="30" id="Li" /></a>
            <a href="obsidian://open?file=011. Sodium.md"><rect x="40" y="110" width="30" height="30" id="Na"/></a>
            <a href="obsidian://open?file=019. Potassium.md"><rect x="40" y="145" width="30" height="30" id="K"/></a>
            <a href="obsidian://open?file=037. Rubidium.md"><rect x="40" y="180" width="30" height="30" id="Rb"/></a>
            <a href="obsidian://open?file=055. Caesium.md"><rect x="40" y="215" width="30" height="30" id="Cs"/></a>
            <a href="obsidian://open?file=087. Francium.md"><rect x="40" y="250" width="30" height="30" id="Fr"/></a>
        </g>
        <g class="alkaline_earth_metals" id="Alkaline Earth Metals"> 
            <a href="obsidian://open?file=004. Beryllium.md"><rect x="75" y="75" width="30" height="30" id="Be"/></a>
            <a href="obsidian://open?file=012. Magnesium.md"><rect x="75" y="110" width="30" height="30" id="Mg"/></a>
            <a href="obsidian://open?file=020. Calcium.md"><rect x="75" y="145" width="30" height="30" id="Ca"/></a>
            <a href="obsidian://open?file=038. Strontium.md"><rect x="75" y="180" width="30" height="30" id="Sr"/></a>
            <a href="obsidian://open?file=056. Barium.md"><rect x="75" y="215" width="30" height="30" id="Ba"/></a>
            <a href="obsidian://open?file=088. Radium.md"><rect x="75" y="250" width="30" height="30" id="Ra"/></a>
        </g>
        <g class="lanthanoids" id="Lanthanoids">
            <a href="obsidian://open?file=057. Lanthanum.md"><rect x="120" y="295" width="30" height="30" id="La"/></a>
            <a href="obsidian://open?file=058. Cerium.md.md"><rect x="155" y="295" width="30" height="30" id="Ce"/></a>
            <a href="obsidian://open?file=059. Praseodym.md"><rect x="190" y="295" width="30" height="30" id="Pr"/></a>
            <a href="obsidian://open?file=060. Neodymium.md"><rect x="225" y="295" width="30" height="30" id="Nd"/></a>
            <a href="obsidian://open?file=061. Promethium.md"><rect x="260" y="295" width="30" height="30" id="Pm"/></a>
            <a href="obsidian://open?file=062. Samarium.md"><rect x="295" y="295" width="30" height="30" id="Sm"/></a>
            <a href="obsidian://open?file=063. Europium.md"><rect x="330" y="295" width="30" height="30" id="Eu"/></a>
            <a href="obsidian://open?file=064. Gadolinium.md"><rect x="365" y="295" width="30" height="30" id="Gd"/></a>
            <a href="obsidian://open?file=065. Terbium.md"><rect x="400" y="295" width="30" height="30" id="Tb"/></a>
            <a href="obsidian://open?file=066. Dysprosium.md"><rect x="435" y="295" width="30" height="30" id="Dy"/></a>
            <a href="obsidian://open?file=067. Holmium.md"><rect x="470" y="295" width="30" height="30" id="Ho"/></a>
            <a href="obsidian://open?file=068. Erbium.md"><rect x="505" y="295" width="30" height="30" id="Er"/></a>
            <a href="obsidian://open?file=069. Thulium.md"><rect x="540" y="295" width="30" height="30" id="Tm"/></a>
            <a href="obsidian://open?file=070. Ytterbium.md"><rect x="575" y="295" width="30" height="30" id="Yb"/></a>
        </g>
        <g class="actinoids"id="Actinoids">
            <a href="obsidian://open?file=089. Actinium.md"><rect x="120" y="330" width="30" height="30" id="Ac"/></a> 
            <a href="obsidian://open?file=090. Thorium.md"><rect x="155" y="330" width="30" height="30" id="Th"/></a>
            <a href="obsidian://open?file=091. Protactinium.md"><rect x="190" y="330" width="30" height="30" id="Pa"/></a>
            <a href="obsidian://open?file=092. Uranium.md"><rect x="225" y="330" width="30" height="30" id="U"/></a>
            <a href="obsidian://open?file=093. Neptunium.md"><rect x="260" y="330" width="30" height="30" id="Np"/></a>
            <a href="obsidian://open?file=094. Plutonium.md"><rect x="295" y="330" width="30" height="30" id="Pu"/></a>
            <a href="obsidian://open?file=095. Americium.md"><rect x="330" y="330" width="30" height="30" id="Am"/></a>
            <a href="obsidian://open?file=096. Curium.md"><rect x="365" y="330" width="30" height="30" id="Cm"/></a>
            <a href="obsidian://open?file=097. Berkelium.md"><rect x="400" y="330" width="30" height="30" id="Bk"/></a>
            <a href="obsidian://open?file=098. Californium.md"><rect x="435" y="330" width="30" height="30" id="Cf"/></a>
            <a href="obsidian://open?file=099. Einsteinium.md"><rect x="470" y="330" width="30" height="30" id="Es"/></a>
            <a href="obsidian://open?file=100. Fermium.md"><rect x="505" y="330" width="30" height="30" id="Fm"/></a>
            <a href="obsidian://open?file=101. Mendelevium.md"><rect x="540" y="330" width="30" height="30" id="Md"/></a>
            <a href="obsidian://open?file=102. Nobelium.md"><rect x="575" y="330" width="30" height="30" id="No"/></a>
        </g>
        <g class="transitional_metals" id="Transition Metals">
            <a href="obsidian://open?file=021. Scandium.md"><rect x="120" y="145" width="30" height="30" id="Sc"/></a> 
            <a href="obsidian://open?file=022. Titanium.md"><rect x="155" y="145" width="30" height="30" id="Ti"/></a>
            <a href="obsidian://open?file=023. Vanadium.md"><rect x="190" y="145" width="30" height="30" id="V"/></a>
            <a href="obsidian://open?file=024. Chromium.md"><rect x="225" y="145" width="30" height="30" id="Cr"/></a>
            <a href="obsidian://open?file=025. Manganese.md"><rect x="260" y="145" width="30" height="30" id="Mn"/></a>
            <a href="obsidian://open?file=026. Iron.md"><rect x="295" y="145" width="30" height="30" id="Fe"/></a>
            <a href="obsidian://open?file=027. Cobalt.md"><rect x="330" y="145" width="30" height="30" id="Co"/></a>
            <a href="obsidian://open?file=028. Nickel.md"><rect x="365" y="145" width="30" height="30" id="Ni"/></a>
            <a href="obsidian://open?file=029. Copper.md"><rect x="400" y="145" width="30" height="30" id="Cu"/></a>
            <a href="obsidian://open?file=030. Zinc.md"><rect x="435" y="145" width="30" height="30" id="Zn"/></a>
            <a href="obsidian://open?file=039. Yttrium.md"><rect x="120" y="180" width="30" height="30" id="Y"/></a>
            <a href="obsidian://open?file=040. Zirconium.md"><rect x="155" y="180" width="30" height="30" id="Zr"/></a>
            <a href="obsidian://open?file=041. Niobium.md"><rect x="190" y="180" width="30" height="30" id="Nb"/></a>
            <a href="obsidian://open?file=042. Molybdenum.md"><rect x="225" y="180" width="30" height="30" id="Mo"/></a>
            <a href="obsidian://open?file=043. Technetium.md"><rect x="260" y="180" width="30" height="30" id="Tc"/></a>
            <a href="obsidian://open?file=044. Ruthenium.md"><rect x="295" y="180" width="30" height="30" id="Ru"/></a>
            <a href="obsidian://open?file=045. Rhodium.md"><rect x="330" y="180" width="30" height="30" id="Rh"/></a>
            <a href="obsidian://open?file=046. Palladium.md"><rect x="365" y="180" width="30" height="30" id="Pd"/></a>
            <a href="obsidian://open?file=047. Silver.md"><rect x="400" y="180" width="30" height="30" id="Ag"/></a>
            <a href="obsidian://open?file=048. Cadmium.md"><rect x="435" y="180" width="30" height="30" id="Cd"/></a>
            <a href="obsidian://open?file=071. Lutetium.md"><rect x="120" y="215" width="30" height="30" id="Lu"/></a>
            <a href="obsidian://open?file=072. Hafnium.md.md"><rect x="155" y="215" width="30" height="30" id="Hf"/></a>
            <a href="obsidian://open?file=073. Tantalum.md"><rect x="190" y="215" width="30" height="30" id="Ta"/></a>
            <a href="obsidian://open?file=074. Tungsten.md"><rect x="225" y="215" width="30" height="30" id="W"/></a>
            <a href="obsidian://open?file=075. Rhenium.md"><rect x="260" y="215" width="30" height="30" id="Re"/></a>
            <a href="obsidian://open?file=076. Osmium.md"><rect x="295" y="215" width="30" height="30" id="Os"/></a>
            <a href="obsidian://open?file=077. Iridium.md"><rect x="330" y="215" width="30" height="30" id="Ir"/></a>
            <a href="obsidian://open?file=078. Platinum.md"><rect x="365" y="215" width="30" height="30" id="Pt"/></a>
            <a href="obsidian://open?file=079. Gold.md"><rect x="400" y="215" width="30" height="30" id="Au"/></a>
            <a href="obsidian://open?file=080. Mercury.md"><rect x="435" y="215" width="30" height="30" id="Hg"/></a>
            <a href="obsidian://open?file=103. Lawrencium.md"><rect x="120" y="250" width="30" height="30" id="Lr"/></a>
            <a href="obsidian://open?file=104. Rutherfordium.md.md"><rect x="155" y="250" width="30" height="30" id="Rf"/></a>
            <a href="obsidian://open?file=105. Dubnium.md"><rect x="190" y="250" width="30" height="30" id="Db"/></a>
            <a href="obsidian://open?file=106. Seaborgium.md"><rect x="225" y="250" width="30" height="30" id="Sg"/></a>
            <a href="obsidian://open?file=107. Bohrium.md"><rect x="260" y="250" width="30" height="30" id="Bh"/></a>
            <a href="obsidian://open?file=108. Hassium.md"><rect x="295" y="250" width="30" height="30" id="Hs"/></a>
        </g>
        <g class="post_transitional_metals" id="Post-Transition Metals"> 
            <a href="obsidian://open?file=013. Aluminium.md"><rect x="470" y="110" width="30" height="30" id="Al"/></a>
            <a href="obsidian://open?file=031. Gallium.md"><rect x="470" y="145" width="30" height="30" id="Ga"/></a>
            <a href="obsidian://open?file=049. Indium.md"><rect x="470" y="180" width="30" height="30" id="In"/></a>
            <a href="obsidian://open?file=050. Tin.md"><rect x="505" y="180" width="30" height="30" id="Sn"/></a>
            <a href="obsidian://open?file=081. Thallium.md"><rect x="470" y="215" width="30" height="30" id="Tl"/></a>
            <a href="obsidian://open?file=082. Lead.md"><rect x="505" y="215" width="30" height="30" id="Pb"/></a>
            <a href="obsidian://open?file=083. Bismuth.md"><rect x="540" y="215" width="30" height="30" id="Bi"/></a>
            <a href="obsidian://open?file=084. Polonium.md"><rect x="575" y="215" width="30" height="30" id="Po"/></a>
        </g>
        <g class="metalloids" id="Metalloids"> 
            <a href="obsidian://open?file=005. Boron.md"><rect x="470" y="75" width="30" height="30" id="B"/></a>
            <a href="obsidian://open?file=014. Silicon.md"><rect x="505" y="110" width="30" height="30" id="Si"/></a>
            <a href="obsidian://open?file=032. Germanium.md"><rect x="505" y="145" width="30" height="30" id="Ge"/></a>
            <a href="obsidian://open?file=033. Arsenic.md"><rect x="540" y="145" width="30" height="30" id="As"/></a>
            <a href="obsidian://open?file=051. Antimony.md"><rect x="540" y="180" width="30" height="30" id="Sb"/></a>
            <a href="obsidian://open?file=052. Tellurium.md"><rect x="575" y="180" width="30" height="30" id="Te"/></a>
            <a href="obsidian://open?file=085. Astatine.md"><rect x="610" y="215" width="30" height="30" id="At"/></a>
        </g>
        <g class="reactive_nonmetals" id="Reactive-Nonemetals">
            <a href="obsidian://open?file=001. Hydrogen.md"><rect x="40" y="40" width="30" height="30" id="H"/></a>
            <a href="obsidian://open?file=006. Carbon.md"><rect x="505" y="75" width="30" height="30" id="C"/></a> 
            <a href="obsidian://open?file=007. Nitrogen.md"><rect x="540" y="75" width="30" height="30" id="N"/></a>
            <a href="obsidian://open?file=008. Oxygen.md"><rect x="575" y="75" width="30" height="30" id="O"/></a>
            <a href="obsidian://open?file=009. Fluorine.md"><rect x="610" y="75" width="30" height="30" id="F"/></a>
            <a href="obsidian://open?file=015. Phosphorus.md"><rect x="540" y="110" width="30" height="30" id="P"/></a>
            <a href="obsidian://open?file=016. Sulfur.md"><rect x="575" y="110" width="30" height="30" id="S"/></a>
            <a href="obsidian://open?file=017. Chlorine.md"><rect x="610" y="110" width="30" height="30" id="Cl"/></a>
            <a href="obsidian://open?file=034. Selenium.md"><rect x="575" y="145" width="30" height="30" id="Se"/></a>
            <a href="obsidian://open?file=035. Bromine.md"><rect x="610" y="145" width="30" height="30" id="Br"/></a>
            <a href="obsidian://open?file=053. Iodine.md"><rect x="610" y="180" width="30" height="30" id="I"/></a>
        </g>
        <g class="noble-gases" id="Noble Gases"> 
            <a href="obsidian://open?file=002. Helium.md"><rect x="645" y="40" width="30" height="30" id="He"/></a>
            <a href="obsidian://open?file=010. Neon.md"><rect x="645" y="75" width="30" height="30" id="Ne"/></a>
            <a href="obsidian://open?file=018. Argon.md"><rect x="645" y="110" width="30" height="30" id="Ar"/></a>
            <a href="obsidian://open?file=036. Krypton.md"><rect x="645" y="145" width="30" height="30" id="Kr"/></a>
            <a href="obsidian://open?file=054. Xenon.md"><rect x="645" y="180" width="30" height="30" id="Xe"/></a>
            <a href="obsidian://open?file=086. Radon.md"><rect x="645" y="215" width="30" height="30" id="Rn"/></a>
        </g>
        <g class="unknown" id="Unknown">
            <a href="obsidian://open?file=113. Nihonium.md"><rect x="470" y="250" width="30" height="30" id="Nh"/></a>
            <a href="obsidian://open?file=114. Flerovium.md"><rect x="505" y="250" width="30" height="30" id="Fl"/></a>
            <a href="obsidian://open?file=115. Moscovium.md"><rect x="540" y="250" width="30" height="30" id="Mc"/></a>
            <a href="obsidian://open?file=116. Livermorium.md"><rect x="575" y="250" width="30" height="30" id="Lv"/></a>
            <a href="obsidian://open?file=117. Tennessine.md"><rect x="610" y="250" width="30" height="30" id="Ts"/></a>
            <a href="obsidian://open?file=118. Oganesson.md"><rect x="645" y="250" width="30" height="30" id="Og"/></a>
            <a href="obsidian://open?file=109. Meitnerium.md"><rect x="330" y="250" width="30" height="30" id="Mt"/></a>
            <a href="obsidian://open?file=110. Darmstadtium.md"><rect x="365" y="250" width="30" height="30" id="Ds"/></a>
            <a href="obsidian://open?file=111. Roentgenium.md"><rect x="400" y="250" width="30" height="30" id="Rg"/></a>
            <a href="obsidian://open?file=112. Copernicium.md"><rect x="435" y="250" width="30" height="30" id="Cn"/></a>
        </g>
        </g>
        <g font-family="Noto Sans" font-size="9" text-anchor="middle">
        <g font-size="14">
        <g transform="translate(20)">
        </g>
        <g transform="translate(0,22)">
        <g transform="translate(55)">
            <text y="32">1<tspan x="0" dy="11.5">H</tspan></text>
            <text y="67">3<tspan x="0" dy="11.5">Li</tspan></text>
            <text y="102">11<tspan x="0" dy="11.5">Na</tspan></text>
            <text y="137">19<tspan x="0" dy="11.5">K</tspan></text>
            <text y="172">37<tspan x="0" dy="11.5">Rb</tspan></text>
            <text y="207">55<tspan x="0" dy="11.5">Cs</tspan></text>
            <text y="242">87<tspan x="0" dy="11.5">Fr</tspan></text>
        </g>
        <g transform="translate(90)">
            <text y="67">4<tspan x="0" dy="11.5">Be</tspan></text>
            <text y="102">12<tspan x="0" dy="11.5">Mg</tspan></text>
            <text y="137">20<tspan x="0" dy="11.5">Ca</tspan></text>
            <text y="172">38<tspan x="0" dy="11.5">Sr</tspan></text>
            <text y="207">56<tspan x="0" dy="11.5">Ba</tspan></text>
            <text y="242">88<tspan x="0" dy="11.5">Ra</tspan></text>
        </g>
        <g transform="translate(135)">
            <text y="137">21<tspan x="0" dy="11.5">Sc</tspan></text>
            <text y="172">39<tspan x="0" dy="11.5">Y</tspan></text>
            <text y="207">71<tspan x="0" dy="11.5">Lu</tspan></text>
            <text y="242">103<tspan x="0" dy="11.5">Lr</tspan></text>
            <text y="287">57<tspan x="0" dy="11.5">La</tspan></text>
            <text y="322">89<tspan x="0" dy="11.5">Ac</tspan></text>
        </g>
            <g transform="translate(170)">
            <text y="137">22<tspan x="0" dy="11.5">Ti</tspan></text>
            <text y="172">40<tspan x="0" dy="11.5">Zr</tspan></text>
            <text y="207">72<tspan x="0" dy="11.5">Hf</tspan></text>
            <text y="242">104<tspan x="0" dy="11.5">Rf</tspan></text>
            <text y="287">58<tspan x="0" dy="11.5">Ce</tspan></text>
            <text y="322">90<tspan x="0" dy="11.5">Th</tspan></text>
        </g>
        <g transform="translate(205)">
            <text y="137">23<tspan x="0" dy="11.5">V</tspan></text>
            <text y="172">41<tspan x="0" dy="11.5">Nb</tspan></text>
            <text y="207">73<tspan x="0" dy="11.5">Ta</tspan></text>
            <text y="242">105<tspan x="0" dy="11.5">Db</tspan></text>
            <text y="287">59<tspan x="0" dy="11.5">Pr</tspan></text>
            <text y="322">91<tspan x="0" dy="11.5">Pa</tspan></text>
        </g>
        <g transform="translate(240)">
            <text y="137">24<tspan x="0" dy="11.5">Cr</tspan></text>
            <text y="172">42<tspan x="0" dy="11.5">Mo</tspan></text>
            <text y="207">74<tspan x="0" dy="11.5">W</tspan></text>
            <text y="242">106<tspan x="0" dy="11.5">Sg</tspan></text>
            <text y="287">60<tspan x="0" dy="11.5">Nd</tspan></text>
            <text y="322">92<tspan x="0" dy="11.5">U</tspan></text>
        </g>
        <g transform="translate(275)">
            <text y="137">25<tspan x="0" dy="11.5">Mn</tspan></text>
            <text y="172">43<tspan x="0" dy="11.5">Tc</tspan></text>
            <text y="207">75<tspan x="0" dy="11.5">Re</tspan></text>
            <text y="242">107<tspan x="0" dy="11.5">Bh</tspan></text>
            <text y="287">61<tspan x="0" dy="11.5">Pm</tspan></text>
            <text y="322">93<tspan x="0" dy="11.5">Np</tspan></text>
        </g>
        <g transform="translate(310)">
            <text y="137">26<tspan x="0" dy="11.5">Fe</tspan></text>
            <text y="172">44<tspan x="0" dy="11.5">Ru</tspan></text>
            <text y="207">76<tspan x="0" dy="11.5">Os</tspan></text>
            <text y="242">108<tspan x="0" dy="11.5">Hs</tspan></text>
            <text y="287">62<tspan x="0" dy="11.5">Sm</tspan></text>
            <text y="322">94<tspan x="0" dy="11.5">Pu</tspan></text>
        </g>
        <g transform="translate(345)">
            <text y="137">27<tspan x="0" dy="11.5">Co</tspan></text>
            <text y="172">45<tspan x="0" dy="11.5">Rh</tspan></text>
            <text y="207">77<tspan x="0" dy="11.5">Ir</tspan></text>
            <text y="242">109<tspan x="0" dy="11.5">Mt</tspan></text>
            <text y="287">63<tspan x="0" dy="11.5">Eu</tspan></text>
            <text y="322">95<tspan x="0" dy="11.5">Am</tspan></text>
        </g>
        <g transform="translate(380)">
            <text y="137">28<tspan x="0" dy="11.5">Ni</tspan></text>
            <text y="172">46<tspan x="0" dy="11.5">Pd</tspan></text>
            <text y="207">78<tspan x="0" dy="11.5">Pt</tspan></text>
            <text y="242">110<tspan x="0" dy="11.5">Ds</tspan></text>
            <text y="287">64<tspan x="0" dy="11.5">Gd</tspan></text>
            <text y="322">96<tspan x="0" dy="11.5">Cm</tspan></text>
        </g>
        <g transform="translate(415)">
            <text y="137">29<tspan x="0" dy="11.5">Cu</tspan></text>
            <text y="172">47<tspan x="0" dy="11.5">Ag</tspan></text>
            <text y="207">79<tspan x="0" dy="11.5">Au</tspan></text>
            <text y="242">111<tspan x="0" dy="11.5">Rg</tspan></text>
            <text y="287">65<tspan x="0" dy="11.5">Tb</tspan></text>
            <text y="322">97<tspan x="0" dy="11.5">Bk</tspan></text>
        </g>
        <g transform="translate(450)">
            <text y="137">30<tspan x="0" dy="11.5">Zn</tspan></text>
            <text y="172">48<tspan x="0" dy="11.5">Cd</tspan></text>
            <text y="207">80<tspan x="0" dy="11.5">Hg</tspan></text>
            <text y="242">112<tspan x="0" dy="11.5">Cn</tspan></text>
            <text y="287">66<tspan x="0" dy="11.5">Dy</tspan></text>
            <text y="322">98<tspan x="0" dy="11.5">Cf</tspan></text>
        </g>
        <g transform="translate(485)">
            <text y="67">5<tspan x="0" dy="11.5">B</tspan></text>
            <text y="102">13<tspan x="0" dy="11.5">Al</tspan></text>
            <text y="137">31<tspan x="0" dy="11.5">Ga</tspan></text>
            <text y="172">49<tspan x="0" dy="11.5">In</tspan></text>
            <text y="207">81<tspan x="0" dy="11.5">Tl</tspan></text>
            <text y="242">113<tspan x="0" dy="11.5">Nh</tspan></text>
            <text y="287">67<tspan x="0" dy="11.5">Ho</tspan></text>
            <text y="322">99<tspan x="0" dy="11.5">Es</tspan></text>
        </g>
        <g transform="translate(520)">
            <text y="67">6<tspan x="0" dy="11.5">C</tspan></text>
            <text y="102">14<tspan x="0" dy="11.5">Si</tspan></text>
            <text y="137">32<tspan x="0" dy="11.5">Ge</tspan></text>
            <text y="172">50<tspan x="0" dy="11.5">Sn</tspan></text>
            <text y="207">82<tspan x="0" dy="11.5">Pb</tspan></text>
            <text y="242">114<tspan x="0" dy="11.5">Fl</tspan></text>
            <text y="287">68<tspan x="0" dy="11.5">Er</tspan></text>
            <text y="322">100<tspan x="0" dy="11.5">Fm</tspan></text>
        </g>
        <g transform="translate(555)">
            <text y="67">7<tspan x="0" dy="11.5">N</tspan></text>
            <text y="102">15<tspan x="0" dy="11.5">P</tspan></text>
            <text y="137">33<tspan x="0" dy="11.5">As</tspan></text>
            <text y="172">51<tspan x="0" dy="11.5">Sb</tspan></text>
            <text y="207">83<tspan x="0" dy="11.5">Bi</tspan></text>
            <text y="242">115<tspan x="0" dy="11.5">Mc</tspan></text>
            <text y="287">69<tspan x="0" dy="11.5">Tm</tspan></text>
            <text y="322">101<tspan x="0" dy="11.5">Md</tspan></text>
        </g>
        <g transform="translate(590)">
            <text y="67">8<tspan x="0" dy="11.5">O</tspan></text>
            <text y="102">16<tspan x="0" dy="11.5">S</tspan></text>
            <text y="137">34<tspan x="0" dy="11.5">Se</tspan></text>
            <text y="172">52<tspan x="0" dy="11.5">Te</tspan></text>
            <text y="207">84<tspan x="0" dy="11.5">Po</tspan></text>
            <text y="242">116<tspan x="0" dy="11.5">Lv</tspan></text>
            <text y="287">70<tspan x="0" dy="11.5">Yb</tspan></text>
            <text y="322">102<tspan x="0" dy="11.5">No</tspan></text>
        </g>
        <g transform="translate(625)">
            <text y="67">9<tspan x="0" dy="11.5">F</tspan></text>
            <text y="102">17<tspan x="0" dy="11.5">Cl</tspan></text>
            <text y="137">35<tspan x="0" dy="11.5">Br</tspan></text>
            <text y="172">53<tspan x="0" dy="11.5">I</tspan></text>
            <text y="207">85<tspan x="0" dy="11.5">At</tspan></text>
            <text y="242">117<tspan x="0" dy="11.5">Ts</tspan></text>
        </g>
        <g transform="translate(660)">
            <text y="32">2<tspan x="0" dy="11.5">He</tspan></text>
            <text y="67">10<tspan x="0" dy="11.5">Ne</tspan></text>
            <text y="102">18<tspan x="0" dy="11.5">Ar</tspan></text>
            <text y="137">36<tspan x="0" dy="11.5">Kr</tspan></text>
            <text y="172">54<tspan x="0" dy="11.5">Xe</tspan></text>
            <text y="207">86<tspan x="0" dy="11.5">Rn</tspan></text>
            <text y="242">118<tspan x="0" dy="11.5">Og</tspan></text>
        </g>
        </g>
        </g>
        </g>
        </svg>
      `;
    });
  }

  onunload() {
    console.log("Periodic Table Widget unloaded ❌");
  }
};