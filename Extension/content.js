
(() => {
    if (document.getElementById("tradenav-host")) return;

    // =====================================================
    // INITIALIZATION
    // =====================================================

    const host = document.createElement("div");
    host.id = "tradenav-host";

    Object.assign(host.style, {
        position: "fixed",
        right: "24px",
        bottom: "22px",
        zIndex: "2147483647"
    });

    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    // =====================================================
    // UI
    // =====================================================

    shadow.innerHTML = `

    <style>
        * { box-sizing: border-box; }

        :host {
            font-family: Inter, "Segoe UI", Arial, sans-serif;
            color: #f5f3ff;
        }

        button, textarea { font: inherit; }

        /* FLOATING LAUNCHER */

        .launcher {
            width: 58px;
            height: 58px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            border: 1px solid rgba(216,180,254,.7);

            background:
                radial-gradient(circle at 30% 20%,#d8b4fe,transparent 35%),
                linear-gradient(145deg,#c084fc,#9333ea,#4c1d95);

            color: white;
            cursor: pointer;

            box-shadow:
                0 0 22px rgba(168,85,247,.55),
                0 8px 25px rgba(0,0,0,.4);

            transition: transform .25s ease, box-shadow .25s ease;
        }

        .launcher:hover {
            transform: translateY(-4px) rotate(8deg);
            box-shadow: 0 0 32px rgba(168,85,247,.8);
        }

        .launcher svg { width: 29px; height: 29px; }

        /* MAIN PANEL */

        .panel {
            position: absolute;
            right: 0;
            bottom: 74px;

            width: 560px;
            height: 645px;

            max-width: calc(100vw - 24px);
            max-height: calc(100vh - 100px);

            display: none;
            flex-direction: column;

            overflow: hidden;

            border: 1.5px solid #b86aff;
            border-radius: 25px;

            background:
                radial-gradient(ellipse at 75% 0%,
                    rgba(132,49,210,.28),transparent 45%),
                radial-gradient(ellipse at 5% 90%,
                    rgba(88,28,135,.19),transparent 42%),
                linear-gradient(145deg,#11142f,#111329 65%,#191338);

            box-shadow:
                0 0 35px rgba(168,85,247,.27),
                0 25px 80px rgba(0,0,0,.7);

            transform-origin: bottom right;
        }

        .panel.open {
            display: flex;
            animation: panelEnter .3s cubic-bezier(.2,.8,.2,1);
        }

        @keyframes panelEnter {
            from {
                opacity: 0;
                transform: translateY(14px) scale(.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        /* HEADER */

        .header {
            height: 75px;
            min-height: 75px;

            padding: 0 20px 0 25px;

            display: flex;
            align-items: center;
            justify-content: space-between;

            border-bottom: 1px solid rgba(196,181,253,.19);

            background: linear-gradient(
                100deg,
                rgba(30,27,69,.9),
                rgba(42,25,83,.65)
            );

            position: relative;
            z-index: 3;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 13px;
        }

        .brand-logo {
            width: 42px;
            height: 42px;
            color: #d18aff;
        }

        .brand-logo svg { width: 100%; height: 100%; }

        .brand-name {
            font-size: 23px;
            font-weight: 750;
            letter-spacing: -.8px;
            color: white;
        }

        .brand-subtitle {
            margin-top: 2px;
            color: #d1c6e8;
            font-size: 13px;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 9px;
        }

        .header-btn {
            width: 39px;
            height: 39px;

            display: grid;
            place-items: center;

            border: 1px solid rgba(192,132,252,.12);
            border-radius: 11px;

            background: rgba(255,255,255,.045);
            color: #f2eaff;

            cursor: pointer;
            transition: .2s ease;
        }

        .header-btn:hover {
            background: rgba(168,85,247,.23);
            border-color: rgba(192,132,252,.5);
            transform: translateY(-2px);
        }

        .header-btn:disabled {
            opacity: .4;
            cursor: not-allowed;
        }

        .header-btn svg { width: 19px; height: 19px; }

        /* CHAT AREA */

        .chat-area {
            flex: 1;
            min-height: 0;

            overflow-y: auto;
            scroll-behavior: smooth;

            padding: 20px 27px 24px;

            display: flex;
            flex-direction: column;
            gap: 20px;

            position: relative;
            isolation: isolate;
        }

        .chat-area::-webkit-scrollbar { width: 4px; }

        .chat-area::-webkit-scrollbar-thumb {
            background: rgba(167,139,250,.4);
            border-radius: 10px;
        }

        /* DECORATIVE WAVES */

        .wave {
            position: absolute;
            left: 0;
            width: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: .9;
        }

        .wave-top {
            top: 105px;
            height: 125px;
        }

        .wave-bottom {
            bottom: 0;
            height: 135px;
            opacity: .7;
        }

        /* WELCOME */

        .welcome {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            flex-shrink: 0;
            padding-top: 22px;
        }

        .welcome-title {
            font-size: 25px;
            font-weight: 750;
            letter-spacing: -.9px;
            color: #faf8ff;
            line-height: 1.35;
        }

        .welcome-title span {
            background: linear-gradient(
                90deg,#c084fc,#b14bfa,#818cf8
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .welcome-description {
            margin-top: 9px;
            color: #d0c7e5;
            font-size: 13px;
            line-height: 1.6;
        }

        /* FEATURE CARDS */

        .feature-grid {
            width: 100%;

            display: grid;
            grid-template-columns: repeat(3,minmax(0,1fr));
            gap: 11px;

            margin-top: 26px;
        }

        .feature-card {
            height: 100px;
            min-width: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 9px;

            border: 1.5px solid rgba(167,139,250,.7);
            border-radius: 17px;

            background: linear-gradient(
                145deg,
                rgba(49,46,129,.72),
                rgba(37,28,75,.9)
            );

            color: #f4eaff;
            cursor: pointer;

            box-shadow: inset 0 1px rgba(255,255,255,.06);

            transition:
                transform .24s ease,
                border-color .24s ease,
                box-shadow .24s ease;
        }

        .feature-card:nth-child(2) {
            background: linear-gradient(
                145deg,
                rgba(104,35,153,.85),
                rgba(53,26,91,.95)
            );

            border-color: #b94cff;
            box-shadow: 0 0 16px rgba(168,85,247,.1);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #e0a3ff;
            box-shadow:
                0 8px 24px rgba(139,92,246,.25),
                inset 0 1px rgba(255,255,255,.1);
        }

        .feature-card:active { transform: scale(.96); }

        .feature-icon {
            width: 32px;
            height: 32px;
            display: grid;
            place-items: center;
            color: #c084fc;
        }

        .feature-icon svg { width: 30px; height: 30px; }

        .feature-title {
            font-size: 13px;
            font-weight: 600;
            white-space: nowrap;
        }

        /* MESSAGES */

        .message {
            max-width: 90%;
            display: flex;
            flex-direction: column;
            gap: 7px;
            animation: messageEnter .25s ease;
        }

        @keyframes messageEnter {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .message.user { align-self: flex-end; }
        .message.bot { align-self: flex-start; }

        .message-label {
            padding: 0 5px;
            color: #c3b3df;
            font-size: 11px;
            font-weight: 650;
            letter-spacing: .65px;
        }

        .bubble {
            padding: 12px 16px;
            border-radius: 16px;
            font-size: 13px;
            line-height: 1.7;
            overflow-wrap: anywhere;
        }

        .user .bubble {
            background: linear-gradient(120deg,#7544c9,#5142a8);
            border: 1px solid rgba(196,181,253,.55);
            color: white;
            border-bottom-right-radius: 5px;
        }

        .bot .bubble {
            background: linear-gradient(
                130deg,
                rgba(47,38,91,.94),
                rgba(31,30,66,.96)
            );

            border: 1px solid rgba(167,139,250,.62);
            color: #f1eafa;
            border-bottom-left-radius: 5px;
        }

        /* THINKING */

        .thinking-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            animation: messageEnter .25s ease;
        }

        .thinking-label {
            padding-left: 5px;
            color: #c4a1f7;
            font-size: 11px;
            font-weight: 650;
            letter-spacing: .65px;
        }

        .thinking-box {
            display: flex;
            align-items: center;
            gap: 13px;

            padding: 14px 18px;

            border: 1.5px solid rgba(174,110,255,.75);
            border-radius: 17px;

            background: linear-gradient(
                110deg,
                rgba(91,44,145,.42),
                rgba(48,40,94,.6)
            );

            box-shadow:
                0 0 20px rgba(168,85,247,.12),
                inset 0 0 15px rgba(168,85,247,.08);
        }

        .thinking-dots {
            display: flex;
            align-items: center;
            gap: 7px;
        }

        .thinking-dots span {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #cf83ff;

            box-shadow: 0 0 12px rgba(192,132,252,.9);

            animation: thinkingPulse 1.2s infinite ease-in-out;
        }

        .thinking-dots span:nth-child(2) { animation-delay: .17s; }
        .thinking-dots span:nth-child(3) { animation-delay: .34s; }

        @keyframes thinkingPulse {
            0%,60%,100% {
                opacity: .35;
                transform: translateY(0);
            }
            30% {
                opacity: 1;
                transform: translateY(-5px);
            }
        }

        .thinking-text {
            color: #d9b7ff;
            font-size: 14px;
            font-style: italic;
            animation: thinkingGlow 1.5s infinite alternate;
        }

        @keyframes thinkingGlow {
            from { opacity: .55; }
            to { opacity: 1; }
        }

        /* MARKDOWN */

        .bot .bubble p { margin: 0 0 9px; }
        .bot .bubble p:last-child { margin-bottom: 0; }

        .bot .bubble h1,
        .bot .bubble h2,
        .bot .bubble h3 {
            color: white;
            margin: 8px 0;
        }

        .bot .bubble h1 { font-size: 18px; }
        .bot .bubble h2 { font-size: 16px; }
        .bot .bubble h3 { font-size: 14px; }

        .bot .bubble ul,
        .bot .bubble ol {
            padding-left: 20px;
            margin: 7px 0 10px;
        }

        .bot .bubble li { margin: 4px 0; }

        .bot .bubble a {
            color: #d1a5ff;
            text-decoration: underline;
            text-underline-offset: 3px;
        }

        .bot .bubble a:hover { color: #f0d9ff; }

        .bot .bubble code {
            padding: 2px 5px;
            border-radius: 5px;
            background: #17142b;
            color: #d8b4fe;
            font-family: Consolas,monospace;
        }

        .bot .bubble pre {
            padding: 10px;
            overflow-x: auto;
            border-radius: 9px;
            background: #17142b;
        }

        /* INPUT */

        .footer {
            flex-shrink: 0;
            padding: 13px 15px 16px;

            border-top: 1px solid rgba(167,139,250,.16);

            background: linear-gradient(
                180deg,
                rgba(20,18,49,.88),
                rgba(24,19,54,.98)
            );

            position: relative;
            z-index: 2;
        }

        .input-container {
            min-height: 62px;

            display: flex;
            align-items: center;
            gap: 9px;

            padding: 6px 7px 6px 17px;

            border: 1.5px solid #bd75ff;
            border-radius: 19px;

            background: rgba(42,35,79,.85);

            box-shadow: 0 0 12px rgba(168,85,247,.1);

            transition: .2s ease;
        }

        .input-container:focus-within {
            border-color: #ddaaff;
            box-shadow:
                0 0 0 3px rgba(168,85,247,.12),
                0 0 18px rgba(168,85,247,.16);
        }

        .question {
            flex: 1;
            min-width: 0;
            height: 42px;
            max-height: 90px;
            resize: none;

            padding: 12px 0;

            outline: none;
            border: none;
            background: transparent;

            color: white;
            font-size: 15px;
            line-height: 1.4;
        }

        .question::placeholder { color: #b9a9d4; }

        .send {
            width: 46px;
            height: 46px;
            flex-shrink: 0;

            display: grid;
            place-items: center;

            border: none;
            border-radius: 50%;

            background: linear-gradient(
                135deg,#d28aff,#a344f5,#762be0
            );

            color: white;
            cursor: pointer;

            box-shadow: 0 0 17px rgba(168,85,247,.35);

            transition: .2s ease;
        }

        .send:hover {
            transform: scale(1.08);
            box-shadow: 0 0 25px rgba(168,85,247,.65);
        }

        .send:active { transform: scale(.93); }
        .send:disabled { opacity: .45; cursor: not-allowed; }

        .send svg { width: 22px; height: 22px; }

        /* RESPONSIVE */

        @media(max-width:600px) {
            .panel {
                position: fixed;
                left: 6px;
                right: 6px;
                bottom: 68px;
                width: auto;
                max-width: none;
                height: min(645px,calc(100vh - 85px));
                max-height: calc(100vh - 85px);
            }

            .chat-area { padding: 18px 13px; }
            .welcome-title { font-size: 19px; }
            .welcome-description { font-size: 11px; }
            .feature-grid { gap: 5px; }
            .feature-card { height: 80px; }
            .feature-title { font-size: 9px; }
            .header { padding: 0 12px; }
            .brand-name { font-size: 19px; }
            .brand-subtitle { font-size: 11px; }
        }

        @media(prefers-reduced-motion:reduce) {
            *,*::before,*::after {
                animation-duration: .01ms !important;
                transition-duration: .01ms !important;
            }
        }

    </style>

    <!-- FLOATING LAUNCHER -->

    <button class="launcher" aria-label="Open TradeNav">
        <svg viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="1.5"
             stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2.8l1.8 5.4L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 2.8Z"/>
            <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/>
        </svg>
    </button>

    <!-- MAIN PANEL -->

    <section class="panel">

        <!-- HEADER -->

        <header class="header">

            <div class="brand">

                <div class="brand-logo">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2.5"
                         stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 17 9 11l4 4 8-10"/>
                        <path d="M15 5h6v6"/>
                    </svg>
                </div>

                <div>
                    <div class="brand-name">TradeNav</div>
                    <div class="brand-subtitle">TradingView Assistant</div>
                </div>

            </div>

            <div class="header-actions">

                <button class="header-btn clear-chat" title="Clear chat">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.8"
                         stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 7h16"/>
                        <path d="M10 11v6"/>
                        <path d="M14 11v6"/>
                        <path d="M5 7l1 13h12l1-13"/>
                        <path d="M9 7V4h6v3"/>
                    </svg>
                </button>

                <button class="header-btn minimize" title="Minimize">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.8">
                        <path d="M5 12h14"/>
                    </svg>
                </button>

                <button class="header-btn close" title="Close">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="1.8">
                        <path d="m18 6-12 12"/>
                        <path d="m6 6 12 12"/>
                    </svg>
                </button>

            </div>

        </header>

        <!-- CHAT AREA -->

        <main class="chat-area">

            <!-- DECORATIVE TOP WAVE -->

            <svg class="wave wave-top" viewBox="0 0 560 130"
                 preserveAspectRatio="none">
                <defs>
                    <linearGradient id="waveTop" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#a855f7" stop-opacity=".4"/>
                        <stop offset="1" stop-color="#4f46e5" stop-opacity=".03"/>
                    </linearGradient>
                </defs>
                <path d="M0 85 Q130 15 255 65 T560 5 V130 H0Z"
                      fill="url(#waveTop)"/>
                <path d="M0 85 Q130 15 255 65 T560 5"
                      fill="none" stroke="#8b5cf6" stroke-opacity=".65"
                      stroke-width="1.5"/>
            </svg>

            <!-- DECORATIVE BOTTOM WAVE -->

            <svg class="wave wave-bottom" viewBox="0 0 560 140"
                 preserveAspectRatio="none">
                <defs>
                    <linearGradient id="waveBottom" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stop-color="#7c3aed" stop-opacity=".03"/>
                        <stop offset=".65" stop-color="#9333ea" stop-opacity=".28"/>
                        <stop offset="1" stop-color="#c084fc" stop-opacity=".35"/>
                    </linearGradient>
                </defs>
                <path d="M0 110 Q160 65 300 105 T560 35 V140 H0Z"
                      fill="url(#waveBottom)"/>
                <path d="M0 110 Q160 65 300 105 T560 35"
                      fill="none" stroke="#a855f7" stroke-opacity=".7"
                      stroke-width="1.5"/>
            </svg>

            <!-- WELCOME -->

            <section class="welcome">

                <div class="welcome-title">
                    Trade smarter on <span>TradingView</span>
                </div>

                <div class="welcome-description">
                    Get instant guidance, tools, and feature navigation.
                </div>

                <!-- FEATURE CARDS -->

                <div class="feature-grid">

                    <button class="feature-card"
                        data-question="Where can I find technical indicators and how do I add RSI?">

                        <span class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="1.8"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="12" r="8"/>
                                <path d="m8 12 2 2 5-5"/>
                                <path d="M19 5v4h-4"/>
                            </svg>
                        </span>

                        <span class="feature-title">Find Indicators</span>
                    </button>

                    <button class="feature-card"
                        data-question="Where can I find market movers, top gainers and most volatile stocks?">

                        <span class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="1.8"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <path d="m3 17 6-6 4 3 8-9"/>
                                <path d="M15 5h6v6"/>
                            </svg>
                        </span>

                        <span class="feature-title">Analyze Markets</span>
                    </button>

                    <button class="feature-card"
                        data-question="How do I change chart timeframe and configure chart layout?">

                        <span class="feature-icon">
                            <svg viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" stroke-width="1.8"
                                 stroke-linecap="round" stroke-linejoin="round">
                                <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z"/>
                                <path d="m4 12 8 4.5 8-4.5"/>
                                <path d="m4 16.5 8 4.5 8-4.5"/>
                            </svg>
                        </span>

                        <span class="feature-title">Chart Setup</span>
                    </button>

                </div>

            </section>

        </main>

        <!-- INPUT -->

        <footer class="footer">

            <div class="input-container">

                <textarea class="question"
                    rows="1"
                    placeholder="Ask TradeNav..."></textarea>

                <button class="send" aria-label="Send message">
                    <svg viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2"
                         stroke-linecap="round" stroke-linejoin="round">
                        <path d="m5 12 14-7-5 14-3-6-6-1Z"/>
                    </svg>
                </button>

            </div>

        </footer>

    </section>
    `;


    // =====================================================
    // ELEMENT REFERENCES
    // =====================================================

    const launcher = shadow.querySelector(".launcher");
    const panel = shadow.querySelector(".panel");

    const closeButton = shadow.querySelector(".close");
    const minimizeButton = shadow.querySelector(".minimize");
    const clearButton = shadow.querySelector(".clear-chat");

    const chatArea = shadow.querySelector(".chat-area");
    const welcome = shadow.querySelector(".welcome");

    const input = shadow.querySelector(".question");
    const sendButton = shadow.querySelector(".send");

    const STORAGE_KEY = `tradenav-chat:${location.hostname}`;
    const MAX_HISTORY_MESSAGES = 50;

    let conversation = [];
    let isLoading = false;


    // =====================================================
    // PANEL CONTROLS
    // =====================================================

    function togglePanel() {
        panel.classList.toggle("open");

        if (panel.classList.contains("open")) {
            input.focus();
        }
    }

    launcher.addEventListener("click", togglePanel);
    closeButton.addEventListener("click", togglePanel);
    minimizeButton.addEventListener("click", togglePanel);


    // =====================================================
    // SAFE MARKDOWN RENDERER
    // =====================================================

    function appendInlineMarkdown(parent, text) {

        const pattern =
            /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|\*\*(.+?)\*\*|`([^`]+)`/g;

        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {

            if (match.index > lastIndex) {
                parent.appendChild(
                    document.createTextNode(text.slice(lastIndex, match.index))
                );
            }

            if (match[1] && match[2]) {

                try {
                    const url = new URL(match[2]);

                    const allowed =
                        url.protocol === "https:" &&
                        (
                            url.hostname === "tradingview.com" ||
                            url.hostname.endsWith(".tradingview.com")
                        );

                    if (allowed) {
                        const link = document.createElement("a");
                        link.href = url.href;
                        link.textContent = match[1];
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                        parent.appendChild(link);
                    } else {
                        parent.appendChild(document.createTextNode(match[0]));
                    }

                } catch {
                    parent.appendChild(document.createTextNode(match[0]));
                }

            } else if (match[3]) {

                const strong = document.createElement("strong");
                strong.textContent = match[3];
                parent.appendChild(strong);

            } else if (match[4]) {

                const code = document.createElement("code");
                code.textContent = match[4];
                parent.appendChild(code);

            }

            lastIndex = pattern.lastIndex;
        }

        if (lastIndex < text.length) {
            parent.appendChild(
                document.createTextNode(text.slice(lastIndex))
            );
        }
    }


    function renderMarkdown(container, markdown) {

        const lines = String(markdown ?? "")
            .replace(/\r/g, "")
            .split("\n");

        let paragraphLines = [];
        let listElement = null;
        let codeLines = [];
        let insideCodeBlock = false;

        function flushParagraph() {
            if (!paragraphLines.length) return;

            const p = document.createElement("p");
            appendInlineMarkdown(p, paragraphLines.join(" "));
            container.appendChild(p);
            paragraphLines = [];
        }

        function flushCode() {
            if (!codeLines.length) return;

            const pre = document.createElement("pre");
            const code = document.createElement("code");

            code.textContent = codeLines.join("\n");

            pre.appendChild(code);
            container.appendChild(pre);

            codeLines = [];
        }

        for (const line of lines) {

            if (line.trim().startsWith("```")) {
                flushParagraph();
                listElement = null;

                if (insideCodeBlock) flushCode();

                insideCodeBlock = !insideCodeBlock;
                continue;
            }

            if (insideCodeBlock) {
                codeLines.push(line);
                continue;
            }

            if (!line.trim()) {
                flushParagraph();
                listElement = null;
                continue;
            }

            const heading = line.match(/^(#{1,3})\s+(.+)$/);

            if (heading) {
                flushParagraph();
                listElement = null;

                const element = document.createElement(
                    `h${heading[1].length}`
                );

                appendInlineMarkdown(element, heading[2]);
                container.appendChild(element);
                continue;
            }

            const bullet = line.match(/^\s*[-*]\s+(.+)$/);
            const numbered = line.match(/^\s*\d+[.)]\s+(.+)$/);

            if (bullet || numbered) {
                flushParagraph();

                const tag = bullet ? "ul" : "ol";

                if (!listElement || listElement.tagName.toLowerCase() !== tag) {
                    listElement = document.createElement(tag);
                    container.appendChild(listElement);
                }

                const item = document.createElement("li");

                appendInlineMarkdown(
                    item,
                    bullet ? bullet[1] : numbered[1]
                );

                listElement.appendChild(item);
                continue;
            }

            listElement = null;
            paragraphLines.push(line.trim());
        }

        flushParagraph();

        if (insideCodeBlock) flushCode();
    }


    // =====================================================
    // CHAT MESSAGES
    // =====================================================

    function addMessage(text, type, save = true) {

        const wrapper = document.createElement("div");
        wrapper.className = `message ${type}`;

        const label = document.createElement("div");
        label.className = "message-label";
        label.textContent = type === "user" ? "YOU" : "TRADENAV";

        const bubble = document.createElement("div");
        bubble.className = "bubble";

        if (type === "bot") {
            renderMarkdown(bubble, text);
        } else {
            bubble.textContent = text;
        }

        wrapper.appendChild(label);
        wrapper.appendChild(bubble);

        chatArea.appendChild(wrapper);

        if (save) {
            conversation.push({
                type,
                text: String(text),
                timestamp: Date.now()
            });

            conversation = conversation.slice(-MAX_HISTORY_MESSAGES);
            persistHistory();
        }

        chatArea.scrollTop = chatArea.scrollHeight;

        return wrapper;
    }


    // =====================================================
    // PERSISTENT HISTORY
    // =====================================================

    function persistHistory() {

        chrome.storage.local.set({
            [STORAGE_KEY]: conversation.slice(-MAX_HISTORY_MESSAGES)
        }).catch(error => {
            console.error("TradeNav storage error:", error);
        });

    }


    async function loadHistory() {

        try {
            const stored = await chrome.storage.local.get(STORAGE_KEY);
            const saved = stored[STORAGE_KEY];

            if (!Array.isArray(saved)) return;

            conversation = saved.filter(item =>
                item &&
                (item.type === "user" || item.type === "bot") &&
                typeof item.text === "string"
            ).slice(-MAX_HISTORY_MESSAGES);

            conversation.forEach(item => {
                addMessage(item.text, item.type, false);
            });

        } catch (error) {
            console.error("TradeNav history error:", error);
        }
    }

    const historyReady = loadHistory();


    // =====================================================
    // CLEAR CHAT
    // =====================================================

    async function clearChat() {

        if (isLoading) return;

        conversation = [];

        chatArea.querySelectorAll(".message,.thinking-wrap")
            .forEach(element => element.remove());

        try {
            await chrome.storage.local.remove(STORAGE_KEY);
        } catch (error) {
            console.error("TradeNav clear error:", error);
        }

        input.focus();
    }

    clearButton.addEventListener("click", clearChat);


    // =====================================================
    // THINKING ANIMATION
    // =====================================================

    function showThinking() {

        const wrapper = document.createElement("div");
        wrapper.className = "thinking-wrap";

        const label = document.createElement("div");
        label.className = "thinking-label";
        label.textContent = "TRADENAV";

        const box = document.createElement("div");
        box.className = "thinking-box";

        const dots = document.createElement("div");
        dots.className = "thinking-dots";

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement("span");
            dots.appendChild(dot);
        }

        const text = document.createElement("span");
        text.className = "thinking-text";
        text.textContent = "Thinking...";

        box.appendChild(dots);
        box.appendChild(text);

        wrapper.appendChild(label);
        wrapper.appendChild(box);

        chatArea.appendChild(wrapper);
        chatArea.scrollTop = chatArea.scrollHeight;

        return wrapper;
    }


    // =====================================================
    // SEND TO BACKEND
    // =====================================================

    async function askTradeNav() {

        await historyReady;

        const question = input.value.trim();

        if (!question || isLoading) return;

        isLoading = true;

        input.value = "";
        input.style.height = "42px";

        sendButton.disabled = true;
        clearButton.disabled = true;

        addMessage(question, "user");

        const thinking = showThinking();

        try {

            const result = await chrome.runtime.sendMessage({
                type: "ASK_TRADENAV",
                question
            });

            thinking.remove();

            if (!result || !result.success) {
                throw new Error(result?.error || "Backend request failed");
            }

            addMessage(result.answer, "bot");

        } catch (error) {

            thinking.remove();

            console.error("TradeNav backend error:", error);

            addMessage(
                "I couldn't connect to TradeNav's backend. Please check your connection and try again.",
                "bot"
            );

        } finally {

            isLoading = false;

            sendButton.disabled = false;
            clearButton.disabled = false;

            input.focus();
        }
    }


    // =====================================================
    // INPUT EVENTS
    // =====================================================

    sendButton.addEventListener("click", askTradeNav);

    input.addEventListener("input", () => {
        input.style.height = "42px";
        input.style.height = Math.min(input.scrollHeight, 90) + "px";
    });

    input.addEventListener("keydown", event => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            askTradeNav();
        }
    });


    // =====================================================
    // FEATURE CARD ACTIONS
    // =====================================================

    shadow.querySelectorAll(".feature-card").forEach(button => {

        button.addEventListener("click", () => {
            input.value = button.dataset.question;
            askTradeNav();
        });

    });

})();
