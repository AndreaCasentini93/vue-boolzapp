/*
4) Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina);
*/

const app = new Vue(
    {
        el: "#root",
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },     
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
            ],
            currentIndex: 0,
            newDate: "",
            newUserMessage: "",
            wantedContact: ""
        },
        created: function() {
            this.newDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
        },
        methods: {
            getContactImage: function(contact) {
                // Restituisce l'SRC dell'immagine nell'oggetto "contact"
                return `img/avatar${contact.avatar}.jpg`;
            },
            getLastContactMessage: function(contact) {
                // Restituisce l'ultimo messaggio inviato dall'utente nell'oggetto "contact"
                if (contact.messages[contact.messages.length - 1].text.length < 30) {
                    return contact.messages[contact.messages.length - 1].text;
                } else {
                    return contact.messages[contact.messages.length - 1].text.substring(0, 30) + "...";
                }
            },
            getLastContactDate: function(contact) {
                // Restituisce la data dell'ultimo messaggio inviato dall'utente nell'oggetto "contact"
                return contact.messages[contact.messages.length - 1].date;
            },
            getTextInMessages: function(message) {
                // Restituisce il testo presente nell'oggetto "message"
                return message.text;
            },
            getDateInMessages: function(message) {
                // Restituisce la data  presente nell'oggetto "message"
                return message.date;
            },
            getStatusinMessages: function(message) {
                // Restituisce lo status presente nell'oggetto "message"
                return message.status;
            },
            changeContact: function(index) {
                // Assegna al "currentIndex" il valore di "index"
                this.currentIndex = index;
            },
            getCurrentImage: function() {
                // Restituisce l'immagine corrispondente al "currentIndex"
                return `img/avatar${this.contacts[this.currentIndex].avatar}.jpg`;
            },
            getLastCurrentAccess: function() {
                // Restituisce l'ultimo accesso corrispondente al "currentIndex"
                return this.contacts[this.currentIndex].messages[this.contacts[this.currentIndex].messages.length - 1].date;
            },
            enterNewUserMessage: function() {
                if (this.newUserMessage.trim().length > 0) {
                    // Crea un nuovo oggetto "objectSent" inviato nella data corrente che ha come testo il "newUserMessage" inserito dall'utente
                    const objectSent = {
                        date: this.newDate,
                        text: this.newUserMessage,
                        status: 'sent'
                    };
                    // Aggiunge il nuovo oggetto all'array "messages" in "contacts"
                    this.contacts[this.currentIndex].messages.push(objectSent);
                    // Pulisce il campo di input
                    this.newUserMessage = "";
                    // Fa partire una risposta di "ok" da parte del contatto un secondo dopo l'invio
                    setTimeout(() => {
                        // Crea un nuovo oggetto "objectReceived" inviato nella data corrente che ha come testo il "Ok!" inserito dall'utente
                        const objectReceived = {
                            date: this.newDate,
                            text: "Ok!",
                            status: 'received'
                        };
                        // Aggiunge il nuovo oggetto all'array "messages" in "contacts"
                        this.contacts[this.currentIndex].messages.push(objectReceived);
                    }, 1000);
                };
            },
            searchContact: function() {
                let searching = "";
                // La prima lettera inserita dall'utente viene resa maiuscola mentre le altre minuscole
                if (this.wantedContact.trim().length <= 1) {
                    searching = this.wantedContact.toUpperCase();
                } else {
                    searching = this.wantedContact[0].toUpperCase() + this.wantedContact.substring(1).toLowerCase();
                }
                this.contacts.forEach((element) => {
                    // Se i caratteri inseriti dall'utente non compongono il nome del contatto allora il contatto avrà visibilità "false"
                    if (searching != element.name.substring(0, this.wantedContact.length)) {
                        element.visible = false;
                    }
                });
            },
            contactsVisibility: function() {
                for (i = 0; i < this.contacts.lenght; i++) {
                    if(!this.contacts[i].visible) {
                        return "invisible";
                    }
                }
            }
        }
    }
)