import {CREATE_MEETING, UPDATE_MEETING} from "../action/actionTypes.js";

const initialState = [
    {
        id: "1",
        name: "Mystery Manuscript Roundtable",
        description: "Discuss current submissions.",
        duration: 30,
        numAttendees: 8
    },
    {
        id: "2",
        name: "Clue Structure Workshop",
        description: "Refine plot twists.",
        duration: 45,
        numAttendees: 12
    },
    {
        id: "3",
        name: "Series Continuity Review",
        description: "Check story consistency.",
        duration: 30,
        numAttendees: 10
    },
    {
        id: "4",
        name: "Cozy Crime Cover Session",
        description: "Review cover concepts.",
        duration: 45,
        numAttendees: 15
    },
    {
        id: "5",
        name: "Red Herring Brainstorm",
        description: "Sharpen misdirection ideas.",
        duration: 30,
        numAttendees: 9
    },
    {
        id: "6",
        name: "Detective Series Planning",
        description: "Map the next books.",
        duration: 60,
        numAttendees: 22
    },
    {
        id: "7",
        name: "Suspense Editing Clinic",
        description: "Improve pacing and tension.",
        duration: 45,
        numAttendees: 18
    },
    {
        id: "8",
        name: "Publisher Pitch Practice",
        description: "Prepare author presentations.",
        duration: 30,
        numAttendees: 14
    },
    {
        id: "9",
        name: "Mystery Market Trends",
        description: "Review genre demand.",
        duration: 45,
        numAttendees: 20
    },
    {
        id: "10",
        name: "Keynote Address: The Future of Mystery Fiction",
        description: "Highlight industry direction.",
        duration: 60,
        numAttendees: 420
    },
    {
        id: "11",
        name: "Plot Twist Fundamentals",
        description: "Cover twist setup.",
        duration: 45,
        numAttendees: 12
    },
    {
        id: "12",
        name: "Advanced Clue Engineering",
        description: "Refine clue placement.",
        duration: 45,
        numAttendees: 16
    },
    {
        id: "13",
        name: "Mystery Worldbuilding Summit",
        description: "Scale ideas for series growth.",
        duration: 60,
        numAttendees: 40
    }
];

function meetings(state = initialState, action) {
    switch (action.type) {
        case CREATE_MEETING:
            return [...state, action.payload];
        case UPDATE_MEETING:
            return state.map((meeting) =>
                (meeting.id === action.payload.id ? {...action.payload}: meeting));
        default:
            return state;
    }
}

export default meetings;
