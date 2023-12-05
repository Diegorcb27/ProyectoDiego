// console.log("se cargo la pagina");

function changeText(label){
    const phrase=label.textContent;
    let text ='';
    for (const item of phrase) {
        if (item!==' ') {
            text += `
            <b>${item}</b>
            `;
            
        } else {
            text += `
            <u>${item}</u>
            `;
        }
    label.innerHTML=text;
        
    }
};

function animateText(label) {
    const text=document.querySelectorAll("b");
    let i=0;
    const print=setInterval(() => {
        text[i].classList.toggle("zoom");
        i++;
        if(i>=text.length){
            clearInterval(print);
            i=0;
            const clear=setInterval(() => {
                text[i].classList.toggle("zoom");
                i++;
                if(i>=text.length){
                    clearInterval(clear);
                }
            }, 200);
        }
    }, 200);
}

function skills(){
    const skill=document.querySelector(".slider_skills"); //lee la clase que contiene las imagenes en figure
    const list=document.querySelectorAll(".slider_skills img"); //se le agrega queryselectorALL porque son varias imagenes las que queremos traer
    const images=Array.from(list).map(element => element.getAttribute("src")) //traemos las direcciones de las imagenes con el atributo src
    // console.log(images);
    let count=0;
    let html=`<img src="${images[count]}" alt="hard skill">` //construyo una etiqueta image, donde se almacenara cada imagen y sera inyectada donde este .slider_skills (figure), ademas se coloca count=0 para que solo se vea la primera imagen es decir se va a sustituir las imagenes anteriores por las imagenes agregadas, por eso sale solo la primera imagen
    skill.innerHTML = html; //inyecta las nuevas etiquetas de imagenes en la caja con la clase de .slider_skills(skill)
    const prev = document.querySelector(".btn_prev");
    const next = document.querySelector(".btn_next");

    prev.addEventListener("click", () => {
        clearInterval(interval);
        if(count > 0){
            count--;
        } else{
            count=images.length-1;
        }
        html=`<img src="${images[count]}" alt="hard skill">`;
        skill.innerHTML = html;
    })



    next.addEventListener("click", () => {
        clearInterval(interval);
        if(count<images.length-1){
            count++;
        } else{
            count=0;
        }
        html=`<img src="${images[count]}" alt="hard skill">`;
        skill.innerHTML = html;
    })

    const interval = setInterval(() => {
        if(count < images.length-1){
            count++;
        } else{
            count=0;
        }
        html=`<img src="${images[count]}" alt="hard skill">`;
        skill.innerHTML = html;
    }, 2000);

}
function mode(){
    const body = document.querySelector("body");
    const btn = document.querySelector(".icon_mode");
    const icon = document.querySelector(".icon_mode ion-icon");
    const iframe = document.querySelector(".header iframe");
    const link = iframe.contentDocument.querySelector("link");

//    console.log(link.getAttribute("href"));
//    console.log(link.href);

    btn.addEventListener("click", () => {
        body.classList.toggle("dark");
        if(icon.name==="sunny-sharp"){
            icon.name = "moon-sharp";    //no quiere cambiar el icono por el de la luna
        } else {
            icon.name="sunny-sharp";
        }
        if(link.getAttribute("href")==="./src/particles/dark.css"){
            link.href= "./src/particles/brigth.css"; 
        } else {
            link.href= "./src/particles/dark.css";
        }
        //con setAttribute
        // if(link.getAttribute("href")==="./src/particles/dark.css"){
        //    link.setAttribute("href", "./src/particles/brigth.css" )
        // } else {
        //     link.href= "./src/particles/dark.css";
        // }
    });
}

function sound(){
    const btn = document.querySelector(".icon_volume");
    const icon = document.querySelector(".icon_volume ion-icon");
    const audio = document.querySelector(".icon_volume audio");
    btn.addEventListener("click", () => {
        if(icon.name==="volume-mute-sharp"){
            icon.name="volume-high-sharp"
        } else{
            icon.name="volume-mute-sharp"
        }
        if(audio.paused){
            audio.play();
        } else{
            audio.pause();
        }
    })
}

function social() {
    const nav=document.querySelector(".header_nav")
    const footer = document.querySelector(".footer")
    footer.classList.toggle("active")
    setTimeout(() => {
        footer.classList.toggle("active")
    }, 2000);
    nav.addEventListener('click', ()=>{
        footer.classList.toggle("active")
            setTimeout(() => {
                footer.classList.toggle("active")
            }, 2000);
    } )
}

async function getApi(){
    const url= "https://fundametos-api-porfolios-dev-exsn.2.ie-1.fl0.io/api/v1/projects";
    try {
        const data = await fetch(url);
        const res = await data.json();
        localStorage.setItem("projects", JSON.stringify(res)); //para guardar en el localStorage
    //    console.log(res);
    return res;
    } catch (error) {
        console.log(error);
    }
}

function printProjects(projects) {
    const list = document.querySelectorAll(".splide__slide");
    const path=location.href.split("/").at(-1).at(0);
    projects.forEach((project, i) => {
        const {descripcion, image, tecnologias, titulo, description, technologies, title }=project;
        let html ="";
        // console.log(location.href.split("/").at(-1).at(0)); //por que location?
        if(path==="e"){
            html = `
                <div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <p>${technologies}</p>
                </div>
                <figure>
                    <img src="${image}" alt="slider item">
                </figure>
        `;
        } else {
            html = `
                <div>
                    <h3>${titulo}</h3>
                    <p>${descripcion}</p>
                    <p>${tecnologias}</p>
                </div>
                <figure>
                    <img src="${image}" alt="slider item">
                </figure>
        `;
        }
       
        list[i].innerHTML = html;
    });
}

function slider(){
    const splide = new Splide( '.splide', {
        type   : 'loop',
        autoplay:true,
        interval: 3000,
        speed: 1000,
        breakpoints: {
            849: {
                direction: 'ttb',
                height: "65vh",
            },
      }
      } );
    splide.mount();
}


async function main(){
    // const data=JSON.parse(localStorage.getItem("projects")); //para extraer del LocalStorage
    // console.log(data);
    const projects =JSON.parse(localStorage.getItem("projects")) || await getApi();
    const h1 = document.querySelector("h1");
    changeText(h1);
    animateText(h1);
   console.log(projects);
   printProjects(projects);
    skills();
    mode();
    sound();
    social();
    slider();
   
  

}

main();