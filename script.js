/**
 * 300316045 Soomin Kim
 */
const url = "https://randomuser.me/api/?results=12&nat=us"
const gallery = document.querySelector("#gallery");
let employee;

fetch(url)
.then(response => response.json())
.then(data => {
  employee = data.results;
  HtmlSetting(employee);
})
.catch(err => (Error('Error has occured!', err)));


function HtmlSetting(users) {
  const cardArray = [];

  users.map(person => {
    const userCard = 
    `<div class = "card">
      <div class = "card-img-container">
        <img class = "card-img" src = "${person.picture.large}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="card-text">${person.email}</p>
        <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
      </div>
    </div>`;
    cardArray.push(userCard);
  })

  cardArray.forEach(card => {
    gallery.insertAdjacentHTML ('beforeend', card);
  })
 // https://stackoverflow.com/questions/40056890/push-items-into-array-using-eventlistener
  const cardBtn = document.querySelectorAll(".card");
  for(let i = 0; i < cardBtn.length; i ++) {
    cardBtn[i].addEventListener('click', function(event) {
      const e = event.target;
      if(e === cardBtn[i] || cardBtn[i].contains(e)) {
        modalSetting(users, i)
      }
    })
  }
}


function modalSetting(users, index) {
  const person = users[index];
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal-container");

  const modal = 
  `<div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${person.picture.large}" alt="profile picture">
          <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="modal-text">${person.email}</p>
          <p class="modal-text cap">${person.location.city}</p><hr>
          <p class="modal-text">${person.phone}</p>
          <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>
          <p class="modal-text">Birthday: ${person.dob.date.substr(0, 10)}</p>
        </div>
    </div>`;

    modalContainer.innerHTML = modal;
    document.body.insertBefore(modalContainer, modal.firstChild);


    const esc = document.getElementById("modal-close-btn");
    modalContainer.addEventListener("click", function(event) {
      const e = event.target;
      if(e=== esc || esc.contains(e)) {
        document.body.removeChild(modalContainer);
      }
    })
}