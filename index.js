let CORS_PROXY = "https://api.allorigins.win/raw?url=";
let API_URL = "https://hp-api.onrender.com/api/characters";


async function fetchData() {
    try {
        let res = await fetch(CORS_PROXY + API_URL, {
            headers: {
                "content-type": "application/json",
            },
            method: "GET",
        });

        let data = await res.json();
        if (data) {
            let root = document.getElementById("root");
            data.forEach((e, i) => {
                let cardItem = document.createElement("div");
                cardItem.innerHTML = `
                    <div class="wrapper">
                        <div class="card">
                            <img src="${e.image}" alt="">
                            <h3>${e.name}</h3> 
                            <div class="mybox"> 
                                <p>Gender: ${e.gender}</p> 
                                <p>House: ${e.house}</p>
                                <p>Date of Birth: ${e.dateOfBirth}</p>
                                <span id="span1-${i}">...</span> 
                                <span class="mybox1" id="mybox1-${i}" style="display: none;"> 
                                    <p>Eye Colour: ${e.eyeColour}</p>
                                    <p>Hair Colour: ${e.hairColour}</p>
                                    <p>Actor: ${e.actor}</p>
                                </span>  
                                <button class="btn btn-primary" onclick="toggleDetails(${i})"> 
                                    More Details 
                                </button> 
                            </div> 
                        </div>
                    </div>`;
                root.appendChild(cardItem);
            });
        } else {
            alert(`${res.status} - ${res.statusText}`);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function toggleDetails(index) {
    let moreDetailsSpan = document.getElementById(`mybox1-${index}`);
    let span1 = document.getElementById(`span1-${index}`);
    if (moreDetailsSpan.style.display === "none") {
        moreDetailsSpan.style.display = "block";
        span1.style.display = "none";
    } else {
        moreDetailsSpan.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    fetchData();
});