document.body.style.cssText = `
  margin:0px;
  padding:0px;
  background:#ccc;
`;

//Get Workspace Name
const workspace = document
  .getElementById("dndhelpdesklive")
  .getAttribute("src")
  ?.split("#")[1];
const chatInstanceName = document
  .getElementById("dndhelpdesklive")
  .getAttribute("src")
  ?.split("#")[2];

//Instance Object Database Chat Document
const instanceObject = [
  {
    name: "Support",
    button_color: "#000",
    button_text_color: "#000",
    background_color: "#010",
    position: "right",
    bannerMessage: "Welcome to support",
    bannerColor: "#fff",
    suggested_articles: [
      "What Is A Help Desk ?",
      "How Do I Set Up My Account ?",
      "Is My Data Secure ?",
    ],
  },
  {
    name: "Inquries",
    button_color: "#2563eb",
    button_text_color: "#fff",
    background_color: "#2563eb",
    position: "left",
    bannerMessage: "Welcome to Inquries",
    bannerColor: "#fff",
    suggested_articles: [
      "Refund Policy",
      "How to get started",
      "Resetting Your Password",
      "Setting Up Your Help Desk",
    ],
  },
]?.filter(
  (list) =>
    list.name?.toLowerCase()?.replace(/\s/gi, "") ===
    chatInstanceName?.toLowerCase()?.replace(/\s/gi, "")
)[0];

//All Articles List
const articles = [
  {
    id: 0,
    name: "How to get started",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 5,
    dislikes: 2,
    visits: 13,
  },
  {
    id: 1,
    name: "Resetting Your Password",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 0,
    dislikes: 0,
    visits: 0,
  },
  {
    id: 2,
    name: "Setting Up Your Help Desk",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 5,
    dislikes: 2,
    visits: 13,
  },
  {
    id: 3,
    name: "How to get started",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 5,
    dislikes: 2,
    visits: 13,
  },
  {
    id: 8,
    name: "How to export my existing contacts",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 5,
    dislikes: 2,
    visits: 13,
  },
  {
    id: 4,
    name: "Refund Policy",
    contents:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, eveniet, laboriosam porro at voluptatum hic voluptatem pariatur, perspiciatis autem distinctio maiores voluptatibus maxime excepturi? Dolorem quis consectetur perferendis asperiores inventore!",
    likes: 5,
    dislikes: 2,
    visits: 13,
  },
];

//Track chat open status``
let chatIsOpen = window.localStorage.getItem("isChatOpen") ?? true;

//const start button template ================================
const start_button = `<button id="dndlive_chat_start_btn" style="cursor: pointer; height: 2rem;width: 6rem;display: flex;
	border:none;outline:none;
	transition-property: all; 
	justify-content: center; 
	align-items: center; 
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
	drop-shadow: drop-shadow: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));border-radius: 9999px;border-top-${instanceObject?.position}-radius: 0.125rem;background:${instanceObject?.button_color};transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
	">
	<span style="color:${instanceObject?.button_text_color};font-size: 0.9rem;user-select: none;">Contact Us</span>
	</button>`;

//Close Button =================================================
const close_button = `
<button id="dndlive_chat_close_btn" style="height:1.7rem;width:1.75rem;position:absolute;right:5px;top:5px;background-color: inherit;border:none;outline:none;border-radius:3px;color:${instanceObject?.bannerColor};font-size:1.25rem;cursor:pointer;">&times;</button>`;

// Search Question ==============================================
const search = `<form id="dndhelplive-search-article" style="height:2.5rem;width:80%;margin:auto;margin-top:-1.25rem;oveflow:hidden;position:relative;" ><input style="height:100%;width:100%;outline:none;border:solid 1px #cbd5e1;border-radius:3px;padding:8px;padding-right:40px;color:#334155" id="dndhelpsearch" name="dndhelpsearch" type="search" placeholder="Search for help" autocomplete="off"/>
<button id="dndlive_search_article_btn" type="submit" style="position:absolute;right:5px;top:5px;height:1.9rem;width:2rem;border:none;border-radius:3px;background-color:${instanceObject?.button_color};color:${instanceObject?.button_text_color};cursor:pointer;">
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list-search" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <circle cx="15" cy="15" r="4"></circle>
   <path d="M18.5 18.5l2.5 2.5"></path>
   <path d="M4 6h16"></path>
   <path d="M4 12h4"></path>
   <path d="M4 18h4"></path>
</svg>
</button>
</form>`;

