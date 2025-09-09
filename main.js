const { Plugin } = require("obsidian");

module.exports = class PeriodicTableWidget extends Plugin {
    async onload() {
        console.log("Periodic Table Widget loaded ✅");

        this.registerMarkdownCodeBlockProcessor("periodic-table", async (source, el) => {
            await this.ensureElementData();
            const elements = this.elementData;
            const order = elements.order;

            const cellSize = 30;
            const gap = 4; // normal gap between cells
            const extraGapGroups = [2, 12]; // add extra padding after group 2 & 12
            const offsetX = 40;
            const offsetY = 40;

            function normalizeCategory(cat = "") {
                cat = cat.toLowerCase();
                if (cat.includes("unknown")) return "unknown_property"; // delete line if color should be predicted property
                if (cat.includes("alkali metal") && !cat.includes("earth")) return "alkali_metal";
                if (cat.includes("alkaline earth")) return "alkaline_earth_metal";
                if (cat.includes("post-transition")) return "post_transition_metal";
                if (cat.includes("transition metal")) return "transition_metal";
                if (cat.includes("metalloid")) return "metalloid";
                if (cat.includes("nonmetal")) return "reactive_nonmetal";
                if (cat.includes("noble gas")) return "noble_gas";
                if (cat.includes("lanthan")) return "lanthanoid";
                if (cat.includes("actin")) return "actinoid";
                return "unknown_property";
            }

            function adjustedXpos(xpos) {
                let extra = 0;
                for (let g of extraGapGroups) if (xpos > g) extra += 8;
                return xpos - 1 + extra / cellSize;
            }

            let svg = `<div class="periodic-table"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 740 440">`;

            order.forEach((key) => {
                const entry = elements[key];
                if (!entry) return;

                const x = offsetX + adjustedXpos(entry.xpos) * (cellSize + gap);
                const y = offsetY + (entry.ypos - 1) * (cellSize + gap);
                const categoryClass = normalizeCategory(entry.category);

                svg += `
                    <a href="obsidian://open?file=${entry.number.toString().padStart(3, "0")}. ${entry.name}.md">
                        <g class="element-cell ${categoryClass}">
                            <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="6" ry="6"
                                data-symbol="${entry.symbol}"
                                data-name="${entry.name}"
                                data-mass="${entry.atomic_mass}" />
                        </g>
                    </a>
                    <text class="cell-label-num" pointer-events="none"
                        x="${x + cellSize/2}" y="${y + 11}" 
                        text-anchor="middle" font-size="5" fill="black">${entry.number}</text>
                    <text class="cell-label" pointer-events="none"
                        x="${x + cellSize/2}" y="${y + 22}" 
                        text-anchor="middle" font-size="10" font-weight="600" fill="black">${entry.symbol}</text>
                    `;
                });

            svg += `</svg></div>`;
            el.innerHTML = svg;

            // create tooltip if not already present
            if (!document.getElementById("pt-tooltip")) {
                const tooltip = document.createElement("div");
                tooltip.id = "pt-tooltip";
                tooltip.style.position = "absolute";
                tooltip.style.padding = "6px 10px";
                tooltip.style.background = "rgba(30,30,30,0.9)";
                tooltip.style.color = "white";
                tooltip.style.borderRadius = "6px";
                tooltip.style.fontSize = "12px";
                tooltip.style.pointerEvents = "none";
                tooltip.style.whiteSpace = "nowrap";
                tooltip.style.opacity = "0";
                tooltip.style.transition = "opacity 0.15s ease";
                document.body.appendChild(tooltip);
            }

            const tooltip = document.getElementById("pt-tooltip");

            function hideTooltip() {
                tooltip.style.opacity = "0";
            }

            el.querySelectorAll("rect").forEach((rect) => {
                rect.addEventListener("mouseenter", () => {
                    tooltip.innerHTML = `<b>${rect.dataset.name}</b><br>${parseFloat(rect.dataset.mass).toFixed(3)} u`;
                    tooltip.style.opacity = "1";
                });
                rect.addEventListener("mousemove", (e) => {
                    tooltip.style.left = e.pageX + 12 + "px";
                    tooltip.style.top = e.pageY + 12 + "px";
                });
                rect.addEventListener("mouseleave", hideTooltip);

                // fix: remove tooltip on click before navigation
                rect.addEventListener("click", hideTooltip);
            });

            // global failsafe: hide tooltip on any document click
            document.addEventListener("click", hideTooltip);
        });

        if (!document.getElementById("bohr-plugin-styles")) {
            const style = document.createElement("style");
            style.id = "bohr-plugin-styles";
            style.textContent = `
                :root {
                    --bg: #1f2430;
                    --orbit: rgba(255,255,255,0.25);
                    --electron: #ffffff;
                    --nucleus-fill: #2b3142;
                    --nucleus-stroke: rgba(255,255,255,0.25);
                    --label: #e8ecf1;
                    --accent: #a0c4ff;
                }

                /* Bohr model + element card wrappers */
                .bohr-card {
                    display: inline-block;
                    overflow: visible !important;
                }
                .bohr-card svg {
                    overflow: visible !important;
                }
                .bohr-wrapper {
                    display: grid;
                    place-items: center;
                    padding: 24px;
                }

                /* Periodic table wrapper */
                .periodic-table {
                    margin: 1em auto;
                    display: block;
                }

                /* Atom visuals */
                .bohr-shell {
                    fill: none;
                    stroke-width: 1;
                }
                .bohr-electron {
                    r: 4;
                    transform-origin: center;
                    animation: orbit linear infinite;
                }

                /* Orbit animation */
                @keyframes orbit {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .bohr-animate {
                    transform-box: fill-box;
                    transform-origin: 50% 50%;
                    animation-name: orbit;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }

                /* Card styling */
                .card {
                    background: var(--bg);
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
                }
                .bohr-card svg {
                    display:block;
                }

                /* Tooltip text inside table */
                .cell-label, .cell-label-num {
                    pointer-events: none;
                    user-select: none;
                }
            `;
            document.head.appendChild(style);
        }

        this.elementData = {};
        this.app.workspace.onLayoutReady(async () => {
            await this.loadElementData();
        });

        this.registerMarkdownCodeBlockProcessor("bohr", async (source, el) => {
            await this.ensureElementData();
            const entry = this.lookupElement(source.trim());
            if (!entry) {
                el.innerHTML = `<p style="color:red">Element "${source}" not found.</p>`;
                return;
            }

            const svg = renderBohr({
                Z: entry.number,
                symbol: entry.symbol,
                name: entry.name,
                size: 220,
                animate: true
            });

            el.innerHTML = `
                <div class="bohr-wrapper">
                <div class="bohr-card">${svg}</div>
                </div>
            `;
        });
        

         this.registerMarkdownCodeBlockProcessor("element-card", async (source, el) => {
            await this.ensureElementData();
            const entry = this.lookupElement(source.trim());
            if (!entry) {
                el.innerHTML = `<p style="color:red">Element "${source}" not found.</p>`;
                return;
            }

            const bohr = renderBohr({
                Z: entry.number,
                symbol: entry.symbol,
                name: entry.name,
                size: 200,
                animate: true
            });

            el.innerHTML = `
                <div class="element-card">
                    <h2>${entry.name}</h2>
                    <div class="bohr-wrapper">${bohr}</div>
                    <p><b>Symbol:</b> ${entry.symbol}</p>
                    <p><b>Number:</b> ${entry.number}</p>
                    <p><b>Atomic mass:</b> ${entry.atomic_mass} u</p>
                    <p><b>Boil:</b> ${entry.boil ?? "—"} K</p>
                    <p><b>Category:</b> ${entry.category}</p>
                    <p><b>Phase:</b> ${entry.phase}</p>
                    <p><b>Appearance:</b> ${entry.appearance ?? "—"}</p>
                    <p><b>Density:</b> ${entry.density ?? "—"}</p>
                    <p><b>Melt:</b> ${entry.melt ?? "—"} K</p>
                    <p><b>Electron Config.:</b> ${entry.electron_configuration}</p>
                    <p><b>Electronegativity (Pauling):</b> ${entry.electronegativity_pauling ?? "—"}</p>
                    <p><b>Discovered by:</b> ${entry.discovered_by ?? "—"}</p>
                </div>
            `;
        });
    }
    async loadElementData() {
        const file = this.app.vault.getAbstractFileByPath("periodic-table-lookup.json");
        if (!file) {
        console.error("❌ periodic-table-lookup.json not found in vault root.");
        return;
        }
        const raw = await this.app.vault.read(file);
        this.elementData = JSON.parse(raw);
        console.log("✅ Loaded element data");
    }

    async ensureElementData() {
        if (Object.keys(this.elementData).length) return;

        // Wait until workspace is ready
        await new Promise(resolve => {
            if (this.app.workspace.layoutReady) return resolve();
            this.app.workspace.onLayoutReady(resolve);
        });

        await this.loadElementData();
    }

    lookupElement(key) {
        if (!this.elementData || !Object.keys(this.elementData).length) return null;
        const lower = key.toLowerCase();
        // lookup by name
        if (this.elementData[lower]) return this.elementData[lower];
        // lookup by symbol
        return Object.values(this.elementData).find(e => e.symbol?.toLowerCase() === lower);
    }

    onunload() {
        console.log("Periodic Table Widget unloaded ❌");
    }
};

