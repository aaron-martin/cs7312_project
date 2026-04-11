import React from "react";
import FloorPlanRoom from "./FloorPlanRealRoom.jsx";
import FloorPlanTimeSelect from "./FloorPlanTimeSelect.jsx";
import Floor from "./Floor.jsx";

const FloorPlanPanel = () => {
    return (
        <div>
            <h2 style={styles.sectionTitle}>Floor Plan</h2>

            <div style={styles.floors}>
                <FloorPlanTimeSelect/>
                <Floor
                    title="Floor 1"
                    imagePath="/cs7312_project/floor-plans/floor-1.png"
                    zoneTitles={["Robin", "Lark"]}
                >
                    <FloorPlanRoom roomId="1" top="190" left="470" />
                    <FloorPlanRoom roomId="2" top="50" left="90" />
                    <FloorPlanRoom roomId="3" top="240" left="70" width={200} />
                    <FloorPlanRoom roomId="4" top="50" left="910" width={230} />
                    <FloorPlanRoom roomId="5" top="240" left="890" width={230} />

                    <FloorPlanRoom roomId="6" top="510" left="70" width={260}/>
                    <FloorPlanRoom roomId="7" top="670" left="70" width={320}/>
                    <FloorPlanRoom roomId="8" top="510" left="830"/>
                    <FloorPlanRoom roomId="9" top="700" left="800"/>
                    <FloorPlanRoom roomId="10" top="560" left="400"/>
                </Floor>
                <FloorPlanTimeSelect/>
                <Floor
                    title="Floor 2"
                    imagePath="/cs7312_project/floor-plans/floor-2.png"
                    zoneTitles={["Wren", "Nightingale"]}
                >
                    <FloorPlanRoom roomId="11" top="40" left="300" />
                    <FloorPlanRoom roomId="12" top="40" left="55" width={230} />
                    <FloorPlanRoom roomId="13" top="170" left="605" width={190} />
                    <FloorPlanRoom roomId="14" top="255" left="830" />
                    <FloorPlanRoom roomId="15" top="40" left="820" />

                    <FloorPlanRoom roomId="16" top="500" left="800" />
                    <FloorPlanRoom roomId="17" top="670" left="55" width={230} />
                    <FloorPlanRoom roomId="18" top="500" left="55" />
                    <FloorPlanRoom roomId="19" top="550" left="370" />

                </Floor>
            </div>
        </div>
    );
};

const styles = {
    sectionTitle: {
        marginTop: 0,
        marginBottom: "0.75rem"
    },
    floors: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
    }
};

export default FloorPlanPanel;
