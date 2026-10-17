// =======================================================================
// SCRIPT DA PÁGINA SOBRE (scripts/sobre.js)
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    const btnMenuMobile = document.getElementById('btn-menu-mobile');
    const btnFecharMenu = document.getElementById('btn-fechar-menu');
    const menuColapsavel = document.getElementById('menu-colapsavel');
    const overlayMenu = document.getElementById('overlay-menu');
    const btnCategorias = document.getElementById('btn-categorias');
    const listaCategorias = document.getElementById('lista-categorias');
    const cabecalho = document.querySelector('header.cabecalho-principal');

    // 1. Abrir e fechar menu lateral no celular
    if (btnMenuMobile && menuColapsavel && overlayMenu) {
        const fecharMenu = () => {
            menuColapsavel.classList.remove('aberto');
            overlayMenu.classList.remove('ativo');
        };

        btnMenuMobile.addEventListener('click', () => {
            menuColapsavel.classList.add('aberto');
            overlayMenu.classList.add('ativo');
        });

        if (btnFecharMenu) btnFecharMenu.addEventListener('click', fecharMenu);
        overlayMenu.addEventListener('click', fecharMenu);
    }

    // 2. Abrir e fechar o dropdown de Categorias
    if (btnCategorias && listaCategorias) {
        btnCategorias.addEventListener('click', (e) => {
            e.preventDefault();
            const aberto = listaCategorias.classList.contains('mostrar');
            listaCategorias.classList.toggle('mostrar', !aberto);
            listaCategorias.classList.toggle('escondido', aberto);
            btnCategorias.setAttribute('aria-expanded', String(!aberto));
        });

        document.addEventListener('click', (e) => {
            if (!btnCategorias.contains(e.target) && !listaCategorias.contains(e.target)) {
                listaCategorias.classList.remove('mostrar');
                listaCategorias.classList.add('escondido');
                btnCategorias.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 3. Deixar o cabeçalho escuro ao rolar a página
    if (cabecalho) {
        window.addEventListener('scroll', () => {
            cabecalho.classList.toggle('header-escuro', window.scrollY > 50);
        });
    }
});