import React, { Component } from "react";
import { db } from "../firebase-config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import "./profilecardss.scss";
import { Link } from "react-router-dom";

class Helpers {
  static contains(orig, filter) {
    let res = filter?.map((item) => {
      return orig?.includes(item);
    });
    return !res?.includes(false);
  }

  static hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
}

// components
class ProfileCard2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      profiles: [],
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleListTagClick = this.handleListTagClick.bind(this);
  }

  async componentDidMount() {
    let temp = [];
    console.log("if hello");
    const querySnapshot = await getDocs(collection(db, "Influencer"));
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      if (doc.data().extendedProfileCreated == true) {
        temp.push(doc.data());
      }
    });
    this.setState({ profiles: temp });
    console.log(this.state.profiles);
  }

  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleListTagClick(tag) {
    this.setState({ tags: [...this.state.tags, tag] });
  }

  render() {
    return (
      <div>
        <TagInput onTagChange={this.handleTagChange} tags={this.state.tags} />
        <ExampleList
          items={this.state.profiles}
          filter={this.state.tags}
          onTagClick={this.handleListTagClick}
        />
      </div>
    );
  }
}

class TagInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      tags: this.props.tags || [],
    };

    this.handleNewTag = this.handleNewTag.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.notDuplicate = this.notDuplicate.bind(this);
    this.updateControlledTags = this.updateControlledTags.bind(this);
  }

  handleNewTag(tags) {
    if (this.props.onNewTag) this.props.onNewTag(tags);
    if (this.props.onTagChange) this.props.onTagChange(tags);
  }

  handleInputChange({ target: { value: inputValue } }) {
    inputValue = inputValue == "," ? "" : inputValue;
    this.setState({ inputValue });
  }

  handleKeyDown(e) {
    let {
      key,
      target: { value },
    } = e;
    let { tags } = this.state;
    switch (key) {
      case "Tab":
        if (value) e.preventDefault();
      case "Enter":
      case ",":
        value = value.trim();
        if (value && this.notDuplicate(tags, value)) {
          this.addTag(value);
        } else {
          this.setState({ inputValue: "" });
        }
        break;
      case "Backspace":
        if (!value) {
          this.handleTagDelete(tags.length - 1);
        }
        break;
    }
  }

  handleTagDelete(index, e) {
    this.deleteTag(index, () => {
      this.props.onTagChange(this.state.tags);
    });
  }

  deleteTag(index, callback) {
    let tags = this.state.tags.slice();

    tags.splice(index, 1);
    this.setState({ tags }, () => {
      if (callback) callback();
    });
  }

  notDuplicate(tags, newTag) {
    return !tags.includes(newTag) || this.props.allowDuplicates;
  }

  addTag(tag) {
    if (this.notDuplicate(this.state.tags, tag)) {
      this.setState({ tags: [...this.state.tags, tag], inputValue: "" }, () => {
        this.handleNewTag(this.state.tags);
      });
    }
  }

  updateControlledTags(tags) {
    if (tags && !Helpers.hasDuplicates(tags)) {
      this.setState({ tags }, () => {
        // this.props.onTagChange(tags);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateControlledTags(nextProps.tags);
  }

  render() {
    return (
      <span className="tagInputWrapper">
        <TagsList
          tags={this.state.tags}
          onTagDelete={this.handleTagDelete}
          hashtag={this.props.hashtag}
        />
        <input
          name="tagInput"
          className="tagInput"
          placeholder="enter a tag..."
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
      </span>
    );
  }
}

const TagsList = ({ tags, onTagDelete, hashtag }) => {
  let list = tags.map((tag, index) => (
    <Tag name={tag} onDelete={onTagDelete} index={index} hashtag={hashtag} />
  ));
  return (
    <ul name="tagsList" className="tagsList">
      {list}
    </ul>
  );
};

const Tag = ({ name, index, onDelete, hashtag, hashtagStyled }) => {
  return (
    <li>
      {hashtag && (
        <span
          style={{ color: "#898989", fontWeight: "bold", ...hashtagStyled }}
        >
          #{" "}
        </span>
      )}
      {name}
      <a href="#" onClick={(e) => onDelete(index, e)}>
        x
      </a>
    </li>
  );
};

const ExampleList = ({ items, filter, onTagClick }) => {
  let filtered = items.filter((item) => Helpers.contains(item.tags, filter));

  let renderedItems = filtered.map(
    ({ name, description, email, tags, extendedProfileCreated }, index) => {
      return (
        <ExampleListItem
          name={name}
          description={description}
          email={email}
          tags={tags}
          key={index}
          extendedProfileCreated={extendedProfileCreated}
          onClick={onTagClick}
        />
      );
    }
  );

  return (
    <div>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "0px",
          gridGap: "10px",
        }}
      >
        {renderedItems}
      </ul>
    </div>
  );
};

const ExampleListItem = ({
  name,
  description,
  email,
  tags,
  extendedProfileCreated,
  key,
  onClick,
}) => {
  const renderedTags = tags?.slice(0, 10).map((tag) => (
    <li onClick={(e) => onClick(tag, e)} className="tag clickable">
      {tag}
    </li>
  ));
  //#endregion
  console.log(extendedProfileCreated);

  return (
    <div className="main">
      <>
        <input id="slider" className="customSlider" type="checkbox" />
        <label htmlFor="slider" />
        <div className="wrapper">
          <div className="top-icons">
            <i className="fas fa-long-arrow-alt-left" />
            <i className="fas fa-ellipsis-v" />
            <i className="far fa-heart" />
          </div>
          <div className="profile">
            <img
              src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w"
              className="thumbnail"
            />
            <div className="check">
              <i className="fas fa-check" />
            </div>
            <h3 className="name">{name}</h3>
            <p className="title">{description}</p>
            <ul className="tagsList" style={{ padding: 0 }}>
              {renderedTags}
            </ul>
          </div>
          <div>
            <div>
              <Link
                to={`/profiles/${email}`}
                className="button-17"
                style={{ textDecoration: "none" }}
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ProfileCard2;
