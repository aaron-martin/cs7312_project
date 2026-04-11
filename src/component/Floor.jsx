import React from "react";

const Floor = (props) => {
    return (
        <div style={styles.floorWrapper}>
            <h2 style={styles.sectionTitle}>{props.title}</h2>
            <div>
                <h3 style={styles.zoneTitle}>{props.zoneTitles[0]}</h3>
                <div style={styles.getfloorStyle(props.imagePath)}>
                    {props.children}
                </div>
                <h3 style={styles.zoneTitle}>{props.zoneTitles[1]}</h3>
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
    },
    floorWrapper: {
        padding: "1rem",
        border: "1px solid #d7d7d7",
    },
    getfloorStyle: (imagePath) => ({
        position: "relative",
        width: "1200px",
        height: "849px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundImage: `url('${imagePath}')`
    }),
    zoneTitle: {
        width: "900px",
        textAlign: "center"
    },
};


export default Floor;
