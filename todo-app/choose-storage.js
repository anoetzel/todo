
export function getStorage() {
  const radio = document.querySelectorAll('.form-check');
  const local = document.getElementById('flexRadioDefault1');
  const server = document.getElementById('flexRadioDefault2');

  if (!localStorage.getItem('storage')) {
    localStorage.setItem('storage', 'local');
    local.setAttribute('checked', 'true');
  }
  if (localStorage.getItem('storage') === 'server') {
    local.removeAttribute('checked', 'true');
    server.setAttribute('checked', 'true');
  }
  if (localStorage.getItem('storage') === 'local') {
    server.removeAttribute('checked', 'true');
    local.setAttribute('checked', 'true');
  }


  radio.forEach(e => {
    e.addEventListener('click', event => {
      if (event.target == local) {
        localStorage.setItem('storage', 'local');
        server.removeAttribute('checked', 'true');
        local.setAttribute('checked', 'true');
      }
      if (event.target == server) {
        localStorage.setItem('storage', 'server');
        local.removeAttribute('checked', 'true');
        server.setAttribute('checked', 'true');
      }
      location.reload();
    });
  });
}


