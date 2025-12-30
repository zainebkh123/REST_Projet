// Configuration
const API_BASE = "http://localhost:8080/REST_Project/examen/projet/personnes";

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée, initialisation...');
    setupEventListeners();
    loadAllPersons();
});

// Configuration des événements
function setupEventListeners() {
    // Formulaire
    const form = document.getElementById('person-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            savePerson();
        });
    }
    
    // Bouton annuler
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', resetForm);
    }
}

// Charger toutes les personnes
function loadAllPersons() {
    showMessage('Chargement des personnes en cours...', 'info');
    
    fetch(API_BASE)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Données reçues:', data);
            displayPersons(data);
            showMessage(`${data.length} personne(s) chargée(s) avec succès`, 'success');
        })
        .catch(error => {
            console.error('Erreur lors du chargement:', error);
            showMessage(`Erreur de chargement: ${error.message}`, 'error');
        });
}

// Afficher les personnes dans le tableau
function displayPersons(persons) {
    const tbody = document.getElementById('person-table-body');
    const noData = document.getElementById('no-data');
    const countElement = document.getElementById('person-count');
    
    if (!tbody || !noData || !countElement) {
        console.error('Éléments HTML non trouvés');
        return;
    }
    
    // Mettre à jour le compteur
    countElement.textContent = persons.length;
    
    // Gérer le cas "aucune donnée"
    if (persons.length === 0) {
        tbody.innerHTML = '';
        noData.style.display = 'block';
        return;
    }
    
    noData.style.display = 'none';
    
    // Générer le HTML du tableau
    let html = '';
    persons.forEach(person => {
        html += `
            <tr>
                <td>${person.id}</td>
                <td>${person.nom}</td>
                <td>${person.age || '-'}</td>
                <td>${person.email || '-'}</td>
                <td>
                    <button class="btn btn-warning" onclick="editPerson(${person.id})" title="Modifier">
                        ✏️ Modifier
                    </button>
                    <button class="btn btn-danger" onclick="deletePerson(${person.id})" title="Supprimer">
                        🗑️ Supprimer
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Recherche par ID
function searchById() {
    const id = document.getElementById('search-id').value.trim();
    if (!id) {
        showMessage('Veuillez entrer un ID', 'warning');
        return;
    }
    
    showMessage(`Recherche de la personne avec l'ID ${id}...`, 'info');
    
    fetch(`${API_BASE}/id/${id}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Aucune personne trouvée avec cet ID');
                }
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayPersons([data]);
            showMessage(`Personne trouvée: ${data.nom}`, 'success');
        })
        .catch(error => {
            console.error('Erreur de recherche:', error);
            showMessage(error.message, 'error');
        });
}

// Recherche par nom
function searchByNom() {
    const nom = document.getElementById('search-nom').value.trim();
    if (!nom) {
        showMessage('Veuillez entrer un nom', 'warning');
        return;
    }
    
    showMessage(`Recherche de "${nom}"...`, 'info');
    
    fetch(`${API_BASE}/nom/${encodeURIComponent(nom)}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Aucune personne trouvée avec le nom "${nom}"`);
                }
                throw new Error(`Erreur HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayPersons([data]);
            showMessage(`Personne trouvée: ${data.nom}`, 'success');
        })
        .catch(error => {
            console.error('Erreur de recherche:', error);
            showMessage(error.message, 'error');
        });
}

// Sauvegarder une personne (AJOUT ou MODIFICATION)
function savePerson() {
    const person = {
        nom: document.getElementById('nom').value.trim(),
        age: document.getElementById('age').value.trim() || null,
        email: document.getElementById('email').value.trim() || null
    };
    
    // Validation
    if (!person.nom) {
        showMessage('Le nom est obligatoire', 'warning');
        return;
    }
    
    // Convertir l'âge en nombre si présent
    if (person.age !== null) {
        person.age = parseInt(person.age);
        if (isNaN(person.age) || person.age < 0 || person.age > 150) {
            showMessage('L\'âge doit être un nombre entre 0 et 150', 'warning');
            return;
        }
    }
    
    const id = document.getElementById('person-id').value;
    const isUpdate = !!id;
    const url = isUpdate ? `${API_BASE}/update/${id}` : `${API_BASE}/add`;
    const method = isUpdate ? 'PUT' : 'POST';
    
    showMessage(isUpdate ? 'Modification en cours...' : 'Ajout en cours...', 'info');
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(person)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Réponse serveur:', data);
        resetForm();
        loadAllPersons();
        showMessage(isUpdate ? '✅ Personne modifiée avec succès' : '✅ Personne ajoutée avec succès', 'success');
    })
    .catch(error => {
        console.error('Erreur lors de l\'enregistrement:', error);
        showMessage(`❌ Erreur: ${error.message}`, 'error');
    });
}