//Suggested Articles
const suggested = `
<div id="dndhelp_suggested_articles_container" style="width:85%;height:9rem;padding:8px 13px 8px 13px;background-color:transparent;margin:auto;margin-top:.25rem;border-radius:3px;overflow:hidden;">
</div>
`;

//Expanded Article controlls (Back, Like and Dislike)
const expandedArticle_Controls = `
<div style="position:absolute;top:-1.25rem;height:2.25rem;width:18.7rem;background:transparent;display:flex;justify-content:space-between;align-items:center;">
	<button id="dndhelp_close_article_btn" style="height:100%;width:4rem;background-color:#fff;border:none;border-radius:3px;color:${instanceObject?.background_color};font-size:0.8rem;cursor:pointer;">Back</button>
	<div style="display:flex;justify-content:space-between;align-items:center;height:100%;width:5.5rem;gap:3px;">
	<button id="dndhelp_like_article_btn" style="height:100%;width:2.5rem;background-color:#fff;border:none;border-radius:3px;color:${instanceObject?.background_color};cursor:pointer;">
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
</svg>
	</button>
	<button id="dndhelp_dislike_article_btn" style="height:100%;width:2.5rem;background-color:#fff;border:none;border-radius:3px;color:${instanceObject?.background_color};cursor:pointer;">
	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"></path>
</svg>
</button></div></div>
`;

//Expanded Article
const expandedArticle_View = `<div id="dndhelpExpanded_Article" style="width:18.75rem;height:18.75rem;background:#f1f5f9;margin:auto;margin-top:-3rem;z-index:1;box-shadow: 0 10px 20px -15px rgba(0, 0, 0, 0.25);display:none;
	drop-shadow: drop-shadow: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));border-bottom-right-radius: 0.3rem;border-bottom-left-radius: 0.3rem;border:solid 1px #e2e8f0;padding:10px;position:relative;">
	${expandedArticle_Controls}
	<div id="dndhelp_suggested_article_title" style="font-size:1.2rem;font-weight:500;color:#334155;padding:5px;padding-left:5px;margin-top:0.8rem;white-space: nowrap;overflow:hidden; text-overflow: ellipsis;"></div>
	<div id="dndhelp_suggested_article_body" style="width:100%;height:14.5rem;overfow:hidden ;margin-top:.5rem;overflow:hidden;display:flex;flex-direction:column;overflow-y: scroll;font-size:1.rem;font-weight:400;color:#334155;padding:5px;padding-left:5px;">
	</div>
	</div>`;

//No data found
const no_data = `
  <div
    id="dndhelp_no_data"
    style="height:fit-content;width:100%;display:none;flex-direction:column;justify-content:center;align-content:center;margin-top:1rem;"
  >
    <img
      src="https://github.com/dndHelp-Desk/resources/blob/main/no_data_found.png?raw=true"
      style="width:10rem;	object-position: center;object-fit: cover;margin:auto;"
    />
    <div
      id="dndhelp_suggested_articles_header"
      style="font-size:.9rem;font-weight: 400;letter-spacing: 0.03rem;color:#64748b;text-align: center;;width:100%;"
    >
      No results found
    </div>
  </div>`;

// Start View ===================================================
const startView = `<div id="dndhelp_startScreen" style="width:20rem;height:20rem;background:#f1f5f9;margin:auto;margin-top:-3rem;z-index:1;box-shadow: 0 10px 20px -15px rgba(0, 0, 0, 0.25);
	drop-shadow: drop-shadow: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));border-bottom-right-radius: 0.3rem;border-bottom-left-radius: 0.3rem;border:solid 1px #e2e8f0;">
	<div style="width:100%;height:4.25rem;background-color:#e2e8f0;display:flex;flex-direction:column;">
	<div style="font-size:1.2rem;font-weight:600;color:#334155;padding:10px;padding-left:20px;padding-top:13px;">Have a question ?</div>
	</div>
	${search}
	<div id="dndhelp_suggested_articles_header" style="font-size:.9rem;font-weight: 400;letter-spacing: 0.03rem;color:#64748b;padding:10px;padding-left:20px;padding-top:15px;">Suggested articles</div>
  ${no_data}
	${suggested}
	</div>`;

