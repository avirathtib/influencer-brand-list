import React, { useEffect, useState, createRef , useContext} from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Col, Row, Form } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import "../styles/cardStyle.css";
import { useNavigate } from "react-router-dom";
import { ClickedProfileContext } from "../App";

const numbers = new Array(20).fill(1).map((_, index) => index + 1);

const clickHandler = () => {
  alert("clicked!");
};

function InfluencerProfiles() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const { clickedProfile, setClickedProfile } = useContext(ClickedProfileContext);
  useEffect(() => {
    loop();
  }, []);

  const scrollRef = createRef();
  //#endregion
  let temp = [];
  async function loop() {
    const querySnapshot = await getDocs(collection(db, "Influencer"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      temp.push(doc.data());
    });
    setProfiles(temp);
  }

  const enableKeyboardCursorToScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  };

  function goToProfileHandler(profile){
    console.log("Hello")
    navigate(`/profiles/${profile.email}`)
  }

  return (
    <div>
      <img
        src="gold.jpg"
        width="300px"
        alt="indiana jones contemplates swiping the statue"
      />
      <h1>Drag with Scrollbars using React Indiana Drag Scroll</h1>
      <ScrollContainer className="container">
        <section
          className="tiles"
          onFocus={enableKeyboardCursorToScroll}
          ref={scrollRef}
        >
        
          {profiles.map((profile) => (
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://www.kit.com/images/Frame-4057.png"
                />
                <Card.Body>
                  <Card.Title>{profile.name}</Card.Title>
                  <Card.Text>{profile.description}</Card.Text>
                  <button  onclick = {() => {goToProfileHandler(profile)}} >View Profile</button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </section>
      </ScrollContainer>
    </div>
  );
}

export default InfluencerProfiles;