function electronShells(Z) {
  const caps = [2, 8, 18, 32, 32, 18, 8];
  const shells = [];
  let remaining = Z;
  for (let i = 0; i < caps.length && remaining > 0; i++) {
    const n = Math.min(remaining, caps[i]);
    shells.push(n);
    remaining -= n;
  }
  return shells;
}

function renderBohr(opts = {}) {
  const {
    Z,
    symbol = "",
    name = "",
    size = 240,
    animate = true,
    electronColor = "var(--electron, #ffffff)",
    orbitColor   = "var(--orbit, rgba(255,255,255,0.18))",
    accentColor  = "var(--accent, #a0c4ff)"
  } = opts;

  const shells = electronShells(Z);
  const halfSize = size / 2;

  const minimalGap = 6;
  const nucleusR = Math.max(12, size * 0.06);
  const eR = Math.max(2, Math.min(3.5, size * 0.012));
  const glowMargin = 6;

  const targetMaxOrbit = halfSize - nucleusR - eR - glowMargin;

  let shellGap;
  if (shells.length <= 0) {
    shellGap = minimalGap;
  } else if (targetMaxOrbit > nucleusR + minimalGap) {
    shellGap = (targetMaxOrbit - nucleusR) / shells.length;
    if (isNaN(shellGap) || shellGap < minimalGap) shellGap = minimalGap;
  } else {
    shellGap = minimalGap;
  }

    const outerRadius = nucleusR + shellGap * shells.length;

    const overshoot = Math.max(0, outerRadius + glowMargin - halfSize);

    const padding = Math.ceil(overshoot + glowMargin);

    const maxPadding = Math.floor(size / 2) - 6;
    const finalPadding = Math.min(Math.max(20, padding), Math.max(20, maxPadding));

    const totalSize = size + finalPadding * 2;
    const cx = totalSize / 2;
    const cy = totalSize / 2;

    const orbitStrokeWidth = Math.max(1, size * 0.004);
    
    const defs = `
        <defs>
        <filter id="electronGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="nucleusG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="white" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.0"/>
        </radialGradient>
        </defs>
     `;

    let shellsMarkup = "";
    shells.forEach((count, idx) => {
        const r = nucleusR + shellGap * (idx + 1);
        const isLast = idx === shells.length - 1;
        const ringColor = isLast ? accentColor : orbitColor;
        const orbit = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ringColor}" stroke-width="${orbitStrokeWidth}"/>`;

        const electrons = [];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const ex = cx + r * Math.cos(angle);
            const ey = cy + r * Math.sin(angle);
            electrons.push(`<circle cx="${ex.toFixed(2)}" cy="${ey.toFixed(2)}" r="${eR}" fill="${electronColor}" filter="url(#electronGlow)"/>`);
        }

        let animEl = "";
        if (animate) {
            const dur = `${22 + idx * 6}s`;
            animEl = `<animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}" repeatCount="indefinite"/>`;
        }

        const spinClass = animate ? "bohr-animate" : "";
        const spinStyle = animate ? `style="animation-duration:${22 + idx * 6}s;"` : "";

        shellsMarkup += `<g class="${spinClass}" ${spinStyle}>${animEl}${orbit}${electrons.join("")}</g>`;
    });

    const nucleus = `
        <g>
            <circle cx="${cx}" cy="${cy}" r="${nucleusR}" fill="var(--nucleus-fill, #2b3142)" stroke="var(--nucleus-stroke, rgba(255,255,255,0.25))"/>
            <circle cx="${cx}" cy="${cy}" r="${nucleusR}" fill="url(#nucleusG)"/>
            <text x="${cx}" y="${cy+2}" text-anchor="middle" dominant-baseline="middle" font-size="${Math.max(18, size * 0.12)}" font-weight="800" fill="var(--label, #e8ecf1)">${symbol}</text>
            <!-- <text x="${cx}" y="${cy + Math.max(12, size * 0.06)}" text-anchor="middle" font-size="${Math.max(10, size * 0.05)}" fill="var(--label, #e8ecf1)" opacity="0.9">Z = ${Z}${name ? `  ${name}` : ""}</text> --> <!-- Uncomment if you want to see Z and full name -->
        </g>
    `;

    return `
        <div class="bohr-wrapper">
            <svg width="${size}" height="${size}"
                viewBox="-${finalPadding} -${finalPadding} ${totalSize} ${totalSize}"
                xmlns="http://www.w3.org/2000/svg"
                role="img" aria-label="${name || symbol} Bohr model">
                ${defs}
                ${shellsMarkup}
                ${nucleus}
            </svg>
        </div>
    `;
}