// Contact Us Btn ===================================================
const contactUsBtn = `<button id="dndhelp_contactUs_Btn" style="width:20rem;height:3rem;background:#f1f5f9;margin:auto;margin-top:0rem;z-index:1;box-shadow: 0 10px 20px -15px rgba(0, 0, 0, 0.25);border-radius:5px;border:solid 1px #e2e8f0;font-size:.9rem;font-weight:550;color:#334155;display:flex;justify-content:space-between;align-items:center;padding:10px;letter-spacing: 0.025em;cursor:pointer;">
<span>Contacts Us</span>
<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <line x1="5" y1="12" x2="19" y2="12"></line>
   <line x1="13" y1="18" x2="19" y2="12"></line>
   <line x1="13" y1="6" x2="19" y2="12"></line>
</svg>
</button>`;

// Contact Us View Options ===================================================
const contactUs_View_Options = `
<div id="dndhelp_contactUs_View_Options" style="width:90%;heightt:20rem;z-index:2;background:#f1f5f9;box-shadow: 0 10px 20px -15px rgba(0, 0, 0, 0.25);border-radius:5px;border:solid 1px #e2e8f0;display:flex;flex-direction:column;"></div>`;

//Start Widget Container ==============================================
const dndlive_startScreenComponent = `<div id="dndlive_startScreenComponent" style="height: 33rem;width:23rem;
	overflow:hidden;
	margin-top:0;
	display:flex;
	flex-direction:column;
	transition:height .2s,margin .3s;
	box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); 
	drop-shadow: drop-shadow: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));border-radius:0.5rem;background:#fff;border:solid 1px #cbd5e1;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	">
	<div style="width:100%;height:10rem;display:flex;background:${instanceObject?.background_color};position:relative;top:0;">
	${close_button}
	<h1 style="font-size:1.5rem;font-weight:500;color:${instanceObject?.bannerColor};padding:10px;padding-left:25px;margin-top:30px;">${instanceObject?.bannerMessage}</h1>
	</div>
	<div id="dndhelp_home_container" style="width:100%;heightt:fit-content;z-index:2;gap:12px;display:flex;flex-direction:column;">
	${startView}
	${expandedArticle_View}
	${contactUsBtn}
	</div>
	</div>`;

//Widget Container ==============================================
const widgetContainer = `
<div id="dndlive_widget_container" style="height:35rem;width: 25rem;display: flex; flex-direction:column;
	justify-content:space-between; align-items:${
    instanceObject?.position === "left" ? "start" : "end"
  };
	gap:8px;
	padding:5px;
	position: fixed; 
	${instanceObject?.position}: 0.5rem; 
	bottom: 1rem; 
	transition-property: all; z-index: 99999;background:transparent;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
	"> 
	${dndlive_startScreenComponent}
	${start_button}
	</div>`;

//=============================== Functions and Logic ==============================

//Update Chat Open Status
const chat = document.getElementById("dndlive_widget_container");

//Install Chat Based On Status
document.body.insertAdjacentHTML("beforeend", widgetContainer);

//Close Open Btns and widget Ref
const openBtn = document.getElementById("dndlive_chat_start_btn");
const closeBtn = document.getElementById("dndlive_chat_close_btn");
const widgetStartScreen = document.getElementById(
  "dndlive_startScreenComponent"
);

//Close and Open Function
document.addEventListener("click", (e) => {
  if (closeBtn?.contains(e.target)) {
    widgetStartScreen.style.height = "0rem";
    widgetStartScreen.style.width = "0rem";
    widgetStartScreen.style.marginTop = "100%";
  } else if (openBtn?.contains(e.target)) {
    widgetStartScreen.style.height = "33rem";
    widgetStartScreen.style.width = "23rem";
    widgetStartScreen.style.marginTop = "0";
  } else if (
    !openBtn?.contains(e.target) &&
    !widgetStartScreen?.contains(e.target)
  ) {
    widgetStartScreen.style.height = "0rem";
    widgetStartScreen.style.width = "0rem";
    widgetStartScreen.style.marginTop = "100%";
  }
});

