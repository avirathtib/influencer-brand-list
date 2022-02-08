import React, { useEffect, useState, createRef, useContext } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import Card from "react-bootstrap/Card";
import { Col, Row, Form } from "react-bootstrap";
import ScrollContainer from "react-indiana-drag-scroll";
import "../styles/cardStyle.css";
import { useNavigate } from "react-router-dom";
import {
  ProfileContext,
  SelectedTagsContext,
  ClickedProfileContext,
} from "../App";

const numbers = new Array(20).fill(1).map((_, index) => index + 1);

const clickHandler = () => {
  alert("clicked!");
};

function InfluencerProfiles() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const { selectedTagList, setSelectedTagList } =
    useContext(SelectedTagsContext);
  const { clickedProfile, setClickedProfile } = useContext(
    ClickedProfileContext
  );
  useEffect(() => {
    loop();
  }, [selectedTagList]);

  const scrollRef = createRef();
  //#endregion
  let temp = [];
  async function loop() {
    if (selectedTagList.length == 0) {
      const querySnapshot = await getDocs(collection(db, "Influencer"));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        temp.push(doc.data());
      });
      setProfiles(temp);
    } else {
      console.log("hello from lse");
      const profilesSet = new Set();
      selectedTagList.map((tag) => {
        const querySnapshot = getDoc(doc(db, "influencerTags", tag));
        console.log(querySnapshot);
        console.log("boss");
      });
    }
  }

  const enableKeyboardCursorToScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
  };

  function handleClick(profile) {
    setClickedProfile(profile);
    console.log("Hello");
    navigate(`/profiles/${profile.email}`);
  }

  // const tagItems = await getDocs(collection(db, "influencerTags"));
  // tagItems.forEach((doc) => {
  //   <div>
  //     <div>
  //       <img
  //         src="gold.jpg"
  //         width="300px"
  //         alt="indiana jones contemplates swiping the statue"
  //       />
  //       <h1>{doc.data().name}</h1>
  //       <ScrollContainer className="container">
  //         <section
  //           className="tiles"
  //           onFocus={enableKeyboardCursorToScroll}
  //           ref={scrollRef}
  //         >
  //           {doc.data().influencers.map((email) => (
  //             <Col>
  //               <div>
  //                 <Row>
  //                   {/* <div onClick={() => handleClick(profile)}> */}
  //                   <div>
  //                     <Card style={{ width: "18rem", cursor: "pointer" }}>
  //                       <Card.Img variant="top" src="holder.js/100px180" />
  //                       <Card.Body>
  //                         <Card.Title>fill title</Card.Title>
  //                         <Card.Text>{email}</Card.Text>
  //                         <button>View Profile</button>
  //                       </Card.Body>
  //                     </Card>
  //                   </div>
  //                 </Row>
  //               </div>
  //             </Col>
  //           ))}
  //         </section>
  //       </ScrollContainer>
  //     </div>
  //   </div>;
  //   // console.log(doc.id, " => ", doc.data());
  // });

  // stocklist.map((stockname) => (
  //   <li>
  //     {stockname.title} : {stockname.ticker}
  //   </li>
  // ));

  return (
    <div>
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
                <div>
                  <Row>
                    <div onClick={() => handleClick(profile)}>
                      <Card style={{ width: "18rem", cursor: "pointer" }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                          <Card.Title>{profile.name}</Card.Title>
                          <Card.Text>{profile.description}</Card.Text>
                          <button>View Profile</button>
                        </Card.Body>
                      </Card>
                    </div>
                  </Row>
                </div>
              </Col>
            ))}
          </section>
        </ScrollContainer>
      </div>
      <div>
        <p> profiles by tag</p>
      </div>
    </div>
  );
}

export default InfluencerProfiles;
