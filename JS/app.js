/* =========================================================
   EQUALYZ - Lógica principal de la aplicación
   Prototipo frontend: los datos se almacenan en el navegador.
   No consulta precios reales ni reemplaza un sistema backend.
   ========================================================= */

(function () {
    'use strict';

    /* ---------------------------------------------------------
       1. CONFIGURACIÓN Y FUNCIONES GENERALES
    --------------------------------------------------------- */

    const STORAGE = {
        users: 'equalyz-usuarios',
        session: 'equalyz-sesion',
        homeUrls: 'equalyz-urls',
        homeAlerts: 'equalyz-alertas',
        rules: 'equalyz-reglas',
        prices: 'equalyz-precios',
        notices: 'equalyz-avisos',
        products: 'equalyz-skus'
    };

    const $ = function (id) {
        return document.getElementById(id);
    };

    function readData(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value === null ? fallback : value;
        } catch (error) {
            return fallback;
        }
    }

    function saveData(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('No fue posible guardar la información:', error);
            return false;
        }
    }

    function escapeHTML(value) {
        return String(value ?? '').replace(/[&<>"']/g, function (character) {
            const entities = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return entities[character];
        });
    }

    function validURL(value) {
        try {
            const url = new URL(value.trim());
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (error) {
            return false;
        }
    }

    function money(value) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(Number(value) || 0);
    }

    function number(value, decimals) {
        return new Intl.NumberFormat('es-CO', {
            minimumFractionDigits: decimals || 0,
            maximumFractionDigits: decimals || 0
        }).format(Number(value) || 0);
    }

    function createId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }

    function getSession() {
        return readData(STORAGE.session, null);
    }

    function setSession(user) {
        saveData(STORAGE.session, {
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo || ''
        });
    }

    function hideModal(id) {
        const modalElement = $(id);
        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).hide();
        }
    }

    function showModal(id) {
        const modalElement = $(id);
        if (modalElement && window.bootstrap) {
            bootstrap.Modal.getOrCreateInstance(modalElement).show();
        }
    }

    /* ---------------------------------------------------------
       2. INICIO DE SESIÓN Y REGISTRO
       Las cuentas son demostrativas y se guardan en localStorage.
       No utilizar contraseñas reales en este prototipo.
    --------------------------------------------------------- */

    let authMode = 'login';

    function createAuthModal() {
        if ($('mAuth')) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'mAuth';
        modal.tabIndex = -1;
        modal.setAttribute('aria-labelledby', 'authTitle');
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h2 class="fs-5 fw-bold mb-0" id="authTitle">Iniciar sesión</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <form id="authForm" novalidate>
                        <div id="authFields"></div>
                        <p id="authErr" class="er small d-none" role="alert"></p>
                        <button type="submit" id="authSubmit" class="btn btn-ac w-100">Iniciar sesión</button>
                    </form>
                    <p class="small text-center mt-3 mb-1">
                        <span id="authSwitchText">¿No tienes cuenta?</span>
                        <button type="button" id="authSwitch" class="btn btn-link p-0 ac">Crear cuenta</button>
                    </p>
                    <p class="mu small mb-0 text-center">Prototipo académico: las cuentas se almacenan únicamente en este navegador.</p>
                </div>
            </div>`;

        document.body.appendChild(modal);

        $('authForm').addEventListener('submit', handleAuthSubmit);
        $('authSwitch').addEventListener('click', function () {
            setAuthMode(authMode === 'login' ? 'register' : 'login');
        });

        setAuthMode('login');
    }

    function setAuthMode(mode) {
        authMode = mode;
        const isRegister = mode === 'register';

        $('authTitle').textContent = isRegister ? 'Crear cuenta Equalyz' : 'Iniciar sesión';
        $('authSubmit').textContent = isRegister ? 'Crear cuenta' : 'Ingresar';
        $('authSwitchText').textContent = isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?';
        $('authSwitch').textContent = isRegister ? 'Iniciar sesión' : 'Crear cuenta';
        $('authErr').classList.add('d-none');

        if (isRegister) {
            $('authFields').innerHTML = `
                <label class="mu small mb-1" for="authName">Nombre</label>
                <input id="authName" class="form-control inp mb-2" maxlength="40" autocomplete="name" required>
                <label class="mu small mb-1" for="authEmail">Correo electrónico</label>
                <input id="authEmail" type="email" class="form-control inp mb-2" autocomplete="email" required>
                <label class="mu small mb-1" for="authPassword">Contraseña</label>
                <input id="authPassword" type="password" class="form-control inp mb-2" minlength="6" autocomplete="new-password" required>
                <label class="mu small mb-1" for="authRole">Tipo de cuenta</label>
                <select id="authRole" class="form-select inp mb-3">
                    <option value="comprador">Comprador</option>
                    <option value="emprendedor">Emprendedor B2B</option>
                </select>`;
        } else {
            $('authFields').innerHTML = `
                <label class="mu small mb-1" for="authEmail">Correo electrónico</label>
                <input id="authEmail" type="email" class="form-control inp mb-2" autocomplete="email" required>
                <label class="mu small mb-1" for="authPassword">Contraseña</label>
                <input id="authPassword" type="password" class="form-control inp mb-3" autocomplete="current-password" required>`;
        }
    }

    async function hashPassword(password) {
        if (!window.crypto || !window.crypto.subtle) {
            throw new Error('Abre el proyecto con Live Server para habilitar el registro seguro de demostración.');
        }

        const data = new TextEncoder().encode(password);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(digest)).map(function (byte) {
            return byte.toString(16).padStart(2, '0');
        }).join('');
    }

    async function handleAuthSubmit(event) {
        event.preventDefault();

        const email = $('authEmail').value.trim().toLowerCase();
        const password = $('authPassword').value;
        const errorBox = $('authErr');

        errorBox.classList.add('d-none');

        if (!email || !email.includes('@') || password.length < 6) {
            errorBox.textContent = 'Ingresa un correo válido y una contraseña de mínimo 6 caracteres.';
            errorBox.classList.remove('d-none');
            return;
        }

        try {
            const users = readData(STORAGE.users, []);
            const passwordHash = await hashPassword(password);

            if (authMode === 'register') {
                const name = $('authName').value.trim();
                const role = $('authRole').value;

                if (name.length < 2) {
                    errorBox.textContent = 'Ingresa un nombre de al menos 2 caracteres.';
                    errorBox.classList.remove('d-none');
                    return;
                }

                if (users.some(function (user) { return user.email === email; })) {
                    errorBox.textContent = 'Ya existe una cuenta registrada con ese correo.';
                    errorBox.classList.remove('d-none');
                    return;
                }

                const newUser = {
                    id: createId(),
                    name: name,
                    email: email,
                    passwordHash: passwordHash,
                    role: role,
                    photo: ''
                };

                users.push(newUser);

                if (!saveData(STORAGE.users, users)) {
                    throw new Error('No fue posible guardar la cuenta en este navegador.');
                }

                setSession(newUser);
            } else {
                const user = users.find(function (item) {
                    return item.email === email && item.passwordHash === passwordHash;
                });

                if (!user) {
                    errorBox.textContent = 'Correo o contraseña incorrectos. Verifica los datos e inténtalo nuevamente.';
                    errorBox.classList.remove('d-none');
                    return;
                }

                setSession(user);
            }

            hideModal('mAuth');
            window.location.reload();
        } catch (error) {
            errorBox.textContent = error.message || 'No fue posible completar el proceso.';
            errorBox.classList.remove('d-none');
        }
    }

    function renderAuthBox() {
        const box = $('authBox');
        if (!box) return;

        const user = getSession();

        if (!user) {
            box.innerHTML = '<button type="button" id="authOpen" class="btn btn-ac btn-sm me-2">Iniciar sesión</button>';
            $('authOpen').addEventListener('click', function () {
                setAuthMode('login');
                showModal('mAuth');
            });
            return;
        }

        box.innerHTML = `
            <span class="small mu me-2">Hola, ${escapeHTML(user.name)}</span>
            <button type="button" id="authLogout" class="btn btn-out btn-sm me-2">Salir</button>`;

        $('authLogout').addEventListener('click', logout);
    }

    function logout() {
        localStorage.removeItem(STORAGE.session);
        window.location.reload();
    }

    function applyAccessControl() {
        const user = getSession();
        const entrepreneurLink = $('navEmp');
        const isEntrepreneurPage = window.location.pathname.toLowerCase().endsWith('/paginas/emprendedor.html');

        if (entrepreneurLink) {
            entrepreneurLink.classList.toggle('d-none', !(user && user.role === 'emprendedor'));
        }

        const protectedMain = document.querySelector('main[data-auth]');
        if (!protectedMain) return;

        const allowed = user && (!isEntrepreneurPage || user.role === 'emprendedor');
        if (allowed) return;

        const message = !user
            ? 'Inicia sesión para consultar esta sección de Equalyz.'
            : 'Esta sección está habilitada para cuentas de tipo Emprendedor B2B.';

        protectedMain.innerHTML = `
            <div class="card-eq access-card mt-4">
                <h1 class="hero-t">Acceso a Equalyz</h1>
                <p class="mu">${message}</p>
                <div class="d-flex flex-wrap gap-2">
                    ${user ? '<button type="button" id="gateLogout" class="btn btn-out">Cerrar sesión</button>' : '<button type="button" id="gateLogin" class="btn btn-ac">Iniciar sesión o registrarme</button>'}
                    <a href="../index.html" class="btn btn-out">Volver al inicio</a>
                </div>
            </div>`;

        if ($('gateLogin')) {
            $('gateLogin').addEventListener('click', function () {
                setAuthMode('login');
                showModal('mAuth');
            });
        }

        if ($('gateLogout')) {
            $('gateLogout').addEventListener('click', logout);
        }
    }

    /* ---------------------------------------------------------
       3. PERFIL DE USUARIO
    --------------------------------------------------------- */

    function updateUserRecord(updatedUser) {
        const users = readData(STORAGE.users, []);
        const index = users.findIndex(function (user) { return user.email === updatedUser.email; });

        if (index >= 0) {
            users[index] = Object.assign({}, users[index], updatedUser);
            saveData(STORAGE.users, users);
        }

        setSession(updatedUser);
        renderAuthBox();
    }

    function renderAvatar(user) {
        const avatar = $('pfAv');
        if (!avatar) return;

        if (user.photo && user.photo.startsWith('data:image/')) {
            avatar.innerHTML = `<img src="${user.photo}" alt="Foto de perfil" class="profile-photo">`;
        } else {
            const initial = (user.name || 'U').trim().charAt(0).toUpperCase();
            avatar.innerHTML = `<div class="profile-avatar" aria-label="Inicial del usuario">${escapeHTML(initial)}</div>`;
        }
    }

    function initProfile() {
        if (!$('pfNom')) return;

        const user = getSession();
        if (!user) return;

        $('pfMail').textContent = user.email;
        $('pfNom').value = user.name;
        renderAvatar(user);

        $('pfOk').addEventListener('click', function () {
            const name = $('pfNom').value.trim();
            if (name.length < 2) {
                alert('El nombre debe tener al menos 2 caracteres.');
                return;
            }

            updateUserRecord(Object.assign({}, getSession(), { name: name }));
            renderAvatar(getSession());
            alert('Los cambios del perfil fueron guardados en este navegador.');
        });

        $('pfFile').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (!file) return;

            if (!file.type.startsWith('image/')) {
                alert('Selecciona un archivo de imagen.');
                return;
            }

            if (file.size > 1024 * 1024) {
                alert('La imagen debe pesar máximo 1 MB.');
                event.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function () {
                const updated = Object.assign({}, getSession(), { photo: reader.result });
                updateUserRecord(updated);
                renderAvatar(updated);
            };
            reader.readAsDataURL(file);
        });

        if ($('pfOut')) $('pfOut').addEventListener('click', logout);

        if ($('pfDel')) {
            $('pfDel').addEventListener('click', function () {
                if (!confirm('¿Deseas eliminar la cuenta y los datos locales de Equalyz?')) return;

                const users = readData(STORAGE.users, []).filter(function (item) {
                    return item.email !== user.email;
                });
                saveData(STORAGE.users, users);

                [STORAGE.session, STORAGE.homeUrls, STORAGE.homeAlerts, STORAGE.rules,
                STORAGE.prices, STORAGE.notices, STORAGE.products].forEach(function (key) {
                    localStorage.removeItem(key);
                });

                window.location.href = '../index.html';
            });
        }
    }

    /* ---------------------------------------------------------
       4. PÁGINA DE INICIO: URL, RECOMENDACIONES Y ALERTAS
    --------------------------------------------------------- */

    function renderHomeUrls() {
        const list = $('lista');
        if (!list) return;

        const urls = readData(STORAGE.homeUrls, []);
        list.innerHTML = urls.map(function (url, index) {
            return `
                <span class="chip">
                    <a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(url)}</a>
                    <button type="button" data-remove-url="${index}" aria-label="Eliminar URL ${index + 1}">×</button>
                </span>`;
        }).join('');

        if ($('pregunta')) $('pregunta').classList.toggle('d-none', urls.length === 0);
    }

    function renderHomeAlerts() {
        const output = $('alOut');
        if (!output) return;

        const alerts = readData(STORAGE.homeAlerts, []);
        if (!alerts.length) {
            output.innerHTML = '<p class="mu small mb-0">Todavía no tienes alertas registradas.</p>';
            return;
        }

        output.innerHTML = alerts.map(function (alertItem) {
            return `
                <div class="alert-row d-flex justify-content-between align-items-start gap-2 border-bottom py-2">
                    <div class="small">
                        <b>${money(alertItem.target)}</b>
                        <div class="mu text-break">${escapeHTML(alertItem.url)}</div>
                        <span class="mu">${escapeHTML(alertItem.email || 'Sin correo asociado')}</span>
                    </div>
                    <button type="button" class="btn btn-out btn-sm" data-delete-home-alert="${alertItem.id}">Eliminar</button>
                </div>`;
        }).join('');
    }

    function openHomeAlert() {
        if ($('alUrl') && $('url') && $('url').value.trim()) {
            $('alUrl').value = $('url').value.trim();
        }
        renderHomeAlerts();
        showModal('mAlerta');
    }

    function saveHomeAlert() {
        const url = $('alUrl').value.trim();
        const target = Number($('alPrecio').value);
        const email = $('alMail').value.trim();
        const error = $('alErr');

        const validEmail = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!validURL(url) || target <= 0 || !validEmail) {
            error.textContent = 'Ingresa una URL válida, un precio mayor que 0 y un correo válido si deseas recibirlo.';
            error.classList.remove('d-none');
            return;
        }

        const alerts = readData(STORAGE.homeAlerts, []);
        alerts.push({
            id: createId(),
            url: url,
            target: target,
            email: email,
            createdAt: new Date().toISOString()
        });

        saveData(STORAGE.homeAlerts, alerts);
        error.classList.add('d-none');
        $('alUrl').value = '';
        $('alPrecio').value = '';
        $('alMail').value = '';
        renderHomeAlerts();
    }

    const marketExamples = [
        { name: 'Mercado Libre', confidence: 96, delivery: 1.7, warranty: true },
        { name: 'Amazon', confidence: 84, delivery: 7.4, warranty: false },
        { name: 'Éxito', confidence: 81, delivery: 3.2, warranty: true },
        { name: 'AliExpress', confidence: 66, delivery: 22, warranty: false }
    ];

    function renderRecommendation() {
        if (!$('recoOut') || !$('prio')) return;

        const priority = $('prio').value;
        let selected;

        if (priority === 'rap') {
            selected = marketExamples.slice().sort(function (a, b) { return a.delivery - b.delivery; })[0];
        } else if (priority === 'gar') {
            selected = marketExamples.filter(function (item) { return item.warranty; })
                .sort(function (a, b) { return b.confidence - a.confidence; })[0];
        } else {
            selected = marketExamples.slice().sort(function (a, b) { return b.confidence - a.confidence; })[0];
        }

        $('recoOut').innerHTML = `
            <div class="card-eq">
                <span class="tag ac">Recomendación demostrativa</span>
                <h3 class="fs-5 fw-bold mt-2">${selected.name}</h3>
                <p class="small mu mb-1">Confiabilidad de ejemplo: <b>${selected.confidence}%</b></p>
                <p class="small mu mb-1">Entrega estimada de ejemplo: <b>${number(selected.delivery, 1)} días</b></p>
                <p class="small mu mb-0">Garantía local: <b>${selected.warranty ? 'Sí' : 'No registrada'}</b></p>
            </div>`;
    }

    function initHome() {
        if (!$('buscar')) return;

        renderHomeUrls();
        renderHomeAlerts();

        $('buscar').addEventListener('click', function () {
            const url = $('url').value.trim();
            const error = $('err');

            if (!validURL(url)) {
                error.classList.remove('d-none');
                return;
            }

            const urls = readData(STORAGE.homeUrls, []);
            if (urls.length >= 3) {
                error.textContent = 'Puedes agregar máximo 3 enlaces para preparar una comparación.';
                error.classList.remove('d-none');
                return;
            }

            if (urls.includes(url)) {
                error.textContent = 'Este enlace ya está agregado.';
                error.classList.remove('d-none');
                return;
            }

            urls.push(url);
            saveData(STORAGE.homeUrls, urls);
            $('url').value = '';
            error.classList.add('d-none');
            renderHomeUrls();
        });

        if ($('lista')) {
            $('lista').addEventListener('click', function (event) {
                const button = event.target.closest('[data-remove-url]');
                if (!button) return;
                const urls = readData(STORAGE.homeUrls, []);
                urls.splice(Number(button.dataset.removeUrl), 1);
                saveData(STORAGE.homeUrls, urls);
                renderHomeUrls();
            });
        }

        if ($('otra')) $('otra').addEventListener('click', function () { $('url').focus(); });

        if ($('comparar')) {
            $('comparar').addEventListener('click', function () {
                const urls = readData(STORAGE.homeUrls, []);
                if (urls.length < 2) {
                    alert('Agrega al menos dos enlaces para iniciar la comparación.');
                    return;
                }
                saveData('equalyz-compare-urls', urls.slice(0, 2));
                window.location.href = './paginas/comparador.html';
            });
        }

        if ($('reco')) $('reco').addEventListener('click', function () {
            renderRecommendation();
            showModal('mReco');
        });

        if ($('prio')) $('prio').addEventListener('change', renderRecommendation);
        if ($('alertaBtn')) $('alertaBtn').addEventListener('click', openHomeAlert);
        if ($('alGuardar')) $('alGuardar').addEventListener('click', saveHomeAlert);

        if ($('alOut')) {
            $('alOut').addEventListener('click', function (event) {
                const button = event.target.closest('[data-delete-home-alert]');
                if (!button) return;
                const alerts = readData(STORAGE.homeAlerts, []).filter(function (item) {
                    return item.id !== button.dataset.deleteHomeAlert;
                });
                saveData(STORAGE.homeAlerts, alerts);
                renderHomeAlerts();
            });
        }
    }

    /* ---------------------------------------------------------
       5. COMPARADOR DE TIENDAS
       Los indicadores corresponden a datos de ejemplo del proyecto.
    --------------------------------------------------------- */

    function identifyMarket(value) {
        let host = '';
        try {
            host = new URL(value).hostname.toLowerCase();
        } catch (error) {
            host = '';
        }

        const examples = [
            {
                test: 'mercadolibre', name: 'Mercado Libre', score: 96, delivery: '1,7 días',
                warranty: 'Sí', invoice: 'Sí', satisfaction: '96%',
                pros: ['Indicador de confiabilidad alto', 'Entrega de ejemplo más rápida', 'Factura registrada en la matriz'],
                cons: ['El resultado depende del vendedor y del producto']
            },
            {
                test: 'amazon', name: 'Amazon', score: 84, delivery: '7,4 días',
                warranty: 'No registrada', invoice: 'No registrada', satisfaction: '84%',
                pros: ['Amplia oferta internacional', 'Indicador de confiabilidad medio-alto'],
                cons: ['Entrega de ejemplo más extensa', 'Validar garantía y costos de importación']
            },
            {
                test: 'exito', name: 'Éxito', score: 81, delivery: '3,2 días',
                warranty: 'Sí', invoice: 'Sí', satisfaction: '81%',
                pros: ['Garantía local registrada en la matriz', 'Factura registrada en la matriz'],
                cons: ['Indicador de confiabilidad inferior a los dos primeros mercados']
            },
            {
                test: 'aliexpress', name: 'AliExpress', score: 66, delivery: '22 días',
                warranty: 'No registrada', invoice: 'No registrada', satisfaction: '66%',
                pros: ['Alternativa de compra internacional'],
                cons: ['Entrega de ejemplo más extensa', 'Validar costos y condiciones de garantía']
            }
        ];

        const found = examples.find(function (item) { return host.includes(item.test); });
        if (found) return found;

        return {
            name: host.replace(/^www\./, '') || 'Tienda no identificada',
            score: null,
            delivery: 'No disponible',
            warranty: 'No disponible',
            invoice: 'No disponible',
            satisfaction: 'No disponible',
            pros: ['Enlace agregado correctamente'],
            cons: ['No hay indicadores de ejemplo configurados para esta tienda']
        };
    }

    function scoreClass(score) {
        if (score >= 90) return 'score-high';
        if (score >= 75) return 'score-medium';
        return 'score-low';
    }

    function productComparisonCard(url, index) {
        const market = identifyMarket(url);
        const score = market.score === null
            ? '<span class="score score-na">N/D</span>'
            : `<span class="score ${scoreClass(market.score)}">${market.score}%</span>`;

        return `
            <article class="card-eq h-100">
                <span class="tag">Opción ${index + 1} · Dato de ejemplo</span>
                <h2 class="fs-5 fw-bold mt-2">${escapeHTML(market.name)}</h2>
                <p class="small text-break"><a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">Consultar enlace del producto</a></p>
                <div class="d-flex flex-wrap align-items-center gap-3 my-3">
                    ${score}
                    <div class="small mu">${market.score === null ? 'Sin puntuación disponible' : 'Indicador demostrativo de confiabilidad'}</div>
                </div>
                <div class="small">
                    <b class="ok">Ventajas</b>
                    <ul>${market.pros.map(function (item) { return `<li>${escapeHTML(item)}</li>`; }).join('')}</ul>
                    <b class="er">Aspectos por validar</b>
                    <ul class="mb-0">${market.cons.map(function (item) { return `<li>${escapeHTML(item)}</li>`; }).join('')}</ul>
                </div>
            </article>`;
    }

    function initComparator() {
        if (!$('calc')) return;

        const savedUrls = readData('equalyz-compare-urls', []);
        if (savedUrls[0]) $('u1').value = savedUrls[0];
        if (savedUrls[1]) $('u2').value = savedUrls[1];

        $('calc').addEventListener('click', function () {
            const url1 = $('u1').value.trim();
            const url2 = $('u2').value.trim();

            if (!validURL(url1) || !validURL(url2)) {
                $('res').innerHTML = '<p class="er">Ingresa dos enlaces válidos que comiencen por https:// o http://.</p>';
                return;
            }

            const first = identifyMarket(url1);
            const second = identifyMarket(url2);
            let verdict = 'No es posible establecer un ganador: faltan indicadores para una o ambas tiendas.';

            if (first.score !== null && second.score !== null) {
                if (first.score > second.score) {
                    verdict = `${first.name} presenta el indicador de confiabilidad de ejemplo más alto (${first.score}% frente a ${second.score}%).`;
                } else if (second.score > first.score) {
                    verdict = `${second.name} presenta el indicador de confiabilidad de ejemplo más alto (${second.score}% frente a ${first.score}%).`;
                } else {
                    verdict = 'Las dos tiendas tienen el mismo indicador de confiabilidad de ejemplo.';
                }
            }

            $('res').innerHTML = `
                <section class="card-eq mb-3">
                    <span class="tag wa">Veredicto orientativo</span>
                    <p class="mb-0 mt-2">${escapeHTML(verdict)}</p>
                </section>
                <div class="row g-3">
                    <div class="col-lg-6">${productComparisonCard(url1, 1)}</div>
                    <div class="col-lg-6">${productComparisonCard(url2, 2)}</div>
                </div>
                <section class="card-eq mt-3">
                    <h2 class="fs-5 fw-bold">Factores clave de comparación</h2>
                    <div class="table-responsive">
                        <table class="table table-eq align-middle mb-0">
                            <thead><tr><th>FACTOR</th><th>${escapeHTML(first.name)}</th><th>${escapeHTML(second.name)}</th></tr></thead>
                            <tbody>
                                <tr><th>Precio final con impuestos y envío</th><td>No disponible</td><td>No disponible</td></tr>
                                <tr><th>Entrega estimada</th><td>${escapeHTML(first.delivery)}</td><td>${escapeHTML(second.delivery)}</td></tr>
                                <tr><th>Garantía local</th><td>${escapeHTML(first.warranty)}</td><td>${escapeHTML(second.warranty)}</td></tr>
                                <tr><th>Satisfacción / confiabilidad</th><td>${first.score === null ? 'No disponible' : first.score + '% (ejemplo)'}</td><td>${second.score === null ? 'No disponible' : second.score + '% (ejemplo)'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <p class="mu small mt-2">Los enlaces no se consultan automáticamente. Los indicadores disponibles son datos de demostración; el precio final requiere información del producto, envío e impuestos.</p>`;
        });
    }

    /* ---------------------------------------------------------
       6. ALERTAS Y VARIACIONES DE PRECIOS
    --------------------------------------------------------- */

    function renderRules() {
        const output = $('rList');
        if (!output) return;

        const rules = readData(STORAGE.rules, []);
        if (!rules.length) {
            output.innerHTML = '<p class="mu small mb-0">No hay reglas creadas.</p>';
            return;
        }

        output.innerHTML = rules.map(function (rule) {
            const direction = rule.direction === 'baja' ? 'baje' : rule.direction === 'sube' ? 'suba' : 'cambie';
            return `
                <div class="d-flex justify-content-between align-items-center gap-2 border-bottom py-2">
                    <div class="small"><b>${escapeHTML(rule.tag)}</b><div class="mu">Avisar si el precio ${direction} ${number(rule.percent, 1)}%</div></div>
                    <button type="button" class="btn btn-out btn-sm" data-delete-rule="${rule.id}">Eliminar</button>
                </div>`;
        }).join('');
    }

    function renderNotices() {
        const output = $('dList');
        if (!output) return;

        const notices = readData(STORAGE.notices, []);
        if (!notices.length) {
            output.innerHTML = '<p class="mu small mb-0">No tienes avisos registrados.</p>';
            return;
        }

        output.innerHTML = notices.slice().reverse().map(function (notice) {
            const date = new Date(notice.createdAt).toLocaleString('es-CO');
            return `
                <div class="border-bottom py-2 small">
                    <b class="wa">Variación detectada</b>
                    <p class="mb-1">${escapeHTML(notice.message)}</p>
                    <span class="mu">${escapeHTML(date)}</span>
                </div>`;
        }).join('');
    }

    function initAlerts() {
        if (!$('rOk')) return;

        renderRules();
        renderNotices();

        $('rOk').addEventListener('click', function () {
            const tag = $('rTag').value.trim();
            const direction = $('rDir').value;
            const percent = Number($('rPct').value);

            if (!tag || percent <= 0) {
                $('rErr').classList.remove('d-none');
                return;
            }

            const rules = readData(STORAGE.rules, []);
            rules.push({ id: createId(), tag: tag, direction: direction, percent: percent, active: true });
            saveData(STORAGE.rules, rules);
            $('rTag').value = '';
            $('rPct').value = '5';
            $('rErr').classList.add('d-none');
            renderRules();
        });

        $('rList').addEventListener('click', function (event) {
            const button = event.target.closest('[data-delete-rule]');
            if (!button) return;

            const rules = readData(STORAGE.rules, []).filter(function (rule) {
                return rule.id !== button.dataset.deleteRule;
            });
            saveData(STORAGE.rules, rules);
            renderRules();
        });

        $('oOk').addEventListener('click', function () {
            const name = $('oNom').value.trim();
            const price = Number($('oPrecio').value);

            if (!name || price <= 0) {
                $('oErr').classList.remove('d-none');
                return;
            }

            const prices = readData(STORAGE.prices, []);
            const previous = prices.find(function (item) {
                return item.name.toLowerCase() === name.toLowerCase();
            });

            if (previous) {
                const change = ((price - previous.price) / previous.price) * 100;
                const rules = readData(STORAGE.rules, []);

                rules.forEach(function (rule) {
                    const matches = name.toLowerCase().includes(rule.tag.toLowerCase()) ||
                        rule.tag.toLowerCase().includes(name.toLowerCase());
                    if (!matches || !rule.active) return;

                    const triggered = rule.direction === 'baja'
                        ? change <= -rule.percent
                        : rule.direction === 'sube'
                            ? change >= rule.percent
                            : Math.abs(change) >= rule.percent;

                    if (triggered) {
                        const message = `${name}: pasó de ${money(previous.price)} a ${money(price)} (${change > 0 ? '+' : ''}${number(change, 1)}%).`;
                        const notices = readData(STORAGE.notices, []);
                        notices.push({ id: createId(), message: message, createdAt: new Date().toISOString() });
                        saveData(STORAGE.notices, notices);

                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('Equalyz: variación de precio', { body: message });
                        }
                    }
                });
            }

            const updatedPrices = prices.filter(function (item) {
                return item.name.toLowerCase() !== name.toLowerCase();
            });
            updatedPrices.unshift({ name: name, price: price, updatedAt: new Date().toISOString() });
            saveData(STORAGE.prices, updatedPrices);

            $('oNom').value = '';
            $('oPrecio').value = '';
            $('oErr').classList.add('d-none');
            renderNotices();
            alert(previous ? 'Precio actualizado. Se revisaron las reglas configuradas.' : 'Primer precio registrado. Registra una nueva variación para evaluar las reglas.');
        });

        if ($('nOk')) {
            $('nOk').addEventListener('click', async function () {
                if (!('Notification' in window)) {
                    alert('Este navegador no permite notificaciones de escritorio.');
                    return;
                }

                const permission = await Notification.requestPermission();
                alert(permission === 'granted'
                    ? 'Notificaciones habilitadas.'
                    : 'No se habilitaron las notificaciones. Puedes cambiar el permiso desde el navegador.');
            });
        }

        if ($('dClr')) {
            $('dClr').addEventListener('click', function () {
                saveData(STORAGE.notices, []);
                renderNotices();
            });
        }
    }

    /* ---------------------------------------------------------
       7. MÓDULO EMPRENDEDOR B2B
    --------------------------------------------------------- */

    let selectedProductId = null;

    function getProducts() {
        return readData(STORAGE.products, []);
    }

    function saveProducts(products) {
        saveData(STORAGE.products, products);
        renderProducts();
    }

    function renderProducts() {
        const tbody = $('tbody');
        if (!tbody) return;

        const products = getProducts();
        if (!products.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="mu text-center py-4">Todavía no tienes productos registrados.</td></tr>';
        } else {
            tbody.innerHTML = products.map(function (product) {
                const margin = Number(product.sale) - Number(product.cost);
                const marginClass = margin >= 0 ? 'ok' : 'er';
                return `
                    <tr>
                        <td><b>${escapeHTML(product.name)}</b><div class="mu small">SKU: ${escapeHTML(product.sku)}</div></td>
                        <td>${escapeHTML(product.origin)}<div class="mu small">${escapeHTML(product.provider)}</div></td>
                        <td>${money(product.cost)}</td>
                        <td>${money(product.sale)}</td>
                        <td><b class="${marginClass}">${money(margin)}</b></td>
                        <td class="text-nowrap">
                            <button type="button" class="btn btn-out btn-sm" data-adjust-product="${product.id}" aria-label="Ajustar precio de ${escapeHTML(product.name)}">Ajustar</button>
                            <button type="button" class="btn btn-out btn-sm er" data-delete-product="${product.id}" aria-label="Eliminar ${escapeHTML(product.name)}">×</button>
                        </td>
                    </tr>`;
            }).join('');
        }

        const rivalCheaper = products.filter(function (product) {
            return Number(product.rival) > 0 && Number(product.rival) < Number(product.sale);
        }).length;
        const totalMargin = products.reduce(function (total, product) {
            return total + (Number(product.sale) - Number(product.cost));
        }, 0);
        const profitable = products.filter(function (product) {
            return Number(product.sale) > Number(product.cost);
        }).length;
        const health = products.length ? Math.round((profitable / products.length) * 100) : 0;

        if ($('stSku')) $('stSku').textContent = products.length;
        if ($('stAl')) $('stAl').textContent = rivalCheaper;
        if ($('stMg')) $('stMg').textContent = money(totalMargin);
        if ($('stSa')) $('stSa').textContent = health + '/100';

        renderRadar(products);
    }

    function renderRadar(products) {
        const radar = $('radar');
        if (!radar) return;

        const withRival = products.filter(function (product) { return Number(product.rival) > 0; });
        if (!withRival.length) {
            radar.innerHTML = '<p class="mu small mb-0">Agrega un precio de rival al registrar un SKU para visualizar el radar de competidores.</p>';
            return;
        }

        radar.innerHTML = withRival.map(function (product) {
            const rival = Number(product.rival);
            const sale = Number(product.sale);
            const rivalIsCheaper = rival < sale;
            return `
                <div class="border-bottom py-2">
                    <div class="d-flex justify-content-between gap-2 small">
                        <b>${escapeHTML(product.name)}</b>
                        <span class="${rivalIsCheaper ? 'er' : 'ok'}">${rivalIsCheaper ? 'Rival más barato' : 'Precio competitivo'}</span>
                    </div>
                    <div class="small mu">Tu venta: ${money(sale)} · Rival: ${money(rival)}</div>
                </div>`;
        }).join('');
    }

    function resetSkuForm() {
        ['fSku', 'fNom', 'fProv', 'fOri', 'fCos', 'fVen', 'fRiv'].forEach(function (id) {
            if ($(id)) $(id).value = '';
        });
        if ($('fErr')) $('fErr').classList.add('d-none');
    }

    function initEntrepreneur() {
        if (!$('tbody')) return;

        renderProducts();
        initDianSimulator();

        if ($('addBtn')) {
            $('addBtn').addEventListener('click', function () {
                resetSkuForm();
                showModal('mSku');
            });
        }

        if ($('fOk')) {
            $('fOk').addEventListener('click', function () {
                const sku = $('fSku').value.trim();
                const name = $('fNom').value.trim();
                const provider = $('fProv').value.trim();
                const origin = $('fOri').value.trim();
                const cost = Number($('fCos').value);
                const sale = Number($('fVen').value);
                const rival = Number($('fRiv').value) || 0;
                const products = getProducts();

                if (!sku || !name || !provider || !origin || cost <= 0 || sale <= 0 || rival < 0) {
                    $('fErr').textContent = 'Completa los campos obligatorios y registra costos y precios mayores que 0. El precio del rival es opcional.';
                    $('fErr').classList.remove('d-none');
                    return;
                }

                if (products.some(function (product) { return product.sku.toLowerCase() === sku.toLowerCase(); })) {
                    $('fErr').textContent = 'Ya existe un producto con ese SKU.';
                    $('fErr').classList.remove('d-none');
                    return;
                }

                products.push({
                    id: createId(), sku: sku, name: name, provider: provider,
                    origin: origin, cost: cost, sale: sale, rival: rival
                });

                saveProducts(products);
                hideModal('mSku');
                resetSkuForm();
            });
        }

        if ($('tbody')) {
            $('tbody').addEventListener('click', function (event) {
                const adjustButton = event.target.closest('[data-adjust-product]');
                const deleteButton = event.target.closest('[data-delete-product]');
                const products = getProducts();

                if (adjustButton) {
                    const product = products.find(function (item) { return item.id === adjustButton.dataset.adjustProduct; });
                    if (!product) return;
                    selectedProductId = product.id;
                    $('ajNom').textContent = product.name + ' · ' + product.sku;
                    $('ajP').value = product.sale;
                    $('ajErr').classList.add('d-none');
                    showModal('mAj');
                }

                if (deleteButton) {
                    if (!confirm('¿Deseas eliminar este producto del catálogo?')) return;
                    saveProducts(products.filter(function (item) { return item.id !== deleteButton.dataset.deleteProduct; }));
                }
            });
        }

        if ($('ajOk')) {
            $('ajOk').addEventListener('click', function () {
                const newPrice = Number($('ajP').value);
                if (newPrice <= 0) {
                    $('ajErr').classList.remove('d-none');
                    return;
                }

                const products = getProducts();
                const product = products.find(function (item) { return item.id === selectedProductId; });
                if (!product) return;

                product.sale = newPrice;
                saveProducts(products);
                hideModal('mAj');
            });
        }

        if ($('csv')) $('csv').addEventListener('click', exportProductsCSV);

        ['stSku', 'stAl', 'stMg', 'stSa'].forEach(function (id) {
            if ($(id)) {
                $(id).closest('.card-eq').addEventListener('click', function () {
                    const products = getProducts();
                    const details = {
                        stSku: ['Productos registrados', `El catálogo contiene ${products.length} SKU(s).`],
                        stAl: ['Rivales más baratos', 'Cantidad de productos cuyo precio de rival es inferior a tu precio de venta sugerido.'],
                        stMg: ['Margen total', 'Suma de la diferencia entre venta sugerida y costo desembarcado de todos los SKU.'],
                        stSa: ['Salud del catálogo', 'Porcentaje de SKU con precio de venta superior al costo desembarcado.']
                    };
                    $('indT').textContent = details[id][0];
                    $('indB').innerHTML = `<p class="small mb-0">${details[id][1]}</p>`;
                    showModal('mInd');
                });
            }
        });
    }

    function exportProductsCSV() {
        const products = getProducts();
        if (!products.length) {
            alert('No hay productos para exportar.');
            return;
        }

        const rows = [
            ['SKU', 'Producto', 'Proveedor', 'Origen', 'Costo desembarcado COP', 'Venta sugerida COP', 'Margen COP', 'Precio rival COP'],
            ...products.map(function (product) {
                return [
                    product.sku,
                    product.name,
                    product.provider,
                    product.origin,
                    product.cost,
                    product.sale,
                    Number(product.sale) - Number(product.cost),
                    product.rival || ''
                ];
            })
        ];

        const csv = '\uFEFF' + rows.map(function (row) {
            return row.map(function (cell) {
                return '"' + String(cell ?? '').replace(/"/g, '""') + '"';
            }).join(';');
        }).join('\r\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'equalyz-catalogo.csv';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    }

    /* ---------------------------------------------------------
       8. SIMULADOR DIAN Y COURIER
       Utiliza los valores declarados en datos-dian.js.
    --------------------------------------------------------- */

    function initDianSimulator() {
        if (!$('fob') || !$('kg') || !$('simOut')) return;

        const data = typeof DATOS !== 'undefined' ? DATOS : {
            fechaTexto: 'No disponible', trm: 3237.83, umbralUsd: 200,
            arancel: 0.10, iva: 0.19, courierUsdLb: 4.5
        };

        if (!$('tarifa').value) $('tarifa').value = data.courierUsdLb;

        if ($('simNota')) {
            $('simNota').textContent = `Parámetros de referencia: TRM ${number(data.trm, 2)} COP/USD · ${data.fechaTexto} · Umbral FOB USD ${number(data.umbralUsd, 0)}. Datos demostrativos.`;
        }

        function calculate() {
            const fobUsd = Number($('fob').value);
            const kg = Number($('kg').value);
            const courierRate = Number($('tarifa').value);

            if (fobUsd < 0 || kg < 0 || courierRate < 0 || !Number.isFinite(fobUsd + kg + courierRate)) {
                $('simOut').innerHTML = '<p class="er mb-0">Verifica los valores ingresados.</p>';
                return;
            }

            const pounds = kg * 2.20462;
            const shippingUsd = pounds * courierRate;
            const fobCop = fobUsd * data.trm;
            const shippingCop = shippingUsd * data.trm;
            const customsBase = fobCop + shippingCop;
            const appliesDuty = fobUsd > data.umbralUsd && $('orig').value === 'notlc';
            const dutyRate = appliesDuty ? data.arancel : 0;
            const duty = customsBase * dutyRate;
            const iva = (customsBase + duty) * data.iva;
            const total = customsBase + duty + iva;

            $('simOut').innerHTML = `
                <div class="d-flex justify-content-between"><span>Valor FOB</span><b>${money(fobCop)}</b></div>
                <div class="d-flex justify-content-between"><span>Courier estimado (${number(pounds, 2)} lb)</span><b>${money(shippingCop)}</b></div>
                <div class="d-flex justify-content-between"><span>Base estimada</span><b>${money(customsBase)}</b></div>
                <div class="d-flex justify-content-between"><span>Arancel (${number(dutyRate * 100, 0)}%)</span><b>${money(duty)}</b></div>
                <div class="d-flex justify-content-between"><span>IVA (${number(data.iva * 100, 0)}%)</span><b>${money(iva)}</b></div>
                <hr>
                <div class="d-flex justify-content-between fs-6"><b>Total estimado</b><b class="ac">${money(total)}</b></div>
                <p class="mu small mt-2 mb-0">Cálculo orientativo con los parámetros cargados en datos-dian.js. No incluye otros cargos, exclusiones ni validaciones aduaneras particulares.</p>`;
        }

        ['fob', 'kg', 'orig', 'tarifa'].forEach(function (id) {
            $(id).addEventListener('input', calculate);
            $(id).addEventListener('change', calculate);
        });

        calculate();
    }

    /* ---------------------------------------------------------
       9. INICIALIZACIÓN GENERAL
    --------------------------------------------------------- */

    function init() {
        createAuthModal();
        renderAuthBox();
        applyAccessControl();

        // Las páginas protegidas se inicializan solo con una sesión válida.
        const protectedMain = document.querySelector('main[data-auth]');
        const accessCard = document.querySelector('.access-card');
        if (protectedMain && accessCard) return;

        initProfile();
        initHome();
        initComparator();
        initAlerts();
        initEntrepreneur();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