// Modifier une personne
function editPerson(id) {
    showMessage(`Chargement de la personne ID ${id}...`, 'info');
    
    fetch(`${API_BASE}/id/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }
            return response.json();
        })
        .then(person => {
            // Remplir le formulaire
            document.getElementById('person-id').value = person.id;
            document.getElementById('nom').value = person.nom;
            document.getElementById('age').value = person.age || '';
            document.getElementById('email').value = person.email || '';
            
            // Changer le titre du formulaire
            const formTitle = document.querySelector('.card-header h2');
            if (formTitle) {
                formTitle.innerHTML = '✏️ Modifier une Personne';
            }
            
            showMessage(`Prêt à modifier: ${person.nom}`, 'info');
            
            // Faire défiler jusqu'au formulaire
            document.querySelector('#person-form').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement pour modification:', error);
            showMessage(`Erreur: ${error.message}`, 'error');
        });
}

// Supprimer une personne
function deletePerson(id) {
    if (!confirm('Voulez-vous vraiment supprimer cette personne ? Cette action est irréversible.')) {
        return;
    }
    
    showMessage('Suppression en cours...', 'info');
    
    fetch(`${API_BASE}/delete/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        loadAllPersons();
        showMessage('✅ Personne supprimée avec succès', 'success');
    })
    .catch(error => {
        console.error('Erreur lors de la suppression:', error);
        showMessage(`❌ Erreur de suppression: ${error.message}`, 'error');
    });
}

// Réinitialiser le formulaire
function resetForm() {
    const form = document.getElementById('person-form');
    if (form) {
        form.reset();
        document.getElementById('person-id').value = '';
        
        // Remettre le titre original
        const formTitle = document.querySelector('.card-header h2');
        if (formTitle) {
            formTitle.innerHTML = '➕ Ajouter/Modifier une Personne';
        }
        
        showMessage('Formulaire réinitialisé', 'info');
    }
}

// Afficher un message
function showMessage(text, type) {
    const messageArea = document.getElementById('message-area');
    if (!messageArea) return;
    
    messageArea.textContent = text;
    messageArea.className = `message ${type}`;
    messageArea.style.display = 'block';
    
    // Masquer automatiquement après 5 secondes (sauf pour les erreurs)
    if (type !== 'error') {
        setTimeout(() => {
            messageArea.style.display = 'none';
        }, 5000);
    }
}

// Tester la connexion à l'API au démarrage
window.addEventListener('load', function() {
    // Vérifier que l'API est accessible
    fetch(API_BASE)
        .then(response => {
            if (response.ok) {
                console.log('✅ API accessible');
                const statusBadge = document.querySelector('.status-badge.connected');
                if (statusBadge) {
                    statusBadge.innerHTML = '<span class="status-dot"></span> Backend: Connecté';
                }
            } else {
                console.warn('⚠️ API retourne une erreur:', response.status);
            }
        })
        .catch(error => {
            console.error('❌ API inaccessible:', error);
            showMessage('⚠️ Impossible de se connecter à l\'API. Vérifiez que le serveur est démarré.', 'warning');
        });
});