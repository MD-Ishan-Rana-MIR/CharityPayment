import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    modalOne : false,
    modalTwo : false,
    modalThree : false,
    volunterModalOne : false,
    volunterModalTwo : false,
    actionModalOne : false,
    actionModalTwo : false,
    actionModalThree : false,
    actionModalFour : false,
    teamModalOne : false,
    teamModalTwo : false,
    teamModalThree : false,
    teamModalFour : false,
    settingModalOne : false,
    settingModalTwo : false,
    podcastModalOne: false,
    podcastModalTwo: false,
    podcastModalThree: false,
    podcastModalFour: false,
    podcastModalFive: false,
    serviceModalOne: false,
}

const modalSlice = createSlice({
    name:"modal",
    initialState,
    reducers:{
        modalOpenOne: (state) => { state.modalOne = true; },
        closeModalOpenOne: (state) => { state.modalOne = false; },
        modalOpenTwo: (state) => { state.modalTwo = true; },
        closeModalOpenTwo: (state) => { state.modalTwo = false; },
        modalOpenThree: (state) => { state.modalThree = true; },
        closeModalOpenThree: (state) => { state.modalThree = false; },
        volunterModalOpenOne :(state) =>{state.volunterModalOne = true;
        },
        closeVlounterModalOpenOne : (state) =>{state.volunterModalOne = false
        },
        volunterModalOpenTwo :(state) =>{state.volunterModalTwo = true;
        },
        closeVlounterModalOpenTwo : (state) =>{state.volunterModalTwo = false
        },
        actionModalOpenOne : (state) =>{state.actionModalOne = true},
        closeActionModalOpenOne : (state) =>{state.actionModalOne = false},

        actionModalOpenTwo : (state) =>{state.actionModalTwo = true},
        closeActionModalOpenTwo : (state) =>{state.actionModalTwo = false},

        actionModalOpenThree : (state) =>{state.actionModalThree = true},
        closeActionModalOpenThree : (state) =>{state.actionModalThree = false},

        actionModalOpenFour : (state) =>{state.actionModalFour = true},
        closeActionModalOpenFour : (state) =>{state.actionModalFour = false},

        teamModalOpenOne : (state) =>{state.teamModalOne = true},
        closeTeamModalOpenOne : (state) =>{state.teamModalOne = false},

        teamModalOpenTwo : (state) =>{state.teamModalTwo = true},
        closeTeamModalOpenTwo : (state) =>{state.teamModalTwo = false},

        teamModalOpenThree : (state) =>{state.teamModalThree = true},
        closeTeamModalOpenThree : (state) =>{state.teamModalThree = false},

        teamModalOpenFour : (state) =>{state.teamModalFour = true},
        closeTeamModalOpenFour : (state) =>{state.teamModalFour = false},

        settingModalOpenOne : (state) =>{state.settingModalOne = true},
        closeSettingModalOpenOne : (state) =>{state.settingModalOne = false},

        settingModalOpenTwo : (state) =>{state.settingModalTwo = true},
        closeSettingModalOpenTwo : (state) =>{state.settingModalTwo = false},

        podcastModalOpenOne : (state) =>{state.podcastModalOne = true},
        closePodcastModalOpenOne : (state) =>{state.podcastModalOne = false},

        podcastModalOpenTwo : (state) =>{state.podcastModalTwo = true},
        closePodcastModalOpenTwo : (state) =>{state.podcastModalTwo = false},

        podcastModalOpenThree : (state) =>{state.podcastModalThree = true},
        closePodcastModalOpenThree : (state) =>{state.podcastModalThree = false},

        podcastModalOpenFour : (state) =>{state.podcastModalFour = true},
        closePodcastModalOpenFour : (state) =>{state.podcastModalFour = false},

        podcastModalOpenFive : (state) =>{state.podcastModalFive = true},
        closePodcastModalOpenFive : (state) =>{state.podcastModalFive = false},

        serviceModalOpenOne : (state) =>{state.serviceModalOne = true},
        closeserviceModalOpenOne : (state) =>{state.serviceModalOne = false},
    }
})

export const {modalOpenOne,closeModalOpenOne,modalOpenTwo,closeModalOpenTwo,modalOpenThree,closeModalOpenThree,volunterModalOpenOne,closeVlounterModalOpenOne,volunterModalOpenTwo,closeVlounterModalOpenTwo,actionModalOpenOne,closeActionModalOpenOne,actionModalOpenTwo,closeActionModalOpenTwo,actionModalOpenThree,closeActionModalOpenThree,actionModalOpenFour,closeActionModalOpenFour,teamModalOpenOne,closeTeamModalOpenOne,teamModalOpenTwo,closeTeamModalOpenTwo,teamModalOpenThree,closeTeamModalOpenThree,teamModalOpenFour,closeTeamModalOpenFour,settingModalOpenOne,closeSettingModalOpenOne,settingModalOpenTwo, closeSettingModalOpenTwo, podcastModalOpenOne,closePodcastModalOpenOne,podcastModalOpenTwo,closePodcastModalOpenTwo,podcastModalOpenThree,closePodcastModalOpenThree,podcastModalOpenFour,closePodcastModalOpenFour,podcastModalOpenFive,closePodcastModalOpenFive,serviceModalOpenOne,closeserviceModalOpenOne} = modalSlice.actions;
export default modalSlice.reducer;
