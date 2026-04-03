const initialState = {
    items: [
        {
            id: "1",
            name: "Willow Wing",
            description: "Best for small team huddles and quiet planning.",
            maxOccupancy: 50,
            zone: "Robin"
        },
        {
            id: "2",
            name: "Bluebell Nest",
            description: "Great for focused workshops and compact meetings.",
            maxOccupancy: 30,
            zone: "Robin"
        },
        {
            id: "3",
            name: "Fern Hollow",
            description: "Ideal for intimate discussions and breakout sessions.",
            maxOccupancy: 30,
            zone: "Robin"
        },
        {
            id: "4",
            name: "Meadow Chime",
            description: "Works well for small presentations and quick reviews.",
            maxOccupancy: 30,
            zone: "Robin"
        },
        {
            id: "5",
            name: "Sunrise Grove",
            description: "Perfect for small group collaboration and check-ins.",
            maxOccupancy: 30,
            zone: "Robin"
        },

        {
            id: "6",
            name: "Cedar Song",
            description: "Good for standard meetings, training, and collaboration.",
            maxOccupancy: 50,
            zone: "Lark"
        },
        {
            id: "7",
            name: "Pine Feather",
            description: "Suited for team sessions and medium planning meetings.",
            maxOccupancy: 50,
            zone: "Lark"
        },
        {
            id: "8",
            name: "Oak Whisper",
            description: "Great for group discussions and daily standups.",
            maxOccupancy: 50,
            zone: "Lark"
        },
        {
            id: "9",
            name: "Maple Reed",
            description: "Best for workshops, reviews, and cross-team syncs.",
            maxOccupancy: 50,
            zone: "Lark"
        },
        {
            id: "10",
            name: "Birch Meadow",
            description: "Useful for medium meetings and collaborative sessions.",
            maxOccupancy: 100,
            zone: "Lark"
        },

        {
            id: "11",
            name: "Hawthorn Crest",
            description: "Works well for larger meetings and training events.",
            maxOccupancy: 50,
            zone: "Wren"
        },
        {
            id: "12",
            name: "Aspen Brook",
            description: "Ideal for group planning and routine presentations.",
            maxOccupancy: 30,
            zone: "Wren"
        },
        {
            id: "13",
            name: "Pebble Finch",
            description: "Great for meetings with a moderate group size.",
            maxOccupancy: 30,
            zone: "Wren"
        },
        {
            id: "14",
            name: "River Thicket",
            description: "Best for active collaboration and mid-size sessions.",
            maxOccupancy: 50,
            zone: "Wren"
        },
        {
            id: "15",
            name: "Moss Vale",
            description: "Suited for team meetings and shared working sessions.",
            maxOccupancy: 50,
            zone: "Wren"
        },

        {
            id: "16",
            name: "Sage Meadow",
            description: "Great for larger team meetings and department updates.",
            maxOccupancy: 100,
            zone: "Nightingale"
        },
        {
            id: "17",
            name: "Willow Peak",
            description: "Ideal for all-hands meetings and expanded workshops.",
            maxOccupancy: 50,
            zone: "Nightingale"
        },
        {
            id: "18",
            name: "Juniper Hall",
            description: "Best for large presentations and training sessions.",
            maxOccupancy: 100,
            zone: "Nightingale"
        },
        {
            id: "19",
            name: "Sky Song Hall",
            description: "Built for large meetings, concerts, keynote talks, and major events.",
            maxOccupancy: 600,
            zone: "Nightingale"
        }
    ],
    selectedRoom: null
};

function rooms(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default rooms;