import { db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

let seletorCategoria = document.getElementById("categoria");
let campoBusca = document.getElementById("busca");
let campoLocalizacao = document.getElementById("localizacao");
let resultado = document.getElementById("resultado");
let cardContainer = document.getElementById("cardContainer");
let botaoFiltro = document.querySelector(".aplica-filtro");
let mensagemFavorito = document.getElementById("mensagem-favorito");

let modalDetalhes = document.getElementById("modalDetalhes");
let fecharModal = document.getElementById("fecharModal");
let modalFoto = document.getElementById("modalFoto");
let modalGaleria = document.getElementById("modalGaleria");
let modalNome = document.getElementById("modalNome");
let modalCategoria = document.getElementById("modalCategoria");
let modalBairro = document.getElementById("modalBairro");
let modalWhatsapp = document.getElementById("modalWhatsapp");
let modalInstagramLink = document.getElementById("modalInstagramLink");
let modalHorarios = document.getElementById("modalHorarios");
let modalPagamentos = document.getElementById("modalPagamentos");
let modalDescricao = document.getElementById("modalDescricao");
let modalBtnZap = document.getElementById("modalBtnZap");

let listaComerciosOriginal = [];

let parametros = new URLSearchParams(window.location.search);
let categoriaUrl = parametros.get("categoria");

let buscaUrl = parametros.get("busca");

// ==========================================
// AUXILIARES (busca, categorias e segurança)
// ==========================================
let BASE = "../";

// Cada filtro do menu agrupa várias categorias cadastradas no painel
let GRUPOS_CATEGORIA = {
    alimentacao: ["alimenta", "confeitaria", "salgados", "cozinha", "acai"],
    beleza: ["beleza", "cabelo", "barbearia", "unhas", "cilios", "estetica", "maquiagem"],
    tatuagem: ["tatuagem", "piercing"],
    costura: ["moda", "brecho", "costura"],
    artesanato: ["artesanato", "acessorios"],
    servicos: ["servico", "costura", "manutencao", "reformas", "limpeza", "eventos", "fotografia", "aulas", "reforco"],
    outros: ["outros"]
};

// Links antigos do menu da página inicial continuam funcionando
let APELIDOS_CATEGORIA = {
    "servico-tecnico": "servicos",
    "festas": "servicos",
    "fretes": "servicos",
    "manicure": "beleza",
    "cabelo": "beleza"
};

function escapar(texto) {
    return String(texto === undefined || texto === null ? "" : texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function normalizarTexto(texto) {
    if (!texto) return "";
    return String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function resolverCategoria(valor) {
    let chave = normalizarTexto(valor);
    return APELIDOS_CATEGORIA[chave] || chave;
}

function categoriaCorresponde(categoriaDoComercio, filtro) {
    if (!filtro || filtro === "todas") return true;
    let cat = normalizarTexto(String(categoriaDoComercio || "").replace(/["']/g, ""));
    if (!cat) return false;
    let palavras = GRUPOS_CATEGORIA[filtro];
    if (!palavras) return cat.includes(filtro);
    return palavras.some(function(p) { return cat.includes(p); });
}

// Todas as palavras digitadas precisam aparecer em nome, descrição, categoria ou bairro
function buscaCorresponde(textoBusca, campos) {
    let palavras = normalizarTexto(textoBusca).split(/\s+/).filter(Boolean);
    if (palavras.length === 0) return true;
    let palheiro = normalizarTexto(campos.join(" "));
    return palavras.every(function(p) { return palheiro.includes(p); });
}

if (categoriaUrl && seletorCategoria) {
    let categoriaResolvida = resolverCategoria(categoriaUrl);
    if (Array.from(seletorCategoria.options).some(function(opcao) { return opcao.value === categoriaResolvida; })) {
        seletorCategoria.value = categoriaResolvida;
    }
}

if (buscaUrl && campoBusca) {
    campoBusca.value = buscaUrl.trim().slice(0, 100);
}

// Mantém o termo pesquisado também no campo de busca do header
let campoBuscaHeader = document.querySelector('header.cabecalho-principal input[type="search"]');
if (buscaUrl && campoBuscaHeader) {
    campoBuscaHeader.value = buscaUrl.trim().slice(0, 100);
}

function carregarFavoritosSalvos() {
    return JSON.parse(localStorage.getItem("comerciosFavoritos") || "[]");
}

function salvarFavoritosLocal(favoritos) {
    localStorage.setItem("comerciosFavoritos", JSON.stringify(favoritos));
}

function ativarEventosFavoritos() {
    let botoesFavoritos = document.querySelectorAll(".top-favoritos");
    let tempoMensagem;

    botoesFavoritos.forEach(function(botao) {
        let identificador = botao.getAttribute("data-id");
        let favoritos = carregarFavoritosSalvos();

        if (favoritos.includes(identificador)) {
            botao.classList.add("ativo");
            let estrela = botao.querySelector(".estrela");
            if (estrela) estrela.textContent = "★";
            botao.setAttribute("aria-pressed", "true");
        }

        botao.addEventListener("click", function(e) {
            e.stopPropagation();
            let estrela = botao.querySelector(".estrela");
            if (!estrela) return;

            botao.classList.toggle("ativo");
            let listaAtual = carregarFavoritosSalvos();

            if (botao.classList.contains("ativo")) {
                estrela.textContent = "★";
                botao.setAttribute("aria-pressed", "true");
                mensagemFavorito.textContent = "★ Adicionado aos favoritos!";
                
                if (!listaAtual.includes(identificador)) {
                    listaAtual.push(identificador);
                }
            } else {
                estrela.textContent = "☆";
                botao.setAttribute("aria-pressed", "false");
                mensagemFavorito.textContent = "☆ Removido dos favoritos!";
                
                listaAtual = listaAtual.filter(id => id !== identificador);
            }

            salvarFavoritosLocal(listaAtual);

            mensagemFavorito.style.display = "block";
            clearTimeout(tempoMensagem);

            tempoMensagem = setTimeout(function() {
                mensagemFavorito.style.display = "none";
            }, 3000);
        });
    });
}

function exibirCards(comercios) {
    cardContainer.innerHTML = "";
    let quantidadeResultados = 0;

    comercios.forEach(function(comercio) {
        let statusConta = comercio.statusConta;
        let contaAtiva = false;

        if (statusConta && typeof statusConta === "object") {
            contaAtiva = statusConta.ativa === true;
        } else if (typeof statusConta === "boolean") {
            contaAtiva = statusConta;
        }

        if (!contaAtiva) return;

        let negocio = comercio.dadosNegocio || {};

        let nome = comercio.nomeComercio || negocio.nome || comercio.nomeEmpreendedor || "";
        let categoriaBruta = comercio.categoria || negocio.categoria || "Geral";
        let categoria = categoriaBruta.replace(/["']/g, "").trim();

        let bairro = comercio.bairro || negocio.bairro || "Região Central";
        let telefone = comercio.whatsapp || negocio.whatsapp || comercio.telefone || "Não informado";
        let descricao = comercio.descricao || negocio.descricao || "Conheça os produtos e serviços oferecidos por este empreendedor.";
        let instagram = comercio.instagram || negocio.instagram || "";
        
        let horariosObj = comercio.horarios || negocio.horarios || {};
        let pagamentosArr = comercio.pagamentos || negocio.pagamentos || [];
        
        if (!nome || nome.trim() === "" || nome === "-") return;

        let fotoPrincipal = BASE + "imagens/trancista.png";
        if (comercio.logo && comercio.logo.trim() !== "" && comercio.logo !== "-") {
            fotoPrincipal = comercio.logo;
        } else if (comercio.fotoUrl && comercio.fotoUrl.trim() !== "" && comercio.fotoUrl !== "-") {
            fotoPrincipal = comercio.fotoUrl;
        } else if (negocio.fotoUrl && negocio.fotoUrl.trim() !== "" && negocio.fotoUrl !== "-") {
            fotoPrincipal = negocio.fotoUrl;
        }

        let fotosGaleria = [];
        let galeriaObj = comercio.galeria || negocio.galeria;
        if (galeriaObj) {
            if (Array.isArray(galeriaObj)) {
                fotosGaleria = galeriaObj.filter(f => f && f.trim() !== "");
            } else if (typeof galeriaObj === "object") {
                fotosGaleria = Object.values(galeriaObj).filter(f => f && typeof f === "string" && f.trim() !== "");
            }
        }

        let idUnico = nome.toLowerCase().replace(/\s+/g, '-');

        let card = document.createElement("div");
        card.className = "card-resultados";
        card.setAttribute("data-categoria", categoria.toLowerCase());

        card.innerHTML = `
            <img src="${escapar(fotoPrincipal)}" alt="${escapar(nome)}" onerror="this.onerror=null;this.src='${BASE}imagens/trancista.png'">
            <span class="top-categorias">${escapar(categoria)}</span>
            <button type="button" class="top-favoritos" data-id="${escapar(idUnico)}" aria-pressed="false">
                <span class="estrela">☆</span> Destaque
            </button>

            <div class="conteudo-card">
                <div class="informacoes">
                    <div class="localizacao">
                        <img src="${BASE}icones/iconemarcador.png" alt="Marcador">
                        <span class="bairro">${escapar(bairro)}</span>
                    </div>

                    <h3>${escapar(nome)}</h3>
                    <p class="info-extra"><strong>Tel/Zap:</strong> ${escapar(telefone)}</p>
                    <p class="descricao-card">${escapar(descricao)}</p>
                </div>

                <button type="button" class="ver-detalhes-btn">Ver detalhes</button>
            </div>
        `;

        let btnDetalhes = card.querySelector(".ver-detalhes-btn");
        btnDetalhes.addEventListener("click", function() {
            if (modalFoto) modalFoto.src = fotoPrincipal;
            if (modalNome) modalNome.textContent = nome;
            if (modalCategoria) modalCategoria.textContent = categoria;
            if (modalBairro) modalBairro.textContent = bairro;
            if (modalWhatsapp) modalWhatsapp.textContent = telefone;
            if (modalDescricao) modalDescricao.textContent = descricao;

            if (modalInstagramLink) {
                if (instagram) {
                    let handleLimpo = instagram.replace('@', '');
                    modalInstagramLink.textContent = instagram;
                    modalInstagramLink.href = `https://instagram.com/${encodeURIComponent(handleLimpo)}`;
                    modalInstagramLink.style.display = "inline";
                } else {
                    modalInstagramLink.textContent = "Não informado";
                    modalInstagramLink.href = "#";
                }
            }

            if (modalHorarios) {
                let txtHorarios = [];
                if (horariosObj.segAfeInic) txtHorarios.push(`Seg-Sex: ${horariosObj.segAfeInic} às ${horariosObj.segAfeFim}`);
                if (horariosObj.sabInic) txtHorarios.push(`Sáb: ${horariosObj.sabInic} às ${horariosObj.sabFim}`);
                if (horariosObj.domInic) txtHorarios.push(`Dom/Fer: ${horariosObj.domInic} às ${horariosObj.domFim}`);
                modalHorarios.textContent = txtHorarios.length > 0 ? txtHorarios.join(" | ") : "Horários não informados";
            }

            if (modalPagamentos) {
                modalPagamentos.textContent = pagamentosArr.length > 0 ? pagamentosArr.join(", ") : "Não informadas";
            }

            if (modalGaleria) {
                modalGaleria.innerHTML = "";
                if (fotosGaleria.length > 0) {
                    modalGaleria.style.display = "flex";

                    fotosGaleria.forEach((urlFoto, index) => {
                        let miniatura = document.createElement("img");
                        miniatura.src = urlFoto;
                        miniatura.alt = `Foto ${index + 1} de ${nome}`;
                        
                        if (index === 0 && fotoPrincipal === urlFoto) {
                            miniatura.classList.add("ativo");
                        }

                        miniatura.addEventListener("click", function() {
                            if (modalFoto) modalFoto.src = urlFoto;
                            document.querySelectorAll(".modal-galeria-miniaturas img").forEach(img => img.classList.remove("ativo"));
                            miniatura.classList.add("ativo");
                        });

                        modalGaleria.appendChild(miniatura);
                    });
                } else {
                    modalGaleria.style.display = "none";
                }
            }

            if (modalBtnZap) {
                if (telefone && telefone !== "Não informado") {
                    let numeroLimpo = telefone.replace(/\D/g, "");
                    modalBtnZap.href = `https://wa.me/55${numeroLimpo}`;
                    modalBtnZap.style.display = "block";
                } else {
                    modalBtnZap.style.display = "none";
                }
            }

            if (modalDetalhes) {
                modalDetalhes.style.display = "flex";
            }
        });

        cardContainer.appendChild(card);
        quantidadeResultados++;
    });

        if (quantidadeResultados === 0) {
        cardContainer.innerHTML = `<p class="sem-resultados" style="padding: 20px;">Nenhum comércio encontrado. Tente outras palavras ou limpe os filtros.</p>`;
    }

    if (resultado) resultado.textContent = quantidadeResultados;
    ativarEventosFavoritos();
}

if (fecharModal) {
    fecharModal.addEventListener("click", () => { 
        if (modalDetalhes) modalDetalhes.style.display = "none"; 
    });
}

window.addEventListener("click", (e) => { 
    if (modalDetalhes && e.target === modalDetalhes) {
        modalDetalhes.style.display = "none"; 
    }
});

function aplicarFiltros() {
    let categoriaSelecionada = resolverCategoria(seletorCategoria.value);
    let textoBusca = campoBusca.value;
    let textoLocalizacao = normalizarTexto(campoLocalizacao.value);

    let comerciosFiltrados = listaComerciosOriginal.filter(function(comercio) {
        let negocio = comercio.dadosNegocio || {};
        let nomeOriginal = comercio.nomeComercio || negocio.nome || comercio.nomeEmpreendedor || "";
        if (!nomeOriginal || nomeOriginal.trim() === "" || nomeOriginal === "-") return false;

        let bairro = comercio.bairro || negocio.bairro || "";
        let categoria = comercio.categoria || negocio.categoria || "";
        let descricao = comercio.descricao || negocio.descricao || "";

        let correspondeCategoria = categoriaCorresponde(categoria, categoriaSelecionada);
        let correspondeBusca = buscaCorresponde(textoBusca, [nomeOriginal, descricao, categoria, bairro]);
        let correspondeLocalizacao = normalizarTexto(bairro).includes(textoLocalizacao);

        return correspondeCategoria && correspondeBusca && correspondeLocalizacao;
    });

    exibirCards(comerciosFiltrados);
}

async function carregarDadosFirebase() {
    try {
        let comercioRef = ref(db, 'Comercio');
        let snapshot = await get(comercioRef);

        if (snapshot.exists()) {
            let dados = snapshot.val();
            listaComerciosOriginal = Object.values(dados);
            aplicarFiltros();
        } else {
            cardContainer.innerHTML = `<p class="sem-resultados" style="padding: 20px;">Nenhum comércio encontrado no banco de dados.</p>`;
            if (resultado) resultado.textContent = "0";
        }
    } catch (error) {
        console.error("Erro ao carregar dados do Firebase:", error);
        cardContainer.innerHTML = `<p class="sem-resultados" style="padding: 20px;">Erro ao conectar com o servidor.</p>`;
    }
}

if (botaoFiltro) botaoFiltro.addEventListener("click", aplicarFiltros);
if (campoBusca) {
    campoBusca.addEventListener("input", aplicarFiltros);
    campoBusca.addEventListener("keyup", function(e) {
        if (e.key === "Enter") aplicarFiltros();
    });
}
if (campoLocalizacao) {
    campoLocalizacao.addEventListener("input", aplicarFiltros);
    campoLocalizacao.addEventListener("keyup", function(e) {
        if (e.key === "Enter") aplicarFiltros();
    });
}
if (seletorCategoria) seletorCategoria.addEventListener("change", aplicarFiltros);

window.addEventListener("DOMContentLoaded", carregarDadosFirebase);