//Open Button Hover Effect
openBtn.onmouseover = () => (openBtn.style.transform = "translateY(-0.2rem)");
openBtn.onmouseleave = () => (openBtn.style.transform = "translateY(0rem)");

//Search Button Hover Effect
const dndlive_search_article_btn = document.getElementById(
  "dndlive_search_article_btn"
);
dndlive_search_article_btn.onmouseover = () =>
  (dndlive_search_article_btn.style.opacity = 0.9);
dndlive_search_article_btn.onmouseleave = () =>
  (dndlive_search_article_btn.style.opacity = 1);

//Add Sugested Articles
instanceObject?.suggested_articles?.splice(0, 4)?.forEach((article) => {
  let filteredArticle = [...articles]?.filter(
    (art) =>
      art.name?.toLowerCase()?.replace(/\s/gi, "") ===
      article?.toLowerCase()?.replace(/\s/gi, "")
  )[0];
  document
    .getElementById("dndhelp_suggested_articles_container")
    ?.insertAdjacentHTML(
      "beforeend",
      `<div data-articleId="${filteredArticle.id}" class="dndhelp_article_list" style="height:2.25rem;width:100%;border-bottom:solid 1px #cbd5e1;display:flex;align-items:center;font-size:0.9rem;color:#475569;white-space: nowrap;overflow:hidden;cursor:pointer;user-select: none;">${filteredArticle.name}</div>`
    );
});

//Searh For An Article
document
  .getElementById("dndhelplive-search-article")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchedValue = document.getElementById("dndhelpsearch");
    let suggestedArticle = document.getElementsByClassName(
      "dndhelp_article_list"
    );
    let suggestedArticleHeader = document.getElementById(
      "dndhelp_suggested_articles_header"
    );
    //Hide Suggested
    suggestedArticleHeader.style.display = "none";
    Array.prototype.forEach.call(suggestedArticle, (art) => {
      art.style.display = "none";
    });
    //Add Found Result
    let results = articles?.filter((art) =>
      art.name
        ?.toLowerCase()
        ?.replace(/\s/gi, "")
        ?.includes(searchedValue?.value?.toLowerCase()?.replace(/\s/gi, ""))
    );
    if (results.length >= 1) {
      results?.forEach((article) => {
        document
          .getElementById("dndhelp_suggested_articles_container")
          ?.insertAdjacentHTML(
            "beforeend",
            `<div data-articleId="${article.id}" class="dndhelp_article_list" style="height:2.25rem;width:100%;border-bottom:solid 1px #cbd5e1;display:flex;align-items:center;font-size:0.9rem;color:#475569;white-space: nowrap;overflow:hidden;cursor:pointer;user-select: none;">${article.name}</div>`
          );
      });
      document.getElementById("dndhelp_no_data").style.display = "none";
    } else if (results.length <= 0) {
      document.getElementById("dndhelp_no_data").style.display = "flex";
    }
  });

//Expand Each Article
document.addEventListener("click", (e) => {
  let startView = document.getElementById("dndhelp_startScreen");
  let expandedArticleContainer = document.getElementById(
    "dndhelpExpanded_Article"
  );
  const backBtn = document.getElementById("dndhelp_close_article_btn");
  let title = document.getElementById("dndhelp_suggested_article_title");
  let body = document.getElementById("dndhelp_suggested_article_body");
  if (e.target.classList?.contains("dndhelp_article_list")) {
    let selectedArticle = articles.filter(
      (article) => article?.id == e.target.getAttribute("data-articleId")
    )[0];
    //hide Home View and Expanded Article
    startView.style.display = "none";
    expandedArticleContainer.style.display = "";
    title.innerHTML = selectedArticle?.name;
    body.innerHTML = selectedArticle?.contents;
  } else if (backBtn?.contains(e.target)) {
    startView.style.display = "";
    expandedArticleContainer.style.display = "none";
  }
});
